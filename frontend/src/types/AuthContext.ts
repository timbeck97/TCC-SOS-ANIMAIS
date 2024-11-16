export interface AuthContextInterface {
    login: (username:string, password:string) => void;
    isAutenticated: () => boolean;
}