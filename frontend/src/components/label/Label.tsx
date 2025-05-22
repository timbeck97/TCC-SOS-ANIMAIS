const Label = (props: { text: string, className?:string}) => {
    return (
        <label className={`text-xs md:text-sm poppins-semibold ${props.className?props.className:''}`}>{props.text}</label>
    )
}
Label.displayName = 'Label';
export default Label;