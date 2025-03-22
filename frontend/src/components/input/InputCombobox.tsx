import React, { useEffect, useState } from "react";
import { InputComboboxInterface } from "../../types/InputComboboxInterface";

export const InputCombobox = React.forwardRef<HTMLSelectElement, InputComboboxInterface>(({ id, name, label,arrayKey, valueKey, value, onChange, className, comboboxValues, errors }: InputComboboxInterface, ref: any) => {
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
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        
        if (onChange) {
          onChange(e); // Executa a função customizada passada via props
        }
      };
    return (
        <div >
            {label && <label htmlFor={name} className="block text-sm/6 font-medium text-gray-900">{label}</label>}
            <div className="mt-2">
                <select 
                id={id} 
                value={value}
                ref={ref} 
                 name={name}
                 onChange={(e) => {
                    handleChange(e); // Dispara o onChange customizado
                  }}
                 className={"block w-full bg-bgWhite pl-2 py-1 rounded-md py-2 text-gray-900 shadow-sm border border-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 outline-none "+(className?className:' text-sm sm:text-sm/6')}>
                    {comboboxValues?.map((obj, index) => {
                        return <option key={index} value={obj[valueKey]?obj[valueKey]:''}>{obj[arrayKey]}</option>
                    })}
                </select>
                <p className="text-red-500 text-xs mt-1 ">
                    {errorMessage}
                </p>
            </div>

        </div>
    );
});