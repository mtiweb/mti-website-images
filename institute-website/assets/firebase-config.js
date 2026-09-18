// ==========================================================
// بيانات مشروع Firebase الخاص بك
// اذهب إلى: Firebase Console → إعدادات المشروع → تطبيقات الويب
// وانسخ القيم من كائن firebaseConfig هناك، ثم الصقها هنا بدل النصوص أدناه.
// ==========================================================
const firebaseConfig = {
  apiKey: "AIzaSyDSCymtK1KKUtUUus2w8lu8JniNoQn4u5c",
  authDomain: "mti-website-80155.firebaseapp.com",
  projectId: "mti-website-80155",
  storageBucket: "mti-website-80155.firebasestorage.app",
  messagingSenderId: "1024855806639",
  appId: "1:1024855806639:web:ea17dece779d4b26b4fa5a"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
