import { z } from 'zod'
import jwt from 'jsonwebtoken'

// import jwt, { type JwtPayload } from 'jsonwebtoken'
import { GithubOAuthResponse, GithubUserData } from '~/types/github'



export default defineEventHandler(async event => {
  // La réponse de Github aura cette forme.
  const { github } = useRuntimeConfig(event)
  
  const { code } = getQuery(event)

  // Indiquer entre chevrons (<GithubOAuthResponse>) le type de retour
  // de la réponse pour s'en servir derrière
  const response = await $fetch<GithubOAuthResponse>
  ('https://github.com/login/oauth/access_token', {
  method: 'POST',
  headers: {
  Accept: 'application/json',
  },
  body: {
  // Identifier l'app
  client_id: github.clientId,
  // Renseigner le client secret. Attention, comme son nom
  // l'indique, c'est secret, protégez le bien, ne l'envoyez pas au client.
  client_secret: github.clientSecret,
  // Code récupéré depuis l'URL (utilisez Zod pour valider que
  // c'est bien présent !)
  code,
  },
  })

  const { access_token } = response

  const userData = await $fetch<GithubUserData>
    ('https://api.github.com/user', {
    headers: {
    Authorization: `Bearer ${access_token}`,
    },
    })

    const filteredUserData = (({ login, id, avatar_url }) => ({ login, id, avatar_url }))(userData);

  // Générez un vrai secret !!
  // exemple (terminal): openssl rand -base64 32 ->
  // 3Ly7GzYNqnvEl62Gs0l2IxNFCFFKeuYxWcMOU9IvIq8=
  const tokenSecret = 'LaCavalerieEstArrivée'
  const token = jwt.sign(filteredUserData, tokenSecret, {
  expiresIn: '1h', // Peut être aussi exprimé en secondes. Idéalement,
  // un JWT ne devrait pas durer plus d'une heure, car il n'est pas possible
  // des les invalider.
  subject: userData.login, // optionnel, pour qui ce token a été créé
  audience: 'url-shortener', // optionnel, pour quel usage / audience
  // ce token a été créé
  })
  // console.log(token)

  return { token }
  
})

