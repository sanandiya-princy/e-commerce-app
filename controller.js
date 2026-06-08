
const model = require('./model');

function recalculateCart(cart) {
  cart.totalItems = cart.items.reduce((acc, item) => acc + item.quantity, 0);
  cart.total = parseFloat(
    cart.items.reduce((acc, item) => acc + (item.price * item.quantity), 0).toFixed(2)
  );
}

module.exports = {
  // 1. Show Shop Storefront (
  showShop(req, res) {
    const products = model.getProducts();
    const categories = ["All", ...new Set(products.map(p => p.category))];
    
    if (!req.session.cart) {
      req.session.cart = { items: [], total: 0, totalItems: 0 };
    }
    
    res.render('index', {
      view: 'shop',
      products,
      categories,
      cart: req.session.cart
    });
  },

  // 2. Add Item to Session Cart
  addToCart(req, res) {
    const { productId } = req.body;
    const quantity = parseInt(req.body.quantity) || 1;
    
    const product = model.getProductById(productId);
    if (!product) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }

    if (!req.session.cart) {
      req.session.cart = { items: [], total: 0, totalItems: 0 };
    }

    const cart = req.session.cart;
    const existingItem = cart.items.find(item => item.productId === productId);

    if (existingItem) {
      if (existingItem.quantity + quantity <= product.stock) {
        existingItem.quantity += quantity;
      } else {
        existingItem.quantity = product.stock;
      }
    } else {
      cart.items.push({
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: Math.min(quantity, product.stock)
      });
    }

    recalculateCart(cart);
    res.json({ success: true, cart });
  },

  // 3. Update Cart Item Quantity 
  updateCart(req, res) {
    const { productId, quantity } = req.body;
    const qty = parseInt(quantity);
    
    if (!req.session.cart) {
      return res.status(400).json({ success: false, error: 'No cart found' });
    }

    const cart = req.session.cart;
    const itemIndex = cart.items.findIndex(item => item.productId === productId);

    if (itemIndex !== -1) {
      const product = model.getProductById(productId);
      if (qty <= 0) {
        cart.items.splice(itemIndex, 1);
      } else if (product && qty <= product.stock) {
        cart.items[itemIndex].quantity = qty;
      } else if (product) {
        cart.items[itemIndex].quantity = product.stock;
      }
      recalculateCart(cart);
    }

    res.json({ success: true, cart });
  },

  // 4. Remove Item from Cart 
  removeFromCart(req, res) {
    const { productId } = req.body;
    
    if (!req.session.cart) {
      return res.status(400).json({ success: false, error: 'No cart found' });
    }

    const cart = req.session.cart;
    const itemIndex = cart.items.findIndex(item => item.productId === productId);

    if (itemIndex !== -1) {
      cart.items.splice(itemIndex, 1);
      recalculateCart(cart);
    }

    res.json({ success: true, cart });
  },

  // 5. Checkout 
  checkout(req, res) {
    const { name, email } = req.body;
    
    if (!req.session.cart || req.session.cart.items.length === 0) {
      return res.status(400).json({ success: false, error: 'Cart is empty' });
    }

    const orderId = "ORD-" + Math.floor(100000 + Math.random() * 900000);
    
    // Deduct stock
    req.session.cart.items.forEach(item => {
      const prod = model.getProductById(item.productId);
      if (prod) {
        prod.stock = Math.max(0, prod.stock - item.quantity);
      }
    });

    // Clear cart in session
    req.session.cart = { items: [], total: 0, totalItems: 0 };
    
    res.json({
      success: true,
      orderId,
      buyerName: name,
      products: model.getProducts() 
    });
  },

  // 6. Add Product 
  adminAdd(req, res) {
    const { name, description, price, category, stock, image } = req.body;
    
    const newProduct = model.createProduct({
      name,
      description,
      price: parseFloat(price),
      category,
      stock: parseInt(stock),
      image
    });

    res.json({ success: true, product: newProduct, products: model.getProducts() });
  },

  // 7. Edit Product 
  adminEdit(req, res) {
    const { id, name, description, price, category, stock, image } = req.body;
    
    const updated = model.updateProduct(id, {
      name,
      description,
      price: parseFloat(price),
      category,
      stock: parseInt(stock),
      image
    });

    if (!updated) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }

    res.json({ success: true, product: updated, products: model.getProducts() });
  },

  // 8. Delete Product 
  adminDelete(req, res) {
    const { id } = req.body;
    const deleted = model.deleteProduct(id);
    
    if (!deleted) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }

    res.json({ success: true, id, products: model.getProducts() });
  },

  // 9. Add Review
  addReview(req, res) {
    const { productId, author, rating, comment } = req.body;
    
    const product = model.addReview(productId, {
      author,
      rating: parseInt(rating),
      comment
    });

    if (!product) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }

    res.json({ success: true, product, products: model.getProducts() });
  }
};
