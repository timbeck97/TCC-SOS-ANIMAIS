export interface InputComboboxInterface {
    id: string;
    name: string;
    label: string;
    value?: string;
    onChange: any;
    className?: string;
    comboboxValues?:{value: string; label: string }[];
    errors?: any;
}