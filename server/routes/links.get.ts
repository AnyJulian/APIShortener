import { useDrizzle } from "~/utils/drizzle";
import { links } from "~/database/schema/links";
import { link_tags } from "~/database/schema/link_tags";
import { tags } from "~/database/schema/tags";
import { eq } from "drizzle-orm";
import { isAuth } from "~/utils/authjwt";

export default eventHandler(async (event) => {

    isAuth(event)

    const db = useDrizzle();

    // Effectuer une jointure pour récupérer les liens avec leurs tags
    const results = await db
        .select({
            slug: links.slug,
            url: links.url,
            title: links.title,
            tag_id: tags.id,
            tag_name: tags.name,
            tag_color: tags.color,
        })
        .from(links)
        .innerJoin(link_tags, eq(link_tags.link_slug, links.slug)) 
        .innerJoin(tags, eq(tags.id, link_tags.tag_id)); 

    // Regrouper les résultats par lien
    const groupedResults = results.reduce((acc, row) => {
        const { slug, url, title, tag_id, tag_name, tag_color } = row; // Extraire les données

        // Vérifier si le lien existe déjà dans l'accumulateur
        if (!acc[slug]) {
            acc[slug] = {
                slug,
                url,
                title,
                tags: [], // Initialiser le tableau des tags
            };
        }

        // Ajouter le tag au lien
        acc[slug].tags.push({ id: tag_id, name: tag_name, color: tag_color });

        return acc;
    }, {});

    // Convertir l'objet en tableau
    const finalResults = Object.values(groupedResults);

    return finalResults;
});
