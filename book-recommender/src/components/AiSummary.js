function AiSummary({summaryText}) {
    return (
        <>
            <div className="flex flex-col gap-1">
                <div className="flex gap-1">
                    <img src="./lightning_black.svg"></img>
                    <p className="font-semibold"> AI Summary</p>
                </div>
                <p className="font-semibold"> 
                    {summaryText}
                </p>
            </div>
        </>
    );
}

export default AiSummary;