import { useState } from "react";
function TextArea({question}) {
    const [textValue, setText] = useState("");

    return (
        <>
            <div className="bg-white w-[90%] center-flex flex-col px-4 py-3 rounded-md">
                <p className="text-lg text-left w-full font-semibold"> {question} <span className="text-red-500 font-semibold"> *</span></p>
                <textarea className="bg-white w-full h-full m-1 border-gray-300 border rounded-md min-h-20 text-left p-1" placeholder="placeholder text"/>
                
                <p className="text-xs text-right w-full font-semibold text-gray-600"> 256/500 </p>
            </div>
        </>
    );
}


export default TextArea;