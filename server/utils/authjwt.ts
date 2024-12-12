import { H3Event, EventHandlerRequest } from 'h3';
import jwt, { type JwtPayload } from 'jsonwebtoken'

export function isAuth(event: H3Event<EventHandlerRequest>)  {
    // Cette fonction renvoit un user s'il est bien connecté, ou throw
    // une erreur 401 le cas échéant !
    let decoded: JwtPayload | null = null
    const token = getRequestHeader(event, "Authorization").toString().split(" ")[1]
    
    try {
        // as JwtPayload permet de s'assurer qu'on aura bien ce type et pas
        // une string
        decoded = jwt.verify(
            token,
            'LaCavalerieEstArrivée',
            {
                audience: 'url-shortener', // optionnel: vérifier l'audience pour
                // s'assurer que le token est bien à destination de notre application
            }
        ) as JwtPayload

        } catch (err) {  
        // Si le token est invalide quelle que soit la raison, on va arriver
        // ici
            throw new Error("Token JWT invalide", err);
    }
    const isJwtValid = decoded !== null
    // Un token doit être passé en Bearer token (Headers ->
    // Authorization: Bearer <token>)
    // Votre fonction devra donc lire les headers pour récupérer le
    // token :)
    return isJwtValid
    // const user = await requireUser(event)
    }

    