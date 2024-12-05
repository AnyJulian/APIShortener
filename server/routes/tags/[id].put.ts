import { eq } from "drizzle-orm";
import { tags } from "~/database/schema";
import { useDrizzle } from "~/utils/drizzle";

export default defineEventHandler(async event => {
    const db = useDrizzle()
    const body = await readBody(event)
    // const id = getRouterParam(event, 'id')
    const id = Number(getRouterParam(event, 'id'))

    console.log(body)
  
    await db.update(tags)
        .set({ name: body.title, color: body.color })
        .where(eq(tags.id, id))
        .returning({ updatedId: tags.id });

  
    return { body }
  });
