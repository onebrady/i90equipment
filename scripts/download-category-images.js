#!/usr/bin/env node

/**
 * Script to download representative images for each category
 * Run with: node scripts/download-category-images.js
 */

const { Client } = require('pg');
const https = require('https');
const fs = require('fs');
const path = require('path');

// Load .env file manually
const envPath = path.join(__dirname, '..', '.env');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach(line => {
    const match = line.match(/^([^=:#]+)=(.*)$/);
    if (match) {
      const key = match[1].trim();
      const value = match[2].trim();
      if (!process.env[key]) {
        process.env[key] = value;
      }
    }
  });
}

const categories = {
  'Bottom Dumps': 'bottom-dumps.jpg',
  'Flatbeds': 'flatbeds.jpg',
  'Lowboys': 'lowboys.jpg',
  'Side Dumps': 'side-dumps.jpg',
  'Trucks': 'trucks.jpg',
};

async function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        const fileStream = fs.createWriteStream(filepath);
        response.pipe(fileStream);
        fileStream.on('finish', () => {
          fileStream.close();
          resolve();
        });
      } else {
        reject(new Error(`Failed to download image: ${response.statusCode}`));
      }
    }).on('error', reject);
  });
}

async function main() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    await client.connect();
    console.log('Connected to database');

    const publicDir = path.join(__dirname, '..', 'public', 'categories');

    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    for (const [categoryName, filename] of Object.entries(categories)) {
      console.log(`\nFinding image for: ${categoryName}`);

      const result = await client.query(
        `SELECT optimized_images, title
         FROM inventory
         WHERE category = $1 AND optimized_images IS NOT NULL
         LIMIT 1`,
        [categoryName]
      );

      if (result.rows.length > 0) {
        const item = result.rows[0];
        const images = item.optimized_images;

        if (images && images.length > 0) {
          const imageUrl = images[0].fileUrl;
          const filepath = path.join(publicDir, filename);

          console.log(`  Found: ${item.title}`);
          console.log(`  Downloading from: ${imageUrl.substring(0, 60)}...`);

          await downloadImage(imageUrl, filepath);
          console.log(`  ✓ Saved to: public/categories/${filename}`);
        } else {
          console.log(`  ✗ No images found for ${categoryName}`);
        }
      } else {
        console.log(`  ✗ No inventory items found for ${categoryName}`);
      }
    }

    console.log('\n✓ All category images downloaded successfully!');
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  } finally {
    await client.end();
  }
}

main();
