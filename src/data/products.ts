export interface Product {
  id: string;
  name: string;
  category: Category;
  categories?: Category[];
  price: number;
  originalPrice?: number;
  description: string;
  details: string[];
  images: string[];
  badge?: string;
  isNew?: boolean;
  isBestseller?: boolean;
  stock?: number;
}

// Stock levels - update these when restocking
const stockLevels: Record<string, number> = {
  "1": 2,  // Kaveri
  "2": 1,  // Raahi
  "3": 2,  // Saanjh
  "4": 2,  // Adaa
  "5": 2,  // Ruhani
  "6": 2,  // Kanak
  "7": 2,  // Sunehri
  "8": 1,  // Virasat
  "9": 2,  // Antara
  "10": 2, // Chandni
  "11": 2, // Rajsi
};

export type Category =
  | "necklaces"
  | "rings"
  | "bridal-sets";

export const categories: { slug: Category; name: string; description: string; image: string }[] = [
  {
    slug: "necklaces",
    name: "Necklaces",
    description: "Elegant necklaces crafted with precision, from chokers to long layered pieces",
    image: "/products/Kaveri/kaveri-1.png",
  },
  {
    slug: "rings",
    name: "Rings",
    description: "Exquisite rings from delicate bands to bold cocktail pieces",
    image: "/products/Virasat/virasat-1.png",
  },
  {
    slug: "bridal-sets",
    name: "Bridal Sets",
    description: "Complete bridal jewellery sets for your most special day",
    image: "/products/Saanjh/saanjh-1.png",
  },
];

