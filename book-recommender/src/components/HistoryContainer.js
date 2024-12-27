function HistoryContainer({bookTitle, authorName, date}) {
    return (
        <>
                <div className="flex flex-col w-full bg-white rounded-md p-4 overflow-clip m-1 border-2 border-black">
                    <p className="font-semibold text-lg" > {bookTitle} </p>
                    
                    <p className="font-semibold text-md" > {authorName} </p>
                    <div className="flex flex-row justify-between">
                    <p className="text-sm" > {date}</p>
                    <img src = "./delete.svg" className="h-[1rem] w-[1rem]"/>
                    </div>
                </div>
        </>

    );
}

export default HistoryContainer;
