import { isAuth } from "~/utils/authjwt";
import { useDrizzle } from "~/utils/drizzle";

export default eventHandler(async (event) => {

    //vérif de s'il est conecté
    isAuth(event)
      
    const db = useDrizzle()
  
    const results = await db.query.tags.findMany()
  
    return results
  });