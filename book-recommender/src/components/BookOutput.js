function BookOutput() {
    return (
        <>
            <div className="flex flex-col w-full h-full pt-5 px-10 gap-1">

                <div className="flex-shrink-0 w-full max-w-full aspect-[2/3] bg-black rounded-md">
                    <span className="text-white">hey</span>
                </div>

          
                <p className="font-bold text-lg leading-tight overflow-hidden">
                    Book Title here which is big and goes down to the next line if needed
                </p>


                <p className="font-semibold">George Washington</p>
            </div>

        </>
    )

}

export default BookOutput;