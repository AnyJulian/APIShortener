import { links } from "~/database/schema";
import { isAuth } from "~/utils/authjwt";
import { useDrizzle } from "~/utils/drizzle";
// import {isAuth} from "#imports"

// -- DELETE ALL -- //

export default eventHandler(async (event) => {

    //vérif de s'il est conecté
    isAuth(event)

    const db = useDrizzle()
  
    const results = await db.delete(links);
  
    return results
  });