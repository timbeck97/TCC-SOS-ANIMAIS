import { ReactNode } from "react";

export const Button = (props: { text: string, onClick?: () => void, class?: string, icon?: ReactNode, type?: 'neutral' | 'default'|'success', buttonType?:'button'|'submit' }) => {
    const getClass = () => {
        switch (props.type) {
            case 'neutral':
                return 'bg-gray-300 text-gray px-3 rounded-xl py-1  rounded';
            case 'default':
                return 'bg-indigo-500 text-white px-3 rounded-xl py-1 rounded hover:bg-indigo-600 focus:outline-none';
            case 'success':
                return 'bg-green-500 text-white px-3 rounded-xl py-1 rounded hover:bg-green-600 focus:outline-none';
            default:
                return '';
        }
    }
    return (
        <button onClick={props.onClick} className={`${getClass()} ${props.class} text-sm md:text-base poppins-medium`} type={props.buttonType?props.buttonType:'button'}>
            <div className="flex items-center justify-center space-x-1">
                {props.icon}
                <span>
                    {props.text}
                </span>
            </div>
        </button>
    )
}