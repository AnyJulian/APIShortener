import { eq } from "drizzle-orm";
import { links } from "~/database/schema";
import { link_tags } from "~/database/schema/link_tags"; // Assurez-vous d'importer link_tags
import { isAuth } from "~/utils/authjwt";
import { useDrizzle } from "~/utils/drizzle";

// -- DELETE -- // with slug

export default defineEventHandler(async (event) => {

    isAuth(event)


    const db = useDrizzle();
    const slug = getRouterParam(event, 'slug');

    // Supprimer les associations de tags
    await db.delete(link_tags).where(eq(link_tags.link_slug, slug));

    // Effectuer la suppression du lien
    const result = await db.delete(links).where(eq(links.slug, slug));

    return { statusCode: 200, body: { message: "Link deleted successfully" } };
});

// const finalResult = await db.select().from(links).where(eq(links.slug, slug))
