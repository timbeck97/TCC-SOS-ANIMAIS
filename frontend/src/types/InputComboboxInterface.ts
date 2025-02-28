export interface InputComboboxInterface {
    id: string;
    name: string;
    label?: string;
    value?: string | number;
    onChange: any;
    className?: string;
    comboboxValues?:any[];
    arrayKey:string,
    valueKey:string
    errors?: any;
}