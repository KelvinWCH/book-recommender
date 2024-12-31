import { doc, deleteDoc } from "firebase/firestore";







function HistoryContainer({
    bookTitle,
    authorName,
    bookGenre,
    bookLength,
    complexity,
    prompt,
    summary,
    sliderValue,
    link,
    pages,
    genre,
    date,
    docID,
    collectionName,
    bookCoverSource,
    dataBase,
    setMeow,


    setPrompt,
    setGenre,
    setBookLength,
    setComplexity,
    setSliderValue,
    setSummary,
    setTitle,
    setAuthor,
    setLink,
    setBookCoverSource,
    setPages,
    setBookGenre
}) {


    async function deleteDocument(docID) {
        console.log("Deleting document:", String(docID));
        try {
            await deleteDoc(doc(dataBase, collectionName, String(docID)));
            setMeow((prev) => !prev); //changes something idk, which is needed to trigger a useEffect in the parent component
            console.log("Document successfully deleted!");
        } catch (e) {
            console.error("Error removing document: ", e);
        }
    }

    function setDetails(){
        setTitle(bookTitle);
        setAuthor(authorName);
        setBookGenre(bookGenre);
        setBookLength(bookLength);
        setComplexity(complexity);
        setPrompt(prompt);
        setSummary(summary);
        setSliderValue(sliderValue);
        setGenre(genre);
        setLink(link);
        setBookCoverSource(bookCoverSource);
        setPages(pages);
    }

    return (
        <div className="flex flex-col w-full bg-white rounded-md p-4 overflow-clip m-1 border-2 border-black cursor-pointer"
            onClick={setDetails}>
            <p className="font-semibold text-lg">{bookTitle}</p>
            <p className="font-semibold text-md">{authorName}</p>
            <div className="flex flex-row justify-between">
                <p className="text-sm">{date}</p>
                <img
                    src="./delete.svg"
                    className="h-[1rem] w-[1rem] cursor-pointer"
                    onClick={() => deleteDocument(docID)} // Pass docID explicitly
                    alt={`Delete Icon | ${docID}`}
                />

            </div>
        </div>
    );
}

export default HistoryContainer;
