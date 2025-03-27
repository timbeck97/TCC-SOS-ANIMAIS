export interface InputComboboxInterface {
    id: string;
    name: string;
    label?: string;
    value?: string | number | undefined;
    onChange: any;
    className?: string;
    comboboxValues?:any[];
    arrayKey:string,
    valueKey:string
    errors?: any;
    readOnly?:boolean;
}