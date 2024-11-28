export interface InputFileInterface {
    id: string;
    name: string;
    label: string;
    value: any;
    onChange: (name:string,value: any) => void;
}