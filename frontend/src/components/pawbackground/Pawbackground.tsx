import pawBackground from "../../assets/paw.jpg"
const Pawbackground = ({ children, className }: { children?: React.ReactNode, className?:string}) => {

    return (
        <div style={{
            backgroundImage: `url(${pawBackground})`,
         
        }} className="flex flex-col grow">

            <div className={className?className:"container max-w-full  md:max-w-7xl mx-auto  shadow-md pt-3"}>
                {children}
            </div>
        </div>
    )
}
Pawbackground.displayName = 'Pawbackground';
export default Pawbackground;