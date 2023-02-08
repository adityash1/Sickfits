import { config, createSchema } from "@keystone-next/keystone/schema";
import "dotenv/config";
import { User } from "./schemas/User";

const databaseURL = process.env.DATABASE_URL;

const sessionConfig = {
  maxAge: 60 * 60 * 24 * 360, // How long they stay signed in?
  secret: process.env.COOKIE_SECRET,
};

export default config({
  // @ts-ignore
  server: {
    cors: {
      origin: [process.env.FRONTEND_URL as string],
      credentials: true,
    },
  },
  db: {
    adapter: "mongoose",
    url: databaseURL as string,
    // TODO: Add data seeding here
  },
  lists: createSchema({
    User,
  }),
  ui: {
    // TODO: change this for roles
    isAccessAllowed: () => true,
  },
  // TODO: Add session values here
});
