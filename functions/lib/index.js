"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBooking = void 0;
const functions = __importStar(require("firebase-functions"));
const admin = __importStar(require("firebase-admin"));
const crypto = __importStar(require("crypto"));
admin.initializeApp();
exports.createBooking = functions.runWith({ secrets: ["RAZORPAY_KEY_SECRET"] }).https.onCall(async (data, context) => {
    var _a;
    const { slotId, turfId, date, customerDetails, razorpay_payment_id, razorpay_order_id, razorpay_signature } = data;
    if (razorpay_payment_id && razorpay_order_id && razorpay_signature) {
        const secret = process.env.RAZORPAY_KEY_SECRET || "";
        const generated_signature = crypto
            .createHmac("sha256", secret)
            .update(razorpay_order_id + "|" + razorpay_payment_id)
            .digest("hex");
        if (generated_signature !== razorpay_signature) {
            throw new functions.https.HttpsError("invalid-argument", "Invalid payment signature.");
        }
    }
    try {
        const bookingRef = admin.firestore().collection("bookings").doc();
        await bookingRef.set({
            slotId,
            turfId,
            date,
            customerDetails,
            razorpay_payment_id: razorpay_payment_id || null,
            userId: ((_a = context.auth) === null || _a === void 0 ? void 0 : _a.uid) || "guest",
            status: "confirmed",
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
        });
        return { success: true, bookingId: bookingRef.id };
    }
    catch (error) {
        console.error("Error creating booking:", error);
        throw new functions.https.HttpsError("internal", "Failed to create booking.");
    }
});
//# sourceMappingURL=index.js.map