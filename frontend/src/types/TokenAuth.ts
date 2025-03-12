export interface TokenAuth {
    token: string,
    tokenExpiration: number,
    refreshToken: string,
    refreshTokenExpiration: number,
    tokenId: string
}