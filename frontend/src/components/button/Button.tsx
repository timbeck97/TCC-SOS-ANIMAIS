import { ReactNode } from "react";
import { ButtonInterface } from "../../types/ButtonInterface";

export const Button = (props: ButtonInterface) => {
    const getClass = () => {
        switch (props.type) {
            case 'neutral':
                return 'bg-gray-300 text-gray px-3 rounded-xl py-2  rounded';
            case 'default':
                return 'bg-indigo-500 text-white px-3 rounded-xl py-2 rounded hover:bg-indigo-600 focus:outline-none';
            case 'success':
                return 'bg-green-500 text-white px-3 rounded-xl py-2 rounded hover:bg-green-600 focus:outline-none';
            default:
                return '';
        }
    }
    return (
        <button onClick={props.onClick} className={`${getClass()} ${props.class} text-sm sm:text-base md:text-xs lg:text-md poppins-medium`} type={props.buttonType?props.buttonType:'button'}>
            <div className="flex items-center justify-center space-x-1">
                {props.icon}
                <span>
                    {props.text}
                </span>
            </div>
        </button>
    )
}