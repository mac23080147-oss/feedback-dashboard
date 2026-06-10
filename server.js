require("dotenv").config();

const express = require("express");
const { initializeApp, cert, getApps } = require("firebase-admin/app");
const { getFirestore, FieldValue } = require("firebase-admin/firestore");

const app = express();
const PORT = process.env.PORT || 3000;

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

app.use(express.json());
app.use(express.static(__dirname));

app.post("/api/feedback", async (req, res) => {
  try {
    const { name, email, message, rating } = req.body;

    await db.collection("feedback").add({
      name: name || "",
      email: email || "",
      message: message || "",
      rating: Number(rating) || null,
      createdAt: FieldValue.serverTimestamp(),
    });

    res.json({
      success: true,
      message: "Feedback saved successfully",
    });
  } catch (error) {
    console.error("Lỗi lưu feedback:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

app.get("/api/feedback", async (req, res) => {
  try {
    const snapshot = await db
      .collection("feedback")
      .orderBy("createdAt", "desc")
      .get();

    const feedbacks = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.json({
      success: true,
      feedbacks,
    });
  } catch (error) {
    console.error("Lỗi đọc feedback:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});