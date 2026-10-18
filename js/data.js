/* ==========================================================================
   IT-BAU Student Portal - Database & Data Models
   Faculty of Information Technology - Al-Balqa Applied University
   ========================================================================== */

const IT_DATA = {
  // 1. التخصصات والخطط الدراسية
  majors: [
    {
      id: "se",
      title: "هندسة البرمجيات",
      titleEn: "Software Engineering",
      icon: "fa-solid fa-code",
      credits: 132,
      desc: "يعنى بتصميم، وتطوير، واختبار، وصيانة الأنظمة والبرمجيات المعقدة وفق أعلى معايير الجودة.",
      driveUrl: "https://drive.google.com/drive/folders/1Ubg0UxnqFhuF7y67InICurg3DFkU7Kmv?usp=drive_link",
      planUrl: "img/plan_se_2025.jpg",
      planImg: "img/plan_se_2025.jpg",
      planImg2025: "img/plan_se_2025.jpg",
      planImg2006: "img/plan_se_2006.jpg",
      subjectsCount: 44,
      popularCourses: ["هندسة البرمجيات 1", "تطوير تطبيقات الويب", "أنماط التصميم (Design Patterns)", "إدارة مشاريع البرمجيات", "اختبار وتوكيد الجودة"]
    },
    {
      id: "cs",
      title: "علم الحاسوب",
      titleEn: "Computer Science",
      icon: "fa-solid fa-laptop-code",
      credits: 132,
      desc: "دراسة الخوارزميات، البرمجة المتقدمة، هياكل البيانات، ونظريات الحوسبة والحلول البرمجية الذكية.",
      driveUrl: "https://drive.google.com/drive/folders/1Ubg0UxnqFhuF7y67InICurg3DFkU7Kmv?usp=drive_link",
      planUrl: "img/plan_cs_2025.jpg",
      planImg: "img/plan_cs_2025.jpg",
      planImg2025: "img/plan_cs_2025.jpg",
      planImg2006: "img/plan_cs_2006.jpg",
      subjectsCount: 44,
      popularCourses: ["الخوارزميات وهياكل البيانات", "البرمجة الكائنية (C++)", "أنظمة التشغيل (Operating Systems)", "الذكاء الاصطناعي", "معمارية الحاسوب"]
    },
    {
      id: "cg",
      title: "الرسم الحاسوبي",
      titleEn: "Computer Graphics & Animation",
      icon: "fa-solid fa-palette",
      credits: 132,
      desc: "تخصص يعنى بنمذجة الأشكال ثلاثية الأبعاد، المعالجة الصورية، البرمجة الرسومية (OpenGL)، وتصميم الواجهات والرسوم التفاعلية.",
      driveUrl: "https://drive.google.com/drive/folders/1Ubg0UxnqFhuF7y67InICurg3DFkU7Kmv?usp=drive_link",
      planUrl: "img/plan_cg_2025.jpg",
      planImg: "img/plan_cg_2025.jpg",
      planImg2025: "img/plan_cg_2025.jpg",
      planImg2006: "img/plan_cg_2006.jpg",
      subjectsCount: 44,
      popularCourses: ["البرمجة الرسومية (OpenGL)", "النمذجة والتحريك ثلاثي الأبعاد", "معالجة الصور الرقمية", "تصميم الواجهات (UI/UX)", "محركات الألعاب التفاعلية"]
    },
    {
      id: "cis",
      title: "نظم المعلومات الحاسوبية",
      titleEn: "Computer Information Systems",
      icon: "fa-solid fa-database",
      credits: 132,
      desc: "الربط بين تكنولوجيا المعلومات وبيئة الأعمال، إدارات قواعد البيانات، وتحليل النظم.",
      driveUrl: "https://drive.google.com/drive/folders/1Ubg0UxnqFhuF7y67InICurg3DFkU7Kmv?usp=drive_link",
      planUrl: "img/plan_cis_2025.jpg",
      planImg: "img/plan_cis_2025.jpg",
      planImg2025: "img/plan_cis_2025.jpg",
      planImg2006: "img/plan_cis_2006.jpg",
      subjectsCount: 44,
      popularCourses: ["قواعد البيانات المتقدمة (SQL/NoSQL)", "تحليل وتصميم النظم", "تجارة إلكترونية", "أنظمة الحوسبة السحابية", "استرجاع المعلومات"]
    }
  ],

  // دليل وتوزيع مواد الكلية المقسمة حسب التخصص والمستوى الدراسي
  // أولاً: خطة جيل 2007 وما بعد (الخطة الجديدة)
  courseCatalog2007: [
    {
      id: "cat-core",
      category: "متطلبات كلية إجبارية (جميع التخصصات)",
      color: "#215a36",
      icon: "fa-solid fa-layer-group",
      driveUrl: "https://drive.google.com/drive/folders/1Ubg0UxnqFhuF7y67InICurg3DFkU7Kmv?usp=drive_link",
      courses: [
        { name: "البرمجة بلغة C++", lab: "مختبر البرمجة بلغة C++", level: "السنة الأولى", type: "core" },
        { name: "البرمجة الموجهة للكائنات (OOP)", lab: "مختبر البرمجة الموجهة للكائنات", level: "السنة الأولى", type: "core" },
        { name: "مهارات الحاسوب لطلبة الكليات العلمية", lab: "مختبر مهارات الحاسوب", level: "السنة الأولى", type: "core" },
        { name: "أساسيات هندسة البرمجيات", lab: "بدون مختبر", level: "السنة الثانية", type: "core" },
        { name: "هياكل البيانات والخوارزميات", lab: "بدون مختبر", level: "السنة الثانية", type: "core" },
        { name: "تصميم وبرمجة الويب", lab: "مختبر تصميم وبرمجة الويب", level: "السنة الثانية", type: "core" },
        { name: "البرمجة المتقدمة بلغة الجافا", lab: "مختبر البرمجة المتقدمة", level: "السنة الثانية", type: "core" },
        { name: "البرمجة المرئية لتطبيقات الأجهزة النقالة", lab: "مختبر الأجهزة النقالة", level: "السنة الثالثة", type: "core" },
        { name: "نظم قواعد البيانات", lab: "مختبر نظم قواعد البيانات", level: "السنة الثانية", type: "core" },
        { name: "الرياضيات لطلبة تكنولوجيا المعلومات", lab: "متطلب كلية", level: "السنة الأولى", type: "core" },
        { name: "اللغة الإنجليزية لطلبة تكنولوجيا المعلومات", lab: "متطلب كلية", level: "السنة الأولى", type: "core" }
      ]
    },
    {
      id: "cat-se",
      category: "مواد تخصص هندسة البرمجيات (Software Engineering)",
      color: "#c85a17",
      icon: "fa-solid fa-code",
      driveUrl: "https://drive.google.com/drive/folders/1Ubg0UxnqFhuF7y67InICurg3DFkU7Kmv?usp=drive_link",
      courses: [
        { name: "هندسة متطلبات نظم البرمجيات", lab: "متطلب إجباري", level: "السنة الثانية", type: "major" },
        { name: "عمليات ونمذجة تطوير البرمجيات", lab: "متطلب إجباري", level: "السنة الثانية", type: "major" },
        { name: "إدارة مشاريع البرمجيات", lab: "متطلب إجباري", level: "السنة الثالثة", type: "major" },
        { name: "الاختبار والتحقق من البرمجيات", lab: "متطلب إجباري", level: "السنة الثالثة", type: "major" },
        { name: "أدوات هندسة البرمجيات", lab: "متطلب إجباري", level: "السنة الثالثة", type: "major" },
        { name: "صيانة وتطور البرمجيات", lab: "متطلب إجباري", level: "السنة الثالثة", type: "major" },
        { name: "توثيق البرمجيات", lab: "متطلب إجباري", level: "السنة الثالثة", type: "major" },
        { name: "تحليل وتصميم النظم", lab: "متطلب إجباري", level: "السنة الثالثة", type: "major" },
        { name: "معمارية البرمجيات", lab: "متطلب إجباري", level: "السنة الرابعة", type: "major" },
        { name: "تصميم وتجربة واجهة المستخدم (UI/UX)", lab: "متطلب إجباري", level: "السنة الرابعة", type: "major" },
        { name: "أساسيات البرمجيات للأمن والخصوصية", lab: "متطلب إجباري", level: "السنة الثالثة", type: "major" }
      ]
    },
    {
      id: "cat-cs",
      category: "مواد تخصص علم الحاسوب (Computer Science)",
      color: "#1e3a8a",
      icon: "fa-solid fa-laptop-code",
      driveUrl: "https://drive.google.com/drive/folders/1Ubg0UxnqFhuF7y67InICurg3DFkU7Kmv?usp=drive_link",
      courses: [
        { name: "تحليل وتصميم الخوارزميات", lab: "متطلب إجباري", level: "السنة الثانية", type: "major" },
        { name: "الذكاء الاصطناعي وتعلم الآلة", lab: "متطلب إجباري", level: "السنة الثالثة", type: "major" },
        { name: "تحليل البيانات الضخمة", lab: "متطلب إجباري", level: "السنة الرابعة", type: "major" },
        { name: "تطوير تطبيقات خوادم الويب", lab: "مختبر التطوير", level: "السنة الثالثة", type: "major" },
        { name: "تنظيم وتصميم الحاسوب", lab: "متطلب إجباري", level: "السنة الثانية", type: "major" },
        { name: "نظم التشغيل (Operating Systems)", lab: "متطلب إجباري", level: "السنة الثالثة", type: "major" },
        { name: "شبكات الحاسوب", lab: "متطلب إجباري", level: "السنة الثالثة", type: "major" },
        { name: "أمن المعلومات والخصوصية", lab: "متطلب إجباري", level: "السنة الثالثة", type: "major" },
        { name: "الحوسبة السحابية والأنظمة الموزعة", lab: "متطلب إجباري", level: "السنة الرابعة", type: "major" },
        { name: "نظرية الحوسبة", lab: "متطلب إجباري", level: "السنة الثالثة", type: "major" }
      ]
    },
    {
      id: "cat-cg",
      category: "مواد تخصص الرسم الحاسوبي (Computer Graphics)",
      color: "#d97706",
      icon: "fa-solid fa-palette",
      driveUrl: "https://drive.google.com/drive/folders/1Ubg0UxnqFhuF7y67InICurg3DFkU7Kmv?usp=drive_link",
      courses: [
        { name: "الرياضيات للرسم الحاسوبي", lab: "متطلب إجباري", level: "السنة الأولى", type: "major" },
        { name: "مبادئ الفنون للرسوم المتحركة", lab: "متطلب إجباري", level: "السنة الأولى", type: "major" },
        { name: "تحرير الصور الرقمية", lab: "متطلب إجباري", level: "السنة الأولى", type: "major" },
        { name: "مقدمة في الرسم الحاسوبي", lab: "مختبر الرسم الحاسوبي", level: "السنة الثانية", type: "major" },
        { name: "رسومات الحاسوب التفاعلية", lab: "متطلب إجباري", level: "السنة الثانية", type: "major" },
        { name: "تقنيات الرسوم المتحركة ثنائية الأبعاد", lab: "مختبر الرسوم ثنائية الأبعاد", level: "السنة الثانية", type: "major" },
        { name: "النمذجة والتصميم ثلاثي الأبعاد (3D)", lab: "مختبر النمذجة ثلاثية الأبعاد", level: "السنة الثالثة", type: "major" },
        { name: "أساسيات القصة المصورة والرسوم المتحركة", lab: "متطلب إجباري", level: "السنة الثالثة", type: "major" },
        { name: "مقدمة لتطوير الألعاب وتصميم ألعاب الفيديو", lab: "مختبر ألعاب الفيديو", level: "السنة الثالثة", type: "major" },
        { name: "برمجة ألعاب الفيديو", lab: "متطلب إجباري", level: "السنة الرابعة", type: "major" },
        { name: "تصميم شخصيات ثلاثية الأبعاد وتركيبها", lab: "مختبر تصميم الشخصيات", level: "السنة الرابعة", type: "major" },
        { name: "تصميم وإنتاج الأفلام الرقمية", lab: "مختبر الأفلام الرقمية", level: "السنة الرابعة", type: "major" }
      ]
    },
    {
      id: "cat-cis",
      category: "مواد تخصص نظم المعلومات الحاسوبية (CIS)",
      color: "#0284c7",
      icon: "fa-solid fa-database",
      driveUrl: "https://drive.google.com/drive/folders/1Ubg0UxnqFhuF7y67InICurg3DFkU7Kmv?usp=drive_link",
      courses: [
        { name: "استرجاع المعلومات ومحركات البحث", lab: "متطلب إجباري", level: "السنة الثانية", type: "major" },
        { name: "الذكاء الاصطناعي وتعلم الآلة", lab: "متطلب إجباري", level: "السنة الثالثة", type: "major" },
        { name: "تصوير البيانات", lab: "متطلب إجباري", level: "السنة الثالثة", type: "major" },
        { name: "مستودعات وتنقيب البيانات", lab: "متطلب إجباري", level: "السنة الرابعة", type: "major" },
        { name: "تطوير تطبيقات خوادم الويب", lab: "مختبر تطبيقات الويب", level: "السنة الثالثة", type: "major" },
        { name: "أنظمة تخطيط موارد المؤسسات (ERP)", lab: "متطلب إجباري", level: "السنة الرابعة", type: "major" },
        { name: "أمن ومعلومات الخصوصية", lab: "متطلب إجباري", level: "السنة الثالثة", type: "major" },
        { name: "إدارة المشاريع", lab: "متطلب إجباري", level: "السنة الثانية", type: "major" }
      ]
    }
  ],

  // ثانياً: خطة جيل 2006 فما قبل (الخطة السابقة المستخرجة من المخططات الشجرية الرسمية)
  courseCatalog2006: [
    {
      id: "cat-core-2006",
      category: "متطلبات كلية وجامعة إجبارية (خطة 2006 فما قبل)",
      color: "#215a36",
      icon: "fa-solid fa-layer-group",
      driveUrl: "https://drive.google.com/drive/folders/1Ubg0UxnqFhuF7y67InICurg3DFkU7Kmv?usp=drive_link",
      courses: [
        { name: "مهارات حاسوب 1", lab: "متطلب إجباري", level: "السنة الأولى", type: "core" },
        { name: "مهارات حاسوب 2", lab: "مختبر مهارات حاسوب 2", level: "السنة الأولى", type: "core" },
        { name: "مقدمة إلى برمجة الحاسوب", lab: "متطلب إجباري", level: "السنة الأولى", type: "core" },
        { name: "التفاضل والتكامل 1", lab: "متطلب إجباري", level: "السنة الأولى", type: "core" },
        { name: "التفاضل والتكامل 2", lab: "متطلب إجباري", level: "السنة الأولى", type: "core" },
        { name: "البرمجة الموجهة للكائنات", lab: "مختبر البرمجة الموجهة للكائنات", level: "السنة الثانية", type: "core" },
        { name: "هياكل البيانات", lab: "مختبر هياكل البيانات", level: "السنة الثانية", type: "core" },
        { name: "نماذج وقواعد البيانات", lab: "مختبر قواعد البيانات", level: "السنة الثانية", type: "core" },
        { name: "البرمجة بلغة جافا", lab: "مختبر البرمجة بلغة جافا", level: "السنة الثانية", type: "core" },
        { name: "المنطق الرقمي", lab: "مختبر المنطق الرقمي", level: "السنة الأولى", type: "core" },
        { name: "الإحصاء والاحتمالات", lab: "متطلب إجباري", level: "السنة الثانية", type: "core" },
        { name: "مبادئ التحليل العددي", lab: "متطلب إجباري", level: "السنة الثانية", type: "core" },
        { name: "الهياكل والرياضيات المتقطعة", lab: "متطلب إجباري", level: "السنة الأولى", type: "core" },
        { name: "البرمجة المرئية", lab: "مختبر البرمجة المرئية", level: "السنة الثالثة", type: "core" }
      ]
    },
    {
      id: "cat-se-2006",
      category: "مواد تخصص هندسة البرمجيات (خطة 2006 فما قبل)",
      color: "#c85a17",
      icon: "fa-solid fa-code",
      driveUrl: "https://drive.google.com/drive/folders/1Ubg0UxnqFhuF7y67InICurg3DFkU7Kmv?usp=drive_link",
      courses: [
        { name: "مبادئ هندسة البرمجيات", lab: "متطلب تخصص إجباري", level: "السنة الثانية", type: "major" },
        { name: "هندسة ووصف متطلبات البرمجيات", lab: "متطلب تخصص إجباري", level: "السنة الثانية", type: "major" },
        { name: "تخطيط وإدارة مشاريع البرمجيات", lab: "متطلب تخصص إجباري", level: "السنة الثالثة", type: "major" },
        { name: "أدوات بناء البرمجيات", lab: "متطلب تخصص إجباري", level: "السنة الثالثة", type: "major" },
        { name: "اختبار والتحقق من البرمجيات", lab: "متطلب تخصص إجباري", level: "السنة الثالثة", type: "major" },
        { name: "صيانة وتطور البرمجيات", lab: "متطلب تخصص إجباري", level: "السنة الثالثة", type: "major" },
        { name: "تطوير مكونات البرمجيات", lab: "متطلب تخصص إجباري", level: "السنة الرابعة", type: "major" },
        { name: "هندسة البرمجيات الشيئية", lab: "متطلب تخصص إجباري", level: "السنة الثالثة", type: "major" },
        { name: "التحقق والاستدلال في هندسة البرمجيات", lab: "متطلب تخصص اختياري", level: "السنة الرابعة", type: "elective" },
        { name: "تطوير أنظمة مصادر الشركات (ERP)", lab: "متطلب تخصص اختياري", level: "السنة الرابعة", type: "elective" },
        { name: "تحليل وتصميم الخوارزميات", lab: "متطلب تخصص إجباري", level: "السنة الثانية", type: "major" },
        { name: "مبادئ نظم التشغيل", lab: "متطلب تخصص إجباري", level: "السنة الثالثة", type: "major" },
        { name: "الذكاء الاصطناعي وتطبيقاته", lab: "متطلب تخصص اختياري", level: "السنة الرابعة", type: "elective" },
        { name: "تصميم وتنظيم الحاسوب", lab: "متطلب تخصص إجباري", level: "السنة الثانية", type: "major" },
        { name: "مبادئ شبكات الحاسوب", lab: "متطلب تخصص إجباري", level: "السنة الثالثة", type: "major" },
        { name: "البرمجة المرئية للأجهزة الذكية", lab: "مختبر البرمجة للأجهزة الذكية", level: "السنة الثالثة", type: "major" },
        { name: "تصميم وتنفيذ واجهة المستخدم (UI/UX)", lab: "متطلب تخصص إجباري", level: "السنة الثالثة", type: "major" },
        { name: "هندسة الأجهزة النقالة", lab: "متطلب تخصص اختياري", level: "السنة الرابعة", type: "elective" },
        { name: "تطبيقات وخدمات الويب", lab: "متطلب تخصص إجباري", level: "السنة الثالثة", type: "major" },
        { name: "تفاعل الحاسوب والإنسان (HCI)", lab: "متطلب تخصص إجباري", level: "السنة الثالثة", type: "major" },
        { name: "تكنولوجيا محركات البحث", lab: "متطلب تخصص اختياري", level: "السنة الرابعة", type: "elective" },
        { name: "مواضيع خاصة في هندسة البرمجيات", lab: "بعد قطع 90 ساعة", level: "السنة الرابعة", type: "major" },
        { name: "مشروع التخرج في هندسة البرمجيات", lab: "بعد قطع 90 ساعة", level: "السنة الرابعة", type: "major" },
        { name: "التدريب الميداني في هندسة البرمجيات", lab: "بعد قطع 90 ساعة", level: "السنة الرابعة", type: "major" }
      ]
    },
    {
      id: "cat-cs-2006",
      category: "مواد تخصص علم الحاسوب (خطة 2006 فما قبل)",
      color: "#1e3a8a",
      icon: "fa-solid fa-laptop-code",
      driveUrl: "https://drive.google.com/drive/folders/1Ubg0UxnqFhuF7y67InICurg3DFkU7Kmv?usp=drive_link",
      courses: [
        { name: "تصميم وتحليل الخوارزميات", lab: "متطلب تخصص إجباري", level: "السنة الثانية", type: "major" },
        { name: "هياكل البيانات المتقدمة", lab: "متطلب تخصص اختياري", level: "السنة الثالثة", type: "elective" },
        { name: "معمارية الحاسوب", lab: "متطلب تخصص إجباري", level: "السنة الثانية", type: "major" },
        { name: "تصميم وتنظيم المعالجة المدمجة", lab: "متطلب تخصص اختياري", level: "السنة الرابعة", type: "elective" },
        { name: "مبادئ شبكات الحاسوب", lab: "متطلب تخصص إجباري", level: "السنة الثالثة", type: "major" },
        { name: "شبكات الحاسوب اللاسلكية", lab: "متطلب تخصص إجباري", level: "السنة الثالثة", type: "major" },
        { name: "أمن الحاسوب والبيانات", lab: "متطلب تخصص إجباري", level: "السنة الرابعة", type: "major" },
        { name: "مبادئ نظم التشغيل", lab: "متطلب تخصص إجباري", level: "السنة الثالثة", type: "major" },
        { name: "البرمجيات والأنظمة الموزعة", lab: "متطلب تخصص اختياري", level: "السنة الرابعة", type: "elective" },
        { name: "الحوسبة السحابية", lab: "متطلب تخصص اختياري", level: "السنة الرابعة", type: "elective" },
        { name: "الذكاء الاصطناعي", lab: "متطلب تخصص إجباري", level: "السنة الثالثة", type: "major" },
        { name: "معالجة اللغات الطبيعية (NLP)", lab: "متطلب تخصص اختياري", level: "السنة الرابعة", type: "elective" },
        { name: "النظرية الاحتسابية واللغات", lab: "متطلب تخصص إجباري", level: "السنة الثالثة", type: "major" },
        { name: "تصميم وبناء المترجمات", lab: "متطلب تخصص إجباري", level: "السنة الرابعة", type: "major" },
        { name: "قواعد البيانات 2", lab: "متطلب تخصص اختياري", level: "السنة الثالثة", type: "elective" },
        { name: "برمجة تطبيقات الإنترنت", lab: "مختبر تطبيقات الإنترنت", level: "السنة الثالثة", type: "major" },
        { name: "تنقيب واسترجاع المعلومات ومحركات البحث", lab: "متطلب تخصص إجباري", level: "السنة الثالثة", type: "major" },
        { name: "تحليل وتصميم نظم", lab: "متطلب تخصص إجباري", level: "السنة الثالثة", type: "major" },
        { name: "هندسة البرمجيات الحديثة", lab: "متطلب تخصص إجباري", level: "السنة الرابعة", type: "major" },
        { name: "الوسائط المتعددة", lab: "متطلب تخصص اختياري", level: "السنة الثالثة", type: "elective" },
        { name: "الرسم الحاسوبي", lab: "متطلب تخصص اختياري", level: "السنة الثالثة", type: "elective" },
        { name: "معالجة الصور والرؤيا الرقمية", lab: "متطلب تخصص اختياري", level: "السنة الرابعة", type: "elective" },
        { name: "مواضيع خاصة في علم الحاسوب", lab: "بعد قطع 90 ساعة", level: "السنة الرابعة", type: "major" },
        { name: "مشروع التخرج في علم الحاسوب", lab: "بعد قطع 90 ساعة", level: "السنة الرابعة", type: "major" },
        { name: "التدريب الميداني في علم الحاسوب", lab: "بعد قطع 90 ساعة", level: "السنة الرابعة", type: "major" }
      ]
    },
    {
      id: "cat-cg-2006",
      category: "مواد تخصص الرسم الحاسوبي (خطة 2006 فما قبل)",
      color: "#d97706",
      icon: "fa-solid fa-palette",
      driveUrl: "https://drive.google.com/drive/folders/1Ubg0UxnqFhuF7y67InICurg3DFkU7Kmv?usp=drive_link",
      courses: [
        { name: "مبادئ فنون جميلة", lab: "متطلب تخصص إجباري", level: "السنة الأولى", type: "major" },
        { name: "تطبيقات الحاسوب في الفنون", lab: "متطلب تخصص إجباري", level: "السنة الأولى", type: "major" },
        { name: "رياضيات الرسم الحاسوبي", lab: "متطلب تخصص إجباري", level: "السنة الثانية", type: "major" },
        { name: "مبادئ الرسم الحاسوبي", lab: "مختبر الرسم الحاسوبي", level: "السنة الثانية", type: "major" },
        { name: "الرسم الحاسوبي المتقدم", lab: "متطلب تخصص اختياري", level: "السنة الثالثة", type: "elective" },
        { name: "معالجة الصور والرؤيا الرقمية", lab: "متطلب تخصص إجباري", level: "السنة الثالثة", type: "major" },
        { name: "تصميم وتحليل الخوارزميات", lab: "متطلب تخصص إجباري", level: "السنة الثانية", type: "major" },
        { name: "برمجة تطبيقات الإنترنت", lab: "متطلب تخصص إجباري", level: "السنة الثالثة", type: "major" },
        { name: "برمجة الألعاب", lab: "متطلب تخصص إجباري", level: "السنة الثالثة", type: "major" },
        { name: "تصميم الألعاب", lab: "متطلب تخصص اختياري", level: "السنة الرابعة", type: "elective" },
        { name: "الذكاء الاصطناعي والألعاب", lab: "متطلب تخصص إجباري", level: "السنة الرابعة", type: "major" },
        { name: "تفاعل الإنسان والحاسوب (HCI)", lab: "متطلب تخصص إجباري", level: "السنة الثالثة", type: "major" },
        { name: "طرق التلوين", lab: "متطلب تخصص إجباري", level: "السنة الثانية", type: "major" },
        { name: "الرسوم التفاعلية", lab: "متطلب تخصص إجباري", level: "السنة الثالثة", type: "major" },
        { name: "الوسائط المتعددة", lab: "متطلب تخصص إجباري", level: "السنة الثالثة", type: "major" },
        { name: "الحوسبة الصورية / الرسم الحاسوبي", lab: "متطلب تخصص إجباري", level: "السنة الثالثة", type: "major" },
        { name: "الرسوم المتحركة ثنائية الأبعاد (2D)", lab: "مختبر الرسوم ثنائية الأبعاد", level: "السنة الثانية", type: "major" },
        { name: "تصميم النماذج ثلاثية الأبعاد (3D)", lab: "مختبر النماذج ثلاثية الأبعاد", level: "السنة الثالثة", type: "major" },
        { name: "تحريك النماذج ثلاثية الأبعاد", lab: "متطلب تخصص إجباري", level: "السنة الثالثة", type: "major" },
        { name: "تصميم الإضاءة المصورة", lab: "متطلب تخصص إجباري", level: "السنة الرابعة", type: "major" },
        { name: "تصميم الشخصيات ثلاثية الأبعاد", lab: "متطلب تخصص إجباري", level: "السنة الرابعة", type: "major" },
        { name: "تحريك الشخصيات ثلاثية الأبعاد", lab: "متطلب تخصص إجباري", level: "السنة الرابعة", type: "major" },
        { name: "تصميم الأفلام الرقمية", lab: "متطلب تخصص إجباري", level: "السنة الرابعة", type: "major" },
        { name: "تصميم القصة المصورة", lab: "متطلب تخصص إجباري", level: "السنة الثالثة", type: "major" },
        { name: "مواضيع خاصة في الرسم الحاسوبي", lab: "بعد قطع 90 ساعة", level: "السنة الرابعة", type: "major" },
        { name: "مشروع التخرج 1", lab: "بعد قطع 90 ساعة", level: "السنة الرابعة", type: "major" },
        { name: "مشروع التخرج 2", lab: "بعد إتمام مشروع التخرج 1", level: "السنة الرابعة", type: "major" },
        { name: "التدريب الميداني في الرسم الحاسوبي", lab: "بعد قطع 90 ساعة", level: "السنة الرابعة", type: "major" }
      ]
    },
    {
      id: "cat-cis-2006",
      category: "مواد تخصص نظم المعلومات الحاسوبية (خطة 2006 فما قبل)",
      color: "#0284c7",
      icon: "fa-solid fa-database",
      driveUrl: "https://drive.google.com/drive/folders/1Ubg0UxnqFhuF7y67InICurg3DFkU7Kmv?usp=drive_link",
      courses: [
        { name: "نظم التشغيل", lab: "متطلب تخصص إجباري", level: "السنة الثانية", type: "major" },
        { name: "الحوسبة فائقة الأداء", lab: "متطلب تخصص اختياري", level: "السنة الرابعة", type: "elective" },
        { name: "مبادئ شبكات الحاسوب", lab: "متطلب تخصص إجباري", level: "السنة الثانية", type: "major" },
        { name: "إدارة شبكات الحاسوب", lab: "متطلب تخصص اختياري", level: "السنة الثالثة", type: "elective" },
        { name: "تراسل الشبكات اللاسلكية", lab: "متطلب تخصص اختياري", level: "السنة الرابعة", type: "elective" },
        { name: "أمن المعلومات", lab: "متطلب تخصص إجباري", level: "السنة الثالثة", type: "major" },
        { name: "نظرية الخوارزميات", lab: "متطلب تخصص إجباري", level: "السنة الثانية", type: "major" },
        { name: "هياكل البيانات 2", lab: "متطلب تخصص اختياري", level: "السنة الثالثة", type: "elective" },
        { name: "إدارة قواعد البيانات", lab: "مختبر إدارة قواعد البيانات", level: "السنة الثالثة", type: "major" },
        { name: "نظم استرجاع البيانات", lab: "متطلب تخصص إجباري", level: "السنة الثالثة", type: "major" },
        { name: "أنظمة استرجاع الوسائط المتعددة", lab: "متطلب تخصص اختياري", level: "السنة الرابعة", type: "elective" },
        { name: "تحليل وتصميم نظم", lab: "متطلب تخصص إجباري", level: "السنة الثالثة", type: "major" },
        { name: "هندسة البرمجيات الحديثة", lab: "متطلب تخصص إجباري", level: "السنة الرابعة", type: "major" },
        { name: "تطبيقات وخدمات الويب", lab: "مختبر تطبيقات وخدمات الويب", level: "السنة الثالثة", type: "major" },
        { name: "نظم تطبيقات الأجهزة المتنقلة", lab: "متطلب تخصص إجباري", level: "السنة الثالثة", type: "major" },
        { name: "أنظمة التجارة الإلكترونية", lab: "متطلب تخصص إجباري", level: "السنة الثالثة", type: "major" },
        { name: "أنظمة المعلومات الجغرافية (GIS)", lab: "متطلب تخصص إجباري", level: "السنة الرابعة", type: "major" },
        { name: "التنقيب عن البيانات", lab: "مختبر التنقيب عن البيانات", level: "السنة الرابعة", type: "major" },
        { name: "مستودعات البيانات", lab: "متطلب تخصص إجباري", level: "السنة الرابعة", type: "major" },
        { name: "الذكاء الاصطناعي ومعالجة البيانات الضخمة", lab: "متطلب تخصص اختياري", level: "السنة الرابعة", type: "elective" },
        { name: "تصنيف وتصميم الأنماط", lab: "متطلب تخصص اختياري", level: "السنة الرابعة", type: "elective" },
        { name: "مواضيع خاصة في نظم المعلومات الحاسوبية", lab: "بعد قطع 90 ساعة", level: "السنة الرابعة", type: "major" },
        { name: "مشروع التخرج في نظم المعلومات الحاسوبية", lab: "بعد قطع 90 ساعة", level: "السنة الرابعة", type: "major" },
        { name: "التدريب الميداني في نظم المعلومات الحاسوبية", lab: "بعد قطع 90 ساعة", level: "السنة الرابعة", type: "major" }
      ]
    }
  ],

  // توافقية برمجية تلقائية
  get courseCatalog() {
    return this.courseCatalog2007;
  },

  // 4. مكتبة ملفات ومواد درايف الكلية المفرغة بالكامل برعاية Source Team (1,426+ ملف دراسي)
  globalDriveUrl: "https://drive.google.com/drive/folders/1Ubg0UxnqFhuF7y67InICurg3DFkU7Kmv?usp=drive_link",

  courseMaterials: [
    {
        "id": "mat-1",
        "rawName": "الذكاء الاصطناعي Artificial intelligence",
        "title": "الذكاء الاصطناعي",
        "titleEn": "Artificial Intelligence",
        "category": "compulsory",
        "matchedNames": [
            "الذكاء الاصطناعي",
            "الذكاء الاصطناعي وتعلم الآلة",
            "الذكاء الاصطناعي وتطبيقاته"
        ],
        "totalFiles": 70,
        "resourceTags": [
            "سلايدات الشرح",
            "أسئلة سنوات وامتحانات",
            "تلاخيص وملخصات",
            "الكتاب المعتمد"
        ],
        "driveUrl": "https://drive.google.com/drive/folders/1Ubg0UxnqFhuF7y67InICurg3DFkU7Kmv?usp=drive_link",
        "breakdown": [
            {
                "folder": "اسئلة",
                "count": 20,
                "sample": [
                    "IMG-20210614-WA0142.jpg",
                    "IMG-20210614-WA0156.jpg",
                    "IMG-20210614-WA0144.jpg"
                ]
            },
            {
                "folder": "سلايدات",
                "count": 21,
                "sample": [
                    "Example on confusion matrix.pdf",
                    "ML with Python_part1.pdf",
                    "NN (part2).pdf"
                ]
            },
            {
                "folder": "كتاب الذكاء الإصطناعي",
                "count": 2,
                "sample": [
                    "Artificial Intelligene - MICHAEL NEGNEVITSKY.pdf",
                    "AI Textbook.pdf"
                ]
            },
            {
                "folder": "ملخص الذكاء الاصطناعي",
                "count": 27,
                "sample": [
                    "IMG_5168.PNG",
                    "IMG_5168.PNG",
                    "IMG_5174.PNG"
                ]
            }
        ]
    },
    {
        "id": "mat-2",
        "rawName": "النظريه الإحتسابيه والأتمته Theory of Computation and Automata",
        "title": "النظرية الاحتسابية والأتمتة",
        "titleEn": "Theory of Computation and Automata",
        "category": "compulsory",
        "matchedNames": [
            "النظرية الاحتسابية واللغات",
            "نظرية الحوسبة",
            "النظرية الاحتسابية والأتمتة"
        ],
        "totalFiles": 30,
        "resourceTags": [
            "سلايدات الشرح",
            "أسئلة سنوات وامتحانات",
            "تلاخيص وملخصات",
            "الكتاب المعتمد",
            "واجبات وتطبيقات عملية"
        ],
        "driveUrl": "https://drive.google.com/drive/folders/1Ubg0UxnqFhuF7y67InICurg3DFkU7Kmv?usp=drive_link",
        "breakdown": [
            {
                "folder": "أسئلة أتمتة",
                "count": 18,
                "sample": [
                    "WhatsApp Image 2021-09-04 at 10.58.45 PM (2).jpeg",
                    "WhatsApp Image 2021-09-04 at 10.58.45 PM (1).jpeg",
                    "WhatsApp Image 2021-09-04 at 10.58.47 PM (1).jpeg"
                ]
            },
            {
                "folder": "تلخيص الطالبة رغد تايه",
                "count": 1,
                "sample": [
                    "أتمتة مادة الميد.. رغد تايه.pdf"
                ]
            },
            {
                "folder": "سلايدات أتمتة",
                "count": 1,
                "sample": [
                    "Mathematical_Preliminaries.pdf"
                ]
            },
            {
                "folder": "سلسباس اتمته",
                "count": 1,
                "sample": [
                    "Course-outline-ComputationTheory 2 2018 2019.pdf"
                ]
            },
            {
                "folder": "كتاب النظرية الإحتسابية والأتمتة",
                "count": 1,
                "sample": [
                    "Theory of Computation and Automata.pdf"
                ]
            },
            {
                "folder": "ملخص أتمتة",
                "count": 3,
                "sample": [
                    "‎⁨اتمتة⁩.pdf",
                    "النظرية الإحتسابية و الأتمتة.pdf",
                    "Automata.pdf"
                ]
            },
            {
                "folder": "واجبات",
                "count": 5,
                "sample": [
                    "hW#2-regular expressions.pdf",
                    "hw1.pdf",
                    "_assignment -2-b - DFA-Design-2nd-2021-2022 .pdf"
                ]
            }
        ]
    },
    {
        "id": "mat-3",
        "rawName": "امن الحاسوب والشبكات Computer and network security",
        "title": "أمن الحاسوب والشبكات",
        "titleEn": "Computer & Network Security",
        "category": "compulsory",
        "matchedNames": [
            "أمن الحاسوب والبيانات",
            "أمن المعلومات",
            "أمن ومعلومات الخصوصية",
            "أمن المعلومات والخصوصية",
            "أساسيات البرمجيات للأمن والخصوصية"
        ],
        "totalFiles": 13,
        "resourceTags": [
            "سلايدات الشرح",
            "أسئلة سنوات وامتحانات",
            "الكتاب المعتمد",
            "واجبات وتطبيقات عملية"
        ],
        "driveUrl": "https://drive.google.com/drive/folders/1Ubg0UxnqFhuF7y67InICurg3DFkU7Kmv?usp=drive_link",
        "breakdown": [
            {
                "folder": "سلايدات امن الشبكات_",
                "count": 10,
                "sample": [
                    "paging.pdf",
                    "segmentation.pdf",
                    "Chapter1 Introduction to computer security.pdf"
                ]
            },
            {
                "folder": "كتاب امن شبكات",
                "count": 2,
                "sample": [
                    "كتاب امن شبكات.pdf",
                    "security-in-computing-5-e.pdf"
                ]
            },
            {
                "folder": "واجب",
                "count": 1,
                "sample": [
                    "Assignment1.docx"
                ]
            }
        ]
    },
    {
        "id": "mat-4",
        "rawName": "تحليل وتصميم النظم System design and analysis",
        "title": "تحليل وتصميم النظم",
        "titleEn": "System Design and Analysis",
        "category": "compulsory",
        "matchedNames": [
            "تحليل وتصميم نظم",
            "تحليل وتصميم النظم"
        ],
        "totalFiles": 187,
        "resourceTags": [
            "سلايدات الشرح",
            "أسئلة سنوات وامتحانات",
            "تلاخيص وملخصات",
            "الكتاب المعتمد"
        ],
        "driveUrl": "https://drive.google.com/drive/folders/1Ubg0UxnqFhuF7y67InICurg3DFkU7Kmv?usp=drive_link",
        "breakdown": [
            {
                "folder": "أسئله سنوات تحليل وتصميم النظم",
                "count": 124,
                "sample": [
                    "أسئلة.pdf",
                    "15873047_722448774590910_3535143009245691716_n.jpg",
                    "FB_IMG_1520613960509.jpg"
                ]
            },
            {
                "folder": "سلايدات تحليل وتصميم النظم",
                "count": 10,
                "sample": [
                    "esad4e_ch10.ppt",
                    "esad4e_ch09.ppt",
                    "esad4e_ch02.ppt"
                ]
            },
            {
                "folder": "كتاب تحليل وتصميم نظم",
                "count": 1,
                "sample": [
                    "Book.pdf"
                ]
            },
            {
                "folder": "ملخص تحليل وتصميم النظم",
                "count": 10,
                "sample": [
                    "4.jpg",
                    "3.jpg",
                    "7.jpg"
                ]
            },
            {
                "folder": "مو عارفة_",
                "count": 42,
                "sample": [
                    "received_182242909070122.jpeg",
                    "received_182243155736764.jpeg",
                    "received_182243119070101.jpeg"
                ]
            }
        ]
    },
    {
        "id": "mat-5",
        "rawName": "تصميم المترجمات ولغات البرمجة Design compilers and programming languages",
        "title": "تصميم المترجمات ولغات البرمجة",
        "titleEn": "Design Compilers & Programming Languages",
        "category": "compulsory",
        "matchedNames": [
            "تصميم وبناء المترجمات"
        ],
        "totalFiles": 457,
        "resourceTags": [
            "سلايدات الشرح",
            "أسئلة سنوات وامتحانات",
            "تلاخيص وملخصات",
            "الكتاب المعتمد"
        ],
        "driveUrl": "https://drive.google.com/drive/folders/1Ubg0UxnqFhuF7y67InICurg3DFkU7Kmv?usp=drive_link",
        "breakdown": [
            {
                "folder": "Assiment",
                "count": 9,
                "sample": [
                    "Assignment [1] compiler 2019-2020.pdf",
                    "countWord.java",
                    "input.text"
                ]
            },
            {
                "folder": "اسئلة سنوات",
                "count": 3,
                "sample": [
                    "FB_IMG_1572945850801.jpg",
                    "FB_IMG_1572945860646.jpg",
                    "FB_IMG_1572945853765.jpg"
                ]
            },
            {
                "folder": "برمجية jflex",
                "count": 420,
                "sample": [
                    "_ex_with_buffer.flex",
                    "_example_2_id_counter.flex",
                    "____removecomment .flex"
                ]
            },
            {
                "folder": "دفتر كومبايلر",
                "count": 1,
                "sample": [
                    "_lecture01 .pdf"
                ]
            },
            {
                "folder": "سلايدات كومبايلر",
                "count": 21,
                "sample": [
                    "_lecture01 b -DFA_minimize.pdf",
                    "_lecture02 Lexical_Analysis.pdf",
                    "1b.pdf"
                ]
            },
            {
                "folder": "سيليباس",
                "count": 1,
                "sample": [
                    "Syllabus.pdf"
                ]
            },
            {
                "folder": "كتاب كومبايلر",
                "count": 1,
                "sample": [
                    "Compilers.pdf"
                ]
            },
            {
                "folder": "ملخص كومبايلر",
                "count": 1,
                "sample": [
                    "_lecture01 .pdf"
                ]
            }
        ]
    },
    {
        "id": "mat-6",
        "rawName": "تصميم وتنظيم الأنظمة المدمجة  Embedded Systems Design and Organization_",
        "title": "تصميم وتنظيم الأنظمة المدمجة",
        "titleEn": "Embedded Systems Design and Organization",
        "category": "compulsory",
        "matchedNames": [
            "تصميم وتنظيم المعالجة المدمجة",
            "تصميم وتنظيم الأنظمة المدمجة",
            "تنظيم وتصميم الحاسوب"
        ],
        "totalFiles": 56,
        "resourceTags": [
            "سلايدات الشرح",
            "أسئلة سنوات وامتحانات",
            "تلاخيص وملخصات",
            "الكتاب المعتمد"
        ],
        "driveUrl": "https://drive.google.com/drive/folders/1Ubg0UxnqFhuF7y67InICurg3DFkU7Kmv?usp=drive_link",
        "breakdown": [
            {
                "folder": "........._",
                "count": 12,
                "sample": [
                    "Resistor-color-code-chart.png",
                    "HW.png",
                    "Arduino.png"
                ]
            },
            {
                "folder": "أسئلة سنوات مدمجة (نهائي - الترم الأول 2020-2021)",
                "count": 22,
                "sample": [
                    "2022-06-22 (40).png",
                    "2022-06-22 (34).png",
                    "2022-06-22 (39).png"
                ]
            },
            {
                "folder": "تصميم وتنظيم الأنظمة المدمجة ، تلخيص الطالب حمزة ايهاب",
                "count": 8,
                "sample": [
                    "Circuit 4.pdf",
                    "Embedded Systems-Practice(1+2+3).pdf",
                    "LCD Display.pdf"
                ]
            },
            {
                "folder": "تصميم_وتنظيم_الانظمة_المدمجة_د_نجاد_تخطيطد.pdf",
                "count": 1,
                "sample": [
                    "تصميم_وتنظيم_الانظمة_المدمجة_د_نجاد_تخطيطد.pdf"
                ]
            },
            {
                "folder": "سلايدات د رائد مدمجة",
                "count": 11,
                "sample": [
                    "LCD Display.pdf",
                    "Embedded Systems-Practice(1+2+3).pdf",
                    "Circuit 5.pdf"
                ]
            },
            {
                "folder": "سيليباس",
                "count": 1,
                "sample": [
                    "Course Syllabus-Embedded Systems Design 30801348.pdf"
                ]
            },
            {
                "folder": "كتاب",
                "count": 1,
                "sample": [
                    "BOOK.pdf"
                ]
            }
        ]
    },
    {
        "id": "mat-7",
        "rawName": "شبكات الحاسوب اللاسلكيه wireless computer networks",
        "title": "شبكات الحاسوب اللاسلكية",
        "titleEn": "Wireless Computer Networks",
        "category": "compulsory",
        "matchedNames": [
            "شبكات الحاسوب اللاسلكية",
            "تراسل الشبكات اللاسلكية"
        ],
        "totalFiles": 95,
        "resourceTags": [
            "سلايدات الشرح",
            "أسئلة سنوات وامتحانات",
            "تلاخيص وملخصات",
            "الكتاب المعتمد"
        ],
        "driveUrl": "https://drive.google.com/drive/folders/1Ubg0UxnqFhuF7y67InICurg3DFkU7Kmv?usp=drive_link",
        "breakdown": [
            {
                "folder": "اسئلة سنوات لاسلكية",
                "count": 58,
                "sample": [
                    "photo_2022-04-27_17-17-50.jpg",
                    "photo_2022-04-27_17-18-06.jpg",
                    "photo_2022-04-27_17-17-56.jpg"
                ]
            },
            {
                "folder": "سلايدات شبكات الحاسوب اللاسلكية",
                "count": 30,
                "sample": [
                    "ch06 - 3.ppt",
                    "9.ppt",
                    "9 - 4.ppt"
                ]
            },
            {
                "folder": "شبكات الحاسوب اللاسلكية ، تلخيص الطالب حمزة ايهاب",
                "count": 4,
                "sample": [
                    "Chapter_1.pdf",
                    "Chapter_2.pdf",
                    "Chapter_4.pdf"
                ]
            },
            {
                "folder": "كتاب شبكات الحاسوب اللاسلكية",
                "count": 1,
                "sample": [
                    "Wireless Computer Networks.pdf"
                ]
            },
            {
                "folder": "ملخص شبكات الحاسوب اللاسلكية",
                "count": 2,
                "sample": [
                    "wireless_7-9_FINAL.pdf",
                    "wireless_1-6_MID.pdf"
                ]
            }
        ]
    },
    {
        "id": "mat-8",
        "rawName": "معماريه الحاسوب Computer Architecture",
        "title": "معمارية الحاسوب",
        "titleEn": "Computer Architecture",
        "category": "compulsory",
        "matchedNames": [
            "معمارية الحاسوب"
        ],
        "totalFiles": 110,
        "resourceTags": [
            "سلايدات الشرح",
            "أسئلة سنوات وامتحانات",
            "الكتاب المعتمد"
        ],
        "driveUrl": "https://drive.google.com/drive/folders/1Ubg0UxnqFhuF7y67InICurg3DFkU7Kmv?usp=drive_link",
        "breakdown": [
            {
                "folder": "abcd.docx",
                "count": 1,
                "sample": [
                    "abcd.docx"
                ]
            },
            {
                "folder": "أسئلة معمارية",
                "count": 71,
                "sample": [
                    "photo_2022-04-27_17-11-39.jpg",
                    "photo_2022-04-27_17-11-26.jpg",
                    "photo_2022-04-27_17-11-18.jpg"
                ]
            },
            {
                "folder": "اسئلة معمارية جديد للنشر",
                "count": 24,
                "sample": [
                    "416e86ef-a7d6-4b1d-b219-e8bccd8020e9.jpg",
                    "fbd86ca7-a40f-4b68-8752-dd0b1382e842.jpg",
                    "868095d0-fa5f-4fc6-87c6-48920c2b9cf4.jpg"
                ]
            },
            {
                "folder": "سلايدات",
                "count": 11,
                "sample": [
                    "~$CH03-COA9e.pptx",
                    "arcitecture chapter one.ppt",
                    "CH09-COA9e.pptx"
                ]
            },
            {
                "folder": "كتاب المعمارية",
                "count": 3,
                "sample": [
                    "9C5F94DA.tmp",
                    "computer organisation and architecture-8th ed by william stallings-1.pdf",
                    "Computer System Architecture-Morris Mano third edition ( PDFDrive.com ).pdf"
                ]
            }
        ]
    },
    {
        "id": "mat-9",
        "rawName": "هندسة برمجيات حديثه Modern software engineering",
        "title": "هندسة البرمجيات الحديثة",
        "titleEn": "Modern Software Engineering",
        "category": "compulsory",
        "matchedNames": [
            "هندسة البرمجيات الحديثة",
            "أساسيات هندسة البرمجيات",
            "مبادئ هندسة البرمجيات"
        ],
        "totalFiles": 90,
        "resourceTags": [
            "سلايدات الشرح",
            "أسئلة سنوات وامتحانات",
            "الكتاب المعتمد"
        ],
        "driveUrl": "https://drive.google.com/drive/folders/1Ubg0UxnqFhuF7y67InICurg3DFkU7Kmv?usp=drive_link",
        "breakdown": [
            {
                "folder": "Modern software engineering Book",
                "count": 1,
                "sample": [
                    "Sommerville-Software-Engineering-10ed.pdf"
                ]
            },
            {
                "folder": "Modern software engineering slides",
                "count": 26,
                "sample": [
                    "Ch19.pptx",
                    "Ch16.pptx",
                    "Ch20.pptx"
                ]
            },
            {
                "folder": "أسئلة هندسة برمجيات حديثة",
                "count": 50,
                "sample": [
                    "received_2820417684837969.jpeg",
                    "received_193945122309834.jpeg",
                    "received_1492113934322604.jpeg"
                ]
            },
            {
                "folder": "مباديء هندسة البرمجيات_",
                "count": 13,
                "sample": [
                    "ملاحظة مهمة.png",
                    "ملاحظة مهمة.png",
                    "SEP Chapter 5.pdf"
                ]
            }
        ]
    },
    {
        "id": "mat-10",
        "rawName": "الحوسبه السحابيه cloud in huawei",
        "title": "الحوسبة السحابية (Cloud in Huawei)",
        "titleEn": "Cloud Computing (Huawei HCIA)",
        "category": "elective",
        "matchedNames": [
            "الحوسبة السحابية",
            "الحوسبة السحابية والأنظمة الموزعة",
            "الحوسبة فائقة الأداء"
        ],
        "totalFiles": 95,
        "resourceTags": [
            "سلايدات الشرح",
            "أسئلة سنوات وامتحانات",
            "الكتاب المعتمد",
            "فيديوهات وشروحات"
        ],
        "driveUrl": "https://drive.google.com/drive/folders/1Ubg0UxnqFhuF7y67InICurg3DFkU7Kmv?usp=drive_link",
        "breakdown": [
            {
                "folder": "Cloud computing",
                "count": 21,
                "sample": [
                    "Chapter1 Exam Questions.pdf",
                    "Chapter3 Exam Questions.pdf",
                    "Chapter 2 Exam Questions.pdf"
                ]
            },
            {
                "folder": "Text book - Huawei Certification Cloud Computing Learning Guide",
                "count": 1,
                "sample": [
                    "Text book - Huawei Certification Cloud Computing Learning Guide.pdf"
                ]
            },
            {
                "folder": "video",
                "count": 13,
                "sample": [
                    "What is Virtualization 8.mp4",
                    "Virtualization Vs Cloud 10.mp4",
                    "[Arabic] What is Cloud Computing 1.mp4"
                ]
            },
            {
                "folder": "أسئله حوسبه سحابيه",
                "count": 16,
                "sample": [
                    "WhatsApp Image 2022-06-25 at 1.48.51 PM.jpeg",
                    "WhatsApp Image 2022-06-25 at 1.48.50 PM.jpeg",
                    "WhatsApp Image 2022-06-25 at 1.48.48 PM.jpeg"
                ]
            },
            {
                "folder": "سلايدات",
                "count": 3,
                "sample": [
                    "Huawei Certification Cloud Computing Learning Guide1.pdf",
                    "HCIA_Cloud_Computing_V4.0_Training_Material (1).pdf",
                    "Huawei Certification Cloud Computing Learning Guide.pdf"
                ]
            },
            {
                "folder": "صور",
                "count": 2,
                "sample": [
                    "EOH CLOUD INFOGRAPHIC 1vs2vs3.jpg",
                    "12.png"
                ]
            },
            {
                "folder": "مو عارفة",
                "count": 39,
                "sample": [
                    "3.jpg",
                    "10.jpg",
                    "Lecture24-Cloud Storage (7).pdf"
                ]
            }
        ]
    },
    {
        "id": "mat-11",
        "rawName": "الذكاء الاصطناعي المتقدم وتعلم الاله AL advanced_",
        "title": "الذكاء الاصطناعي المتقدم وتعلم الآلة",
        "titleEn": "Advanced AI & Machine Learning",
        "category": "elective",
        "matchedNames": [
            "الذكاء الاصطناعي المتقدم",
            "الذكاء الاصطناعي وتعلم الآلة"
        ],
        "totalFiles": 63,
        "resourceTags": [
            "أسئلة سنوات وامتحانات"
        ],
        "driveUrl": "https://drive.google.com/drive/folders/1Ubg0UxnqFhuF7y67InICurg3DFkU7Kmv?usp=drive_link",
        "breakdown": [
            {
                "folder": "أسئلة ذكاء اصطناعي متقدم",
                "count": 63,
                "sample": [
                    "WhatsApp Image 2021-08-14 at 2.48.14 PM (3).jpeg",
                    "WhatsApp Image 2021-08-14 at 2.48.09 PM.jpeg",
                    "WhatsApp Image 2021-08-14 at 2.48.10 PM (3).jpeg"
                ]
            }
        ]
    },
    {
        "id": "mat-12",
        "rawName": "الوسائط المتعدده Multimedia",
        "title": "الوسائط المتعددة",
        "titleEn": "Multimedia Systems",
        "category": "elective",
        "matchedNames": [
            "الوسائط المتعددة",
            "أنظمة استرجاع الوسائط المتعددة"
        ],
        "totalFiles": 12,
        "resourceTags": [
            "سلايدات الشرح",
            "أسئلة سنوات وامتحانات",
            "تلاخيص وملخصات",
            "الكتاب المعتمد"
        ],
        "driveUrl": "https://drive.google.com/drive/folders/1Ubg0UxnqFhuF7y67InICurg3DFkU7Kmv?usp=drive_link",
        "breakdown": [
            {
                "folder": "أسئلة سنوات multimedia",
                "count": 1,
                "sample": [
                    "multimedia (1) (1).pdf"
                ]
            },
            {
                "folder": "دفتر",
                "count": 3,
                "sample": [
                    "الثاني chapter4 ,6.pdf",
                    "الأول chapter1-2-3).pdf",
                    "الثالث chapter 6.pdf"
                ]
            },
            {
                "folder": "سلايدات multimedia",
                "count": 6,
                "sample": [
                    "Chapter 7.pdf",
                    "Chapter 4 Part 2.pdf",
                    "Chapter 4 Part 1.pdf"
                ]
            },
            {
                "folder": "كتاب multimedia_",
                "count": 2,
                "sample": [
                    "a 2nd book.pdf",
                    "Video Codec Design Developing Image And Video Compression Systems ( PDFDrive.com ).pdf"
                ]
            }
        ]
    },
    {
        "id": "mat-13",
        "rawName": "تصميم وإدارة قواعد البيانات ٢",
        "title": "تصميم وإدارة قواعد البيانات 2",
        "titleEn": "Database Design & Management 2",
        "category": "elective",
        "matchedNames": [
            "قواعد البيانات 2",
            "إدارة قواعد البيانات",
            "نماذج وقواعد البيانات",
            "نظم قواعد البيانات"
        ],
        "totalFiles": 32,
        "resourceTags": [
            "سلايدات الشرح",
            "أسئلة سنوات وامتحانات",
            "واجبات وتطبيقات عملية"
        ],
        "driveUrl": "https://drive.google.com/drive/folders/1Ubg0UxnqFhuF7y67InICurg3DFkU7Kmv?usp=drive_link",
        "breakdown": [
            {
                "folder": "HW",
                "count": 22,
                "sample": [
                    "3.jpg",
                    "1.jpg",
                    "7.34.jpg"
                ]
            },
            {
                "folder": "السلايدات",
                "count": 10,
                "sample": [
                    "Query processing .pdf",
                    "ch7.pdf",
                    "ch13 4.pdf"
                ]
            }
        ]
    },
    {
        "id": "mat-14",
        "rawName": "تعلم الاله Machine learning",
        "title": "تعلم الآلة",
        "titleEn": "Machine Learning",
        "category": "elective",
        "matchedNames": [
            "تعلم الآلة"
        ],
        "totalFiles": 26,
        "resourceTags": [
            "سلايدات الشرح"
        ],
        "driveUrl": "https://drive.google.com/drive/folders/1Ubg0UxnqFhuF7y67InICurg3DFkU7Kmv?usp=drive_link",
        "breakdown": [
            {
                "folder": "سلايدات",
                "count": 24,
                "sample": [
                    "k-fold.pdf",
                    "Gaussian Naive Bayes example.pdf",
                    "student_scores.csv"
                ]
            },
            {
                "folder": "مقاله",
                "count": 2,
                "sample": [
                    "Scikit-Learn Cheat Sheet_ Python Machine Learning (article) - DataCamp.html",
                    "Scikit-Learn Cheat Sheet_ Python Machine Learning (article) - DataCamp.docx"
                ]
            }
        ]
    },
    {
        "id": "mat-15",
        "rawName": "معالجه الصور والرؤيه الرقميه Image processing and digital vision",
        "title": "معالجة الصور والرؤية الرقمية",
        "titleEn": "Image Processing & Digital Vision",
        "category": "elective",
        "matchedNames": [
            "معالجة الصور والرؤيا الرقمية",
            "تحرير الصور الرقمية"
        ],
        "totalFiles": 59,
        "resourceTags": [
            "سلايدات الشرح",
            "أسئلة سنوات وامتحانات",
            "تلاخيص وملخصات",
            "الكتاب المعتمد"
        ],
        "driveUrl": "https://drive.google.com/drive/folders/1Ubg0UxnqFhuF7y67InICurg3DFkU7Kmv?usp=drive_link",
        "breakdown": [
            {
                "folder": "أسئلة معالجة الصور",
                "count": 26,
                "sample": [
                    "WhatsApp Image 2021-09-09 at 8.20.26 PM (24).jpeg",
                    "WhatsApp Image 2021-09-09 at 8.20.26 PM (14).jpeg",
                    "WhatsApp Image 2021-09-09 at 8.20.26 PM (4).jpeg"
                ]
            },
            {
                "folder": "سلايدات معالجة الصور",
                "count": 19,
                "sample": [
                    "ch03h-vector-graphic (2).ppt",
                    "ch04a-nature-of-sound-wave (1).ppt",
                    "ch04c-file-types-size-and-compression (1).ppt"
                ]
            },
            {
                "folder": "كتاب معالجة الصور",
                "count": 1,
                "sample": [
                    "كتاب معالجة الصور.pdf"
                ]
            },
            {
                "folder": "معالجة الصور و الرؤية الرقمية ، تلخيص الطالب حمزة ايهاب_",
                "count": 12,
                "sample": [
                    "Histogram Equalization.pdf",
                    "Introduction to Matlab.pdf",
                    "Chapter03.pdf"
                ]
            },
            {
                "folder": "ملخص معالجة صور جديد",
                "count": 1,
                "sample": [
                    "image processing notebook (1).pdf"
                ]
            }
        ]
    },
    {
        "id": "mat-16",
        "rawName": "مواضيع في علم الحاسوب topics in computer science",
        "title": "مواضيع في علم الحاسوب",
        "titleEn": "Topics in Computer Science",
        "category": "elective",
        "matchedNames": [
            "مواضيع خاصة في علم الحاسوب",
            "مواضيع خاصة في هندسة البرمجيات",
            "مواضيع خاصة في نظم المعلومات الحاسوبية",
            "مواضيع خاصة في الرسم الحاسوبي"
        ],
        "totalFiles": 23,
        "resourceTags": [
            "سلايدات الشرح",
            "أسئلة سنوات وامتحانات",
            "الكتاب المعتمد"
        ],
        "driveUrl": "https://drive.google.com/drive/folders/1Ubg0UxnqFhuF7y67InICurg3DFkU7Kmv?usp=drive_link",
        "breakdown": [
            {
                "folder": "أسئلة مواضيع في علم الحاسوب_",
                "count": 16,
                "sample": [
                    "IMG_5205.PNG",
                    "IMG_5213.PNG",
                    "IMG_5211.PNG"
                ]
            },
            {
                "folder": "سلايدات مواضيع في علم الحاسوب",
                "count": 6,
                "sample": [
                    "Expert sytem.ppt",
                    "Lecture6.ppt",
                    "Bigdata1.pdf"
                ]
            },
            {
                "folder": "كتاب مواضيع في علم الحاسوب",
                "count": 1,
                "sample": [
                    "combinepdf.pdf"
                ]
            }
        ]
    },
    {
        "id": "mat-17",
        "rawName": "نظم استرجاع المعلومات",
        "title": "نظم استرجاع المعلومات",
        "titleEn": "Information Retrieval Systems",
        "category": "elective",
        "matchedNames": [
            "استرجاع المعلومات ومحركات البحث",
            "تنقيب واسترجاع المعلومات ومحركات البحث",
            "نظم استرجاع البيانات"
        ],
        "totalFiles": 8,
        "resourceTags": [
            "سلايدات الشرح"
        ],
        "driveUrl": "https://drive.google.com/drive/folders/1Ubg0UxnqFhuF7y67InICurg3DFkU7Kmv?usp=drive_link",
        "breakdown": [
            {
                "folder": "Measuring Search Effectiveness(ليس ضمن مادة المد)",
                "count": 2,
                "sample": [
                    "Searching_-_Recall_Precision.pdf",
                    "Measuring similarity.pdf"
                ]
            },
            {
                "folder": "chapter1&2",
                "count": 4,
                "sample": [
                    "ch2,,,.pdf",
                    "ch1,,,.pdf",
                    "IR.pdf"
                ]
            },
            {
                "folder": "اخر شابتر في المادة (ليس ضمن مادة المد)",
                "count": 2,
                "sample": [
                    "Definitions_and_Terms[1](الطالب صالح مصلح).pdf",
                    "Definitions_IRS[1].pdf"
                ]
            }
        ]
    }
],

  // تفريغ ملفات ومكتبة المواد الأكاديمية محلياً على الموقع مباشرة لكافة المواد 100%
  getMaterialForCourse(courseName, cohort = 'all') {
    if (!courseName) return null;
    if (typeof window !== 'undefined' && typeof window.getCourseMaterialPackage === 'function') {
      return window.getCourseMaterialPackage(courseName, cohort);
    }
    const db = (typeof MATERIALS_DATABASE !== 'undefined') ? MATERIALS_DATABASE : (typeof window !== 'undefined' ? window.MATERIALS_DATABASE : null);
    return db ? db[courseName] : null;
  },


  // 2. روابط اللقاءات والمحاضرات عن بعد
  lectureLinks: [
    {
      id: 1,
      subject: "هندسة البرمجيات (1)",
      instructor: "د. أحمد الخوالدة",
      platform: "MS Teams",
      platformIcon: "fa-solid fa-people-group",
      time: "الأحد - الثلاثاء - الخميس (10:00 - 11:00)",
      url: "https://teams.microsoft.com",
      section: "شعبة 1",
      majorId: "se"
    },
    {
      id: 2,
      subject: "خوارزميات وهياكل البيانات",
      instructor: "د. عمر الزعبي",
      platform: "MS Teams",
      platformIcon: "fa-solid fa-people-group",
      time: "الإثنين - الأربعاء (11:30 - 01:00)",
      url: "https://teams.microsoft.com",
      section: "شعبة 2",
      majorId: "cs"
    },
    {
      id: "cg1",
      subject: "الرسم الحاسوبي والمعالجة الرقمية",
      instructor: "د. ريم الحياري",
      platform: "Zoom",
      platformIcon: "fa-solid fa-video",
      time: "الأحد - الثلاثاء (12:00 - 01:30)",
      url: "https://zoom.us",
      section: "شعبة 1",
      majorId: "cg"
    },
    {
      id: "cg2",
      subject: "النمذجة والتحريك ثلاثي الأبعاد",
      instructor: "د. طارق العبادي",
      platform: "MS Teams",
      platformIcon: "fa-solid fa-people-group",
      time: "الإثنين - الأربعاء (09:30 - 11:00)",
      url: "https://teams.microsoft.com",
      section: "شعبة 1",
      majorId: "cg"
    },
    {
      id: 5,
      subject: "إدارة قواعد البيانات",
      instructor: "د. سارة النسور",
      platform: "MS Teams",
      platformIcon: "fa-solid fa-people-group",
      time: "الأحد - الثلاثاء - الخميس (01:00 - 02:00)",
      url: "https://teams.microsoft.com",
      section: "شعبة 3",
      majorId: "cis"
    }
  ],

  // 3. خريطة ودليل الجامعة ومبنى الكلية الرسمية (مطابقة للخريطة الرسمية الـ 30 مبنى)
  // 3. خريطة ودليل الجامعة ومبنى الكلية الرسمية (مطابقة للخريطة الرسمية الـ 30 مبنى)
  campusMapData: {
    officialMapImg: "img/campus_map_hd.png?v=2004",
    modernMapImg: "img/campus_map_hd.png?v=2004",
    colleges: [
      { num: 1, name: "كلية الأعمال", category: "الكليات", color: "#215a36", desc: "أقسام المحاسبة، إدارة الأعمال، والعلوم المالية والمصرفية", icon: "fa-solid fa-briefcase" },
      { num: 2, name: "كلية الحقوق", category: "الكليات", color: "#215a36", desc: "القاعات الدراسية لقسم القانون والعيادة القانونية", icon: "fa-solid fa-scale-balanced" },
      { num: 3, name: "كلية العلوم الإنسانية", category: "الكليات", color: "#215a36", desc: "أقسام اللغات والعلوم الاجتماعية والإنسانية", icon: "fa-solid fa-book" },
      { num: 4, name: "كلية الزراعة", category: "الكليات", color: "#215a36", desc: "المختبرات الزراعية، المشاتل والمرافق البحثية", icon: "fa-solid fa-wheat-awn" },
      { num: 5, name: "كلية الطب", category: "الكليات", color: "#215a36", desc: "قاعات التدريس الطبي والمختبرات الطبية الحديثة", icon: "fa-solid fa-user-doctor" },
      { num: 6, name: "كلية العلوم", category: "الكليات", color: "#215a36", desc: "أقسام العلوم الأساسية، الرياضيات، الفيزياء، الكيمياء، والأحياء", icon: "fa-solid fa-atom" },
      { num: 7, name: "كلية تكنولوجيا المعلومات (IT)", category: "الكليات", color: "#215a36", desc: "عمادة كلية IT، أقسام علم الحاسوب، هندسة البرمجيات، الأمن السيبراني والذكاء الاصطناعي", icon: "fa-solid fa-laptop-code" },
      { num: 8, name: "كلية الذكاء الاصطناعي", category: "الكليات", color: "#215a36", desc: "كلية الذكاء الاصطناعي وعلوم البيانات والمختبرات المتقدمة", icon: "fa-solid fa-brain" },
      { num: "ت", name: "كلية السلط التقنية", category: "الكليات", color: "#215a36", desc: "البرامج التقنية والتطبيقية والمهنية", icon: "fa-solid fa-gears" }
    ],
    hallsAndLabs: [
      { num: 9, name: "أكاديمية البلقاء", category: "القاعات والمشاغل", color: "#1e3a8a", desc: "المدرجات الكبرى، الفعاليات والمؤتمرات", icon: "fa-solid fa-landmark" },
      { num: 10, name: "مجمع القاعات التدريسية", category: "القاعات والمشاغل", color: "#1e3a8a", desc: "القاعات التدريسية المشتركة لكافة التخصصات", icon: "fa-solid fa-chalkboard-user" },
      { num: 11, name: "المشاغل الهندسية", category: "القاعات والمشاغل", color: "#1e3a8a", desc: "ورش التدريب العملي والتطبيقات الهندسية", icon: "fa-solid fa-screwdriver-wrench" },
      { num: 12, name: "مبنى ب", category: "القاعات والمشاغل", color: "#1e3a8a", desc: "قاعات تدريسية ومختبرات حاسوبية", icon: "fa-solid fa-building" },
      { num: 13, name: "المختبرات", category: "القاعات والمشاغل", color: "#1e3a8a", desc: "مختبرات الحاسوب والامتحانات الإلكترونية", icon: "fa-solid fa-flask-vial" },
      { num: 14, name: "مبنى د", category: "القاعات والمشاغل", color: "#1e3a8a", desc: "مجمع المحاضرات العامة والقاعات المجهزة", icon: "fa-solid fa-school" },
      { num: 15, name: "المركز الأردني الكوري", category: "القاعات والمشاغل", color: "#1e3a8a", desc: "مركز التدريب التكنولوجي المتقدم وحاضنات الأعمال", icon: "fa-solid fa-microchip" },
      { num: 16, name: "مبنى أ", category: "القاعات والمشاغل", color: "#1e3a8a", desc: "القاعات الدراسية العامة ومكاتب المحاضرين", icon: "fa-solid fa-door-open" }
    ],
    adminAndServices: [
      { num: 17, name: "المكتبة والمالية", category: "الإدارة والخدمات", color: "#0284c7", desc: "قاعات المطالعة الصامتة، الكتب والدفع المالي", icon: "fa-solid fa-book-bookmark" },
      { num: 18, name: "عمادة شؤون الطلبة", category: "الإدارة والخدمات", color: "#0284c7", desc: "الأنشطة الطلابية، الهويات، والدائرة الهندسية", icon: "fa-solid fa-user-gear" },
      { num: 19, name: "صالة الضيافة", category: "الإدارة والخدمات", color: "#0284c7", desc: "مرافق الضيافة واستقبال الوفود", icon: "fa-solid fa-utensils" },
      { num: 20, name: "وحدة الخدمات", category: "الإدارة والخدمات", color: "#0284c7", desc: "متابعة الخدمات والمرافق في الحرم الجامعي", icon: "fa-solid fa-hand-holding-hand" },
      { num: 21, name: "المسجد", category: "الإدارة والخدمات", color: "#0284c7", desc: "مصلى الجامعة الرئيسي", icon: "fa-solid fa-mosque" },
      { num: 22, name: "مركز الحاسوب", category: "الإدارة والخدمات", color: "#0284c7", desc: "الدعم الفني، شبكات البوابة وحسابات الطلبة", icon: "fa-solid fa-network-wired" },
      { num: 23, name: "دائرة الأمن", category: "الإدارة والخدمات", color: "#0284c7", desc: "متابعة الأمن والسلامة في الحرم الجامعي", icon: "fa-solid fa-shield-halved" },
      { num: 24, name: "التسجيل، الدراسات العليا، مبنى المسرح", category: "الإدارة والخدمات", color: "#0284c7", desc: "صالة القبول والتسجيل، قضايا الخريجين ومسرح الجامعة", icon: "fa-solid fa-graduation-cap" },
      { num: 25, name: "التطوير وضمان الجودة", category: "الإدارة والخدمات", color: "#0284c7", desc: "تطوير المناهج وتأكيد جودة التعليم", icon: "fa-solid fa-award" },
      { num: 26, name: "المستشار الثقافي", category: "الإدارة والخدمات", color: "#0284c7", desc: "شؤون الطلبة الوافدين والمبعوثين", icon: "fa-solid fa-globe" },
      { num: 27, name: "رئاسة الجامعة", category: "الإدارة والخدمات", color: "#0284c7", desc: "مبنى إدارة الجامعة والرئاسة", icon: "fa-solid fa-landmark-flag" },
      { num: 28, name: "الصالة الرياضية", category: "الإدارة والخدمات", color: "#0284c7", desc: "الأنشطة الرياضية والبطولات الطلابية", icon: "fa-solid fa-basketball" },
      { num: 29, name: "الملعب", category: "الإدارة والخدمات", color: "#0284c7", desc: "الملعب الرياضي الخارجي والمضمار", icon: "fa-solid fa-futbol" },
      { num: 30, name: "الصالة العامة", category: "الإدارة والخدمات", color: "#0284c7", desc: "المراسلات الرسمية وشؤون الخدمات العامة", icon: "fa-solid fa-box-archive" }
    ],
    gatesAndServices: [
      { num: "🚪", name: "البوابة الرئيسية", category: "البوابات والمرافق العامة", color: "#c85a17", desc: "المدخل الرئيسي للجامعة من شارع السلط", icon: "fa-solid fa-torii-gate" },
      { num: "🚪", name: "بوابة الهندسة", category: "البوابات والمرافق العامة", color: "#c85a17", desc: "مدخل كلية الهندسة والمشاغل", icon: "fa-solid fa-door-closed" },
      { num: "🚪", name: "بوابة التخطيط", category: "البوابات والمرافق العامة", color: "#c85a17", desc: "مدخل منطقة المباني الإدارية والتخطيط", icon: "fa-solid fa-door-closed" },
      { num: "🚪", name: "بوابة الأكاديمية", category: "البوابات والمرافق العامة", color: "#c85a17", desc: "مدخل أكاديمية البلقاء والمجمع الشمالي", icon: "fa-solid fa-door-closed" },
      { num: "🚪", name: "بوابة العلوم", category: "البوابات والمرافق العامة", color: "#c85a17", desc: "مدخل كلية العلوم وتكنولوجيا المعلومات", icon: "fa-solid fa-door-closed" },
      { num: "☕", name: "وجبات سريعة / كافتيريا", category: "البوابات والمرافق العامة", color: "#c85a17", desc: "استراحات الطلبة والمأكولات والمشروبات", icon: "fa-solid fa-mug-hot" },
      { num: "💳", name: "البنك / الصراف الآلي", category: "البوابات والمرافق العامة", color: "#c85a17", desc: "أجهزة الصراف الآلي والمعاملات البنكية", icon: "fa-solid fa-credit-card" },
      { num: "🖨️", name: "فوتوشوب / خدمات التصوير والطباعة", category: "البوابات والمرافق العامة", color: "#c85a17", desc: "القرطاسية، طباعة المستندات، والخدمات الطلابية", icon: "fa-solid fa-print" }
    ]
  },

  // 4. دليل اعضاء الهيئة التدريسية (تواصل مع مدرسك)
          doctors: [
        {
            id: "doc_1",
            name: "أ.د. خلف ختاتنه",
            dept: "قسم علم الحاسوب",
            rank: "أستاذ",
            role: "عميد شؤون الطلبة",
            email: "dr.khalaf@bau.edu.jo",
            office: "مبنى عمادة شؤون الطلبة - مكتب العميد (طابق 1)",
            specialty: "علم الحاسوب والذكاء الاصطناعي",
            profile: "https://www.bau.edu.jo/academic/Academic_Profile.aspx?lang=en&userid=getvgidbLA/lu8hoLnL/EA==",
            img: "https://www.bau.edu.jo/academic/images/icon_building.jpg"
        },
        {
            id: "doc_2",
            name: "أ.د. مالك بريك",
            dept: "قسم علم الحاسوب",
            rank: "أستاذ",
            role: "مساعد العميد للدراسات العليا والبحث العلمي",
            email: "mbraik@bau.edu.jo",
            office: "كلية IT - طابق 1 (مكتب 105)",
            specialty: "الخوارزميات والحوسبة الموزعة",
            profile: "https://www.bau.edu.jo/academic/Academic_Profile.aspx?lang=en&userid=9z8eA5r4IcqtZuAgyQmKvw==",
            img: "https://www.bau.edu.jo/academic/images/icon_building.jpg"
        },
        {
            id: "doc_3",
            name: "د. عدنان الربيع",
            dept: "قسم علم الحاسوب",
            rank: "أستاذ مشارك",
            role: "عضو هيئة تدريس",
            email: "dr.alrabea@bau.edu.jo",
            office: "كلية IT - طابق 1 (مكتب 114)",
            specialty: "شبكات الحاسوب وأمن المعلومات",
            profile: "https://www.bau.edu.jo/academic/Academic_Profile.aspx?lang=en&userid=VaKDlaORSscopxX8C38qPA==",
            img: "https://www.bau.edu.jo/academic/images/icon_building.jpg"
        },
        {
            id: "doc_4",
            name: "د. حسن الرشايده",
            dept: "قسم علم الحاسوب",
            rank: "أستاذ مشارك",
            role: "عضو هيئة تدريس",
            email: "rashaideh@bau.edu.jo",
            office: "كلية IT - طابق 1 (مكتب 115)",
            specialty: "الذكاء الاصطناعي وتعلم الآلة",
            profile: "https://www.bau.edu.jo/academic/Academic_Profile.aspx?lang=en&userid=e0Vi60Zqlwn3x0+ev+4Zjw==",
            img: "https://www.bau.edu.jo/academic/images/icon_building.jpg"
        },
        {
            id: "doc_5",
            name: "د. اسامه الضرغام",
            dept: "قسم علم الحاسوب",
            rank: "أستاذ مشارك",
            role: "عضو هيئة تدريس",
            email: "o.dorgham@bau.edu.jo",
            office: "كلية IT - طابق 1 (مكتب 116)",
            specialty: "معمارية الحاسوب وهندسة النظم",
            profile: "https://www.bau.edu.jo/academic/Academic_Profile.aspx?lang=en&userid=iEUJDWVmmQWZe3S2ucfWRQ==",
            img: "https://www.bau.edu.jo/academic/images/icon_building.jpg"
        },
        {
            id: "doc_6",
            name: "د. ذيب البشيش",
            dept: "قسم علم الحاسوب",
            rank: "أستاذ مشارك",
            role: "عضو هيئة تدريس",
            email: "albashayreh@bau.edu.jo",
            office: "كلية IT - طابق 1 (مكتب 117)",
            specialty: "الرؤية الحاسوبية ومعالجة الصور",
            profile: "https://www.bau.edu.jo/academic/Academic_Profile.aspx?lang=en&userid=ksgbD1KlXEKPvewDzVKTZA==",
            img: "https://www.bau.edu.jo/academic/images/icon_building.jpg"
        },
        {
            id: "doc_7",
            name: "د. محمد ريالات",
            dept: "قسم علم الحاسوب",
            rank: "أستاذ مشارك",
            role: "عميد الكلية",
            email: "mryalat@bau.edu.jo",
            office: "مبنى عمادة كلية IT - مكتب العميد (الطابق الأرضي)",
            specialty: "معالجة اللغات الطبيعية وهندسة المعرفة",
            profile: "https://www.bau.edu.jo/academic/Academic_Profile.aspx?lang=en&userid=RlBtjvgdvbDS2PG3fhURsw==",
            img: "https://www.bau.edu.jo/academic/images/icon_building.jpg"
        },
        {
            id: "doc_8",
            name: "د. بيان السعايده",
            dept: "قسم علم الحاسوب",
            rank: "أستاذ مشارك",
            role: "رئيس قسم علم الحاسوب",
            email: "b_saideh@bau.edu.jo",
            office: "كلية IT - رئاسة قسم علم الحاسوب (مكتب 110)",
            specialty: "أنظمة التشغيل والخوارزميات المتقدمة",
            profile: "https://www.bau.edu.jo/academic/Academic_Profile.aspx?lang=en&userid=/vuZ5zkCWBUBgsB43QsLFQ==",
            img: "https://www.bau.edu.jo/academic/images/icon_building.jpg"
        },
        {
            id: "doc_9",
            name: "د. طارق الزعبي",
            dept: "قسم علم الحاسوب",
            rank: "أستاذ مساعد",
            role: "نائب مدير وحدة التقييم والامتحانات",
            email: "tariq.alzuabi@bau.edu.jo",
            office: "كلية IT - طابق 1 (مكتب 109)",
            specialty: "الحوسبة السحابية وأمن الشبكات",
            profile: "https://www.bau.edu.jo/academic/Academic_Profile.aspx?lang=en&userid=LbggQRFI81V/sNOqUdnwGg==",
            img: "https://www.bau.edu.jo/academic/images/icon_building.jpg"
        },
        {
            id: "doc_10",
            name: "د. نبيل الملي",
            dept: "قسم علم الحاسوب",
            rank: "أستاذ مساعد",
            role: "عضو هيئة تدريس",
            email: "n.almelli@bau.edu.jo",
            office: "كلية IT - طابق 1 (مكتب 118)",
            specialty: "علم الحاسوب والبرمجة المتقدمة",
            profile: "https://www.bau.edu.jo/academic/Academic_Profile.aspx?lang=en&userid=2J4ShutcNut2F6B+IwWmcA==",
            img: "https://www.bau.edu.jo/academic/images/icon_building.jpg"
        },
        {
            id: "doc_11",
            name: "د. مصعب القضاه",
            dept: "قسم علم الحاسوب",
            rank: "أستاذ مساعد",
            role: "عضو هيئة تدريس",
            email: "musab.qudah@bau.edu.jo",
            office: "كلية IT - طابق 1 (مكتب 113)",
            specialty: "الأمن السيبراني والتحقيق الرقمي",
            profile: "https://www.bau.edu.jo/academic/Academic_Profile.aspx?lang=en&userid=vip6TOxzmqHL0z7O5XTiEw==",
            img: "https://www.bau.edu.jo/academic/images/icon_building.jpg"
        },
        {
            id: "doc_12",
            name: "أ. روان عابدين",
            dept: "قسم علم الحاسوب",
            rank: "مدرس",
            role: "عضو هيئة تدريس",
            email: "abedeen@bau.edu.jo",
            office: "كلية IT - طابق 2 (مكتب 206)",
            specialty: "لغات البرمجة والبرمجة الكائنية",
            profile: "https://www.bau.edu.jo/academic/Academic_Profile.aspx?lang=en&userid=+bbxn+A2QJtwuNwbf5LDJg==",
            img: "https://www.bau.edu.jo/academic/images/icon_building.jpg"
        },
        {
            id: "doc_13",
            name: "أ. هبه الحياري",
            dept: "قسم علم الحاسوب",
            rank: "مدرس",
            role: "عضو هيئة تدريس",
            email: "h.hyari@bau.edu.jo",
            office: "كلية IT - طابق 2 (مكتب 207)",
            specialty: "هياكل البيانات والبرمجة التأسيسية",
            profile: "https://www.bau.edu.jo/academic/Academic_Profile.aspx?lang=en&userid=Gz803LThTJUAPEB8pJ/nBA==",
            img: "https://www.bau.edu.jo/academic/images/icon_building.jpg"
        },
        {
            id: "doc_14",
            name: "أ. سوسن ابوطالب",
            dept: "قسم علم الحاسوب",
            rank: "مدرس",
            role: "عضو هيئة تدريس",
            email: "s.abootaleb@bau.edu.jo",
            office: "كلية IT - طابق 2 (مكتب 208)",
            specialty: "الخوارزميات ومختبرات البرمجة",
            profile: "https://www.bau.edu.jo/academic/Academic_Profile.aspx?lang=en&userid=yUPJsIJKMWk24QDcHrIjGg==",
            img: "https://www.bau.edu.jo/academic/images/icon_building.jpg"
        },
        {
            id: "doc_15",
            name: "أ. زينب الرحامنه",
            dept: "قسم علم الحاسوب",
            rank: "مدرس",
            role: "عضو هيئة تدريس",
            email: "z.rahamneh@bau.edu.jo",
            office: "كلية IT - طابق 2 (مكتب 209)",
            specialty: "أساسيات تكنولوجيا المعلومات",
            profile: "https://www.bau.edu.jo/academic/Academic_Profile.aspx?lang=en&userid=Hb5RMjBOTDTJMwTXO5mkXg==",
            img: "https://www.bau.edu.jo/academic/images/icon_building.jpg"
        },
        {
            id: "doc_16",
            name: "د. خالد الخرابشه",
            dept: "قسم هندسة البرمجيات وتكنولوجيا المعلومات",
            rank: "أستاذ مشارك",
            role: "رئيس قسم هندسة البرمجيات",
            email: "khaled.kharabsheh@bau.edu.jo",
            office: "كلية IT - رئاسة قسم البرمجيات (مكتب 112)",
            specialty: "هندسة البرمجيات وإدارة الجودة",
            profile: "https://www.bau.edu.jo/academic/Academic_Profile.aspx?lang=en&userid=pmE9MEgJZNpm9mcSRPZTvg==",
            img: "https://www.bau.edu.jo/academic/images/icon_building.jpg"
        },
        {
            id: "doc_17",
            name: "د. مي الفواعير",
            dept: "قسم هندسة البرمجيات وتكنولوجيا المعلومات",
            rank: "أستاذ مساعد",
            role: "عضو هيئة تدريس",
            email: "mai.alfawair@bau.edu.jo",
            office: "كلية IT - طابق 1 (مكتب 107)",
            specialty: "الأنظمة البرمجية الموزعة",
            profile: "https://www.bau.edu.jo/academic/Academic_Profile.aspx?lang=en&userid=4V/9IVX3C6Ouy64PGA4P0g==",
            img: "https://www.bau.edu.jo/academic/images/icon_building.jpg"
        },
        {
            id: "doc_18",
            name: "د. سلطان الخطيب",
            dept: "قسم هندسة البرمجيات وتكنولوجيا المعلومات",
            rank: "أستاذ مساعد",
            role: "مدير وحدة التقييم والامتحانات العامة",
            email: "s.khatib@bau.edu.jo",
            office: "مبنى الامتحانات / كلية IT (مكتب 108)",
            specialty: "اختبار البرمجيات وتوكيد الجودة (QA)",
            profile: "https://www.bau.edu.jo/academic/Academic_Profile.aspx?lang=en&userid=Xj0fQj8nK8/nE2VfTn6lzQ==",
            img: "https://www.bau.edu.jo/academic/images/icon_building.jpg"
        },
        {
            id: "doc_19",
            name: "د. كرم اغنيم",
            dept: "قسم هندسة البرمجيات وتكنولوجيا المعلومات",
            rank: "أستاذ مساعد",
            role: "مساعد العميد للشؤون الطلابية",
            email: "karam.ghneim@bau.edu.jo",
            office: "كلية IT - شؤون الطلبة (مكتب 104)",
            specialty: "تطوير تطبيقات الويب والهواتف",
            profile: "https://www.bau.edu.jo/academic/Academic_Profile.aspx?lang=en&userid=l93gfNaBiDrvi9xLH8Gr/Q==",
            img: "https://www.bau.edu.jo/academic/images/icon_building.jpg"
        },
        {
            id: "doc_20",
            name: "د. حسن ابو العيس",
            dept: "قسم هندسة البرمجيات وتكنولوجيا المعلومات",
            rank: "أستاذ مساعد",
            role: "عضو هيئة تدريس",
            email: "h.abuel-eis@bau.edu.jo",
            office: "كلية IT - طابق 2 (مكتب 204)",
            specialty: "أنماط التصميم المعماري للبرمجيات",
            profile: "https://www.bau.edu.jo/academic/Academic_Profile.aspx?lang=en&userid=N0rChyqkg0yggvPqlSDqLA==",
            img: "https://www.bau.edu.jo/academic/images/icon_building.jpg"
        },
        {
            id: "doc_21",
            name: "د. عمار سلطان",
            dept: "قسم هندسة البرمجيات وتكنولوجيا المعلومات",
            rank: "أستاذ مساعد",
            role: "عضو هيئة تدريس",
            email: "ammar.sultan@bau.edu.jo",
            office: "كلية IT - طابق 2 (مكتب 205)",
            specialty: "إدارة مشاريع تكنولوجيا المعلومات",
            profile: "https://www.bau.edu.jo/academic/Academic_Profile.aspx?lang=en&userid=cj3IGH2rLTnktYklQKnaRQ==",
            img: "https://www.bau.edu.jo/academic/images/icon_building.jpg"
        },
        {
            id: "doc_22",
            name: "أ. اصلاح غرايبه",
            dept: "قسم هندسة البرمجيات وتكنولوجيا المعلومات",
            rank: "مدرس",
            role: "عضو هيئة تدريس",
            email: "islah.gharaibeh@bau.edu.jo",
            office: "كلية IT - طابق 2 (مكتب 210)",
            specialty: "مختبرات هندسة البرمجيات والنمذجة",
            profile: "https://www.bau.edu.jo/academic/Academic_Profile.aspx?lang=en&userid=pyH1IzEfdq8oBs986ZINUg==",
            img: "https://www.bau.edu.jo/academic/images/icon_building.jpg"
        },
        {
            id: "doc_23",
            name: "أ. وفاء الضبابات",
            dept: "قسم هندسة البرمجيات وتكنولوجيا المعلومات",
            rank: "مدرس",
            role: "مساعد العميد للتخطيط والتطوير والجودة",
            email: "wafaa.dhababat@bau.edu.jo",
            office: "كلية IT - مكتب الجودة والتطوير (مكتب 106)",
            specialty: "إدارة الجودة وتطوير البرمجيات",
            profile: "https://www.bau.edu.jo/academic/Academic_Profile.aspx?lang=en&userid=37M3cUPQe9Mm12MozwyvLA==",
            img: "https://www.bau.edu.jo/academic/images/icon_building.jpg"
        },
        {
            id: "doc_24",
            name: "أ.د. باسم الحديدي",
            dept: "قسم نظم المعلومات الحاسوبية",
            rank: "أستاذ",
            role: "عضو هيئة تدريس",
            email: "basim_hadidi@bau.edu.jo",
            office: "كلية IT - طابق 2 (مكتب 211)",
            specialty: "نظم المعلومات الاستراتيجية وقواعد البيانات",
            profile: "https://www.bau.edu.jo/academic/Academic_Profile.aspx?lang=en&userid=Iz5z0jgXw3UwUN0R8Fu/6Q==",
            img: "https://www.bau.edu.jo/academic/images/icon_building.jpg"
        },
        {
            id: "doc_25",
            name: "أ.د. ابراهيم تادرس",
            dept: "قسم نظم المعلومات الحاسوبية",
            rank: "أستاذ",
            role: "عضو هيئة تدريس",
            email: "tadros@bau.edu.jo",
            office: "كلية IT - طابق 2 (مكتب 212)",
            specialty: "تحليل وتصميم النظم والذكاء التجاري",
            profile: "https://www.bau.edu.jo/academic/Academic_Profile.aspx?lang=en&userid=EHFZXnogZGdwySsjGOxzCw==",
            img: "https://www.bau.edu.jo/academic/images/icon_building.jpg"
        },
        {
            id: "doc_26",
            name: "أ.د. بلال زهران",
            dept: "قسم نظم المعلومات الحاسوبية",
            rank: "أستاذ",
            role: "عضو هيئة تدريس",
            email: "zahranb@bau.edu.jo",
            office: "كلية IT - طابق 2 (مكتب 213)",
            specialty: "إدارة قواعد البيانات الضخمة (Big Data)",
            profile: "https://www.bau.edu.jo/academic/Academic_Profile.aspx?lang=en&userid=f+8jKInh0QAwMoa6tVKcTg==",
            img: "https://www.bau.edu.jo/academic/images/icon_building.jpg"
        },
        {
            id: "doc_27",
            name: "د. زيد اللامي",
            dept: "قسم نظم المعلومات الحاسوبية",
            rank: "أستاذ مشارك",
            role: "نائب عميد الكلية",
            email: "z_lami@bau.edu.jo",
            office: "مبنى الكلية - مكتب نائب العميد (مكتب 102)",
            specialty: "نظم المعلومات الإدارية وأمن النظم",
            profile: "https://www.bau.edu.jo/academic/Academic_Profile.aspx?lang=en&userid=Zwi1pjff3cJztWWg+xRiNw==",
            img: "https://www.bau.edu.jo/academic/images/icon_building.jpg"
        },
        {
            id: "doc_28",
            name: "أ. سامر عبدالله",
            dept: "قسم نظم المعلومات الحاسوبية",
            rank: "مدرس",
            role: "عضو هيئة تدريس",
            email: "samer_hamed@bau.edu.jo",
            office: "كلية IT - طابق 2 (مكتب 214)",
            specialty: "تحليل النظم والبرمجة التطبيقية",
            profile: "https://www.bau.edu.jo/academic/Academic_Profile.aspx?lang=en&userid=TLoCf4EYq2sOrXw2DSHSXg==",
            img: "https://www.bau.edu.jo/academic/images/icon_building.jpg"
        },
        {
            id: "doc_29",
            name: "أ. رائد خليل",
            dept: "قسم نظم المعلومات الحاسوبية",
            rank: "مدرس",
            role: "رئيس قسم نظم المعلومات الحاسوبية",
            email: "r.m.khalil@bau.edu.jo",
            office: "كلية IT - رئاسة قسم نظم المعلومات (مكتب 201)",
            specialty: "نظم المعلومات وقواعد البيانات المتقدمة",
            profile: "https://www.bau.edu.jo/academic/Academic_Profile.aspx?lang=en&userid=o1afKdd1uncsCi9DCzM2jA==",
            img: "https://www.bau.edu.jo/academic/images/icon_building.jpg"
        }
    ],

  // 5. جداول ومواعيد الامتحانات وأرشيف الأسئلة
  exams: [
    {
      id: "e1",
      course: "هندسة البرمجيات (1)",
      type: "امتحان منتصف الفصل (Midterm)",
      date: "2024-11-12",
      time: "10:00 AM - 11:00 AM",
      hall: "مختبر IT 101 + مختبر 102",
      archiveLink: "https://drive.google.com/drive/folders/1Ubg0UxnqFhuF7y67InICurg3DFkU7Kmv?usp=drive_link"
    },
    {
      id: "e2",
      course: "خوارزميات وهياكل البيانات",
      type: "امتحان منتصف الفصل (Midterm)",
      date: "2024-11-14",
      time: "11:30 AM - 12:30 PM",
      hall: "مجمع المختبرات المركزية",
      archiveLink: "https://drive.google.com/drive/folders/1Ubg0UxnqFhuF7y67InICurg3DFkU7Kmv?usp=drive_link"
    },
    {
      id: "e3",
      course: "أساسيات الرسم الحاسوبي (OpenGL)",
      type: "امتحان منتصف الفصل (Midterm)",
      date: "2024-11-17",
      time: "01:00 PM - 02:00 PM",
      hall: "قاعة 205",
      archiveLink: "https://drive.google.com/drive/folders/1Ubg0UxnqFhuF7y67InICurg3DFkU7Kmv?usp=drive_link"
    },
    {
      id: "e4",
      course: "تطوير تطبيقات الويب",
      type: "الامتحان النهائي (Final)",
      date: "2025-01-08",
      time: "09:00 AM - 11:00 AM",
      hall: "مختبر الحاسوب 204",
      archiveLink: "https://drive.google.com/drive/folders/1Ubg0UxnqFhuF7y67InICurg3DFkU7Kmv?usp=drive_link"
    }
  ],

  // 6. بيانات التقويم الأكاديمي الرسمي الصادر عن وحدة القبول والتسجيل 2027/2026
  academicCalendar: {
    firstSemester: {
      title: "التقويم الجامعي للفصل الدراسي الأول 2027/2026",
      year: "2026 / 2027",
      note: "* تحدد أيام السبت لمناقشة مشاريع التخرج.",
      events: [
        { day: "الأحد", date: "2026/10/04", event: "بدء العام الجامعي 2027/2026", category: "normal" },
        { day: "الأحد - الخميس", date: "2026/10/04 - 2026/10/08", event: "فترة السحب والإضافة", category: "reg" },
        { day: "الأحد", date: "2026/10/11", event: "بدء التدريس للفصل الدراسي الأول 2027/2026", category: "normal" },
        { day: "الخميس", date: "2026/10/22", event: "آخر موعد لتقديم امتحان غير المكتمل للفصلين الدراسيين الثاني والصيفي 2026/2025، وتزويد وحدة القبول والتسجيل بالنتائج", category: "exam" },
        { day: "الأحد - الخميس", date: "2026/11/08 - 2026/11/12", event: "الامتحان الشامل لطلبة الدراسات العليا (الماجستير)", category: "exam" },
        { day: "السبت - الثلاثاء", date: "2026/11/28 - 2026/12/08", event: "الامتحان النصفي (Mid Term) لجميع المراحل الدراسية", category: "exam" },
        { day: "الأحد - الثلاثاء", date: "2026/12/06 - 2027/01/05", event: "فترة تقديم طلبات الالتحاق لبرامج الدراسات العليا للفصل الدراسي الثاني 2027/2026", category: "reg" },
        { day: "الجمعة", date: "2026/12/25", event: "عطلة عيد الميلاد المجيد", category: "holiday" },
        { day: "الخميس", date: "2026/12/31", event: "آخر موعد للانسحاب من مادة أو أكثر أو من جميع المواد لجميع المراحل الدراسية", category: "reg" },
        { day: "الخميس", date: "2026/12/31", event: "آخر موعد لتسجيل ساعات رسالة الماجستير (لأول مرة بعد إقرار المشروع وتعيين مشرف)", category: "reg" },
        { day: "الجمعة", date: "2027/01/01", event: "عطلة رأس السنة الميلادية", category: "holiday" },
        { day: "الأحد - الخميس", date: "2027/01/03 - 2027/01/07", event: "فترة التسجيل لمواد الفصل الدراسي الثاني 2027/2026 لجميع المراحل الدراسية", category: "reg" },
        { day: "الخميس", date: "2027/01/14", event: "آخر موعد لتقديم طلب تأجيل الدراسة إلكترونياً للفصل الدراسي الأول 2027/2026", category: "reg" },
        { day: "الخميس", date: "2027/01/14", event: "آخر موعد لمناقشة رسائل الماجستير", category: "normal" },
        { day: "الخميس", date: "2027/01/14", event: "آخر يوم للتدريس في الفصل الدراسي الأول 2027/2026", category: "normal" },
        { day: "السبت - الخميس", date: "2027/01/16 - 2027/01/28", event: "الامتحانات النهائية للفصل الدراسي الأول 2027/2026", category: "exam" },
        { day: "الخميس", date: "2027/01/28", event: "آخر موعد لتقديم طلب انقطاع عن الدراسة إلكترونياً للفصل الدراسي الأول 2027/2026", category: "reg" },
        { day: "الأحد", date: "2027/01/31", event: "آخر موعد لاعتماد نتائج الفصل الدراسي الأول 2027/2026", category: "reg" },
        { day: "الإثنين - الأربعاء", date: "2027/02/01 - 2027/02/10", event: "فترة مراجعة علامات الامتحان النهائي للفصل الدراسي الأول 2027/2026", category: "reg" },
        { day: "الثلاثاء", date: "2027/02/09", event: "بداية شهر رمضان المبارك (تقديراً)", category: "holiday" },
        { day: "الثلاثاء", date: "2027/02/09", event: "آخر موعد لتقديم طلب لمن يرغب برفع معدله التراكمي لفئة أعلى (دراسة حرة) للذين أنهوا الخطة الدراسية (مرحلة البكالوريوس) على الفصل الأول للفصل الذي يليه", category: "reg" },
        { day: "الأحد - السبت", date: "2027/02/14 - 2027/02/20", event: "إجازة أعضاء الهيئة التدريسية بين الفصلين", category: "normal" },
        { day: "الإثنين", date: "2027/02/15", event: "آخر موعد لتقديم تنسيب مجالس الكليات لمنح الدرجات العلمية إلى مجلس العمداء", category: "normal" },
        { day: "الإثنين", date: "2027/02/22", event: "قرار مجلس العمداء بمنح الدرجات العلمية", category: "normal" },
        { day: "الأربعاء", date: "2027/02/24", event: "آخر موعد لتزويد القبول والتسجيل بنتائج الاعتراض على علامات الفصل الدراسي الأول 2027/2026", category: "reg" }
      ]
    },
    secondSemester: {
      title: "التقويم الجامعي للفصل الدراسي الثاني 2027/2026",
      year: "2026 / 2027",
      note: "* تحدد أيام السبت لمناقشة مشاريع التخرج.",
      events: [
        { day: "الأحد", date: "2027/02/21", event: "بدء دوام أعضاء الهيئة التدريسية", category: "normal" },
        { day: "الأحد - الخميس", date: "2027/02/21 - 2027/02/25", event: "فترة السحب والإضافة", category: "reg" },
        { day: "الأحد", date: "2027/02/28", event: "بدء التدريس للفصل الدراسي الثاني 2027/2026", category: "normal" },
        { day: "الثلاثاء - الجمعة", date: "2027/03/09 - 2027/03/12", event: "عطلة عيد الفطر السعيد (تقديراً)", category: "holiday" },
        { day: "الثلاثاء", date: "2027/03/16", event: "آخر موعد لتقديم امتحان غير المكتمل للفصل الدراسي الأول 2027/2026، وتزويد القبول والتسجيل بالنتائج", category: "exam" },
        { day: "الأحد - الخميس", date: "2027/03/14 - 2027/03/18", event: "الامتحان الشامل لطلبة الدراسات العليا (الماجستير)", category: "exam" },
        { day: "السبت - الثلاثاء", date: "2027/04/17 - 2027/04/27", event: "الامتحان النصفي (Mid Term) لجميع المراحل الدراسية", category: "exam" },
        { day: "السبت", date: "2027/05/01", event: "عطلة يوم العمال العالمي", category: "holiday" },
        { day: "السبت - الأربعاء", date: "2027/05/15 - 2027/05/19", event: "عطلة عيد الأضحى المبارك (تقديراً)", category: "holiday" },
        { day: "الخميس", date: "2027/05/20", event: "آخر موعد للانسحاب من مادة أو أكثر أو من جميع المواد لجميع المراحل الدراسية", category: "reg" },
        { day: "الخميس", date: "2027/05/20", event: "آخر موعد لتسجيل ساعات رسالة الماجستير (لأول مرة بعد إقرار المشروع وتعيين مشرف)", category: "reg" },
        { day: "الأحد - الخميس", date: "2027/05/23 - 2027/05/27", event: "فترة التسجيل لمواد الفصل الصيفي 2027/2026 لجميع المراحل الدراسية", category: "reg" },
        { day: "الثلاثاء", date: "2027/05/25", event: "عطلة عيد الاستقلال", category: "holiday" },
        { day: "الخميس", date: "2027/06/03", event: "آخر موعد لتقديم طلب تأجيل الدراسة إلكترونياً للفصل الدراسي الثاني 2027/2026", category: "reg" },
        { day: "الخميس", date: "2027/06/03", event: "آخر يوم للتدريس في الفصل الدراسي الثاني 2027/2026", category: "normal" },
        { day: "الخميس", date: "2027/06/03", event: "آخر موعد لمناقشة رسائل الماجستير", category: "normal" },
        { day: "السبت - الخميس", date: "2027/06/05 - 2027/06/17", event: "الامتحانات النهائية للفصل الدراسي الثاني 2027/2026", category: "exam" },
        { day: "الأحد", date: "2027/06/06", event: "عطلة رأس السنة الهجرية (تقديراً)", category: "holiday" },
        { day: "الخميس", date: "2027/06/17", event: "آخر موعد لتقديم طلب انقطاع عن الدراسة إلكترونياً للفصل الدراسي الثاني 2027/2026", category: "reg" },
        { day: "الأحد", date: "2027/06/20", event: "آخر موعد لاعتماد نتائج الفصل الدراسي الثاني 2027/2026", category: "reg" },
        { day: "الإثنين - الأربعاء", date: "2027/06/21 - 2027/06/30", event: "فترة مراجعة علامات الامتحان النهائي للفصل الدراسي الثاني 2027/2026", category: "reg" },
        { day: "الثلاثاء", date: "2027/06/29", event: "آخر موعد لتقديم طلب لمن يرغب برفع معدله التراكمي لفئة أعلى (دراسة حرة) للذين أنهوا الخطة على الفصل الثاني للفصل الذي يليه", category: "reg" },
        { day: "الأحد - السبت", date: "2027/07/04 - 2027/07/10", event: "إجازة أعضاء الهيئة التدريسية الذين تم تكليفهم بالتدريس على الفصل الصيفي 2027/2026", category: "normal" },
        { day: "الأحد - السبت", date: "2027/07/04 - 2027/09/11", event: "إجازة أعضاء الهيئة التدريسية الذين لم يتم تكليفهم بالتدريس على الفصل الدراسي الصيفي 2027/2026", category: "normal" },
        { day: "الإثنين", date: "2027/07/05", event: "آخر موعد لتقديم تنسيب مجالس الكليات الدرجات العلمية إلى مجلس العمداء", category: "normal" },
        { day: "الإثنين", date: "2027/07/12", event: "قرار مجلس العمداء بمنح الدرجات العلمية", category: "normal" },
        { day: "الأربعاء", date: "2027/07/14", event: "آخر موعد لتزويد القبول والتسجيل بنتائج الاعتراض على علامات الفصل الدراسي الثاني 2027/2026", category: "reg" }
      ]
    },
    summerSemester: {
      title: "التقويم الجامعي للفصل الدراسي الصيفي 2027/2026",
      year: "2026 / 2027",
      note: "* تحدد أيام السبت لمناقشة مشاريع التخرج.",
      events: [
        { day: "الأحد - الخميس", date: "2027/07/11 - 2027/07/15", event: "فترة السحب والإضافة", category: "reg" },
        { day: "الأحد - الخميس", date: "2027/07/11 - 2027/07/15", event: "الامتحان الشامل لطلبة الدراسات العليا (الماجستير)", category: "exam" },
        { day: "الأحد", date: "2027/07/18", event: "بدء التدريس للفصل الصيفي 2027/2026", category: "normal" },
        { day: "الأحد - الأربعاء", date: "2027/07/18 - 2027/08/18", event: "فترة تقديم طلبات الالتحاق لبرامج الدراسات العليا في الجامعة للفصل الدراسي الأول للعام الجامعي 2028/2027", category: "reg" },
        { day: "الأحد - الخميس", date: "2027/07/25 - 2027/08/05", event: "تقديم طلبات الانتقال من كلية إلى أخرى أو من تخصص إلى آخر داخل الجامعة، ومن الجامعات الأخرى إلى جامعة البلقاء التطبيقية", category: "reg" },
        { day: "السبت - الخميس", date: "2027/08/07 - 2027/08/12", event: "الامتحان النصفي (Mid Term) لجميع المراحل الدراسية", category: "exam" },
        { day: "السبت", date: "2027/08/14", event: "عطلة ذكرى المولد النبوي الشريف (تقديراً)", category: "holiday" },
        { day: "الخميس", date: "2027/08/19", event: "آخر موعد للانسحاب من مادة أو أكثر أو من جميع المواد لجميع المراحل الدراسية", category: "reg" },
        { day: "الخميس", date: "2027/08/19", event: "آخر موعد لتسجيل ساعات رسالة الماجستير (لأول مرة بعد إقرار المشروع وتعيين مشرف)", category: "reg" },
        { day: "الأحد - الخميس", date: "2027/08/22 - 2027/08/26", event: "فترة التسجيل لمواد الفصل الدراسي الأول للعام الجامعي 2028/2027 لجميع المراحل الدراسية", category: "reg" },
        { day: "الخميس", date: "2027/09/02", event: "آخر موعد لمناقشة رسائل الماجستير", category: "normal" },
        { day: "الخميس", date: "2027/09/02", event: "آخر يوم للتدريس في الفصل الصيفي 2027/2026", category: "normal" },
        { day: "السبت - الخميس", date: "2027/09/04 - 2027/09/09", event: "الامتحانات النهائية للفصل الصيفي 2027/2026", category: "exam" },
        { day: "الأحد", date: "2027/09/12", event: "آخر موعد لاعتماد نتائج الفصل الصيفي 2027/2026", category: "reg" },
        { day: "الثلاثاء - الأربعاء", date: "2027/09/14 - 2027/09/22", event: "فترة مراجعة علامات الامتحان النهائي للفصل الصيفي 2027/2026", category: "reg" },
        { day: "الأربعاء", date: "2027/09/15", event: "آخر موعد لتقديم طلب لمن يرغب برفع معدله التراكمي لفئة أعلى (دراسة حرة) للذين أنهوا الخطة على الفصل الصيفي للفصل الذي يليه", category: "reg" },
        { day: "الأحد - السبت", date: "2027/09/26 - 2027/10/02", event: "إجازة أعضاء الهيئة التدريسية الذين تم تكليفهم بالتدريس على الفصل الدراسي الصيفي 2027/2026", category: "normal" },
        { day: "الإثنين", date: "2027/09/27", event: "آخر موعد لتقديم تنسيب مجالس الكليات بمنح الدرجات العلمية إلى مجلس العمداء", category: "normal" },
        { day: "الإثنين", date: "2027/10/04", event: "قرار مجلس العمداء بمنح الدرجات العلمية", category: "normal" },
        { day: "الأربعاء", date: "2027/10/06", event: "آخر موعد لتزويد القبول والتسجيل بنتائج الاعتراض على علامات الفصل الدراسي الصيفي 2027/2026", category: "reg" },
        { day: "الأحد", date: "2027/10/03", event: "بدء العام الجامعي الجديد 2028/2027 (تقديراً)", category: "normal" }
      ]
    }
  }
};
