function HistoryContainer() {
    return (
        <>
            <div className="flex flex-col w-full h-full bg-blue-200 rounded-md p-4">
                <p className="font-semibold text-lg" > Book Title Here Here</p>
                <p className="font-semibold text-md" > Author Name</p>
                <p className="text-sm" > Dec 25 2024</p>

                <div className="flex-shrink-0 w-3/4 aspect-[2/3] bg-black rounded-md">
                    <img className="text-white w-full h-full rounded-md" />
                </div>
            </div>
        </>

    );
}

export default HistoryContainer;
