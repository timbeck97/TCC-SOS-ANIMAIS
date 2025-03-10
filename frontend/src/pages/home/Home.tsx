import { useState } from "react"
import { get, request } from "../../services/Axios"


export const Home = () => {

    const [data, setData] = useState<string|null>('')

    const fazerRequestPrivada = async (path:string|undefined) => {
        let  pathUrl= '/private'
        if(path){
            pathUrl = `/private/${path}`
        }
        console.log(pathUrl);
        
        let response=await get<string>(pathUrl,{},{})
        setData(response?.data) 
    }
    
    const fazerRequestpublica = async () => {
        // let response=await get<string>('/public',{},{})
        // setData(response?.data)  
        let response=await request<string>("get",'/public')  
        setData(response)       
      
    }

    return (
        <div style={{overflowY:"auto", flex:'1'}}>
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