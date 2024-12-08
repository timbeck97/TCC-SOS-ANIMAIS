import React, {forwardRef, useEffect, useState } from "react";
import { InputInterface } from "../../types/InputInterface"

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
    lines,
    format,
    ...rest

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

    const renderTextArea = () => {
        return (
            <textarea
                id={id}
                name={name}
                rows={lines}
                value={value}
                onChange={handleChange}
                {...register && register(name, { required: required && (validationMessage || 'Campo obrigatório')})}
                className={`block w-full px-3 py-1.5 text-gray-900 shadow-sm border-0 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-100 sm:text-sm/6`}
            />
        )
    }
    const renderInput = () => {
        return (
            <input
                id={id}
                ref={ref}
                name={name}
                onChange={onChange}
                value={value}
                {...rest}
                className={`block w-full px-3 py-1.5 text-gray-900 shadow-sm border-0 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6`}
            />
        )
    }
    const renderInputType = () => {
        switch (type) {
            case 'textarea':
                return renderTextArea();
            default:
                return renderInput();
        }
    }
    const handleChange = (e: any) => {
        let value= e.target.value;
        onChange && onChange(name, value);
    }
    return (
        <div>
            <label htmlFor={name} className="block text-sm/6 font-medium text-gray-900">{label}</label>
            <div className="mt-2">
                {renderInputType()}
                <p className="text-red-500 text-xs mt-1">
                    {errorMessage}
                </p>
            </div>
        </div>
    )
});
Input.displayName = 'Input';
export default Input;