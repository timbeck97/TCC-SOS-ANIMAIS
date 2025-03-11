import { ReactNode } from "react";

export interface ButtonInterface {
    text: string, 
    onClick?: (param:any | undefined) => void, 
    class?: string, 
    icon?: ReactNode, 
    type?: 'neutral' | 'default' | 'success', 
    buttonType?: 'button' | 'submit'
}