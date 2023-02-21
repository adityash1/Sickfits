import { products } from "./data";
import type { Context } from ".keystone/types";

export async function insertSeedData(context: Context) {
  console.log(`🌱 Inserting seed data`);

  const createProduct = async (product: any) => {
    const { prisma } = context;
    console.log(`  🛍️ Adding Product: ${product.name}`);
    const { id } = await prisma.productImage.create({
      data: {
        image: product.photo,
        altText: product.description,
      },
    });
    product.photo = { connect: { id } };
    await prisma.product.create({ data: product });
  };

  for (const product of products) {
    await createProduct(product);
  }

  console.log(`✅ Seed data inserted: ${products.length} Products`);
  console.log(
    `👋 Please start the process with \`yarn dev\` or \`npm run dev\``
  );
  process.exit();
}
