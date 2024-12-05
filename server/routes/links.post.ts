import { links } from "~/database/schema";
import { link_tags } from "~/database/schema/link_tags";
import { useDrizzle } from "~/utils/drizzle";

export default defineEventHandler(async event => {
    const db = useDrizzle();
    const body = await readBody(event);
    console.log("Request body:", body);

    // Insérer le lien
    const newLink = await db.insert(links).values({
        url: String(body.url),
        slug: String(body.slug),
        title: String(body.title),
        max_visits: body.max_visits,
        available_at: new Date(),
        expired_at: body.expired_at ? new Date(body.expired_at) : null,
        created_at: new Date(),
        update_at: new Date(),
    }).returning();

    console.log("New link slug:", newLink[0].slug);

    if (Array.isArray(body.tag_id) && body.tag_id.length > 0) {
        const tagValues = body.tag_id.map(tag_id => ({
            link_slug: newLink[0].slug, // Utilisez le slug du lien nouvellement créé
            tag_id: Number(tag_id), // Assurez-vous que tag_id est un nombre
        }));
    
        console.log("Inserting tag associations:", tagValues);
    
        try {
            await db.insert(link_tags).values(tagValues);
            console.log("Tag associations inserted successfully.");
        } catch (error) {
            console.error("Error inserting tag associations:", error);
        }
    } else {
        console.log("No tag IDs to insert.");
    }

    return { body };
});