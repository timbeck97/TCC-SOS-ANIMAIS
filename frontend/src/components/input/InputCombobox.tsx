import React, { useEffect, useState } from "react";
import { InputComboboxInterface } from "../../types/InputComboboxInterface";

export const InputCombobox = React.forwardRef<HTMLSelectElement, InputComboboxInterface>(({ id, name, label, value, onChange, className, comboboxValues, errors }: InputComboboxInterface, ref: any) => {
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
    return (
        <div >
            <label htmlFor={name} className="block text-sm/6 font-medium text-gray-900">{label}</label>
            <div className="mt-2">
                <select 
                id={id} 
                ref={ref} 
                 name={name}
                 onChange={onChange} 
                 className="block w-full bg-bgWhite pl-2 py-1 rounded-md py-2 text-gray-900 shadow-sm border border-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm/6 outline-none">
                    {comboboxValues?.map((obj, index) => {
                        return <option key={index} value={obj.value}>{obj.label}</option>
                    })}
                </select>
                <p className="text-red-500 text-xs mt-1">
                    {errorMessage}
                </p>
            </div>

        </div>
    );
});