export interface AuthContextInterface {
    isAutenticated: () => boolean;
    loading: boolean;
    roles: string[];
}