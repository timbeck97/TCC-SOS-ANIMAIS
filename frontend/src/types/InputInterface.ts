import { FieldError, UseFormRegister } from "react-hook-form";

export interface InputInterface {
    id: string;
    name: string;
    type: string;
    label: string;
    value?: any;
    onChange?:(name:string, value:any) => void;
    className?: string;
    lines?: number; //textarea
    format?:  'cpf' | 'cep' | 'date' | 'currency';
    required?: boolean;
    validationMessage?: string;
    errors?: FieldError | string | undefined;
    register?: UseFormRegister<any>;
}