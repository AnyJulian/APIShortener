import { useDrizzle } from "~/utils/drizzle";
import { visits } from "~/database/schema/visits"; // Assurez-vous d'importer la table visits

export default defineEventHandler(async (event) => {
    const db = useDrizzle();

    // Récupérer toutes les visites
    const results = await db.select().from(visits);

    // Retourner les résultats
    return results;
});