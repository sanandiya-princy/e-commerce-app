let products = [
  {
    id: "prod-1",
    name: "AeroSound Max Headphones",
    description: "Experience premium sound quality with active noise cancellation, 40-hour battery life, and plush memory foam earcups for ultimate comfort.",
    price: 199.99,
    category: "Electronics",
    rating: 4.8,
    stock: 15,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    reviews: [
      { author: "Sarah Jenkins", rating: 5, comment: "Absolutely incredible sound. The ANC block out everything on my daily train commute.", date: "2026-05-15" },
      { author: "Michael T.", rating: 4, comment: "Very comfortable, battery lasts forever. Bass is slightly heavy but adjustable.", date: "2026-05-28" }
    ]
  },
  {
    id: "prod-2",
    name: "Chrono Classic Smartwatch",
    description: "An elegant blend of a classic mechanical timepiece and a modern smartwatch. Tracks steps, sleep, heart rate, and displays notifications.",
    price: 249.50,
    category: "Accessories",
    rating: 4.5,
    stock: 8,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    reviews: [
      { author: "David K.", rating: 5, comment: "Looks like a real luxury watch, but gives me my text alerts. Love the hybrid design.", date: "2026-04-10" },
      { author: "Emily Rose", rating: 4, comment: "Beautiful design. The app sync is a bit slow occasionally, but otherwise great.", date: "2026-05-02" }
    ]
  },
  {
    id: "prod-3",
    name: "Vellum Minimalist Journal",
    description: "A hardbound bullet journal featuring 160 pages of ink-proof 120gsm dotted paper, an expandable inner pocket, and lay-flat binding.",
    price: 24.99,
    category: "Stationery",
    rating: 4.9,
    stock: 45,
    image: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    reviews: [
      { author: "Claire Vance", rating: 5, comment: "The paper thickness is perfect! No ghosting even with heavy fountain pens.", date: "2026-06-01" }
    ]
  },
  {
    id: "prod-4",
    name: "Lumina Smart Ambient Lamp",
    description: "Add color and intelligence to your room. Syncs with music, offers millions of custom shades, and integrates with smart assistants.",
    price: 69.99,
    category: "Home",
    rating: 4.2,
    stock: 20,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    reviews: [
      { author: "Alex Rivera", rating: 4, comment: "Great light customization. Set up was easy but the app interface could be cleaner.", date: "2026-05-19" },
      { author: "Jessica M.", rating: 4, comment: "Very soothing sleep lighting. The wake-up alarm fade is great.", date: "2026-05-24" }
    ]
  },
  {
    id: "prod-5",
    name: "HydroFlask Pro Bottle",
    description: "Double-walled vacuum insulated stainless steel water bottle. Keeps beverages ice cold for up to 24 hours or piping hot for 12 hours.",
    price: 39.95,
    category: "Wellness",
    rating: 4.7,
    stock: 32,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    reviews: [
      { author: "Jake Powell", rating: 5, comment: "Tough as nails. Dropped it on concrete multiple times, just minor scratches. Water stays freezing cold.", date: "2026-06-03" }
    ]
  },
  {
    id: "prod-6",
    name: "ErgoDock Vertical Laptop Stand",
    description: "Premium aluminum vertical stand designed to maximize desk space. Adjustable width ensures compatibility with all major laptop models.",
    price: 45.00,
    category: "Office",
    rating: 4.6,
    stock: 12,
    image: "https://images.unsplash.com/photo-1616440347437-b1c73416efc2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    reviews: [
      { author: "Liam N.", rating: 5, comment: "Cleans up my desk space incredibly well. The silicone padding prevents any laptop scratches.", date: "2026-05-11" },
      { author: "Sophia G.", rating: 4, comment: "Sturdy and heavy. Holds my 16 inch heavy laptop with zero wobbles.", date: "2026-05-22" }
    ]
  }
];

// Helper to generate unique IDs
function generateId() {
  return "prod-" + Math.random().toString(36).substring(2, 9);
}

module.exports = {
  // Read all products with optional filters
  getProducts({ search, category, sortBy } = {}) {
    let filteredList = [...products];

    // Filter by Category
    if (category && category !== "All") {
      filteredList = filteredList.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }

    // Filter by Search Query (Name or Description)
    if (search) {
      const query = search.toLowerCase().trim();
      filteredList = filteredList.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.description.toLowerCase().includes(query)
      );
    }

    // Sort products
    if (sortBy) {
      if (sortBy === "price-asc") {
        filteredList.sort((a, b) => a.price - b.price);
      } else if (sortBy === "price-desc") {
        filteredList.sort((a, b) => b.price - a.price);
      } else if (sortBy === "rating") {
        filteredList.sort((a, b) => b.rating - a.rating);
      }
    }

    return filteredList;
  },

  // Get single product
  getProductById(id) {
    return products.find(p => p.id === id);
  },

  // Create new product
  createProduct(data) {
    const newProduct = {
      id: generateId(),
      name: data.name,
      description: data.description,
      price: parseFloat(data.price) || 0.00,
      category: data.category || "General",
      rating: 0,
      stock: parseInt(data.stock) || 0,
      image: data.image || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      reviews: []
    };
    products.push(newProduct);
    return newProduct;
  },

  // Update existing product
  updateProduct(id, data) {
    const index = products.findIndex(p => p.id === id);
    if (index !== -1) {
      products[index] = {
        ...products[index],
        name: data.name ?? products[index].name,
        description: data.description ?? products[index].description,
        price: data.price !== undefined ? parseFloat(data.price) : products[index].price,
        category: data.category ?? products[index].category,
        stock: data.stock !== undefined ? parseInt(data.stock) : products[index].stock,
        image: data.image ?? products[index].image
      };
      return products[index];
    }
    return null;
  },

  // Delete product
  deleteProduct(id) {
    const index = products.findIndex(p => p.id === id);
    if (index !== -1) {
      const deleted = products.splice(index, 1);
      return deleted[0];
    }
    return null;
  },

  // Add review to a product and re-calculate rating
  addReview(id, reviewData) {
    const product = this.getProductById(id);
    if (product) {
      const rating = parseInt(reviewData.rating) || 5;
      const newReview = {
        author: reviewData.author || "Anonymous",
        rating: rating,
        comment: reviewData.comment || "",
        date: new Date().toISOString().split('T')[0]
      };
      
      product.reviews.push(newReview);
      
      // Calculate new average rating
      const sum = product.reviews.reduce((acc, r) => acc + r.rating, 0);
      product.rating = parseFloat((sum / product.reviews.length).toFixed(1));
      
      return product;
    }
    return null;
  }
};
