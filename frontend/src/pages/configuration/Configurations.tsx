import { PriceRange } from "../../components/pricerange/PriceRange";


export const Configurations = () => {


    return (
        <div className="pb-12 px-10 bg-[#f3f4f6] flex flex-col grow">
            <div className="container sm:max-w-full  md:max-w-6xl mx-auto p-5  shadow-md pt-3">
                <PriceRange />
                <hr />
            </div>
            
        </div>
    )

}