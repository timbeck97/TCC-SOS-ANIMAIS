import pawBackground from "../../assets/paw.jpg"
export const Pawbackground = ({ children }: { children?: React.ReactNode}) => {

    return (
        <div style={{
            backgroundImage: `url(${pawBackground})`,
         
        }} className="flex flex-col grow">

            <div className="container sm:max-w-full  md:max-w-6xl mx-auto  shadow-md pt-3">
                {children}
            </div>
        </div>
    )
}