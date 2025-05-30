import { ButtonInterface } from "../../types/ButtonInterface";

const Button = (props: ButtonInterface) => {
    const getClass = () => {
        switch (props.type) {
            case 'neutral':
                return 'bg-gray-300 text-gray px-3 rounded-xl py-2  rounded hover:bg-gray-500 hover:text-white focus:outline-none';
            case 'default':
                return 'bg-indigo-500 text-white px-3 rounded-xl py-2 rounded hover:bg-indigo-600 focus:outline-none';
            case 'success':
                return 'bg-green-500 text-white px-3 rounded-xl py-2 rounded hover:bg-green-600 focus:outline-none';
            case 'danger':
                return 'bg-red-500 text-white px-3 rounded-xl py-2 rounded hover:bg-red-600 focus:outline-none';
            default:
                return '';
        }
    }
    return (
        <button onClick={props.onClick} className={`${getClass()} ${props.class} hd:text-base mobile:text-xs poppins-medium`} type={props.buttonType ? props.buttonType : 'button'}>

            <div className="flex items-center justify-center space-x-1">
                {props.icon}
                <span className="text-sm">
                    {props.text}
                </span>
            </div>
        </button>
    )
}
Button.displayName = 'Button';
export default Button;