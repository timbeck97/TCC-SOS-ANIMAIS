import { useEffect, useState } from "react";
import { formatNumberInput } from "../../services/Util";
import { InputNumberInterface } from "../../types/InputNumberInterface";

export const InputNumberNoValidation = ({ id, name, label, value, type, onChange }: InputNumberInterface) => {

    useEffect(()=>{
        if(value){
            setComponentValue(value)
        }
    // eslint-disable-next-line
    },[])

    const [componentValue, setComponentValue] = useState<string>('');
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
    const handleChange = (value: string) => {
        let valueFormated = '';
        value = formatar(value);
        console.log(value)
        setComponentValue(value)
        switch (type) {
            case 'numeric2decimals':
                valueFormated = value.replace(/\./g, '');
                valueFormated = valueFormated.replace(/,/g, '.');
                break;
        }

        onChange && onChange(name, valueFormated);
    }

    return (
        <div >
            <label htmlFor={id} className="block text-sm/6 font-medium text-gray-900">{label}</label>
            <div className="mt-2">
                <input className="block w-full px-3 py-1.5 text-gray-900 shadow-sm border-0 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                    type="text" id={id} name={name} value={componentValue} onChange={(e) => handleChange(e.target.value)} onFocus={(e) => e.target.select()} />

            </div>

        </div>
    );
}