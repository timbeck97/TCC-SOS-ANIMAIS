export interface InputBooleanInterface {
    id: string;
    name: string;
    label: string;
    value?: any;
    control: any;
    onChange?: (value: boolean) => void;
}