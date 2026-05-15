export interface Product {
  id: string;
  name: string;
  category: Category;
  price: number;
  originalPrice?: number;
  description: string;
  details: string[];
  images: string[];
  badge?: string;
  isNew?: boolean;
  isBestseller?: boolean;
}

export type Category =
  | "necklaces"
  | "earrings"
  | "bangles"
  | "rings"
  | "maang-tikka"
  | "bridal-sets";

export const categories: { slug: Category; name: string; description: string; image: string }[] = [
  {
    slug: "necklaces",
    name: "Necklaces",
    description: "Elegant necklaces crafted with precision, from chokers to long layered pieces",
    image: "/products/Kaveri/kaveri-1.png",
  },
  {
    slug: "earrings",
    name: "Earrings",
    description: "Statement earrings that frame your face with brilliance and grace",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&h=700&fit=crop",
  },
  {
    slug: "bangles",
    name: "Bangles",
    description: "Handcrafted bangles and bracelets that add sparkle to every gesture",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&h=700&fit=crop",
  },
  {
    slug: "rings",
    name: "Rings",
    description: "Exquisite rings from delicate bands to bold cocktail pieces",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&h=700&fit=crop",
  },
  {
    slug: "maang-tikka",
    name: "Maang Tikka",
    description: "Traditional maang tikkas reimagined with contemporary elegance",
    image: "https://images.unsplash.com/photo-1610694955371-d4a3e0ce4b52?w=600&h=700&fit=crop",
  },
  {
    slug: "bridal-sets",
    name: "Bridal Sets",
    description: "Complete bridal jewellery sets for your most special day",
    image: "https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?w=600&h=700&fit=crop",
  },
];

export const products: Product[] = [
  {
    id: "1",
    name: "Kaveri Necklace Set",
    category: "necklaces",
    price: 2499,
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
    price: 5999,
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
    price: 6999,
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
    price: 5499,
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
    name: "Temple Gold Bangles",
    category: "bangles",
    price: 1799,
    description:
      "Set of 4 temple-inspired gold replica bangles with intricate deity motifs. A timeless addition to your jewellery collection.",
    details: [
      "Material: Gold-plated brass alloy",
      "Set of 4 bangles",
      "Available sizes: 2.4, 2.6, 2.8",
      "Finish: Matte gold with temple motifs",
    ],
    images: [
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?w=800&h=800&fit=crop",
    ],
    isBestseller: true,
  },
  {
    id: "6",
    name: "AD Diamond Cocktail Ring",
    category: "rings",
    price: 699,
    originalPrice: 999,
    description:
      "A show-stopping AD diamond cocktail ring with a large center stone surrounded by smaller accent stones. Adjustable band fits all sizes.",
    details: [
      "Material: American Diamond (AD) with rhodium plating",
      "Adjustable ring band",
      "Center stone: 10mm cushion cut",
      "Finish: Silver rhodium with sparkle",
    ],
    images: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&h=800&fit=crop",
    ],
    isNew: true,
  },
  {
    id: "7",
    name: "Bridal Kundan Set",
    category: "bridal-sets",
    price: 5999,
    originalPrice: 7999,
    description:
      "Complete bridal kundan jewellery set including necklace, earrings, maang tikka, and bangles. Hand-curated for the modern bride.",
    details: [
      "Material: Premium kundan with gold plating",
      "Includes: Necklace, earrings, maang tikka, 2 bangles",
      "Finish: Royal gold with red & green accents",
      "Comes in premium gift box",
    ],
    images: [
      "https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1610694955371-d4a3e0ce4b52?w=800&h=800&fit=crop",
    ],
    badge: "Bridal Special",
    isBestseller: true,
  },
  {
    id: "8",
    name: "Polki Maang Tikka",
    category: "maang-tikka",
    price: 1199,
    description:
      "A regal polki maang tikka with pearl drops and kundan detailing. Perfect for weddings and festive celebrations.",
    details: [
      "Material: Polki stones with gold plating",
      "Pearl drop accents",
      "Adjustable hook chain",
      "Length: Customizable",
    ],
    images: [
      "https://images.unsplash.com/photo-1610694955371-d4a3e0ce4b52?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?w=800&h=800&fit=crop",
    ],
    isNew: true,
  },
  {
    id: "9",
    name: "Layered Pearl Necklace",
    category: "necklaces",
    price: 1899,
    originalPrice: 2499,
    description:
      "A three-layered pearl necklace with gold-plated spacers. This versatile piece transitions effortlessly from day to night.",
    details: [
      "Material: Freshwater pearl beads with gold plating",
      "Three detachable layers",
      "Lobster clasp closure",
      "Total length: 16-22 inches",
    ],
    images: [
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&h=800&fit=crop",
    ],
  },
  {
    id: "10",
    name: "Chandbali Earrings",
    category: "earrings",
    price: 1299,
    description:
      "Exquisite chandbali earrings with crescent moon design, adorned with tiny pearls and kundan stones.",
    details: [
      "Material: Kundan with gold-plated brass",
      "Crescent moon (chandbali) design",
      "Pearl bead accents",
      "Weight: Approx 18g per piece",
    ],
    images: [
      "https://images.unsplash.com/photo-1630019852942-f89202989a59?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&h=800&fit=crop",
    ],
    badge: "Trending",
  },
];

export function getProductsByCategory(category: Category): Product[] {
  return products.filter((p) => p.category === category);
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.isBestseller || p.isNew).slice(0, 6);
}

export function getNewArrivals(): Product[] {
  return products.filter((p) => p.isNew);
}

export function getBestsellers(): Product[] {
  return products.filter((p) => p.isBestseller);
}
