import { ButtonInterface } from "./ButtonInterface";

export interface CardButton extends ButtonInterface{

    isRender?:((obj:any)=>boolean);
}