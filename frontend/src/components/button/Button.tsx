import { ReactNode } from "react";

export const Button = (props: { text: string, onClick: () => void, class?: string, icon?: ReactNode, type?: 'neutral' | 'default' }) => {
    const getClass = () => {
        switch (props.type) {
            case 'neutral':
                return 'bg-gray-300 text-gray px-3 rounded-xl py-1 mb-3 mt-3  rounded';
            case 'default':
                return 'bg-indigo-500 text-white px-3 rounded-xl py-1 mb-3 mt-3 rounded hover:bg-indigo-600 focus:outline-none';
            default:
                return '';
        }
    }
    return (
        <button onClick={props.onClick} className={`${getClass()} ${props.class} text-sm md:text-base poppins-medium`}>
            <div className="flex items-center space-x-2">
                {props.icon}
                <span>
                    {props.text}
                </span>
            </div>
        </button>
    )
}