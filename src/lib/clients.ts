import { createAuthClient } from "better-auth/svelte"; // make sure to import from better-auth/svelte
import { adminClient } from "better-auth/client/plugins"; // import the admin client plugin
export const authClient = createAuthClient({
  // you can pass client configuration here
  plugins:[adminClient()]
});