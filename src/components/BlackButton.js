
function BlackButton({src, text, onClick}){
    return(
        <>
            <div className="bg-black text-white w-full h-10 rounded-md center-flex gap-1 font-semibold cursor-pointer" onClick={onClick}>
                <img src = {src} alt = "button"></img>
                    {text}
            </div>
        </>
    )
}
export default BlackButton;