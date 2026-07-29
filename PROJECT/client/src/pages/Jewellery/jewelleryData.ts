// jewelleryData.ts

export interface JewelleryProduct {
  id: number;
  name: string;
  category: string;
  image: string;
  price: number;
  weight: string;
  purity: string;
  description: string;
}

export const jewelleryProducts: JewelleryProduct[] = [

  // ===========================
  // RINGS (101-108)
  // ===========================

  {
    id: 101,
    name: "Royal Diamond Ring",
    category: "rings",
    image: "ring1.jpg",
    price: 58999,
    weight: "4.8 g",
    purity: "18K Gold",
    description: "Elegant diamond ring crafted with premium 18K gold for timeless luxury."
  },

  {
    id: 102,
    name: "Classic Gold Ring",
    category: "rings",
    image: "ring2.jpg",
    price: 42999,
    weight: "4.2 g",
    purity: "22K Gold",
    description: "Traditional handcrafted gold ring with a luxurious finish."
  },

  {
    id: 103,
    name: "Emerald Halo Ring",
    category: "rings",
    image: "ring3.jpg",
    price: 76999,
    weight: "5.3 g",
    purity: "18K Gold",
    description: "Beautiful emerald centerpiece surrounded by sparkling diamonds."
  },

  {
    id: 104,
    name: "Rose Gold Promise Ring",
    category: "rings",
    image: "ring4.jpg",
    price: 34999,
    weight: "3.9 g",
    purity: "18K Gold",
    description: "Minimal rose gold ring designed for everyday elegance."
  },

  {
    id: 105,
    name: "Infinity Diamond Ring",
    category: "rings",
    image: "ring5.jpg",
    price: 61999,
    weight: "4.7 g",
    purity: "18K Gold",
    description: "Infinity-inspired diamond ring symbolizing everlasting love."
  },

  {
    id: 106,
    name: "Vintage Floral Ring",
    category: "rings",
    image: "ring6.jpg",
    price: 48999,
    weight: "4.5 g",
    purity: "22K Gold",
    description: "Vintage floral design crafted with exceptional craftsmanship."
  },

  {
    id: 107,
    name: "Ruby Crown Ring",
    category: "rings",
    image: "ring7.jpg",
    price: 83999,
    weight: "5.8 g",
    purity: "18K Gold",
    description: "Royal ruby ring featuring a luxurious crown-inspired design."
  },

  {
    id: 108,
    name: "Minimal Solitaire Ring",
    category: "rings",
    image: "ring8.jpg",
    price: 52999,
    weight: "4.1 g",
    purity: "18K Gold",
    description: "Classic solitaire ring with timeless elegance and brilliance."
  },

    // ===========================
  // EARRINGS (201-208)
  // ===========================

  {
    id: 201,
    name: "Diamond Stud Earrings",
    category: "earrings",
    image: "earring1.jpg",
    price: 38999,
    weight: "3.5 g",
    purity: "18K Gold",
    description: "Classic diamond stud earrings crafted for timeless elegance."
  },

  {
    id: 202,
    name: "Pearl Drop Earrings",
    category: "earrings",
    image: "earring2.jpg",
    price: 42999,
    weight: "4.0 g",
    purity: "18K Gold",
    description: "Premium pearl drop earrings with a graceful modern finish."
  },

  {
    id: 203,
    name: "Ruby Hoop Earrings",
    category: "earrings",
    image: "earring3.jpg",
    price: 51999,
    weight: "4.6 g",
    purity: "22K Gold",
    description: "Elegant ruby hoop earrings handcrafted with luxurious detailing."
  },

  {
    id: 204,
    name: "Emerald Bloom Earrings",
    category: "earrings",
    image: "earring4.jpg",
    price: 56999,
    weight: "4.8 g",
    purity: "18K Gold",
    description: "Emerald floral earrings designed for festive celebrations."
  },

  {
    id: 205,
    name: "Rose Gold Heart Earrings",
    category: "earrings",
    image: "earring5.jpg",
    price: 35999,
    weight: "3.7 g",
    purity: "18K Gold",
    description: "Romantic heart-shaped earrings crafted in premium rose gold."
  },

  {
    id: 206,
    name: "Royal Chandbali Earrings",
    category: "earrings",
    image: "earring6.jpg",
    price: 74999,
    weight: "7.1 g",
    purity: "22K Gold",
    description: "Traditional chandbali earrings inspired by royal heritage."
  },

  {
    id: 207,
    name: "Sapphire Halo Earrings",
    category: "earrings",
    image: "earring7.jpg",
    price: 68999,
    weight: "5.3 g",
    purity: "18K Gold",
    description: "Brilliant sapphire halo earrings with sparkling diamonds."
  },

  {
    id: 208,
    name: "Minimal Gold Hoops",
    category: "earrings",
    image: "earring8.jpg",
    price: 31999,
    weight: "3.3 g",
    purity: "22K Gold",
    description: "Minimal gold hoop earrings perfect for everyday elegance."
  },

    // ===========================
  // NECKLACES (301-308)
  // ===========================

  {
    id: 301,
    name: "Royal Diamond Necklace",
    category: "necklaces",
    image: "necklace1.jpg",
    price: 149999,
    weight: "18.5 g",
    purity: "18K Gold",
    description: "Luxurious diamond necklace crafted to enhance every grand celebration."
  },

  {
    id: 302,
    name: "Emerald Heritage Necklace",
    category: "necklaces",
    image: "necklace2.jpg",
    price: 164999,
    weight: "19.8 g",
    purity: "22K Gold",
    description: "Traditional emerald necklace inspired by royal heritage designs."
  },

  {
    id: 303,
    name: "Pearl Grace Necklace",
    category: "necklaces",
    image: "necklace3.jpg",
    price: 124999,
    weight: "16.9 g",
    purity: "18K Gold",
    description: "Elegant pearl necklace crafted for timeless sophistication."
  },

  {
    id: 304,
    name: "Ruby Floral Necklace",
    category: "necklaces",
    image: "necklace4.jpg",
    price: 179999,
    weight: "21.2 g",
    purity: "22K Gold",
    description: "Beautiful ruby floral necklace handcrafted for festive occasions."
  },

  {
    id: 305,
    name: "Rose Gold Infinity Necklace",
    category: "necklaces",
    image: "necklace5.jpg",
    price: 139999,
    weight: "17.4 g",
    purity: "18K Gold",
    description: "Modern infinity necklace designed with luxurious rose gold finish."
  },

  {
    id: 306,
    name: "Sapphire Elegance Necklace",
    category: "necklaces",
    image: "necklace6.jpg",
    price: 194999,
    weight: "22.1 g",
    purity: "18K Gold",
    description: "Premium sapphire necklace surrounded by brilliant diamonds."
  },

  {
    id: 307,
    name: "Temple Gold Necklace",
    category: "necklaces",
    image: "necklace7.jpg",
    price: 214999,
    weight: "24.5 g",
    purity: "22K Gold",
    description: "Traditional temple jewellery necklace showcasing intricate craftsmanship."
  },

  {
    id: 308,
    name: "Minimal Solitaire Necklace",
    category: "necklaces",
    image: "necklace8.jpg",
    price: 118999,
    weight: "15.8 g",
    purity: "18K Gold",
    description: "Minimal solitaire necklace perfect for everyday luxury."
  },
    // ===========================
  // PENDANTS (401-408)
  // ===========================

  {
    id: 401,
    name: "Diamond Solitaire Pendant",
    category: "pendants",
    image: "pendant1.jpg",
    price: 48999,
    weight: "4.1 g",
    purity: "18K Gold",
    description: "Elegant solitaire diamond pendant crafted to add timeless sophistication."
  },

  {
    id: 402,
    name: "Emerald Leaf Pendant",
    category: "pendants",
    image: "pendant2.jpg",
    price: 52999,
    weight: "4.5 g",
    purity: "18K Gold",
    description: "Nature-inspired emerald pendant featuring graceful leaf detailing."
  },

  {
    id: 403,
    name: "Ruby Heart Pendant",
    category: "pendants",
    image: "pendant3.jpg",
    price: 46999,
    weight: "3.9 g",
    purity: "22K Gold",
    description: "Romantic ruby heart pendant symbolizing everlasting love."
  },

  {
    id: 404,
    name: "Pearl Bloom Pendant",
    category: "pendants",
    image: "pendant4.jpg",
    price: 44999,
    weight: "3.8 g",
    purity: "18K Gold",
    description: "Premium pearl pendant with a delicate floral-inspired design."
  },

  {
    id: 405,
    name: "Infinity Gold Pendant",
    category: "pendants",
    image: "pendant5.jpg",
    price: 41999,
    weight: "3.6 g",
    purity: "22K Gold",
    description: "Minimal infinity pendant crafted for everyday elegance."
  },

  {
    id: 406,
    name: "Royal Sapphire Pendant",
    category: "pendants",
    image: "pendant6.jpg",
    price: 62999,
    weight: "4.9 g",
    purity: "18K Gold",
    description: "Luxurious sapphire pendant surrounded by sparkling diamonds."
  },

  {
    id: 407,
    name: "Temple Gold Pendant",
    category: "pendants",
    image: "pendant7.jpg",
    price: 58999,
    weight: "5.2 g",
    purity: "22K Gold",
    description: "Traditional temple pendant showcasing intricate handcrafted artistry."
  },

  {
    id: 408,
    name: "Minimal Diamond Pendant",
    category: "pendants",
    image: "pendant8.jpg",
    price: 39999,
    weight: "3.4 g",
    purity: "18K Gold",
    description: "Modern minimalist diamond pendant designed for effortless luxury."
  },
    // ===========================
  // MANGALSUTRA (501-508)
  // ===========================

  {
    id: 501,
    name: "Classic Diamond Mangalsutra",
    category: "mangalsutra",
    image: "mangalsutra1.jpg",
    price: 72999,
    weight: "6.8 g",
    purity: "18K Gold",
    description: "Elegant diamond mangalsutra crafted to celebrate timeless love and tradition."
  },

  {
    id: 502,
    name: "Royal Gold Mangalsutra",
    category: "mangalsutra",
    image: "mangalsutra2.jpg",
    price: 68999,
    weight: "6.5 g",
    purity: "22K Gold",
    description: "Traditional gold mangalsutra featuring intricate handcrafted detailing."
  },

  {
    id: 503,
    name: "Pearl Grace Mangalsutra",
    category: "mangalsutra",
    image: "mangalsutra3.jpg",
    price: 74999,
    weight: "7.2 g",
    purity: "18K Gold",
    description: "Premium pearl mangalsutra blending elegance with modern craftsmanship."
  },

  {
    id: 504,
    name: "Rose Gold Infinity Mangalsutra",
    category: "mangalsutra",
    image: "mangalsutra4.jpg",
    price: 79999,
    weight: "7.4 g",
    purity: "18K Gold",
    description: "Infinity-inspired rose gold mangalsutra symbolizing everlasting commitment."
  },

  {
    id: 505,
    name: "Ruby Floral Mangalsutra",
    category: "mangalsutra",
    image: "mangalsutra5.jpg",
    price: 83999,
    weight: "7.8 g",
    purity: "22K Gold",
    description: "Beautiful ruby floral mangalsutra designed for festive and bridal occasions."
  },

  {
    id: 506,
    name: "Temple Heritage Mangalsutra",
    category: "mangalsutra",
    image: "mangalsutra6.jpg",
    price: 88999,
    weight: "8.3 g",
    purity: "22K Gold",
    description: "Traditional temple-style mangalsutra showcasing rich Indian craftsmanship."
  },

  {
    id: 507,
    name: "Emerald Elegance Mangalsutra",
    category: "mangalsutra",
    image: "mangalsutra7.jpg",
    price: 92999,
    weight: "8.6 g",
    purity: "18K Gold",
    description: "Elegant emerald mangalsutra crafted for luxurious everyday wear."
  },

  {
    id: 508,
    name: "Solitaire Luxury Mangalsutra",
    category: "mangalsutra",
    image: "mangalsutra8.jpg",
    price: 97999,
    weight: "9.1 g",
    purity: "18K Gold",
    description: "Premium solitaire mangalsutra featuring brilliant diamond craftsmanship."
  },
    // ===========================
  // CHAINS (601-608)
  // ===========================

  {
    id: 601,
    name: "Classic Gold Chain",
    category: "chains",
    image: "chain1.jpg",
    price: 56999,
    weight: "8.4 g",
    purity: "22K Gold",
    description: "A timeless classic gold chain crafted with premium 22K gold for everyday elegance."
  },

  {
    id: 602,
    name: "Italian Rope Chain",
    category: "chains",
    image: "chain2.jpg",
    price: 62999,
    weight: "9.1 g",
    purity: "22K Gold",
    description: "Premium Italian rope chain featuring exceptional craftsmanship and luxurious shine."
  },

  {
    id: 603,
    name: "Diamond Link Chain",
    category: "chains",
    image: "chain3.jpg",
    price: 78999,
    weight: "8.8 g",
    purity: "18K Gold",
    description: "Elegant diamond link chain designed for a sophisticated modern look."
  },

  {
    id: 604,
    name: "Rose Gold Chain",
    category: "chains",
    image: "chain4.jpg",
    price: 59999,
    weight: "8.2 g",
    purity: "18K Gold",
    description: "Minimal rose gold chain offering timeless beauty and everyday comfort."
  },

  {
    id: 605,
    name: "Box Link Gold Chain",
    category: "chains",
    image: "chain5.jpg",
    price: 65999,
    weight: "9.5 g",
    purity: "22K Gold",
    description: "Premium box link chain crafted with precision for a bold luxury statement."
  },

  {
    id: 606,
    name: "Twisted Designer Chain",
    category: "chains",
    image: "chain6.jpg",
    price: 71999,
    weight: "10.2 g",
    purity: "22K Gold",
    description: "Designer twisted gold chain blending traditional artistry with modern elegance."
  },

  {
    id: 607,
    name: "Royal Heritage Chain",
    category: "chains",
    image: "chain7.jpg",
    price: 86999,
    weight: "11.4 g",
    purity: "22K Gold",
    description: "Luxury heritage-inspired chain handcrafted for grand celebrations and special occasions."
  },

  {
    id: 608,
    name: "Minimal Luxury Chain",
    category: "chains",
    image: "chain8.jpg",
    price: 54999,
    weight: "7.9 g",
    purity: "18K Gold",
    description: "Elegant minimal chain crafted for everyday sophistication with a premium finish."
  },
    // ===========================
  // BRACELETS (701-708)
  // ===========================

  {
    id: 701,
    name: "Classic Gold Bracelet",
    category: "bracelets",
    image: "bracelet1.jpg",
    price: 58999,
    weight: "8.2 g",
    purity: "22K Gold",
    description: "Elegant classic gold bracelet crafted with premium 22K gold for timeless everyday luxury."
  },

  {
    id: 702,
    name: "Diamond Tennis Bracelet",
    category: "bracelets",
    image: "bracelet2.jpg",
    price: 124999,
    weight: "9.4 g",
    purity: "18K Gold",
    description: "Sparkling diamond tennis bracelet designed to complement every special occasion."
  },

  {
    id: 703,
    name: "Rose Gold Infinity Bracelet",
    category: "bracelets",
    image: "bracelet3.jpg",
    price: 64999,
    weight: "7.8 g",
    purity: "18K Gold",
    description: "Beautiful infinity bracelet crafted in luxurious rose gold with a modern finish."
  },

  {
    id: 704,
    name: "Emerald Charm Bracelet",
    category: "bracelets",
    image: "bracelet4.jpg",
    price: 78999,
    weight: "8.9 g",
    purity: "18K Gold",
    description: "Premium emerald charm bracelet handcrafted for elegance and sophistication."
  },

  {
    id: 705,
    name: "Ruby Link Bracelet",
    category: "bracelets",
    image: "bracelet5.jpg",
    price: 86999,
    weight: "9.7 g",
    purity: "22K Gold",
    description: "Luxurious ruby link bracelet featuring intricate handcrafted detailing."
  },

  {
    id: 706,
    name: "Royal Heritage Bracelet",
    category: "bracelets",
    image: "bracelet6.jpg",
    price: 98999,
    weight: "10.6 g",
    purity: "22K Gold",
    description: "Traditional royal bracelet inspired by timeless heritage jewellery designs."
  },

  {
    id: 707,
    name: "Pearl Elegance Bracelet",
    category: "bracelets",
    image: "bracelet7.jpg",
    price: 72999,
    weight: "8.4 g",
    purity: "18K Gold",
    description: "Elegant pearl bracelet designed to add grace and luxury to every outfit."
  },

  {
    id: 708,
    name: "Minimal Diamond Bracelet",
    category: "bracelets",
    image: "bracelet8.jpg",
    price: 67999,
    weight: "7.6 g",
    purity: "18K Gold",
    description: "Minimal diamond bracelet combining modern simplicity with timeless brilliance."
  },
    // ===========================
  // BRACELETS (701-708)
  // ===========================

  {
    id: 701,
    name: "Classic Gold Bracelet",
    category: "bracelets",
    image: "bracelet1.jpg",
    price: 58999,
    weight: "8.2 g",
    purity: "22K Gold",
    description: "Elegant classic gold bracelet crafted with premium 22K gold for timeless everyday luxury."
  },

  {
    id: 702,
    name: "Diamond Tennis Bracelet",
    category: "bracelets",
    image: "bracelet2.jpg",
    price: 124999,
    weight: "9.4 g",
    purity: "18K Gold",
    description: "Sparkling diamond tennis bracelet designed to complement every special occasion."
  },

  {
    id: 703,
    name: "Rose Gold Infinity Bracelet",
    category: "bracelets",
    image: "bracelet3.jpg",
    price: 64999,
    weight: "7.8 g",
    purity: "18K Gold",
    description: "Beautiful infinity bracelet crafted in luxurious rose gold with a modern finish."
  },

  {
    id: 704,
    name: "Emerald Charm Bracelet",
    category: "bracelets",
    image: "bracelet4.jpg",
    price: 78999,
    weight: "8.9 g",
    purity: "18K Gold",
    description: "Premium emerald charm bracelet handcrafted for elegance and sophistication."
  },

  {
    id: 705,
    name: "Ruby Link Bracelet",
    category: "bracelets",
    image: "bracelet5.jpg",
    price: 86999,
    weight: "9.7 g",
    purity: "22K Gold",
    description: "Luxurious ruby link bracelet featuring intricate handcrafted detailing."
  },

  {
    id: 706,
    name: "Royal Heritage Bracelet",
    category: "bracelets",
    image: "bracelet6.jpg",
    price: 98999,
    weight: "10.6 g",
    purity: "22K Gold",
    description: "Traditional royal bracelet inspired by timeless heritage jewellery designs."
  },

  {
    id: 707,
    name: "Pearl Elegance Bracelet",
    category: "bracelets",
    image: "bracelet7.jpg",
    price: 72999,
    weight: "8.4 g",
    purity: "18K Gold",
    description: "Elegant pearl bracelet designed to add grace and luxury to every outfit."
  },

  {
    id: 708,
    name: "Minimal Diamond Bracelet",
    category: "bracelets",
    image: "bracelet8.jpg",
    price: 67999,
    weight: "7.6 g",
    purity: "18K Gold",
    description: "Minimal diamond bracelet combining modern simplicity with timeless brilliance."
  },
    // ===========================
  // BANGLES (801-808)
  // ===========================

  {
    id: 801,
    name: "Classic Gold Bangles",
    category: "bangles",
    image: "bangle1.jpg",
    price: 84999,
    weight: "11.8 g",
    purity: "22K Gold",
    description: "Timeless handcrafted gold bangles designed to celebrate tradition with elegance."
  },

  {
    id: 802,
    name: "Diamond Sparkle Bangles",
    category: "bangles",
    image: "bangle2.jpg",
    price: 149999,
    weight: "12.6 g",
    purity: "18K Gold",
    description: "Luxurious diamond bangles crafted with exceptional brilliance for grand occasions."
  },

  {
    id: 803,
    name: "Rose Gold Floral Bangles",
    category: "bangles",
    image: "bangle3.jpg",
    price: 96999,
    weight: "10.9 g",
    purity: "18K Gold",
    description: "Beautiful floral bangles in rose gold offering a perfect blend of elegance and style."
  },

  {
    id: 804,
    name: "Emerald Royal Bangles",
    category: "bangles",
    image: "bangle4.jpg",
    price: 138999,
    weight: "13.4 g",
    purity: "22K Gold",
    description: "Royal emerald bangles featuring intricate handcrafted artistry and premium gemstones."
  },

  {
    id: 805,
    name: "Ruby Heritage Bangles",
    category: "bangles",
    image: "bangle5.jpg",
    price: 156999,
    weight: "14.1 g",
    purity: "22K Gold",
    description: "Traditional ruby bangles inspired by India's rich jewellery heritage."
  },

  {
    id: 806,
    name: "Pearl Grace Bangles",
    category: "bangles",
    image: "bangle6.jpg",
    price: 118999,
    weight: "11.5 g",
    purity: "18K Gold",
    description: "Elegant pearl bangles designed to add timeless charm to every celebration."
  },

  {
    id: 807,
    name: "Temple Designer Bangles",
    category: "bangles",
    image: "bangle7.jpg",
    price: 169999,
    weight: "15.3 g",
    purity: "22K Gold",
    description: "Temple-inspired designer bangles handcrafted with intricate traditional detailing."
  },

  {
    id: 808,
    name: "Minimal Diamond Bangles",
    category: "bangles",
    image: "bangle8.jpg",
    price: 109999,
    weight: "10.7 g",
    purity: "18K Gold",
    description: "Modern minimalist diamond bangles perfect for everyday luxury and sophistication."
  },
    // ===========================
  // NOSE PINS (901-908)
  // ===========================

  {
    id: 901,
    name: "Classic Diamond Nose Pin",
    category: "nose-pins",
    image: "nosepin1.jpg",
    price: 18999,
    weight: "1.2 g",
    purity: "18K Gold",
    description: "Elegant diamond nose pin crafted to add timeless charm and sophistication."
  },

  {
    id: 902,
    name: "Floral Gold Nose Pin",
    category: "nose-pins",
    image: "nosepin2.jpg",
    price: 16999,
    weight: "1.1 g",
    purity: "22K Gold",
    description: "Beautiful floral gold nose pin inspired by traditional Indian craftsmanship."
  },

  {
    id: 903,
    name: "Ruby Bloom Nose Pin",
    category: "nose-pins",
    image: "nosepin3.jpg",
    price: 21999,
    weight: "1.3 g",
    purity: "18K Gold",
    description: "Ruby-studded nose pin designed to enhance festive and bridal looks."
  },

  {
    id: 904,
    name: "Pearl Elegance Nose Pin",
    category: "nose-pins",
    image: "nosepin4.jpg",
    price: 19999,
    weight: "1.2 g",
    purity: "18K Gold",
    description: "Graceful pearl nose pin offering a delicate and luxurious finish."
  },

  {
    id: 905,
    name: "Rose Gold Heart Nose Pin",
    category: "nose-pins",
    image: "nosepin5.jpg",
    price: 17999,
    weight: "1.0 g",
    purity: "18K Gold",
    description: "Romantic heart-shaped rose gold nose pin crafted for everyday elegance."
  },

  {
    id: 906,
    name: "Royal Emerald Nose Pin",
    category: "nose-pins",
    image: "nosepin6.jpg",
    price: 23999,
    weight: "1.4 g",
    purity: "22K Gold",
    description: "Premium emerald nose pin handcrafted with luxurious detailing."
  },

  {
    id: 907,
    name: "Temple Designer Nose Pin",
    category: "nose-pins",
    image: "nosepin7.jpg",
    price: 25999,
    weight: "1.5 g",
    purity: "22K Gold",
    description: "Temple-inspired designer nose pin showcasing traditional artistry."
  },

  {
    id: 908,
    name: "Minimal Solitaire Nose Pin",
    category: "nose-pins",
    image: "nosepin8.jpg",
    price: 20999,
    weight: "1.1 g",
    purity: "18K Gold",
    description: "Minimal solitaire nose pin perfect for everyday luxury and style."
  },
    // ===========================
  // ANKLETS (1001-1008)
  // ===========================

  {
    id: 1001,
    name: "Classic Silver Anklet",
    category: "anklets",
    image: "anklet1.jpg",
    price: 24999,
    weight: "7.2 g",
    purity: "925 Sterling Silver",
    description: "Elegant sterling silver anklet designed for everyday grace and timeless beauty."
  },

  {
    id: 1002,
    name: "Gold Charm Anklet",
    category: "anklets",
    image: "anklet2.jpg",
    price: 32999,
    weight: "6.8 g",
    purity: "18K Gold",
    description: "Beautiful gold charm anklet crafted to add elegance to every step."
  },

  {
    id: 1003,
    name: "Diamond Sparkle Anklet",
    category: "anklets",
    image: "anklet3.jpg",
    price: 45999,
    weight: "7.9 g",
    purity: "18K Gold",
    description: "Premium diamond anklet offering luxurious sparkle for every occasion."
  },

  {
    id: 1004,
    name: "Pearl Grace Anklet",
    category: "anklets",
    image: "anklet4.jpg",
    price: 28999,
    weight: "6.5 g",
    purity: "925 Sterling Silver",
    description: "Elegant pearl anklet crafted with a delicate and sophisticated finish."
  },

  {
    id: 1005,
    name: "Rose Gold Infinity Anklet",
    category: "anklets",
    image: "anklet5.jpg",
    price: 36999,
    weight: "7.1 g",
    purity: "18K Gold",
    description: "Infinity-inspired rose gold anklet symbolizing elegance and everlasting style."
  },

  {
    id: 1006,
    name: "Emerald Royal Anklet",
    category: "anklets",
    image: "anklet6.jpg",
    price: 49999,
    weight: "8.2 g",
    purity: "18K Gold",
    description: "Royal emerald anklet handcrafted for festive celebrations and luxury wear."
  },

  {
    id: 1007,
    name: "Temple Heritage Anklet",
    category: "anklets",
    image: "anklet7.jpg",
    price: 54999,
    weight: "8.8 g",
    purity: "22K Gold",
    description: "Traditional temple-inspired anklet showcasing rich Indian craftsmanship."
  },

  {
    id: 1008,
    name: "Minimal Diamond Anklet",
    category: "anklets",
    image: "anklet8.jpg",
    price: 42999,
    weight: "6.9 g",
    purity: "18K Gold",
    description: "Minimal diamond anklet designed for modern elegance and everyday luxury."
  },
    // ===========================
  // MEN'S JEWELLERY (1101-1108)
  // ===========================

  {
    id: 1101,
    name: "Classic Gold Men's Ring",
    category: "mens-jewellery",
    image: "men1.jpg",
    price: 58999,
    weight: "8.5 g",
    purity: "22K Gold",
    description: "Timeless men's gold ring crafted with premium 22K gold for a bold and sophisticated look."
  },

  {
    id: 1102,
    name: "Diamond Signet Ring",
    category: "mens-jewellery",
    image: "men2.jpg",
    price: 84999,
    weight: "9.3 g",
    purity: "18K Gold",
    description: "Premium signet ring featuring a brilliant diamond centerpiece with a modern masculine design."
  },

  {
    id: 1103,
    name: "Royal Gold Chain",
    category: "mens-jewellery",
    image: "men3.jpg",
    price: 124999,
    weight: "15.8 g",
    purity: "22K Gold",
    description: "Luxurious handcrafted gold chain designed to elevate every gentleman's style."
  },

  {
    id: 1104,
    name: "Cuban Link Bracelet",
    category: "mens-jewellery",
    image: "men4.jpg",
    price: 72999,
    weight: "10.2 g",
    purity: "22K Gold",
    description: "Bold Cuban link bracelet crafted for a premium and contemporary appearance."
  },

  {
    id: 1105,
    name: "Minimal Gold Pendant",
    category: "mens-jewellery",
    image: "men5.jpg",
    price: 44999,
    weight: "6.1 g",
    purity: "18K Gold",
    description: "Elegant minimal pendant designed for men who appreciate understated luxury."
  },

  {
    id: 1106,
    name: "Black Diamond Band",
    category: "mens-jewellery",
    image: "men6.jpg",
    price: 93999,
    weight: "8.9 g",
    purity: "18K Gold",
    description: "Stylish black diamond band combining modern craftsmanship with timeless elegance."
  },

  {
    id: 1107,
    name: "Heritage Gold Kada",
    category: "mens-jewellery",
    image: "men7.jpg",
    price: 114999,
    weight: "13.7 g",
    purity: "22K Gold",
    description: "Traditional heritage gold kada handcrafted with intricate detailing for a regal finish."
  },

  {
    id: 1108,
    name: "Luxury Lion Pendant",
    category: "mens-jewellery",
    image: "men8.jpg",
    price: 67999,
    weight: "9.1 g",
    purity: "22K Gold",
    description: "Bold lion pendant symbolizing strength and confidence, crafted in premium gold."
  },
    // ===========================
  // KIDS JEWELLERY (1201-1208)
  // ===========================

  {
    id: 1201,
    name: "Little Star Gold Ring",
    category: "kids-jewellery",
    image: "kids1.jpg",
    price: 15999,
    weight: "2.1 g",
    purity: "22K Gold",
    description: "Adorable star-shaped gold ring specially crafted for children with a smooth and comfortable finish."
  },

  {
    id: 1202,
    name: "Butterfly Stud Earrings",
    category: "kids-jewellery",
    image: "kids2.jpg",
    price: 18999,
    weight: "2.4 g",
    purity: "18K Gold",
    description: "Cute butterfly earrings designed to add sparkle and joy to every little smile."
  },

  {
    id: 1203,
    name: "Tiny Heart Pendant",
    category: "kids-jewellery",
    image: "kids3.jpg",
    price: 22999,
    weight: "2.8 g",
    purity: "18K Gold",
    description: "Elegant heart-shaped pendant crafted with love for special childhood memories."
  },

  {
    id: 1204,
    name: "Princess Charm Bracelet",
    category: "kids-jewellery",
    image: "kids4.jpg",
    price: 27999,
    weight: "3.2 g",
    purity: "18K Gold",
    description: "Beautiful charm bracelet featuring playful designs perfect for young princesses."
  },

  {
    id: 1205,
    name: "Lucky Clover Pendant",
    category: "kids-jewellery",
    image: "kids5.jpg",
    price: 24999,
    weight: "3.0 g",
    purity: "22K Gold",
    description: "Lucky clover pendant symbolizing happiness and good fortune for little ones."
  },

  {
    id: 1206,
    name: "Rainbow Gem Necklace",
    category: "kids-jewellery",
    image: "kids6.jpg",
    price: 34999,
    weight: "4.1 g",
    purity: "18K Gold",
    description: "Colorful gemstone necklace designed to brighten every celebration with cheerful elegance."
  },

  {
    id: 1207,
    name: "Moon & Star Bracelet",
    category: "kids-jewellery",
    image: "kids7.jpg",
    price: 31999,
    weight: "3.8 g",
    purity: "18K Gold",
    description: "Delightful moon and star bracelet crafted with premium materials for lasting beauty."
  },

  {
    id: 1208,
    name: "Angel Wings Pendant",
    category: "kids-jewellery",
    image: "kids8.jpg",
    price: 28999,
    weight: "3.5 g",
    purity: "22K Gold",
    description: "Elegant angel wings pendant symbolizing love, care, and protection for children."
  },
    // ===========================
  // IDOLS & COINS (1301-1308)
  // ===========================

  {
    id: 1301,
    name: "Lord Ganesha Gold Idol",
    category: "idols-coins",
    image: "idol1.jpg",
    price: 45999,
    weight: "5.2 g",
    purity: "24K Gold",
    description: "Beautifully crafted 24K gold Lord Ganesha idol symbolizing wisdom, prosperity, and good fortune."
  },

  {
    id: 1302,
    name: "Lakshmi Gold Idol",
    category: "idols-coins",
    image: "idol2.jpg",
    price: 52999,
    weight: "6.0 g",
    purity: "24K Gold",
    description: "Exquisite Goddess Lakshmi gold idol designed to bring prosperity and blessings into every home."
  },

  {
    id: 1303,
    name: "Lord Krishna Gold Idol",
    category: "idols-coins",
    image: "idol3.jpg",
    price: 61999,
    weight: "6.8 g",
    purity: "24K Gold",
    description: "Elegant Lord Krishna idol handcrafted in pure gold with intricate traditional detailing."
  },

  {
    id: 1304,
    name: "24K Gold Coin",
    category: "idols-coins",
    image: "coin1.jpg",
    price: 34999,
    weight: "4.0 g",
    purity: "24K Gold",
    description: "Premium 24K gold coin featuring a timeless design, ideal for gifting and investment."
  },

  {
    id: 1305,
    name: "Lakshmi Ganesha Gold Coin",
    category: "idols-coins",
    image: "coin2.jpg",
    price: 41999,
    weight: "4.8 g",
    purity: "24K Gold",
    description: "Pure gold coin engraved with Goddess Lakshmi and Lord Ganesha, perfect for festive occasions."
  },

  {
    id: 1306,
    name: "Om Engraved Gold Coin",
    category: "idols-coins",
    image: "coin3.jpg",
    price: 38999,
    weight: "4.5 g",
    purity: "24K Gold",
    description: "Elegant 24K gold coin featuring the sacred Om symbol, representing peace and spirituality."
  },

  {
    id: 1307,
    name: "Silver Lakshmi Idol",
    category: "idols-coins",
    image: "idol4.jpg",
    price: 18999,
    weight: "22.0 g",
    purity: "925 Sterling Silver",
    description: "Gracefully handcrafted sterling silver Lakshmi idol, ideal for home temples and gifting."
  },

  {
    id: 1308,
    name: "Royal Heritage Gold Coin",
    category: "idols-coins",
    image: "coin4.jpg",
    price: 68999,
    weight: "8.0 g",
    purity: "24K Gold",
    description: "Luxury heritage-inspired pure gold coin crafted with intricate detailing for collectors and special occasions."
  },
]