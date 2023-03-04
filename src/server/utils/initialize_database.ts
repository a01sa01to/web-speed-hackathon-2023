import fs from 'node:fs/promises';

import { Database } from 'sqlite3';

import { DATABASE_PATH, DATABASE_SEED_PATH } from './database_paths';

export const initializeDatabase = async () => {
  await fs.copyFile(DATABASE_SEED_PATH, DATABASE_PATH);

  const db = new Database(DATABASE_PATH);
  const Queries = [
    // create index on feature_item.(sectionId, productId)
    'CREATE INDEX feature_item_section_product_idx ON feature_item (sectionId, productId)',
    // create index on limited_time_offer.productId
    'CREATE INDEX limited_time_offer_product_idx ON limited_time_offer (productId)',
    // create index on order.userId
    'CREATE INDEX order_user_idx ON "order" (userId)',
    // create index on product.id
    'CREATE INDEX product_idx ON product (id)',
    // create index on productmedia.productId
    'CREATE INDEX productmedia_product_idx ON product_media (productId)',
    // create index on profile.userId
    'CREATE INDEX profile_user_idx ON profile (userId)',
    // create index on review.productId
    'CREATE INDEX review_product_idx ON review (productId)',
    // create index on shopping_cart_item.orderId
    'CREATE INDEX shopping_cart_item_order_idx ON shopping_cart_item (orderId)',
    // create index on user.id
    'CREATE INDEX user_idx ON user (id)',
  ];
  await Promise.all(
    Queries.map(
      (query) =>
        new Promise<void>((resolve, reject) => {
          db.run(query, (err) => {
            if (err) reject(err);
            else resolve();
          });
        }),
    ),
  );
};
