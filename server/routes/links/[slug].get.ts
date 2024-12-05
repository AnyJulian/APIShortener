// Exemple de route GET pour récupérer un lien par slug
import { useDrizzle } from "~/utils/drizzle";
import { links } from "~/database/schema/links";
import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
    const db = useDrizzle();
    const slug = getRouterParam(event, 'slug'); // Récupérer le slug depuis l'URL

    // Rechercher le lien par slug
    const result = await db.select().from(links).where(eq(links.slug, slug)).limit(1);

    if (result.length === 0) {
        return { statusCode: 404, body: { message: "Link not found" } };
    }

    // Rediriger vers l'URL d'origine
    const originalUrl = result[0].url;
    return sendRedirect(event, originalUrl);
});