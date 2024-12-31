import { useState } from "react";

function TextArea({ question, limit, placeHolder, resizeable, onChange, value, required = false}) {

    const handleChange = (e) => {
        if (e.target.value.length <= limit) {
            onChange(e.target.value);
        }
    };

    return (
        <div className="bg-white h-full w-full center-flex flex-col px-4 py-3 rounded-md">
            <p className="text-md text-left w-full font-semibold">
                {question} {required && <span className="text-red-500 font-semibold"> *</span>}
            </p>
            
            <textarea
                className={`bg-white w-full h-full m-1 border-gray-300 border rounded-md min-h-15 text-left p-1 text-sm ${resizeable ? "" : "resize-none"}`}
                placeholder={placeHolder}
                value={value}
                onChange={handleChange}
            />

            <p className="text-xs text-right w-full font-semibold text-gray-600">
                {value.length}/{limit}
            </p>
        </div>
    );
}

export default TextArea;
