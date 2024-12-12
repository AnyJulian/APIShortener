import { tags } from "~/database/schema";
import { isAuth } from "~/utils/authjwt";
import { useDrizzle } from "~/utils/drizzle";

// -- DELETE ALL -- //

export default eventHandler(async (event) => {

    //vérif de s'il est conecté
    isAuth(event)

    const db = useDrizzle()
  
    const results = await db.delete(tags);
  
    return results
  });