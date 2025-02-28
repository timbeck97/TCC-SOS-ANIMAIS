import { FieldError } from "react-hook-form";

export interface InputNumberInterface {
    id: string;
    name: string;
    label: string;
    value?: string;
    control?: any;
    type: string;
    onChange?:(name:string, value:string)=>void;
    errors?: FieldError | string | undefined;
}