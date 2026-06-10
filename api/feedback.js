const { initializeApp, cert, getApps } = require("firebase-admin/app");
const { getFirestore, FieldValue } = require("firebase-admin/firestore");

if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  });
}

const db = getFirestore();

module.exports = async function handler(req, res) {
  try {
    if (req.method === "POST") {
      const { name, location, rating, comment } = req.body;

      await db.collection("feedback").add({
        name: name || "",
        location: location || "",
        rating: Number(rating) || null,
        comment: comment || "",
        createdAt: FieldValue.serverTimestamp(),
      });

      return res.status(200).json({
        success: true,
        message: "Feedback saved successfully",
      });
    }

    if (req.method === "GET") {
      const snapshot = await db
        .collection("feedback")
        .orderBy("createdAt", "desc")
        .get();

      const feedbacks = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return res.status(200).json({
        success: true,
        feedbacks,
      });
    }

    return res.status(405).json({
      success: false,
      error: "Method not allowed",
    });
  } catch (error) {
    console.error("Firebase API error:", error);

    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};