import React from "react";

export const Title = (props: { text: string, icon?: React.ReactNode }) => {

    return (
        <div className="flex items-center">
            {props.icon}
            <h1 className="md:text-2xl text-[#464549] text-md ml-3 poppins-semibold">{props.text}</h1>
        </div>


    )

}