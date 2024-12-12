export default defineEventHandler(event => {
  // https://nitro.unjs.io/guide/configuration
  const { github } = useRuntimeConfig(event)
  const scope = 'user'; // No additional scopes required to read
  //profile. Add more scopes if you need more permissions.
  const url = new URL('https://github.com/login/oauth/authorize');
  // Client ID pour identifier votre app
  url.searchParams.append('client_id', github.clientId);
  // URL où l'utilisateur sera redirigé une fois authentifié
  url.searchParams.append('redirect_uri',
  'http://localhost:3000/auth/callback');
  // Scopes demandés. Un scope est une permission, cela donne droit à
  //votre app d'effectuer une action à la place de l'utilisateur
  url.searchParams.append('scope', scope);
  // Redirige l'utilisateur vers la page de login de Github
  return sendRedirect(event, url.toString());
  })