import { eq } from "drizzle-orm";
import { tags } from "~/database/schema";
import { isAuth } from "~/utils/authjwt";
import { useDrizzle } from "~/utils/drizzle";

// -- DELETE -- // with id

export default defineEventHandler(async event => {

  isAuth(event)


    const db = useDrizzle()
    //const id = getRouterParam(event, 'id')
    const id = Number(getRouterParam(event, 'id'))

    const results = await db.delete(tags).where(eq(tags.id, id));
  
    return results
  })

  

