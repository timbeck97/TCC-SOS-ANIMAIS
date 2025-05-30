import React from "react";

const Title = (props: { text: string, icon?: React.ReactNode, color?:string }) => {

    return (
        <div className="flex items-center">
            {props.icon}
            <h1 className={`hd:text-2xl mobile:text-md ${props.color?props.color:'text-[#464549]'} poppins-semibold`}>{props.text}</h1>
        </div>


    )

}
Title.displayName = 'Title';
export default Title;