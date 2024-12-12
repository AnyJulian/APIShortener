import { useDrizzle } from "~/utils/drizzle";

export default eventHandler(async (event) => {
  const db = useDrizzle()

  const results = "API URL Shortener, pour s'authentifier /auth/login"

  return results
});
