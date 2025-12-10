//////////// Borgar Menu /////////////
const ulNav = document.getElementById("small-sc");
const links = document.querySelector(".nav-links a")

document.body.addEventListener("click", (e) => {
    if (e.target.className === "sp-borgar"){
        ulNav.classList.toggle("sm-sc")
    } else {
        if (ulNav.classList.contains("sm-sc"))
            ulNav.classList.toggle("sm-sc")
    }
})
// Texts in English and Arabic
const texts = {
  en: {
    header: ["Home", "About Us", "Contact Us", "Flights"],
    landing: {
      h1: "Fly Smarter with SkyWing",
      p: "Unlock exclusive flight offers and enjoy personalized travel assistance. Chat with us on WhatsApp to book instantly!",
      btn: "Chat on WhatsApp"
    },
    flights: {
      title: "This Week's Top Flights",
      desc: "Grab the best deals from your personal travel agent. Quick booking via WhatsApp available!",
      // filters: ["All", "Tarco Airlines", "Badr Airlines", "Sudan Airlines", "EgyptAir", "Qatar Airways", "Turkish Airlines"],
      // cardBtn: "Reserve on WhatsApp",
      // cardLabels: { from: "Departure", to: "Arrival", depTime: "Leave", arivTime: "Reach", duration: "Flight Time", airline: "Airline", date: "Travel Date", price: "Ticket Price" },
      seeAll: "Explore More"
    },
    why: {
      title: "Why Book With Us?",
      desc: "We provide tailor-made service, exclusive deals, and 24/7 support to make your travel smooth and worry-free.",
      btn: "Book Now on WhatsApp"
    },
    popular: {
      title: "Hot Destinations",
      desc: "Travel the world and enjoy our specially curated flight deals.",
      cities: [
        { city: "Cairo", country: "Egypt" },
        { city: "Entebbe", country: "Uganda" },
        { city: "Istanbul", country: "Turkey" },
        { city: "Doha", country: "Qatar" },
        { city: "Mecca", country: "Saudi Arabia" },
        { city: "Riyadh", country: "Saudi Arabia" }
      ],
      bookBtn: `Reserve Now`,
      startFrom: "from"
    },
    choose: {
      title: "Why Choose SkyWing?",
      desc: "Tailored travel, exclusive offers, and instant support via WhatsApp.",
      features: [
        { title: "Safe Payments", desc: "All transactions are secure, fast, and fully protected." },
        { title: "Instant Booking", desc: "Quick replies for your flight bookings and inquiries." },
        { title: "Exclusive Offers", desc: "Access unique airline deals not available elsewhere." },
        { title: "Personal Assistance", desc: "One-on-one help for every step of your journey." },
        { title: "Trusted Experience", desc: "Years of helping travelers get the best flights and rates." },
        { title: "Flexible Options", desc: "Change or cancel your flights easily, including group bookings." }
      ]
    },
    footer: {
      logoText: "SkyWing",
      desc: "Your travel companion for affordable flights worldwide. Making travel dreams come true with exceptional deals.",
      quickLinksTitle:['Quick Links'],
      quickLinks: ["About Us","Contact Us", "All Flights"],
      workingHoursTitle:['Working Hours'],
      workingHours: ["Monday-Friday:9:00AM-6:00PM", "Satrday:10:00AM-4:00PM", "Sunday:Closed"],
      contactTitle:["Contact Info"],
      contact: { phone: "+1-800-FLIGHT", email: "support@skywing.com", address: "123 Travel Avenue, New York, NY" },
      copyright: "SkyWing. All rights reserved.",
    }
  },
  ar: {
    header: ["الرئيسية", "معلومات عنا", "تواصل معنا", "الرحلات"],
    landing: {
      h1: "سافر بذكاء مع سكاي وينج",
      p: "استمتع بأفضل عروض الرحلات وخدمة شخصية متميزة. تواصل معنا على واتساب للحجز الفوري!",
      btn: "تواصل على واتساب"
    },
    flights: {
      title: "أفضل الرحلات هذا الأسبوع",
      desc: "احصل على أفضل العروض من وكيلك الشخصي. الحجز السريع متاح عبر واتساب!",
      filterTitle:"تخصيص",
      filters: ["الكل", "تاركو", "بدر", "الخطوط السودانية", "مصر للطيران", "الخطوط القطرية", "الخطوط التركية"],
      price: ["المبلغ الكلي"],
      cardBtn: "احجز الآن على واتساب",
      cardLabels: { from: "المغادرة", to: "الوصول", depTime: "انطلاق", arivTime: "وصول", duration: "مدة الرحلة", airline: "شركة الطيران", date: "تاريخ السفر", price: "سعر التذكرة" },
      seeAll: " جميع الرحلات"
    },
    why: {
      title: "لماذا تحجز معنا؟",
      desc: "نقدّم خدمة سفر مخصصة، عروض حصرية، ودعم على مدار الساعة لجعل رحلتك سهلة وخالية من القلق.",
      btn: "احجز الآن عبر واتساب"
    },
    popular: {
      title: "الوجهات الرائجة",
      desc: "سافر حول العالم واستمتع بأفضل عروض الرحلات المختارة بعناية.",
      cities: [
        { city: "القاهرة", country: "مصر" },
        { city: "انتيبي", country: "أوغندا" },
        { city: "اسطنبول", country: "تركيا" },
        { city: "الدوحة", country: "قطر" },
        { city: "مكة", country: "المملكة العربية السعودية" },
        { city: "الرياض", country: "المملكة العربية السعودية" }
      ],
      bookBtn: "احجز الآن",
      startFrom: "تبدأ من"
    },
    choose: {
      title: "لماذا تختار سكاي وينج؟",
      desc: "سفر مخصص، عروض حصرية، ودعم فوري عبر واتساب.",
      features: [
        { title: "مدفوعات آمنة", desc: "جميع المعاملات آمنة وسريعة ومحمية بالكامل." },
        { title: "حجز فوري", desc: "رد سريع على جميع استفسارات وحجوزات الرحلات." },
        { title: "عروض حصرية", desc: "الوصول إلى أفضل عروض شركات الطيران غير المتاحة للآخرين." },
        { title: "خدمة شخصية", desc: "مساعدة فردية في كل خطوة من رحلتك." },
        { title: "خبرة موثوقة", desc: "سنوات من الخبرة في مساعدة المسافرين للحصول على أفضل الرحلات والأسعار." },
        { title: "خيارات مرنة", desc: "سهولة تعديل أو إلغاء الرحلات، بما في ذلك الحجز الجماعي." }
      ]
    },
    footer: {
      logoText: "سكاي وينج",
      desc: "شريكك للسفر الميسور عالمياً. نجعل أحلام السفر حقيقة مع أفضل العروض والخدمة المميزة.",
      quickLinksTitle:["روابط سريعة"],
      quickLinks: ["من نحن", " اتصل بنا", " جميع الرحلات"],
      workingHoursTitle: ['ساعات العمل'],
      workingHours: [" الاثنين-الخميس :9:00 ص-6:00م", "السبت:1:00ص-4:00م", "الاحد:مغلق"],
      contactTitle:['معلومات الاتصال'],
      contact: { phone: "+1-800-FLIGHT", email: "support@skywing.com", address: "123 عمارة صندل,  كمبالا KM" },
      copyright: "سكاي وينج. جميع الحقوق محفوظة.",
    }
  }
};

