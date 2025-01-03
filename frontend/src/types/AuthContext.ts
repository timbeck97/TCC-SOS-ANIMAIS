export interface AuthContextInterface {
    login: () => void;
    logout: () => void;
    isAutenticated: () => boolean;
    updateRefreshToken: ()=>void;
    loading: boolean;
}