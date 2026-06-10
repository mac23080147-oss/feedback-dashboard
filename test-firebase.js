require("dotenv").config();

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

async function testFirebase() {
  try {
    await db.collection("feedback").add({
      name: "Test user",
      message: "Test feedback from local",
      rating: 5,
      createdAt: FieldValue.serverTimestamp(),
    });

    console.log("Đẩy data lên Firebase thành công!");
  } catch (error) {
    console.error("Lỗi Firebase:", error);
  }
}

testFirebase();