export const products: Product[] = [
  {
    id: "1",
    name: "Kaveri Necklace Set",
    category: "necklaces",
    categories: ["necklaces", "bridal-sets"],
    price: 1999,
    description:
      "Inspired by timeless Indian heritage and crafted with regal elegance, the Kaveri Necklace Set is a statement piece designed for women who love traditional artistry with a luxurious modern touch. Featuring intricate filigree detailing, floral circular motifs, and delicate handcrafted elements — this set beautifully captures the richness of ethnic Indian jewellery. Perfect for weddings, festive celebrations, and special occasions, Kaveri adds effortless grace to every look.",
    details: [
      "Design: Intricate filigree with floral circular motifs",
      "Finish: Luxurious gold-tone with handcrafted elements",
      "Includes: Necklace + matching earrings",
      "Occasion: Weddings, festive celebrations, special occasions",
      "Why You'll Love It: A celebration of elegance, femininity, and timeless Indian craftsmanship",
    ],
    images: [
      "/products/Kaveri/kaveri-1.png",
      "/products/Kaveri/kaveri-2.png",
      "/products/Kaveri/kaveri-3.png",
      "/products/Kaveri/kaveri-4.png",
    ],
    badge: "New Launch",
    isNew: true,
    isBestseller: true,
  },
  {
    id: "2",
    name: "Raahi Necklace Set",
    category: "necklaces",
    categories: ["necklaces", "bridal-sets"],
    price: 4499,
    description:
      "A timeless blend of royal elegance and modern femininity, the Raahi Necklace Set is designed for women who love statement jewellery with a soft, luxurious touch. Featuring a beautifully structured Hasli-inspired silhouette adorned with shimmering Polki-style stones, delicate blush pink bead drops, and pearl accents that add grace to every movement. Crafted with intricate detailing and a rich gold-tone finish, Raahi captures the charm of traditional Indian jewellery while offering a contemporary designer aesthetic.",
    details: [
      "Design: Hasli-inspired silhouette with Polki-style stones",
      "Accents: Blush pink bead drops and pearl detailing",
      "Finish: Rich gold-tone with contemporary designer aesthetic",
      "Includes: Necklace + matching statement earrings",
      "Why You'll Love It: Grace, royalty, and timeless elegance — perfect for weddings and celebrations",
    ],
    images: [
      "/products/Raahi/raahi-1.png",
      "/products/Raahi/raahi-2.png",
      "/products/Raahi/raahi-3.png",
      "/products/Raahi/raahi-4.png",
    ],
    badge: "New Launch",
    isNew: true,
  },
  {
    id: "3",
    name: "Saanjh Choker Set",
    category: "bridal-sets",
    categories: ["necklaces", "bridal-sets"],
    price: 5499,
    description:
      "A timeless blend of regal elegance and traditional craftsmanship, this exquisite choker set is designed to make every occasion unforgettable. Featuring intricate floral filigree detailing, premium kundan-style stones, delicate pearl accents, and rich emerald-green bead drops — this statement piece beautifully captures the essence of royal Indian jewellery. Crafted with a luxurious antique gold finish, the choker sits gracefully around the neck, offering a bold yet elegant look.",
    details: [
      "Design: Intricate floral filigree with kundan-style stones",
      "Accents: Pearl drops and emerald-green bead detailing",
      "Finish: Luxurious antique gold",
      "Includes: Choker necklace + matching statement earrings",
      "Why You'll Love It: Royal Indian artistry that brings effortless grandeur to every outfit",
    ],
    images: [
      "/products/Saanjh/saanjh-1.png",
      "/products/Saanjh/saanjh-2.png",
      "/products/Saanjh/saanjh-3.png",
      "/products/Saanjh/saanjh-4.png",
    ],
    badge: "New Launch",
    isNew: true,
    isBestseller: true,
  },
  {
    id: "4",
    name: "Adaa Necklace Set",
    category: "necklaces",
    price: 3999,
    description:
      "A statement of timeless elegance, this exquisite necklace set is crafted to turn every moment into a celebration of grace and glamour. Featuring a beautifully detailed paisley-inspired pendant adorned with dazzling American Diamonds and rich ruby-toned stones — this masterpiece reflects royal charm with a modern luxury touch. The finely textured gold-finish chain adds refined richness, while the brilliant stone arrangement enhances the sparkle from every angle.",
    details: [
      "Design: Paisley-inspired pendant with AD and ruby-toned stones",
      "Finish: Finely textured gold-finish chain",
      "Includes: Necklace + matching statement earrings",
      "Occasion: Weddings, receptions, cocktail evenings, celebrations",
      "Why You'll Love It: Rich ruby tones, intricate AD craftsmanship, and regal paisley silhouette",
    ],
    images: [
      "/products/Adaa/adaa-1.png",
      "/products/Adaa/adaa-2.png",
      "/products/Adaa/adaa-3.png",
      "/products/Adaa/adaa-4.png",
    ],
    badge: "New Launch",
    isNew: true,
    isBestseller: true,
  },
  {
    id: "5",
    name: "Ruhani Necklace Set",
    category: "necklaces",
    price: 3999,
    description:
      "Graceful, regal, and timeless — the Ruhani Necklace Set is crafted for women who love statement elegance with a touch of royalty. Featuring shimmering AD stones beautifully paired with rich emerald green bead strands, this luxurious set creates a perfect balance of sophistication and traditional charm. The intricately designed pendant and matching chandelier earrings are adorned with delicate detailing and emerald drop accents.",
    details: [
      "Design: Shimmering AD stones with emerald green bead strands",
      "Accents: Emerald drop accents and chandelier earrings",
      "Finish: Rich gold-tone with intricate detailing",
      "Includes: Necklace + matching chandelier earrings",
      "Why You'll Love It: Sparkling diamond-like brilliance paired with deep emerald tones for a rich luxurious appeal",
    ],
    images: [
      "/products/Ruhani/ruhani-1.png",
      "/products/Ruhani/ruhani-2.png",
      "/products/Ruhani/ruhani-3.png",
      "/products/Ruhani/ruhani-4.png",
    ],
    badge: "New Launch",
    isNew: true,
  },
  {
    id: "6",
    name: "Kanak Necklace Set",
    category: "necklaces",
    categories: ["necklaces", "bridal-sets"],
    price: 1999,
    description:
      "Crafted with exquisite filigree-inspired detailing, this statement necklace set is designed for women who appreciate timeless Indian craftsmanship with a refined modern touch. The intricate openwork patterns, delicate bead edging, and soft reflective stones create a rich heritage aesthetic that instantly elevates every look. Its warm antique gold finish adds a royal charm.",
    details: [
      "Design: Filigree-inspired openwork with delicate bead edging",
      "Finish: Warm antique gold with reflective stone accents",
      "Includes: Necklace + matching statement earrings",
      "Occasion: Bridal festivities, weddings, festive celebrations",
      "Why You'll Love It: Timeless Indian craftsmanship that feels classic, sophisticated, and unforgettable",
    ],
    images: [
      "/products/Kanak/kanak-1.png",
      "/products/Kanak/kanak-2.png",
      "/products/Kanak/kanak-3.png",
      "/products/Kanak/kanak-4.png",
    ],
    badge: "New Launch",
    isNew: true,
  },
  {
    id: "7",
    name: "Sunehri Statement Ring",
    category: "rings",
    price: 999,
    description:
      "A regal blend of tradition and artistry, this handcrafted antique-finish statement ring is designed to instantly elevate your festive and ethnic looks. Featuring intricate textured detailing, dual evil-eye inspired motifs with ruby-toned stones, and a beautifully carved center adorned with kundan-style accents and an emerald-green centerpiece. The delicate hanging ghungroo charms add graceful movement.",
    details: [
      "Design: Evil-eye motifs with ruby-toned stones and emerald centerpiece",
      "Accents: Ghungroo charms and layered chains",
      "Finish: Antique gold with kundan-style accents",
      "Fit: Adjustable back design for comfortable wear",
      "Why You'll Love It: Heritage elegance with bold femininity — a true conversation piece",
    ],
    images: [
      "/products/Sunehri/sunehri-1.png",
      "/products/Sunehri/sunehri-2.png",
      "/products/Sunehri/sunehri-3.png",
      "/products/Sunehri/sunehri-4.png",
    ],
    badge: "New Launch",
    isNew: true,
  },
  {
    id: "8",
    name: "Virasat Statement Ring",
    category: "rings",
    price: 999,
    description:
      "A masterpiece inspired by timeless Indian artistry, Virasat is a regal statement ring crafted to capture attention instantly. Designed with intricate peacock detailing at the center, this oversized heritage ring beautifully blends traditional craftsmanship with luxurious elegance. The rich emerald green enamel accents, ruby-toned stones, and ghungroo danglings create a royal aesthetic.",
    details: [
      "Design: Intricate peacock detailing with emerald green enamel",
      "Accents: Ruby-toned stones, kundan elements, ghungroo danglings",
      "Finish: Antique gold with vintage royal aesthetic",
      "Fit: Adjustable — bold oversized silhouette",
      "Why You'll Love It: Culture, elegance, and timeless beauty — a statement of artistic tradition",
    ],
    images: [
      "/products/Virasat/virasat-1.png",
      "/products/Virasat/virasat-2.png",
      "/products/Virasat/virasat-3.png",
      "/products/Virasat/virasat-4.png",
    ],
    badge: "New Launch",
    isNew: true,
  },
  {
    id: "9",
    name: "Antara Temple Necklace Set",
    category: "necklaces",
    categories: ["necklaces", "bridal-sets"],
    price: 3999,
    description:
      "This exquisite temple-inspired necklace set is a celebration of timeless Indian craftsmanship and regal elegance. Designed with intricate peacock motifs, delicate Lakshmi detailing, shimmering stone accents, and graceful pearl-green bead danglings — this piece beautifully captures the richness of traditional heritage jewellery. The luxurious antique gold finish adds a royal touch.",
    details: [
      "Design: Temple-inspired with peacock motifs and Lakshmi detailing",
      "Accents: Shimmering stones and pearl-green bead danglings",
      "Finish: Luxurious antique gold",
      "Includes: Necklace + matching statement earrings",
      "Why You'll Love It: Heritage artistry with regal elegance — perfect for weddings, poojas, and grand celebrations",
    ],
    images: [
      "/products/Antara/antara-1.png",
      "/products/Antara/antara-2.png",
      "/products/Antara/antara-3.png",
      "/products/Antara/antara-4.png",
    ],
    badge: "New Launch",
    isNew: true,
    isBestseller: true,
  },
  {
    id: "10",
    name: "Chandni Necklace Set",
    category: "necklaces",
    price: 3999,
    description:
      "A statement of timeless sophistication, Chandni is designed for women who adore refined glamour with a modern royal touch. Featuring a dazzling circular pendant adorned with brilliant American Diamonds and a rich emerald-green centerpiece — this necklace set effortlessly blends elegance with luxury. Perfect for cocktail evenings, wedding celebrations, and elegant soirées.",
    details: [
      "Design: Circular pendant with AD stones and emerald-green centerpiece",
      "Finish: Intricate layered detailing with modern royal aesthetic",
      "Includes: Necklace + matching earrings",
      "Occasion: Cocktail evenings, weddings, festive occasions",
      "Why You'll Love It: Bold emerald contrast with shimmering AD — contemporary yet timeless",
    ],
    images: [
      "/products/Chandni/chandni-1.png",
      "/products/Chandni/chandni-2.png",
      "/products/Chandni/chandni-3.png",
      "/products/Chandni/chandni-4.png",
    ],
    badge: "New Launch",
    isNew: true,
  },
  {
    id: "11",
    name: "Rajsi Necklace Set",
    category: "necklaces",
    categories: ["necklaces", "bridal-sets"],
    price: 2999,
    description:
      "This exquisite peacock-inspired necklace set is a perfect blend of royal elegance and timeless craftsmanship. Adorned with shimmering AD stones, emerald green accents, and delicate pearl danglings — the intricate design beautifully captures the charm of traditional Indian jewellery with a luxurious modern finish.",
    details: [
      "Design: Peacock-inspired with swan motif and openwork detailing",
      "Accents: Shimmering AD stones, emerald green, pearl danglings",
      "Finish: Luxurious gold-tone with heritage charm",
      "Includes: Necklace + matching earrings with pearl drops",
      "Why You'll Love It: Royal peacock artistry with sophisticated sparkle — perfect for weddings and celebrations",
    ],
    images: [
      "/products/Rajsi/rajsi-1.png",
      "/products/Rajsi/rajsi-2.png",
      "/products/Rajsi/rajsi-3.png",
      "/products/Rajsi/rajsi-4.png",
    ],
    badge: "New Launch",
    isNew: true,
  },
];

export function getProductsByCategory(category: Category): Product[] {
  return products.filter((p) => p.category === category || p.categories?.includes(category));
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getStock(productId: string): number {
  return stockLevels[productId] ?? 0;
}

export function isInStock(productId: string): boolean {
  return getStock(productId) > 0;
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.isBestseller || p.isNew).slice(0, 6);
}export function getNewArrivals(): Product[] {
  return products.filter((p) => p.isNew);
}

export function getBestsellers(): Product[] {
  return products.filter((p) => p.isBestseller);
}
