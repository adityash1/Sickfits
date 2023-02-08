import { list } from "@keystone-next/keystone/schema";
import { text, password } from "@keystone-next/fields";
import { MaybePromise } from "@keystone-next/types";

export const User = list({
  fields: {
    name: text({ isRequired: true }),
    email: text({ isRequired: true, isUnique: true }),
    password: password(),
  },
});