//current language
let currentLang = localStorage.getItem("lang") || "en";

//language button
const langBtn = document.getElementById('lang-btn');

// Apply saved language on page load
changeLanguage(currentLang);

// Fetch flights for saved language
fetchData(currentLang);


function changeLanguage(lang) {
  currentLang = lang;

  // Header
  document.querySelectorAll('ul.nav-links li a').forEach((link, i) => link.textContent = texts[lang].header[i]);

  // Landing section
  document.querySelector('.landing h1').textContent = texts[lang].landing.h1;
  document.querySelector('.landing p').textContent = texts[lang].landing.p;
  document.querySelector('.landing button a').textContent = texts[lang].landing.btn;

  // Flights section
  document.querySelector('#flights .section-head h2').textContent = texts[lang].flights.title;
  document.querySelector('#flights .section-head p').textContent = texts[lang].flights.desc;

  // document.querySelector(".filter-title").textContent = texts[lang].flights.filterTitle;
  // document.querySelectorAll('.filter-nav li').forEach((item, i) => item.textContent = texts[lang].flights.filters[i]);
  // document.querySelectorAll('.card .row-3 span').forEach((item,i) => item.textContent = texts[lang].flights.price);
  // document.querySelectorAll('.cards button').forEach(btn => btn.textContent = texts[lang].flights.cardBtn);
  document.querySelector('.see-all').textContent = texts[lang].flights.seeAll;

  // Popular Destinations
  document.querySelector('.popular .section-head h2').textContent = texts[lang].popular.title;
  document.querySelector('.popular .section-head p').textContent = texts[lang].popular.desc;
  document.querySelectorAll('.popular .container .box').forEach((box, i) => {
    box.querySelector('.text h3').innerHTML = `<i class="fa-solid fa-location-dot"></i>${texts[lang].popular.cities[i].city}`;
    box.querySelector('.text span').textContent = texts[lang].popular.cities[i].country;
    box.querySelector('.prise-book button').textContent = texts[lang].popular.bookBtn;
    box.querySelector('.prise-book .start-from').textContent = texts[lang].popular.startFrom;
  });

  // Why Book section
  document.querySelector('.why-me h2').textContent = texts[lang].why.title;
  document.querySelector('.why-me p').textContent = texts[lang].why.desc;
  document.querySelector('.why-me button').textContent = texts[lang].why.btn;

  // Choose Me section
  document.querySelector('.choose-me .section-head h2').textContent = texts[lang].choose.title;
  document.querySelector('.choose-me .section-head p').textContent = texts[lang].choose.desc;
  document.querySelectorAll('.choose-me .parent .child').forEach((box, i) => {
    box.querySelector('h3').textContent = texts[lang].choose.features[i].title;
    box.querySelector('p').textContent = texts[lang].choose.features[i].desc;
  });

  // Footer
  document.querySelector('.content .one h3').innerHTML = `<img src="./flights-imges/shaar1.webp" alt="">${texts[lang].footer.logoText}`;
  document.querySelector('.content .one p').textContent = texts[lang].footer.desc;
  document.querySelector('.two h4').textContent = texts[lang].footer.quickLinksTitle;
  document.querySelectorAll('.two ul li a').forEach((li, i) => li.textContent = texts[lang].footer.quickLinks[i]);
  document.querySelector('.three h4').textContent = texts[lang].footer.workingHoursTitle;
  document.querySelectorAll('.three .text-sm p').forEach((p, i) => p.textContent = texts[lang].footer.workingHours[i]);
  document.querySelector('.four h4').textContent = texts[lang].footer.contactTitle
  document.querySelector('.four h5:nth-child(2)').textContent = texts[lang].footer.contact.phone;
  document.querySelector('.four h5:nth-child(3)').textContent = texts[lang].footer.contact.email;
  document.querySelector('.four p').textContent = texts[lang].footer.contact.address;
  document.querySelector('.footer p .skyWing').textContent = texts[lang].footer.copyright;

  // Direction
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  langBtn.textContent = lang === "ar" ? "English" : "عربي";
}

