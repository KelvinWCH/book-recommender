import { doc, deleteDoc } from "firebase/firestore";
import axios from 'axios';
import { useContext } from "react";




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
    setBookGenre,

    token,
}) {

    async function deleteDocument(docID) {
        console.log("Deleting document with ID:", docID, collectionName);
        try {
            await axios.post(`${process.env.REACT_APP_BACKEND_URL}/firebase/deleteData`, {
                email: collectionName,
                docID: docID,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },  withCredentials: true
            })
            setMeow((prev) => prev + 1);
        } catch (error) {
            console.log(error);
        }
    }

    function setDetails() {
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
