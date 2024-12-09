// server/routes/links/[slug].get.ts
import { useDrizzle } from "~/utils/drizzle";
import { links } from "~/database/schema/links";
import { visits } from "~/database/schema/visits"; // Assurez-vous d'importer la table visits
import { eq } from "drizzle-orm";
import { v4 as uuidv4 } from 'uuid'; // Importer la fonction pour générer des UUID

export default defineEventHandler(async (event) => {
    const db = useDrizzle();
    const slug = getRouterParam(event, 'slug'); // Récupérer le slug depuis l'URL

    // Rechercher le lien par slug
    const result = await db.select().from(links).where(eq(links.slug, slug)).limit(1);

    if (result.length === 0) {
        return { statusCode: 404, body: { message: "Link not found" } };
    }

    // Enregistrer la visite
    const originalUrl = result[0].url;
    const ip = event.node.req.headers['x-forwarded-for'] || event.node.req.connection.remoteAddress || 'unknown'; // Récupérer l'IP
    const userAgent = event.node.req.headers['user-agent']; // Récupérer le user agent

    await db.insert(visits).values({
        id: uuidv4(), // Utiliser le slug comme identifiant du lien
        created_at: new Date(),
        slug: slug,
        link_id: slug,
        ip: ip,
        user_agent: userAgent,
    });

    // Rediriger vers l'URL d'origine
    return sendRedirect(event, originalUrl);
});