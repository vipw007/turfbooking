import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

// Example function to create a booking in Firestore after payment
export const createBooking = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError("unauthenticated", "User must be logged in.");
  }

  const { slotId, turfId, date, customerDetails } = data;

  try {
    const bookingRef = admin.firestore().collection("bookings").doc();
    await bookingRef.set({
      slotId,
      turfId,
      date,
      customerDetails,
      userId: context.auth.uid,
      status: "confirmed",
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    return { success: true, bookingId: bookingRef.id };
  } catch (error) {
    console.error("Error creating booking:", error);
    throw new functions.https.HttpsError("internal", "Failed to create booking.");
  }
});
