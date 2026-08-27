/* ============================================================
   NATIONAL MOTORS — Contact Us content (bilingual)
   SOURCE OF TRUTH: "National Motors Website Content.pptx".
   Hero: slide 37. Contact Form (fields, success, short notice): slide 55.
   English and Arabic are reproduced verbatim; form field labels in both
   languages are supplied by the PPTX. Submissions are directed to
   info@nationalmotorsco.com. Nothing (numbers, addresses, hours,
   departments, extra fields) is invented.
   ============================================================ */

export const CONTACT = {
  destination: "info@nationalmotorsco.com",
  brands: ["Joylong", "Farizon", "Blu Light Mobility"],
  en: {
    eyebrow: "Contact Us",
    title: "Let's Get in Touch",
    heroBody: "Have a question about our vehicles, services, or mobility solutions? Our team is here to help.",
    formHeading: "Contact Us",
    formIntro: "Complete the form below, and a member of our team will get in touch with you as soon as possible.",
    labels: { name: "Name", phone: "Contact Number", brand: "Brand", inquiry: "Inquiry" },
    brandPlaceholder: "Select a brand",
    generalOption: "General Inquiry",
    submit: "Send Message",
    submitting: "Sending…",
    success: "Thanks for filling the form. We will contact you shortly",
    successTitle: "Message Received",
    noticeLabel: "Short Notice",
    notice: "National Motors will use your contact details and message to respond to your enquiry, direct it to the appropriate department, and maintain relevant correspondence. Please do not submit unnecessary identity, payment, or confidential information through this form.",
    errors: {
      name: "Please enter your name.",
      phone: "Please enter your contact number.",
      brand: "Please select a brand.",
      inquiry: "Please enter your inquiry.",
    },
    langLabel: "العربية",
    close: "Send another message",
  },
  ar: {
    eyebrow: "تواصل معنا",
    title: "نحن هنا لمساعدتك",
    heroBody: "هل لديك استفسار عن سياراتنا أو خدماتنا أو حلول التنقل التي نقدمها؟ فريقنا جاهز لمساعدتك والإجابة عن جميع استفساراتك.",
    formHeading: "تواصل معنا",
    formIntro: "املأ النموذج التالي، وسيتواصل معك أحد أعضاء فريقنا في أقرب وقت ممكن.",
    labels: { name: "الاسم", phone: "رقم التليفون", brand: "العلامة التجارية", inquiry: "الاستفسار" },
    brandPlaceholder: "اختر العلامة التجارية",
    generalOption: "استفسار عام",
    submit: "إرسال الرسالة",
    submitting: "جارٍ الإرسال…",
    success: "تم استلام استفسارك. سنتواصل معك قريباً",
    successTitle: "تم استلام رسالتك",
    noticeLabel: "ملاحظة",
    notice: "ستستخدم ناشيونال موتورز بيانات التواصل معك ومحتوى رسالتك للرد على استفسارك، وتوجيهه إلى الإدارة المختصة، والاحتفاظ بالمراسلات ذات الصلة. يرجى عدم إرسال بيانات هوية أو معلومات دفع أو معلومات سرية لا تتطلبها طبيعة الاستفسار.",
    errors: {
      name: "الرجاء إدخال الاسم.",
      phone: "الرجاء إدخال رقم التليفون.",
      brand: "الرجاء اختيار العلامة التجارية.",
      inquiry: "الرجاء كتابة استفسارك.",
    },
    langLabel: "English",
    close: "إرسال رسالة أخرى",
  },
} as const;

export type ContactLang = "en" | "ar";
