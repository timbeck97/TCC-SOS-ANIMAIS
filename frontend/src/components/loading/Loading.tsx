import { useEffect, useState } from "react"

const Loading = (props: { loading: boolean }) => {

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (props.loading) {
            setLoading(true)
        } else {
            setLoading(false)
        }
    }, [props.loading])


    return (
        <div className={`fixed inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center 
                    transition-opacity duration-50 z-50 ${loading ? "opacity-100" : "opacity-0 pointer-events-none"}`} >
            <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-500 border-t-transparent"></div>
        </div>
    )
}
Loading.displayName = 'Loading';
export default Loading