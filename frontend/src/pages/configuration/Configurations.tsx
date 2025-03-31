import { Pawbackground } from "../../components/pawbackground/Pawbackground";
import { PriceRange } from "../../components/pricerange/PriceRange";


export const Configurations = () => {


    return (
        <Pawbackground>
            <div className='border-b border-gray-900/10 pb-12 px-5 shadow-lg rounded-md bg-white relative pt-3'>
                <PriceRange />
            </div>
        </Pawbackground>
    )

}