export interface TokenAuth {
    accessToken: string,
    expiresIn: number,
    refreshToken: string,
    refreshExpiresIn: number,
    tokenId: string,
    roles?: string[]
}