// localStorage.clear();


//Switch between languages
langBtn.addEventListener('click', () => {
  const newLang = currentLang === "en" ? "ar" : "en";
  localStorage.setItem("lang",newLang);
  changeLanguage(newLang);
  const temp = document.getElementById("template");
  document.querySelector(".cards").innerHTML = null;
  document.querySelector(".cards").appendChild(temp);
  fetchData(newLang)
});



async function fetchData(language) {    
  // fetch data
  const response = await fetch(`data-en.json?nocache=${Date.now()}`)

  // english and arabic data
  const allData = await response.json();

  const flightsData = allData[language]

  const template = document.getElementById("template")
  const wrapper = document.createElement("div");
  wrapper.className = "wrapper";
  flightsData.slice(0,6).forEach(flight => {
      const clone = template.content.cloneNode(true);
      clone.querySelector(".from").textContent = flight.from;
      clone.querySelector(".to").textContent = flight.to;
      clone.querySelector(".airline").textContent = flight.airline;
      clone.querySelector(".date").textContent = flight.date;
      clone.querySelector(".ariv-time").textContent = flight.arivTime;
      clone.querySelector(".dep-time").textContent = flight.depTime;
      clone.querySelector(".duration").textContent = flight.duration;
      clone.querySelector(".price").textContent = flight.price;
      clone.querySelector('.row-3 span').textContent =flight.totalPrice;
      clone.querySelector('.row-3 button').textContent =flight.bookBtn;
      
      wrapper.appendChild(clone);
  });
  document.querySelector(".cards").appendChild(wrapper);
}

// // filter
// let filterBtns = document.querySelectorAll(".filter-nav li");

// filterBtns.forEach(e => {
//     e.addEventListener("click", e => handleFilterClick(e))
// })

// //function to handle filters
// function handleFilterClick(e) {
//     let target = e.target;
//     e.preventDefault();

//     filterBtns.forEach(e => {
//         e.classList.remove("active")
//     })
//     target.classList.add("active")

//     filterFlights(target.dataset.filter);
// }
// // filter flights
// function filterFlights(airline){
//     const allFlights = document.querySelectorAll(".card")
//     if (airline == "all") {
//         allFlights.forEach(el => {
//             el.style.display = ""
//         })
//     } else {
//         allFlights.forEach(el => {
//             if (el.querySelector(".airline").textContent == airline ) {
//                 el.style.display = ""
//             } else {
//                 el.style.display = "none"
//             }
//         })
//     }
// }




// footer with current time
const copyRight = new Date(); 
document.querySelector(".cRight").textContent = copyRight.getFullYear()




