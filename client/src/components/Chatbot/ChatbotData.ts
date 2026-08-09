import type { LucideIcon } from "lucide-react";

import {
  Hand,
  Sun,
  CloudSun,
  Moon,
  Heart,
  Gem,
  Sparkles,
  CircleDot,
  Truck,
  RotateCcw,
  CreditCard,
  BadgeCheck,
  Phone,
  MapPin,
  Package,
  XCircle,
  ShieldCheck,
  ShoppingBag,
  Tag,
  WalletCards,
  Clock,
  CalendarDays,
  User,
  LockKeyhole,
  Search,
  Ruler,
  Gift,
  Wrench,
  Store,
  HelpCircle,
  CheckCircle2,
  Percent,
  Star,
  Crown,
  Palette,
  RefreshCcw,
  MessageCircle
} from "lucide-react";

export interface ChatResponse {
  keywords: string[];
  answer: string;
  icon: LucideIcon;
}

export const chatbotData: ChatResponse[] = [

  /* =========================
     GREETINGS
  ========================= */

  {
    keywords: ["hi", "hello", "hey", "hii", "helo", "namaste"],
    answer:
      "Hello! I'm Aarohi, your HIRANYA Jewellery Assistant. How may I help you today?",
    icon: Hand
  },

  {
    keywords: ["good morning", "morning"],
    answer:
      "Good Morning! Welcome to HIRANYA. How may I assist you?",
    icon: Sun
  },

  {
    keywords: ["good afternoon", "afternoon"],
    answer:
      "Good Afternoon! Welcome to HIRANYA. How may I help you?",
    icon: CloudSun
  },

  {
    keywords: ["good evening", "evening"],
    answer:
      "Good Evening! Welcome to HIRANYA. What would you like to explore?",
    icon: Moon
  },

  {
    keywords: ["bye", "goodbye", "see you"],
    answer:
      "Thank you for visiting HIRANYA. Have a wonderful day!",
    icon: Heart
  },

  {
    keywords: ["thank you", "thanks", "thank"],
    answer:
      "You're most welcome! I'm always happy to help you explore HIRANYA.",
    icon: Heart
  },

  /* =========================
     JEWELLERY TYPES
  ========================= */

  {
    keywords: ["ring", "rings", "engagement ring", "wedding ring"],
    answer:
      "Our Rings collection features elegant designs for everyday wear, engagements and special occasions. You can explore Rings from the Jewellery section.",
    icon: Gem
  },

  {
    keywords: ["necklace", "necklaces", "chain", "chains"],
    answer:
      "Discover our Necklaces and Chains collection, designed with timeless elegance for everyday and special occasions.",
    icon: Sparkles
  },

  {
    keywords: ["earring", "earrings", "ear ring"],
    answer:
      "Our Earrings collection includes elegant designs suitable for everyday wear, parties and special occasions.",
    icon: CircleDot
  },

  {
    keywords: ["bangle", "bangles"],
    answer:
      "Our Bangles collection combines traditional elegance with modern craftsmanship. Explore the latest designs in our Jewellery section.",
    icon: CircleDot
  },

  {
    keywords: ["bracelet", "bracelets"],
    answer:
      "Explore our elegant Bracelet collection, crafted for everyday sophistication and special occasions.",
    icon: CircleDot
  },

  {
    keywords: ["pendant", "pendants"],
    answer:
      "Our Pendants collection offers elegant designs that pair beautifully with different chains and necklaces.",
    icon: Gem
  },

  {
    keywords: ["anklet", "anklets", "payal", "payals"],
    answer:
      "You can explore our Anklets collection for elegant designs inspired by timeless Indian jewellery.",
    icon: CircleDot
  },

  {
    keywords: ["nose pin", "nose pins", "nose ring"],
    answer:
      "Our Nose Pins collection offers delicate designs suitable for both traditional and contemporary looks.",
    icon: Gem
  },

  {
    keywords: ["mangalsutra", "mangalsutras"],
    answer:
      "Explore our Mangalsutra collection featuring elegant designs that blend traditional symbolism with modern styling.",
    icon: Heart
  },

  {
    keywords: ["men", "men's", "mens", "gents", "men jewellery", "men jewellery"],
    answer:
      "HIRANYA also offers jewellery designs for men. Explore the Men's Collection for suitable styles.",
    icon: User
  },

  /* =========================
     METALS
  ========================= */

  {
    keywords: ["gold", "gold jewellery", "gold jewelry"],
    answer:
      "Our Gold jewellery collection features elegant designs crafted for timeless beauty and everyday luxury.",
    icon: Crown
  },

  {
    keywords: ["silver", "silver jewellery", "silver jewelry"],
    answer:
      "Explore our Silver jewellery collection for elegant and versatile designs.",
    icon: Gem
  },

  {
    keywords: ["white gold"],
    answer:
      "White Gold jewellery offers a sophisticated modern appearance with a beautiful light-toned finish.",
    icon: Gem
  },

  {
    keywords: ["rose gold"],
    answer:
      "Rose Gold jewellery offers a warm and romantic tone, perfect for contemporary styling.",
    icon: Heart
  },

  {
    keywords: ["platinum"],
    answer:
      "Platinum is a premium precious metal known for its durability and naturally elegant appearance.",
    icon: Crown
  },

  /* =========================
     COLLECTIONS
  ========================= */

  {
    keywords: [
      "collection",
      "collections",
      "all jewellery",
      "all jewelry",
      "jewellery collection"
    ],
    answer:
      "HIRANYA offers Rings, Necklaces, Earrings, Bracelets, Bangles, Anklets, Nose Pins, Pendants, Mangalsutras and Men's jewellery.",
    icon: Sparkles
  },

  {
    keywords: [
      "new arrival",
      "new arrivals",
      "new jewellery",
      "latest jewellery",
      "latest collection",
      "new products"
    ],
    answer:
      "Visit our New Arrivals section to discover the latest jewellery designs added to HIRANYA.",
    icon: Sparkles
  },

  {
    keywords: ["premium", "luxury", "luxury jewellery"],
    answer:
      "HIRANYA focuses on premium jewellery with elegant designs and a luxury shopping experience.",
    icon: Crown
  },

  /* =========================
     PRICE / OFFERS / COUPONS
  ========================= */

  {
    keywords: [
      "price",
      "prices",
      "cost",
      "how much",
      "expensive",
      "cheap",
      "budget"
    ],
    answer:
      "Jewellery prices vary by design, metal, weight and product specifications. Open a product to view its current price and details.",
    icon: Tag
  },

  {
    keywords: [
      "offer",
      "offers",
      "discount",
      "discounts",
      "sale",
      "deal",
      "deals"
    ],
    answer:
      "You can check the website for currently available offers and promotional discounts.",
    icon: Percent
  },

  {
    keywords: [
      "coupon",
      "coupon code",
      "promo",
      "promo code",
      "voucher"
    ],
    answer:
      "If a coupon is available, you can apply it during checkout in the coupon section to see the applicable discount.",
    icon: Tag
  },

  {
    keywords: ["gift", "gifts", "gift jewellery", "gift jewelry"],
    answer:
      "Jewellery makes a beautiful gift for birthdays, anniversaries, engagements and other special occasions. Explore our collections to find a suitable design.",
    icon: Gift
  },

  /* =========================
     CART / WISHLIST / SHOPPING
  ========================= */

  {
    keywords: ["cart", "shopping cart", "my cart"],
    answer:
      "You can add products to your Cart and review quantities, prices and applicable discounts before checkout.",
    icon: ShoppingBag
  },

  {
    keywords: ["wishlist", "wish list", "saved products", "saved items"],
    answer:
      "You can add your favourite jewellery to the Wishlist and access your saved products later.",
    icon: Heart
  },

  {
    keywords: [
      "buy",
      "purchase",
      "buy jewellery",
      "buy jewelry",
      "how to buy"
    ],
    answer:
      "To purchase jewellery, open a product, select the required options if available, add it to your Cart and continue to Checkout.",
    icon: ShoppingBag
  },

  {
    keywords: ["checkout", "check out"],
    answer:
      "At Checkout you can review your order, apply available coupons, enter delivery details and proceed to payment.",
    icon: CheckCircle2
  },

  /* =========================
     PAYMENT
  ========================= */

  {
    keywords: [
      "payment",
      "payments",
      "pay",
      "paying",
      "payment method",
      "payment methods"
    ],
    answer:
      "HIRANYA supports available online payment methods such as UPI, Debit Cards, Credit Cards and Net Banking.",
    icon: CreditCard
  },

  {
    keywords: ["upi", "upi payment"],
    answer:
      "UPI payments are supported through the available payment gateway during checkout.",
    icon: WalletCards
  },

  {
    keywords: ["card", "credit card", "debit card", "visa", "mastercard"],
    answer:
      "You can use supported Debit Cards and Credit Cards during checkout.",
    icon: CreditCard
  },

  {
    keywords: [
      "cod",
      "cash on delivery",
      "cash delivery",
      "cash on delievery"
    ],
    answer:
      "Cash on Delivery availability depends on the order and delivery location. Please check the available payment options during checkout.",
    icon: WalletCards
  },

  {
    keywords: [
      "razorpay",
      "payment gateway",
      "online payment"
    ],
    answer:
      "Online payments are securely processed through the payment gateway integrated with HIRANYA.",
    icon: ShieldCheck
  },

  /* =========================
     SHIPPING / DELIVERY
  ========================= */

  {
    keywords: [
      "shipping",
      "delivery",
      "deliver",
      "delivery time",
      "shipping time"
    ],
    answer:
      "HIRANYA provides secure delivery with carefully packaged jewellery. Delivery time depends on your location and order.",
    icon: Truck
  },

  {
    keywords: [
      "how long delivery",
      "when will my order arrive",
      "arrival time",
      "delivery date"
    ],
    answer:
      "Your estimated delivery time depends on your location and order. You can check the available delivery information during checkout.",
    icon: CalendarDays
  },

  {
    keywords: [
      "track order",
      "tracking",
      "track my order",
      "order tracking",
      "where is my order"
    ],
    answer:
      "Once your order is shipped, tracking information will be available so you can follow its delivery status.",
    icon: Package
  },

  {
    keywords: [
      "order status",
      "status of order",
      "my order status"
    ],
    answer:
      "You can check your order status through your account/order section once the order has been placed.",
    icon: Package
  },

  /* =========================
     ORDER MANAGEMENT
  ========================= */

  {
    keywords: [
      "cancel order",
      "cancel my order",
      "cancellation",
      "cancel"
    ],
    answer:
      "Orders may be cancelled before dispatch, subject to the applicable order status and cancellation policy.",
    icon: XCircle
  },

  {
    keywords: [
      "return",
      "returns",
      "return product",
      "return item"
    ],
    answer:
      "Returns are available according to HIRANYA's return policy. Please check the applicable product and order conditions.",
    icon: RotateCcw
  },

  {
    keywords: [
      "refund",
      "refunds",
      "money back",
      "refund status"
    ],
    answer:
      "Refunds are processed according to the applicable return and refund policy after the required verification.",
    icon: RefreshCcw
  },

  {
    keywords: [
      "exchange",
      "exchanges",
      "exchange product",
      "replace product"
    ],
    answer:
      "Product exchanges are available according to the applicable exchange policy and product eligibility.",
    icon: RefreshCcw
  },

  /* =========================
     HALLMARK / QUALITY
  ========================= */

  {
    keywords: [
      "hallmark",
      "hallmarked",
      "bis",
      "bis hallmark",
      "certified",
      "certification"
    ],
    answer:
      "Our jewellery quality information and applicable certification details are provided with the relevant product information.",
    icon: BadgeCheck
  },

  {
    keywords: [
      "quality",
      "genuine",
      "authentic",
      "original jewellery",
      "real jewellery"
    ],
    answer:
      "HIRANYA focuses on quality jewellery and provides applicable product specifications and certification information.",
    icon: ShieldCheck
  },

  /* =========================
     WARRANTY
  ========================= */

  {
    keywords: [
      "warranty",
      "guarantee",
      "product warranty"
    ],
    answer:
      "Warranty information depends on the product. Please check the individual product details for applicable warranty coverage.",
    icon: ShieldCheck
  },

  /* =========================
     JEWELLERY CARE
  ========================= */

  {
    keywords: [
      "care",
      "jewellery care",
      "jewelry care",
      "clean jewellery",
      "clean jewelry",
      "clean",
      "cleaning"
    ],
    answer:
      "Store jewellery in a dry, safe box and clean it gently with a soft cloth. Avoid exposing jewellery to harsh chemicals and unnecessary moisture.",
    icon: Wrench
  },

  {
    keywords: [
      "store jewellery",
      "store jewelry",
      "how to store"
    ],
    answer:
      "Keep jewellery separately in a clean, dry jewellery box to reduce scratches and exposure to moisture.",
    icon: ShieldCheck
  },

  /* =========================
     SIZE / FITTING
  ========================= */

  {
    keywords: [
      "size",
      "ring size",
      "jewellery size",
      "jewelry size",
      "fitting",
      "fit"
    ],
    answer:
      "Product size and fitting information is provided on the relevant product page whenever applicable.",
    icon: Ruler
  },

  {
    keywords: [
      "measure ring",
      "ring measurement",
      "measure ring size"
    ],
    answer:
      "For the most accurate ring size, follow the sizing guidance provided with the relevant product or use a proper ring-sizing method.",
    icon: Ruler
  },

  /* =========================
     CUSTOM DESIGN
  ========================= */

  {
    keywords: [
      "custom",
      "custom design",
      "custom jewellery",
      "custom jewelry",
      "customise",
      "customize",
      "personalized",
      "personalised"
    ],
    answer:
      "HIRANYA offers a Custom Design experience where you can explore personalised jewellery requirements.",
    icon: Palette
  },

  {
    keywords: [
      "custom order",
      "custom jewellery order",
      "personalized jewellery"
    ],
    answer:
      "For a custom jewellery requirement, use the Custom Design section and provide your preferred design details.",
    icon: Palette
  },

  /* =========================
     STORE / LOCATION
  ========================= */

  {
    keywords: [
      "store",
      "stores",
      "shop",
      "showroom",
      "offline store"
    ],
    answer:
      "You can check the Store Locator section to find available HIRANYA store locations.",
    icon: Store
  },

  {
    keywords: [
      "location",
      "locations",
      "address",
      "where is store",
      "store location"
    ],
    answer:
      "Please visit the Store Locator section to find available HIRANYA locations and addresses.",
    icon: MapPin
  },

  /* =========================
     CONTACT / SUPPORT
  ========================= */

  {
    keywords: [
      "contact",
      "contact us",
      "support",
      "customer support",
      "help",
      "customer care"
    ],
    answer:
      "For customer support, please visit the Contact page where the available support details are provided.",
    icon: Phone
  },

  {
    keywords: [
      "email",
      "email support",
      "mail"
    ],
    answer:
      "Please visit the Contact page for the official HIRANYA support email details.",
    icon: MessageCircle
  },

  {
    keywords: [
      "phone",
      "phone number",
      "mobile number",
      "call"
    ],
    answer:
      "Please visit the Contact page for the official HIRANYA customer support number.",
    icon: Phone
  },

  /* =========================
     ACCOUNT
  ========================= */

  {
    keywords: [
      "login",
      "log in",
      "sign in",
      "signin"
    ],
    answer:
      "You can sign in using the Login option in the HIRANYA account section.",
    icon: User
  },

  {
    keywords: [
      "signup",
      "sign up",
      "register",
      "create account",
      "new account"
    ],
    answer:
      "You can create a new HIRANYA account using the Sign Up option.",
    icon: User
  },

  {
    keywords: [
      "password",
      "forgot password",
      "reset password"
    ],
    answer:
      "Use the password reset option on the Login page to recover your account.",
    icon: LockKeyhole
  },

  {
    keywords: [
      "account",
      "my account",
      "profile"
    ],
    answer:
      "Your account section allows you to manage your profile and access your order-related information.",
    icon: User
  },

  /* =========================
     SEARCH
  ========================= */

  {
    keywords: [
      "search",
      "find product",
      "find jewellery",
      "find jewelry"
    ],
    answer:
      "You can use the website search to find jewellery by product name or available categories.",
    icon: Search
  },

  /* =========================
     REVIEWS
  ========================= */

  {
    keywords: [
      "review",
      "reviews",
      "rating",
      "ratings"
    ],
    answer:
      "Product reviews and ratings, when available, can help you evaluate a jewellery piece before purchasing.",
    icon: Star
  },

  /* =========================
     GENERAL BRAND QUESTIONS
  ========================= */

  {
    keywords: [
      "hiranya",
      "about hiranya",
      "about"
    ],
    answer:
      "HIRANYA is a premium jewellery platform offering elegant jewellery collections and a luxury shopping experience.",
    icon: Crown
  },

  {
    keywords: [
      "jewellery",
      "jewelry",
      "jewellery website",
      "jewelry website"
    ],
    answer:
      "HIRANYA offers a wide range of jewellery including Rings, Necklaces, Earrings, Bangles, Bracelets, Pendants, Anklets, Nose Pins and Mangalsutras.",
    icon: Gem
  },

  /* =========================
     HELP / FALLBACK INTENT
  ========================= */

  {
    keywords: [
      "what can you do",
      "what can i ask",
      "how can you help",
      "help me"
    ],
    answer:
      "I can help with jewellery collections, metals, products, prices, offers, coupons, cart, wishlist, checkout, payments, shipping, order tracking, returns, exchanges, warranty, jewellery care, custom designs, stores and customer support.",
    icon: HelpCircle
  }
];