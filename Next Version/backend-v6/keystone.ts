import { config } from "@keystone-6/core";

import { lists } from "./schema";

import { withAuth, session } from "./auth";

import { insertSeedData } from "./seed-data/index";

import { Context } from ".keystone/types";

import "dotenv/config";

const databaseUrl = process.env.DATABASE_URL;
const shadowDatabaseUrl = process.env.SHADOW_DATABASE_URL;
const frontendUrl = process.env.FRONTEND_URL;

export default withAuth(
  config({
    server: {
      cors: { origin: [frontendUrl as string], credentials: true },
      port: 3002,
      // maxFileSize: 200 * 1024 * 1024,
      // healthCheck: true,
      // extendExpressApp: (app, commonContext) => { /* ... */ },
      // extendHttpServer: (httpServer, commonContext, graphQLSchema) => { /* ... */ },
    },
    db: {
      provider: "postgresql",
      url: databaseUrl as string,
      onConnect: async (context: Context) => {
        if (process.argv.includes("--seed-data")) {
          await insertSeedData(context);
        }
      },
      shadowDatabaseUrl: shadowDatabaseUrl as string,
      // Optional advanced configuration
      // enableLogging: true,
      // useMigrations: true,
      // idField: { kind: "uuid" },
    },
    ui: {
      isDisabled: false,
      isAccessAllowed: async (context) => context.session !== undefined,
    },
    lists: lists,
    session,
  })
);
