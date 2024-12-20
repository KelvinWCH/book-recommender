
function BlackButton({src, text, onClick}){
    return(
        <>
            <div className="bg-black text-white w-full min-h-10 h-full rounded-md center-flex gap-1 font-semibold cursor-pointer" onClick={onClick}>
                <img src = {src}></img>
                    {text}
            </div>
        </>
    )
}
export default BlackButton;