import React, {forwardRef, useEffect, useState } from "react";
import { InputInterface } from "../../types/InputInterface"
import { formatCpf } from "../../services/Util";

const Input = forwardRef<HTMLInputElement, InputInterface>(({
    id,
    name,
    register,
    label,
    type,
    value,
    className,
    onChange,
    required,
    validationMessage,
    errors,

}: InputInterface, ref) => {

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
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value= e.target.value;
        onChange && onChange(name, value);
    }
    return (
        <div>
            <label htmlFor={name} className="block text-sm/6 font-medium text-gray-900">{label}</label>
            <div className="mt-2">
                <input
                    id={id}
                    name={name}
                    type={type}
                    value={value && formatCpf(value)}
                    onChange={handleChange}
                    {...register && register(name, { required: required && (validationMessage || 'Campo obrigatório')})} 
                    className={`"block w-full px-3  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"`}
                />
                <p className="text-red-500 text-xs mt-1">
                    {errorMessage}
                </p>
            </div>
        </div>
    )
});
export default Input;