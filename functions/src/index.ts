import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as crypto from "crypto";

admin.initializeApp();

export const createBooking = functions.runWith({ secrets: ["RAZORPAY_KEY_SECRET"] }).https.onCall(async (data, context) => {
  // Allow unauthenticated for now if you want guest bookings, 
  // otherwise uncomment the check below
  /*
  if (!context.auth) {
    throw new functions.https.HttpsError("unauthenticated", "User must be logged in.");
  }
  */

  const { slotId, turfId, date, customerDetails, razorpay_payment_id, razorpay_order_id, razorpay_signature } = data;

  // Optional: Verify Razorpay Signature if provided
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
      userId: context.auth?.uid || "guest",
      status: "confirmed",
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    return { success: true, bookingId: bookingRef.id };
  } catch (error) {
    console.error("Error creating booking:", error);
    throw new functions.https.HttpsError("internal", "Failed to create booking.");
  }
});
