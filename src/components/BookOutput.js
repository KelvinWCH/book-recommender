function BookOutput({ title, author, pictureSource, bookGenre, pages }) {
    return (
        <>
            <div className="flex flex-col w-full h-full pt-5 px-10 gap-1 justify-center">

                <div className="flex-shrink-0 w-3/4 aspect-[2/3] bg-black rounded-md">
                    <img className="text-white w-full h-full rounded-md" src={pictureSource} alt = "book cover"/>
                </div>


                <p className="font-bold text-lg leading-tight overflow-hidden">
                    {title}
                </p>


                <p className="font-semibold">{author}</p>
                <p></p>
                <div className="flex flex-col">
                    <p>Genre: {bookGenre}</p>
                    <p>Pages: {pages}</p>
                </div>
            </div>

        </>
    )

}

export default BookOutput;