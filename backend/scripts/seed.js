// Fills the database with demo users, products and reviews.
// Run with:  npm run seed   (from the backend/ folder)
const bcrypt = require('bcryptjs');
const pool = require('../config/db');
const { openers, banks } = require('./seedData/reviewPhrases');

const products = [
  ...require('./seedData/laptops'),
  ...require('./seedData/smartphones'),
  ...require('./seedData/headphones'),
  ...require('./seedData/monitors'),
];

// ---------- Seeded random generator ----------
// Math.random() gives different data on every run. This one gives the SAME
// "random" numbers each time (seed = 42), so your demo data is always identical.
function mulberry32(seed) {
  return function () {
    seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rand = mulberry32(42);
const pick = (arr) => arr[Math.floor(rand() * arr.length)];
const shuffle = (arr) => [...arr].sort(() => rand() - 0.5);
const lowerFirst = (s) => s.charAt(0).toLowerCase() + s.slice(1);

// ---------- Safety check: every trait key must have a sentence ----------
function validateTraits() {
  for (const p of products) {
    const bank = banks[p.category];
    p.pos.forEach((k) => { if (!bank.pos[k]) throw new Error(`Missing strength "${k}" for ${p.category}: ${p.name}`); });
    p.neg.forEach((k) => { if (!bank.neg[k]) throw new Error(`Missing weakness "${k}" for ${p.category}: ${p.name}`); });
  }
}

// ---------- Description text built from the specs ----------
function buildDescription(p) {
  switch (p.category) {
    case 'laptop':
      return `${p.name} by ${p.brand} with ${p.processor}, ${p.ram_gb}GB RAM and ${p.storage_gb}GB SSD. ${p.display} display with ${p.gpu} graphics.`;
    case 'smartphone':
      return `${p.name} by ${p.brand} powered by ${p.processor} with ${p.ram_gb}GB RAM and ${p.storage_gb}GB storage. ${p.display} display, ${p.specs.camera} camera and ${p.specs.battery_mah}mAh battery.`;
    case 'headphones':
      return `${p.name} by ${p.brand}. ${p.specs.type} headphones${p.specs.anc ? ' with active noise cancellation' : ''}${p.specs.battery_hours ? ` and up to ${p.specs.battery_hours} hours of battery life` : ''}.`;
    case 'monitor':
      return `${p.name} by ${p.brand}. ${p.display} monitor for work, gaming and entertainment.`;
  }
}

// ---------- Generate one review ----------
function makeReview(p) {
  const bank = banks[p.category];
  let rating = Math.round(p.rating + (rand() * 2.2 - 1.3));
  rating = Math.max(1, Math.min(5, rating));

  const parts = [pick(rating >= 4 ? openers.good : rating === 3 ? openers.mid : openers.bad)];

  // Positive sentences (skipped for very low ratings)
  if (rating >= 3) {
    shuffle(p.pos).slice(0, 2).forEach((k) => parts.push(pick(bank.pos[k])));
  } else {
    parts.push(pick(bank.pos[pick(p.pos)]));
  }

  // Negative sentence: very likely in low ratings, sometimes in high ones
  const negChance = rating <= 3 ? 0.95 : 0.4;
  if (p.neg.length > 0 && rand() < negChance) {
    parts.push('However, ' + lowerFirst(pick(bank.neg[pick(p.neg)])));
  }
  return { rating, text: parts.join(' ') };
}

// ---------- Main ----------
async function seed() {
  validateTraits();
  const client = await pool.connect();

  try {
    await client.query('BEGIN'); // all-or-nothing: if anything fails, nothing is saved

    await client.query(
      'TRUNCATE search_logs, order_items, orders, cart, wishlist, reviews, products, users RESTART IDENTITY CASCADE'
    );

    // ----- Users -----
    // bcrypt.hash(password, 10): 10 = "salt rounds" (how much work the hashing does)
    const adminHash = await bcrypt.hash('Admin@123', 10);
    const userHash = await bcrypt.hash('User@123', 10);
    // (Reusing one hash for demo users is only to keep seeding fast.)

    await client.query(
      `INSERT INTO users (name, email, password_hash, role) VALUES ($1, $2, $3, 'admin')`,
      ['Admin', 'admin@shopai.com', adminHash]
    );

    const names = ['Aarav Sharma', 'Priya Patil', 'Rohan Deshmukh', 'Sneha Kulkarni', 'Vikram Joshi',
                   'Ananya Iyer', 'Karan Mehta', 'Neha Gupta', 'Aditya Rao', 'Isha Nair'];
    const userIds = [];
    for (let i = 0; i < names.length; i++) {
      const res = await client.query(
        `INSERT INTO users (name, email, password_hash, role) VALUES ($1, $2, $3, 'user') RETURNING id`,
        [names[i], `user${i + 1}@example.com`, userHash]
      );
      userIds.push(res.rows[0].id);
    }

    // ----- Products + Reviews -----
    let reviewCount = 0;
    for (let idx = 0; idx < products.length; idx++) {
      const p = products[idx];
      const unitsSold = Math.floor((300 + rand() * 5000) * (p.rating / 5) / (1 + p.price / 60000));
      const imageUrl = `https://placehold.co/600x400?text=${encodeURIComponent(p.brand + ' ' + p.category)}`;

      // $1, $2... are placeholders: values are sent separately, which prevents SQL injection
      const res = await client.query(
        `INSERT INTO products
          (name, brand, category, price, rating, ram_gb, storage_gb, processor, gpu, display,
           specs, description, image_url, units_sold)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14) RETURNING id`,
        [p.name, p.brand, p.category, p.price, p.rating, p.ram_gb, p.storage_gb, p.processor,
         p.gpu, p.display, JSON.stringify(p.specs), buildDescription(p), imageUrl, unitsSold]
      );
      const productId = res.rows[0].id;

      // 8 reviews per product, each from a different user
      for (let r = 0; r < 8; r++) {
        const review = makeReview(p);
        await client.query(
          `INSERT INTO reviews (product_id, user_id, rating, review_text) VALUES ($1,$2,$3,$4)`,
          [productId, userIds[(r + idx) % userIds.length], review.rating, review.text]
        );
        reviewCount++;
      }
    }

    await client.query('COMMIT');
    console.log('Seeding complete');
    console.log(`  Users:    ${names.length + 1} (1 admin + ${names.length} demo users)`);
    console.log(`  Products: ${products.length}`);
    console.log(`  Reviews:  ${reviewCount}`);
    console.log('  Admin login: admin@shopai.com / Admin@123');
    console.log('  User login:  user1@example.com / User@123');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Seeding failed:', err.message);
    process.exitCode = 1;
  } finally {
    client.release();
    await pool.end();
  }
}

seed();