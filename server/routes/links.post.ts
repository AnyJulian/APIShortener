import { links } from "~/database/schema";
import { link_tags } from "~/database/schema/link_tags";
import { useDrizzle } from "~/utils/drizzle";
import { nanoid } from 'nanoid';

function generateShortSlug(): string {
    return nanoid(6); // Génère un slug de 6 caractères
}

export default defineEventHandler(async event => {
    const db = useDrizzle();
    const body = await readBody(event);
    console.log("Request body:", body);

    // Générer un slug court
    const slug = generateShortSlug();

    // Insérer le lien
    const newLink = await db.insert(links).values({
        url: String(body.url),
        slug: slug, // Utiliser le slug court généré
        title: String(body.title),
        max_visits: body.max_visits,
        available_at: new Date(),
        expired_at: null,
        created_at: new Date(),
        update_at: new Date(),
    }).returning();

    console.log("New link slug:", newLink[0].slug);

    // Gestion des tags (si nécessaire)
    if (Array.isArray(body.tag_id) && body.tag_id.length > 0) {
        const tagValues = body.tag_id.map(tag_id => ({
            link_slug: newLink[0].slug,
            tag_id: Number(tag_id),
        }));

        console.log("Inserting tag associations:", tagValues);

        try {
            await db.insert(link_tags).values(tagValues);
           
        } catch (error) {
            console.error("Error inserting tag associations:", error);
        }
    } else {
        console.log("No tag IDs provided, skipping tag association.");
    }

    return { body: { slug: newLink[0].slug, url: newLink[0].url } }; // Retourner le slug et l'URL
});