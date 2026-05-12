# Restaurant Database

A small restaurant management system: a **Node.js / Express** API with **PostgreSQL** (via **Sequelize**), a **React (Vite)** web app with **Tailwind CSS**, and an optional **Python** CLI that talks to PostgreSQL.

## Features (web app)

After signing in, staff can:

- **Menu** — browse, add, update, and remove menu items
- **New order** — create orders, bills, and line items
- **Orders** — list and inspect orders
- **Order items** — view items for a specific order
- **Bill** — billing workflow tied to orders and customers
- **Customers** — customer listing
- **User management** — employee listing
- **Account** — update customer or employee profile

Authentication state is stored in a browser cookie (`user`). The Firebase dependency is present in the project; `Firebase.js` is currently stubbed/commented out and not required for the main flow.

## Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended)
- [PostgreSQL](https://www.postgresql.org/) running locally
- Optional: Python 3 and `psycopg2` for `Restaurant.py`

## Database configuration

The API expects a PostgreSQL database named **`Restaurant Management`**, with credentials and host defined in `backend/config/config.js` (defaults: user `postgres`, password `postgres`, host `localhost`).

1. Create the database in PostgreSQL (name must match `config.js`, including spaces if you keep that name).
2. Adjust `backend/config/config.js` if your user, password, host, or database name differ.

On startup, the server runs `sequelize.sync()` so tables are created/updated from the Sequelize models (suitable for development; review migrations for production).

## Run the backend API

From the `backend` folder:

```bash
cd backend
npm install
npm start
```

For auto-restart during development:

```bash
npm run dev
```

The API listens on **port 3000**. Routes are mounted as:

| Prefix | Purpose |
|--------|---------|
| `/menu` | Menu items |
| `/bill` | Bills |
| `/order` | Orders |
| `/orderitems` | Order line items |
| `/customerEmployee` | Customers and employees |
| `/loginSignup` | Login and signup (`login`, `signup`) |

CORS is enabled for browser access from the Vite dev server.

## Run the frontend

From the `FrontEnd/vite-react-app` folder:

```bash
cd FrontEnd/vite-react-app
npm install
npm run dev
```

The UI calls the API at **`http://localhost:3000`**. Start the backend first, or requests will fail.

Production build:

```bash
npm run build
npm run preview
```

## Optional: Python CLI (`Restaurant.py`)

`Restaurant.py` is an interactive terminal menu for front-office and back-office actions against PostgreSQL. Configure the database connection inside that script to match your environment, then run:

```bash
python Restaurant.py
```

It is separate from the Node/React stack and may assume a slightly different schema naming (e.g. `products` vs the Sequelize `items` table); use it only if you align the database with what the script expects.

## Repository layout

```
Restaurant Database/
├── backend/                 # Express API, Sequelize models, routes
├── FrontEnd/vite-react-app/ # React + Vite + Tailwind SPA
├── Restaurant.py            # Optional Python CLI
└── package.json             # Root manifest (minimal; primary apps live in subfolders)
```

## License

See `backend/package.json` / `FrontEnd/vite-react-app/package.json` for author metadata. Add a project-wide license file if you need one.
