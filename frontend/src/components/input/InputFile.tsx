import { useState } from "react";
import { InputFileInterface } from "../../types/InputFileInterface";

export const InputFile = ({ id, name, label, value, onChange, types}: InputFileInterface) => {

    const [file, setFile] = useState<{ fileName: string, file: File } | null>(null);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFile({ fileName: event.target.files![0].name, file: event.target.files![0] });
        if (event.target.files) {
            onChange(name, event.target.files);
        }
    }
    const removeFile = () => {
        setFile(null);
        onChange(name, null);
    }
    return (
        <div>
            {label && <label htmlFor="cover-photo" className="block text-sm/6 font-medium text-gray-900">{label}</label>}
            <div className="mt-2 flex justify-center flex-col rounded-lg border border-dashed border-gray-900/25 pt-3 pb-2 w-100">
                <div className="text-center">
                    <div>
                        <svg className="mx-auto size-10 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" data-slot="icon">
                            <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z" clipRule="evenodd" />

                        </svg>
                        <div className="mt-4 flex text-sm/6 text-gray-600 justify-center">
                            <label htmlFor="file-upload" className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                                <span>Clique aqui para enviar uma imagem</span>
                                <input id="file-upload" name="file-upload" type="file" accept={types} className="sr-only" onChange={handleChange} />
                            </label>
                        </div>
                    </div>
                </div>
                {file &&
                    <div className="flex justify-between rounded-lg border mx-2 mt-2 pl-3 py-1 text-gray-600">
                        <p>{file.fileName}</p>
                        <svg xmlns="http://www.w3.org/2000/svg" onClick={removeFile} viewBox="0 0 20 20" fill="currentColor" className="size-5 mr-2 hover:scale-125 cursor-pointer">
                            <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
                        </svg>

                        {/* <span className="font-bold hover:bg-red-500 px-5">x</span> */}
                    </div>

                }
            </div>



        </div>
    );
};