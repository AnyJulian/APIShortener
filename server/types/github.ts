export interface GithubOAuthResponse {
  access_token: string
  token_type: string
  scope: string
}

export interface GithubUserData {
  login: string
  id: number
  avatar_url: string
  email: string
  // Et bien d'autres données, allez creuser !!
  }
  