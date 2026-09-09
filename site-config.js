/*
========================================================
 EASY WEBSITE EDITOR
 ========================================================
এই ফাইলটি খুলে সরাসরি তথ্য পরিবর্তন করুন।
কোডিং জানার প্রয়োজন নেই।

১) BRAND_NAME = আপনার ব্যবসার নাম
২) LOGO = আপনার logo image URL
৩) PRODUCTS-এর ভিতরে খাবার যোগ/মুছে/পরিবর্তন করুন।

ছবির জন্য:
- অনলাইনের image URL দিতে পারেন
- অথবা assets folder-এ ছবি রেখে: assets/your-food.jpg লিখতে পারেন

প্রতিটি product:
name       = খাবারের নাম
price      = দাম
image      = ছবির URL / assets/filename.jpg
category   = category
description= খাবারের ছোট বর্ণনা
available  = true/false

Foodpanda/Pathao link প্রতিটি খাবারের জন্য আলাদা দেওয়া যাবে।
========================================================
*/

const SITE_CONFIG = {
  BRAND_NAME: "কাচ্চি ভাই",
  TAGLINE: "Taste of Traditional Kacchi",

  LOGO: "assets/logo.webp",

  PHONE: "+880 1700-000000",
  EMAIL: "hello@example.com",
  ADDRESS: "ঢাকা, বাংলাদেশ",

  // আপনার WhatsApp নম্বর: +880 দিয়ে লিখুন
  WHATSAPP: "+8801718528106",
  DELIVERY_CHARGE: 0,

  HERO_TITLE: "ঐতিহ্যের স্বাদ,<br><em>কাচ্চির ভালোবাসা</em>",
  HERO_TEXT: "সুগন্ধি বাসমতি চাল, নরম মাংস এবং ঘরোয়া মসলার নিখুঁত সমন্বয়।",

  FOODPANDA_LINK: "https://www.foodpanda.com.bd/",
  PATHAO_LINK: "https://food.pathao.com/",

  CATEGORIES: ["সব", "কাচ্চি", "বিরিয়ানি", "চিকেন", "ড্রিংকস"],

  PRODUCTS: [
    {
      name: "মাটন কাচ্চি",
      category: "কাচ্চি",
      price: 320,
      image: "https://images.unsplash.com/photo-1599043513900-ed6fe01d3833?auto=format&fit=crop&w=900&q=80",
      description: "সুগন্ধি বাসমতি চাল ও নরম মাটনের ঐতিহ্যবাহী কাচ্চি।",
      available: true,
      badge: "Best Seller",
      offerPrice: "",
      foodpanda: "",
      pathao: ""
    },

    {
      name: "চিকেন কাচ্চি",
      category: "কাচ্চি",
      price: 260,
      image: "https://images.unsplash.com/photo-1563379091339-03246963d51a?auto=format&fit=crop&w=900&q=80",
      description: "মসলাদার চিকেন ও সুগন্ধি চালের দারুণ সমন্বয়।",
      available: true,
      badge: "",
      offerPrice: "",
      foodpanda: "",
      pathao: ""
    },

    {
      name: "চিকেন বিরিয়ানি",
      category: "বিরিয়ানি",
      price: 240,
      image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=900&q=80",
      description: "দেশি মসলায় রান্না করা ঘ্রাণযুক্ত চিকেন বিরিয়ানি।",
      available: true,
      badge: "",
      offerPrice: "",
      foodpanda: "",
      pathao: ""
    },

    {
      name: "চিকেন রোস্ট",
      category: "চিকেন",
      price: 180,
      image: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=900&q=80",
      description: "নরম ও রসালো চিকেন রোস্ট।",
      available: true,
      badge: "",
      offerPrice: "",
      foodpanda: "",
      pathao: ""
    },

    {
      name: "বোরহানি",
      category: "ড্রিংকস",
      price: 80,
      image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=900&q=80",
      description: "মসলাদার ঠান্ডা বোরহানি।",
      available: true,
      badge: "",
      offerPrice: "",
      foodpanda: "",
      pathao: ""
    }
  ]
};
