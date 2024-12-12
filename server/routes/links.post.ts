import { links, tags } from "~/database/schema";
import { link_tags } from "~/database/schema/link_tags";
import { useDrizzle } from "~/utils/drizzle";
import { nanoid } from 'nanoid';
import { isAuth } from "~/utils/authjwt";

function generateShortSlug(): string {
    return nanoid(6); // Génère un slug de 6 caractères
}

export default defineEventHandler(async event => {

    //vérif de s'il est conecté
    isAuth(event)
    const db = useDrizzle();
    const body = await readBody(event);
    console.log("Request body:", body);

    // Générer un slug court
    const slug = generateShortSlug();

    // Insérer le lien
    const newLink = await db.insert(links).values({
        url: String(body.url),
        title: String(body.title),
        available_at: new Date(),
        created_at: new Date(),
        update_at: new Date(),
        slug : slug,
    }).returning();


    console.log("New link slug:", newLink[0].slug);

    // Gestion des tags 
    if (Array.isArray(body.tag_id) && body.tag_id.length > 0) {
        var tagValues = body.tag_id.map(tag_id => ({
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

    return {
        url: newLink[0].url,
        slug: newLink[0].slug,
        title: newLink[0].title,
        maxVisits: newLink[0].max_visits || null,
        availableAt: newLink[0].available_at || null,
        expiresAt: newLink[0].expired_at || null,
        tags: tagValues,
        createdAt: newLink[0].created_at.toISOString(),
        updatedAt: newLink[0].update_at.toISOString(),
    };
});