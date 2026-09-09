# Easy Editable Restaurant Website

এই version-এ কোনো Admin Panel নেই।

সব পরিবর্তন করার জন্য শুধু `site-config.js` ফাইলটি খুলবেন।

## সবচেয়ে সহজ পরিবর্তন

### Restaurant / Brand name
`BRAND_NAME: "কাচ্চি ভাই"`

### Logo
`LOGO: "assets/logo.webp"`

আপনার নতুন logo `assets` folder-এ রাখলে:
`LOGO: "assets/new-logo.png"`

অথবা online image URL:
`LOGO: "https://example.com/logo.png"`

### Phone / Email / Address
`PHONE`, `EMAIL`, `ADDRESS`

### Hero
`HERO_TITLE`, `HERO_TEXT`

### Food / Menu
`PRODUCTS`-এর প্রতিটি object একটি খাবার।

যেমন:
{
  name: "বিফ তেহারি",
  category: "বিরিয়ানি",
  price: 280,
  image: "assets/beef-tehari.jpg",
  description: "সুস্বাদু বিফ তেহারি।",
  available: true,
  badge: "New",
  offerPrice: "",
  foodpanda: "",
  pathao: ""
}

নতুন খাবার যোগ করতে এই block copy করে নিচে paste করে তথ্য বদলাবেন।
খাবার মুছতে ওই block মুছে দেবেন।

### Category
`CATEGORIES: ["সব", "কাচ্চি", "বিরিয়ানি", "চিকেন", "ড্রিংকস"]`

এখানে নতুন category যোগ করা যাবে।

### Price
`price: 320`

### Offer Price
`offerPrice: 280`

Offer না থাকলে:
`offerPrice: ""`

### Food image
লোকাল ছবি:
`image: "assets/food1.jpg"`

Online ছবি:
`image: "https://example.com/food1.jpg"`

### Foodpanda / Pathao
প্রতিটি খাবারের জন্য আলাদা link দেওয়া যাবে:
`foodpanda: "..."`,
`pathao: "..."`

ফাঁকা রাখলে website-এর global link ব্যবহার করা যাবে।

## কোনো Admin Panel নেই
Website-এর footer-এও Admin link নেই।

## Branch নেই
এই version-এ Branch/শাখা section বা branch management নেই।


## WhatsApp Direct Order
This version uses a zero-API WhatsApp flow. Customer adds food to cart, enters name/phone/address, and the website opens WhatsApp with a pre-filled order message. Customer presses Send; you confirm the order in WhatsApp.

Set your WhatsApp number in `site-config.js`:
`WHATSAPP: "+8801XXXXXXXXX"`

No admin panel, product management, table booking, SMS gateway, or payment gateway is required.
