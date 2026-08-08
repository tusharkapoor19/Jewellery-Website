export interface ChatResponse {
  keywords: string[];
  answer: string;
}

export const chatbotData: ChatResponse[] = [
  {
    keywords: ["hi", "hello", "hey", "hii", "helo"],
    answer:
      "👋 Hello! I'm Aarohi, your HIRANYA Jewellery Assistant. How may I help you today?"
  },

  {
    keywords: ["good morning"],
    answer: "☀️ Good Morning! Welcome to HIRANYA."
  },

  {
    keywords: ["good afternoon"],
    answer: "🌤️ Good Afternoon! Hope you're having a wonderful day."
  },

  {
    keywords: ["good evening"],
    answer: "🌙 Good Evening! Welcome to HIRANYA."
  },

  {
    keywords: ["bye", "goodbye"],
    answer: "💛 Thank you for visiting HIRANYA. Have a wonderful day!"
  },

  {
    keywords: ["ring", "rings"],
    answer:
      "💍 Explore our premium Rings collection from the Collections section."
  },

  {
    keywords: ["necklace", "necklaces"],
    answer:
      "✨ Discover handcrafted Necklaces designed with timeless elegance."
  },

  {
    keywords: ["earring", "earrings"],
    answer:
      "🌸 Browse our beautiful Earrings collection for every occasion."
  },

  {
    keywords: ["bangle", "bangles"],
    answer:
      "💫 Our Bangles collection blends tradition with modern craftsmanship."
  },

  {
    keywords: ["bracelet", "bracelets"],
    answer:
      "✨ Elegant Bracelets are available in our latest collections."
  },

  {
    keywords: ["pendant", "pendants"],
    answer:
      "💎 Find premium Pendants crafted for everyday elegance."
  },

  {
    keywords: ["collection", "collections"],
    answer:
      "✨ We offer Rings, Necklaces, Earrings, Bangles, Pendants and Men's Collection."
  },

  {
    keywords: ["new", "arrival", "arrivals"],
    answer:
      "🆕 Visit our New Arrivals section to discover the latest jewellery."
  },

  {
    keywords: ["shipping", "delivery"],
    answer:
      "🚚 We provide secure delivery across India with safe packaging."
  },

  {
    keywords: ["return", "refund", "exchange"],
    answer:
      "🔄 Easy returns and exchanges are available according to our policy."
  },

  {
    keywords: ["payment", "upi", "card", "cod"],
    answer:
      "💳 We support UPI, Debit Cards, Credit Cards and Net Banking."
  },

  {
    keywords: ["hallmark", "bis", "certified"],
    answer:
      "✔️ Every jewellery piece is BIS Hallmarked and quality certified."
  },

  {
    keywords: ["contact", "support", "email", "phone"],
    answer:
      "📞 Please visit our Contact page for customer support details."
  },

  {
    keywords: ["location", "address", "store"],
    answer:
      "📍 Our store locations will be available on the Contact page."
  },

  {
    keywords: ["track", "tracking", "order"],
    answer:
      "📦 Order tracking will be available once your order is shipped."
  },

  {
    keywords: ["cancel"],
    answer:
      "❌ Orders can be cancelled before dispatch."
  },

  {
    keywords: ["care", "clean"],
    answer:
      "✨ Store jewellery in a dry box and clean it gently with a soft cloth."
  },

  {
    keywords: ["warranty"],
    answer:
      "🛡️ Warranty information is available on the product details page."
  }
];