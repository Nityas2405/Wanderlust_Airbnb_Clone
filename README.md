# 🌍 WanderLust

WanderLust is a full-stack Airbnb-inspired accommodation listing platform. Users can browse stays by category, view detailed listing pages with pricing, sign up and log in, and list their own space.

**🔗 Live demo:** [wanderlust-airbnb-clone-9crb.onrender.com/listings](https://wanderlust-airbnb-clone-9crb.onrender.com/listings)

---

## ✨ Features

- Browse listings with category filters — Rooms, Iconic cities, Mountains, Castles, Amazing pools, Camping, Farms, Arctic, Domes, Boats
- Search listings
- Detailed listing pages with pricing (including GST breakdown)
- List your own space ("Airbnb your home")
- User authentication — sign up, log in, log out
- Session-based auth with persistent login
- Image uploads for listings via Cloudinary
- Interactive maps on listing pages via MapTiler
- Flash messages for user feedback (e.g. successful login, errors)
- Responsive UI

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js (v25.6.0) |
| Server | Express 5 |
| Templating | EJS with `ejs-mate` (layouts/partials) |
| Database | MongoDB with Mongoose |
| Auth | Passport.js (`passport-local`, `passport-local-mongoose`) |
| Sessions | `express-session` with `connect-mongo` (Mongo-backed session store) |
| Validation | Joi |
| Image uploads | Multer + Cloudinary (`multer-storage-cloudinary`) |
| Maps | MapTiler SDK (`@maptiler/sdk`) |
| Flash messages | `connect-flash` |
| Other | `method-override` (PUT/DELETE via forms), `dotenv`, `cookie-parser` |
| Deployment | Render |

## 📁 Project Structure

This follows a standard MVC layout for an Express + EJS app. Adjust folder/file names below if yours differ:

```
major_project/
├── index.js                 # App entry point
├── models/                  # Mongoose schemas (Listing, User, Review, etc.)
├── controllers/              # Route handler logic
├── routes/                  # Express route definitions
├── views/                   # EJS templates
│   ├── listings/
│   ├── users/
│   └── includes/            # Navbar, footer, flash partials
├── public/                  # Static assets (CSS, client-side JS, images)
├── utils/                   # Helpers (e.g. custom error class, async wrapper)
├── init/                    # DB seed script and sample data
├── cloudConfig.js           # Cloudinary configuration
├── middleware.js            # Auth checks, validation middleware
├── schema.js                # Joi validation schemas
├── .env                     # Environment variables (not committed)
└── package.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js v25.6.0 (or compatible)
- A MongoDB database (local instance or MongoDB Atlas)
- A [Cloudinary](https://cloudinary.com/) account (for image uploads)
- A [MapTiler](https://www.maptiler.com/) API key (for maps)

### 1. Clone the repository

```bash
git clone https://github.com/Nityas2405/Wanderlust_Airbnb_Clone.git
cd Wanderlust_Airbnb_Clone
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory:

```env
ATLASDB_URL=your_mongodb_connection_string
SESSION_SECRET=your_session_secret
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
MAPTILER_API_KEY=your_maptiler_api_key
```

> Variable names above are a best guess based on your dependencies — rename these to match whatever you actually read via `process.env` in your code.

### 4. Seed the database (optional)

If an `init/index.js` seed script is present:

```bash
node init/index.js
```

### 5. Run the app

```bash
node index.js
```

Then open **http://localhost:8080** (or whichever port your app listens on).

> There's currently no `start` script in `package.json` — you may want to add `"start": "node index.js"` under `scripts` so `npm start` works too.

## 🌐 Deployment

This project is deployed on [Render](https://render.com/). To deploy your own instance:

1. Push your code to GitHub.
2. Create a new **Web Service** on Render and connect your repo.
3. Add the same environment variables from your `.env` file in Render's dashboard.
4. Set the start command to `node index.js`.

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m "Add your feature"`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a pull request

## 📄 License

This project is licensed under the ISC License.

## 📬 Contact

**Nitya Sharma**
- Instagram: [@nitya.s24](https://www.instagram.com/nitya.s24/)
- LinkedIn: [nitya-sharma-109413385](https://www.linkedin.com/in/nitya-sharma-109413385)
