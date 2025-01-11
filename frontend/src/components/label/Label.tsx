export const Label = (props: { text: string, style?:{}}) => {
    return (
        <label className='text-xs md:text-sm poppins-semibold'>{props.text}</label>
    )
}