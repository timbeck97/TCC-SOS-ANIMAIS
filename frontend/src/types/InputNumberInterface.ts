import { FieldError } from "react-hook-form";

export interface InputNumberInterface {
    id: string;
    name: string;
    label: string;
    value?: string;
    control: any;
    type: string;
    errors?: FieldError | string | undefined;
}