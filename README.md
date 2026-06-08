# ⚡ Antigravity MVC E-Commerce Application

An elegant, high-fidelity, and ultra-minimal e-commerce web application designed using the **Model-View-Controller (MVC)** architecture. Consisting of only **5 core application files**, it features a fully-responsive layout, instant light/dark mode theme support, session-based cart updates, dynamic review submissions, and an administrative dashboard to manage products.

---

## 📂 Project Directory Structure

```
ecommerce-mvc/
├── views/
│   └── index.ejs       # The VIEW: Front-end layouts, CSS styles, and client JS
├── model.js            # The MODEL: Product management in-memory & CRUD functions
├── controller.js       # The CONTROLLER: Request handling, business & session logic
├── routes.js           # The ROUTES: Mapping URLs to controller functions
├── app.js              # The ENTRY POINT: Express server configurations
├── package.json        # Node dependency manifest
└── README.md           # Documentation and running instructions
```

---

## ⚡ Key Features

1. **High-Fidelity UI/UX**:
   - Modern glassmorphism layout with clean typography (`Outfit` and `Plus Jakarta Sans`).
   - Dynamic fluid transitions, interactive button states, and product card styling.
   - Built-in SVG icons to eliminate loading lag from external icon libraries.
2. **Light / Dark Mode**:
   - Seamlessly toggle themes via the top navigation bar.
   - Theme preferences are saved to `localStorage` and persist between page reloads.
3. **Product Catalog**:
   - Live filtering by category (Electronics, Accessories, Stationery, etc.).
   - Full-text search on product names and descriptions.
   - Dynamic sorting options (by Price: Low to High, Price: High to Low, or Highest Rated).
4. **Session-based Shopping Cart**:
   - Carts are stored in Express sessions, ensuring distinct users have isolated carts.
   - Drawer slide-out animation showing current cart status, quantities, item sums, and subtotals.
   - Increment or decrement quantities directly within the cart drawer (capped automatically at available stock).
5. **Interactive Details & Review System**:
   - Click a product image or title to open a quick-view modal.
   - Submit star ratings and text comments on products. Average ratings are calculated on-the-fly and updated in real-time.
   - Smart routing redirects back to the storefront and automatically re-opens the active product modal for seamless feedback.
6. **Checkout Mock Gateway**:
   - Interactive checkout modal with shipping details and mock card inputs.
   - Simulates secure server processing with a loading spinner before completing transactions.
   - Fullscreen success banner displaying a generated receipt ID.
7. **Administrative CRUD Panel**:
   - Switch to the Admin Panel via the header toggle.
   - Add new products, edit descriptions, prices, categories, stock levels, or images.
   - Delete products with client-side confirmation check. All modifications update the storefront catalog instantly.

---

## 🚀 How to Run the Application

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) installed.

### 2. Set Up the Project
If not already installed, run the installation inside the project directory:
```bash
npm install
```

### 3. Run the Server
Start the Express server using the NPM start script:
```bash
npm start
```
By default, the server runs on Port `3000`.

### 4. Open the App
Visit [http://localhost:3000](http://localhost:3000) in your web browser.
- Toggle between light/dark themes in the top-right corner.
- Toggle into the administrative dashboard by clicking **Admin Panel** in the top-right corner.
