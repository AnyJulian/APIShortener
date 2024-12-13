import { useDrizzle } from "~/utils/drizzle";
import { links } from "~/database/schema/links";
import { link_tags } from "~/database/schema/link_tags";
import { tags } from "~/database/schema/tags";
import { eq } from "drizzle-orm";
import { isAuth } from "~/utils/authjwt";
import { z } from "zod";

export default eventHandler(async (event) => {

    isAuth(event)

    const paramPage = Number(getRequestHeader(event, "Page")) || 1; // default to page 1 if not provided
    const paramLimit = Number(getRequestHeader(event, "Limit")) || 4; // default to lmit 4 if not provided

    const paginationQuerySchema = z.object({
        page: z.coerce.number()
          .min(1, 'Page doit être supérieur à 1')
          .default(paramPage),
        limit: z.coerce.number()
          .min(2)
          .max(10)
          .default(paramLimit),
    });

    const db = useDrizzle();

    const { page, limit } = await getValidatedQuery(event, paginationQuerySchema.parse)

    // Effectuer une jointure pour récupérer les liens avec leurs tags
    const results = await db
        .select({
            slug: links.slug,
            url: links.url,
            title: links.title,
            maxVisits: links.max_visits,
            availableAT: links.available_at,
            expiredAt: links.expired_at,
            tag_id: tags.id,
            tag_name: tags.name,
            tag_color: tags.color,
            createdAt: links.created_at,
            updateAt: links.update_at
        })
        .from(links)
        .innerJoin(link_tags, eq(link_tags.link_slug, links.slug)) 
        .innerJoin(tags, eq(tags.id, link_tags.tag_id)); 

    // Regrouper les résultats par lien
    const groupedResults = results.reduce((acc, row) => {
        const { slug, url, title, maxVisits, availableAT, expiredAt, tag_id, tag_name, tag_color, createdAt, updateAt } = row; 

        if (!acc[slug]) {
            acc[slug] = {
                slug,
                url,
                title,
                maxVisits,
                availableAT,
                expiredAt,
                tags: [], 
                createdAt,
                updateAt,
            };
        }

        // Ajouter le tag au lien
        acc[slug].tags.push({ id: tag_id, name: tag_name, color: tag_color });

        return acc;
    }, {});

    // Convertir l'objet en tableau
    const finalResults = Object.values(groupedResults);

    const maxPage = Math.ceil(finalResults.length / limit)

    if (page > maxPage) {
        return sendError(event, createError({
          statusCode: 400,
          statusMessage: `Page ${page} is out of range (max: ${maxPage})`
        }))
      }

      const offset = (page - 1) * limit
      const linksSlice = finalResults.slice(offset, page * limit)

      linksSlice.map(link => link).join('\n')

      return {
          total: finalResults.length,
          maxPage,
          limit,
          page,
          data: linksSlice,
      }
});

