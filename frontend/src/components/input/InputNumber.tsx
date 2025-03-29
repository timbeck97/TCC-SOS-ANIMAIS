import { forwardRef, useEffect, useState } from "react";
import { useController } from "react-hook-form";
import { formatNumberInput } from "../../services/Util";
import { InputNumberInterface } from "../../types/InputNumberInterface";

export const InputNumber = forwardRef<HTMLSelectElement, InputNumberInterface>(({ id, name, label, value, control, type, errors }: InputNumberInterface, ref: any) => {

    const { field } = useController({
        name,
        control,
        rules: { required: "Este campo é obrigatório", pattern: { value: /^[0-9]+$/, message: "Apenas números são permitidos" } } // Definindo regras de validação

    });
    const [errorMessage, setErrorMessage] = useState<string>("");

    useEffect(() => {
        if (errors) {
            if (typeof errors === 'string') {
                setErrorMessage(errors);
            } else {
                setErrorMessage(errors.message ? errors.message : "");
            }
        } else {
            setErrorMessage("");
        }

    }, [errors]);
    const [componentValue, setComponentValue] = useState<string>('');

    useEffect(() => {
        if(value){
            onChange(value||'');
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);
   
    
    const formatar = (value: string) => {
        if (value === undefined) {
            return '';
        }
        switch (type) {
            case 'numeric2decimals':
                var format = '';
                if (value.replace(',', '').replace('.', '').length > 2) {
                    format = formatNumberInput(value);
                } else {
                    value = value.replace(/[^-\d.,]+/g, '');
                    format = (value + '').replace('.', ',');
                }
                if (format !== '') {
                    value = format;
                } else {
                    value = value.replace(/\D/g, "");
                }
        }
        return value;
    }
    const onChange = (value:string) => {
        let valueFormated = '';
        value = formatar(value);
        setComponentValue(value);
        switch (type) {
            case 'numeric2decimals':
                valueFormated = value.replace(/\./g, '');
                valueFormated = valueFormated.replace(/,/g, '.');
                break;
        }
      
        field.onChange(valueFormated);
    }

    return (
        <div >
            <label htmlFor={id} className="block text-sm/6 font-medium text-gray-900">{label}</label>
            <div className="mt-2">
                <input className="block w-full rounded rounded-md px-3 py-2 text-gray-900 shadow-sm border-0 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                    type="text" id={id} name={name} value={componentValue} onChange={(e)=>onChange(e.target.value)} onFocus={(e)=>e.target.select()} />
                <p className="text-red-500 text-xs mt-1">
                    {errorMessage}
                </p>
            </div>

        </div>
    );
});