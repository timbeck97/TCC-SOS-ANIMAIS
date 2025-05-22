import React from "react";

const Subtitle = (props: { text: string, icon?: React.ReactNode, extraClasses?:string }) => {

    return (
        <div className={"flex items-center "+props.extraClasses}>
            {props.icon}
            <h1 className="md:text-xl text-md poppins-semibold text-[#464549]">{props.text}</h1>
        </div>


    )

}
Subtitle.displayName = 'Subtitle';
export default Subtitle;