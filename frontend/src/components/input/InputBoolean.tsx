import { useController } from "react-hook-form";
import { InputBooleanInterface } from "../../types/InputBooleanInterface";

export const InputBoolean = ({ id, name, label, value, control }: InputBooleanInterface) => {

    const { field } = useController({
        name,
        control,
        defaultValue: value,
    });

    return (
        <div>
            <label  className="block text-sm/6 font-medium text-gray-900">{label}</label>
            <div className="flex items-center mt-2">
                <button id={id + "sim"}
                    type="button"
                    className={`px-4 py-2 rounded-l-lg ${field.value === true
                        ? "bg-green-500 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                    onClick={() => field.onChange(true)}
                >
                    Sim
                </button>
                <button id={id + "nao"}
                    type="button"
                    className={`px-4 py-2 rounded-r-lg ${field.value === false
                        ? "bg-red-500 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                    onClick={() => field.onChange(false)}
                >
                    Não
                </button>
            </div>
        </div>
    )
}