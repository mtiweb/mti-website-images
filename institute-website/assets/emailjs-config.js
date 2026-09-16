// ==========================================================
// إعداد اختياري: إرسال رسائل نموذج التواصل كبريد إلكتروني حقيقي
// عبر خدمة مجانية اسمها EmailJS (لا حاجة لخادم خاص بك).
//
// هذا اختياري تمامًا — رسائل الزوار تُحفظ دائمًا في لوحة التحكم
// (تبويب "الرسائل الواردة") حتى لو لم تُفعّل هذا الإعداد.
//
// خطوات التفعيل موجودة في ملف FIREBASE_SETUP_AR.md (قسم EmailJS).
// ==========================================================
const EMAILJS_CONFIG = {
  publicKey: "ضع_PUBLIC_KEY_هنا",
  serviceId: "ضع_SERVICE_ID_هنا",
  templateId: "ضع_TEMPLATE_ID_هنا"
};

if(typeof emailjs !== 'undefined' && EMAILJS_CONFIG.publicKey && !EMAILJS_CONFIG.publicKey.startsWith('ضع_')){
  emailjs.init(EMAILJS_CONFIG.publicKey);
}
