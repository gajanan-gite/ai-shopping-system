-- Re-runnable: drops old tables first (children before parents)
DROP TABLE IF EXISTS search_logs, order_items, orders, cart, wishlist, reviews, products, users CASCADE;

-- ===== USERS =====
CREATE TABLE users (
  id            SERIAL PRIMARY KEY,
  name          VARCHAR(100) NOT NULL,
  email         VARCHAR(150) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,           -- NEVER store plain passwords
  role          VARCHAR(10)  NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  phone         VARCHAR(20),
  address       TEXT,
  created_at    TIMESTAMP NOT NULL DEFAULT NOW()
);

-- ===== PRODUCTS (one table for all categories) =====
CREATE TABLE products (
  id          SERIAL PRIMARY KEY,
  name        VARCHAR(200) NOT NULL,
  brand       VARCHAR(100) NOT NULL,
  category    VARCHAR(30)  NOT NULL CHECK (category IN ('laptop', 'smartphone', 'headphones', 'monitor')),
  price       NUMERIC(10,2) NOT NULL CHECK (price >= 0),
  rating      NUMERIC(2,1)  NOT NULL DEFAULT 0 CHECK (rating BETWEEN 0 AND 5),
  ram_gb      INTEGER,                            -- NULL for headphones/monitors
  storage_gb  INTEGER,
  processor   VARCHAR(150),
  gpu         VARCHAR(150),
  display     VARCHAR(150),
  specs       JSONB NOT NULL DEFAULT '{}',        -- category-specific extras (battery, refresh rate...)
  description TEXT,
  image_url   TEXT,
  stock       INTEGER NOT NULL DEFAULT 50 CHECK (stock >= 0),
  units_sold  INTEGER NOT NULL DEFAULT 0,         -- used for the "popularity" score later
  created_at  TIMESTAMP NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_price    ON products(price);

-- ===== REVIEWS =====
CREATE TABLE reviews (
  id          SERIAL PRIMARY KEY,
  product_id  INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  user_id     INTEGER NOT NULL REFERENCES users(id)    ON DELETE CASCADE,
  rating      INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  review_text TEXT NOT NULL,
  created_at  TIMESTAMP NOT NULL DEFAULT NOW(),
  UNIQUE (product_id, user_id)                    -- one review per user per product
);
CREATE INDEX idx_reviews_product ON reviews(product_id);

-- ===== WISHLIST =====
CREATE TABLE wishlist (
  id         SERIAL PRIMARY KEY,
  user_id    INTEGER NOT NULL REFERENCES users(id)    ON DELETE CASCADE,
  product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  added_at   TIMESTAMP NOT NULL DEFAULT NOW(),
  UNIQUE (user_id, product_id)
);

-- ===== CART =====
CREATE TABLE cart (
  id         SERIAL PRIMARY KEY,
  user_id    INTEGER NOT NULL REFERENCES users(id)    ON DELETE CASCADE,
  product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  quantity   INTEGER NOT NULL DEFAULT 1 CHECK (quantity > 0),
  UNIQUE (user_id, product_id)
);

-- ===== ORDERS =====
CREATE TABLE orders (
  id               SERIAL PRIMARY KEY,
  user_id          INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  total_amount     NUMERIC(12,2) NOT NULL,
  status           VARCHAR(20) NOT NULL DEFAULT 'placed',
  shipping_address TEXT,
  created_at       TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE order_items (
  id                SERIAL PRIMARY KEY,
  order_id          INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id        INTEGER REFERENCES products(id) ON DELETE SET NULL,  -- keep history if product deleted
  product_name      VARCHAR(200) NOT NULL,        -- snapshot of the name at purchase time
  quantity          INTEGER NOT NULL CHECK (quantity > 0),
  price_at_purchase NUMERIC(10,2) NOT NULL
);

-- ===== SEARCH LOGS (admin "AI activity" page) =====
CREATE TABLE search_logs (
  id                  SERIAL PRIMARY KEY,
  user_id             INTEGER REFERENCES users(id) ON DELETE SET NULL,
  query_text          TEXT NOT NULL,
  parsed_requirements JSONB,
  result_count        INTEGER,
  created_at          TIMESTAMP NOT NULL DEFAULT NOW()
);