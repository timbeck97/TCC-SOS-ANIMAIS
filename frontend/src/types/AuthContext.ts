export interface AuthContextInterface {
    login: () => void;
    logout: () => void;
    isAutenticated: () => boolean;
}