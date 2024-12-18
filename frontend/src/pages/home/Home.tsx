import { useState } from "react"
import { get } from "../../services/Axios"


export const Home = () => {

    const [data, setData] = useState<string|null>('')

    const fazerRequestPrivada = async (path:string|undefined) => {
        let  pathUrl= '/private'
        if(path){
            pathUrl = `/private/${path}`
        }
        console.log(pathUrl);
        
        let resp=await get<string>(pathUrl)
        console.log('RESPOSTA de  '+pathUrl+': ',resp)
        setData(resp)
        
    }
    
    const fazerRequestpublica = async () => {
        let request = await get<string>('/public')

        console.log(request)
        setData(request)
      
    }

    return (
        <div>
            <h1 className="text-4xl text-center">Bem-vindo ao sistema de castrações</h1>
            <p className="text-xl text-center mt-5">Aqui você
                pode solicitar a castração de seu animal de estimação e acompanhar a fila de espera.</p>
            <div className="flex w-1/5 m-auto flex-col">
                <button className="bg-green-400 rounded rounded-lg p-2 text-white mt-3" onClick={fazerRequestpublica}>
                    Teste requisicao publica
                </button>
                <button className="bg-red-400 rounded rounded-lg p-2 text-white mt-3" onClick={()=>fazerRequestPrivada(undefined)}>
                    Teste requisicao privada
                </button>
                <button className="bg-red-400 rounded rounded-lg p-2 text-white mt-3" onClick={()=>fazerRequestPrivada('admin')}>
                    Teste requisicao privada Admin
                </button>
                <button className="bg-red-400 rounded rounded-lg p-2 text-white mt-3" onClick={()=>fazerRequestPrivada('user')}>
                    Teste requisicao privada User
                </button>

            </div>
            <div className="mt-5">
                <p className="text-center font-bold">{data}</p>
            </div>
        </div>
    )
}