import { useEffect, useState, useContext } from "react";
import axios from 'axios';
import { googleProvider } from "../firebase.js";
import { auth } from "../firebase.js";
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { dataBase } from "../firebase.js";
import {
    getDocs,
    collection,
    addDoc,
    serverTimestamp,
    query,
    orderBy,
} from "firebase/firestore";

import HistoryContainer from "./HistoryContainer.js";

function Login({
    prompt,
    genre,
    bookLength,
    complexity,
    sliderValue,
    summary,
    title,
    author,
    link,
    bookCoverSource,
    pages,
    bookGenre,

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
    triggerData,
    token,
}) {


    const [currentUser, setCurrentUser] = useState(null);
    const [userData, setUserData] = useState(null); // State to store fetched data
    const [collectionName, setCollectionName] = useState("loggedOut");
    const [valueReference, setValueReference] = useState(null);
    const [meow, setMeow] = useState(0);
    // --- Sign in with Google ---
    async function googleLogin() {
        console.log(auth?.currentUser?.email);
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (e) {
            console.error(e);
        }
    }

    // --- Sign out ---
    async function logOut() {
        await signOut(auth);
        setCurrentUser(null);
        setCollectionName("loggedOut");
    }

    // --- Listen for Auth state changes --- subscription type event listener
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setCurrentUser(user);
                setCollectionName(user.email);
                localStorage.setItem("email", user.email);
            } else {
                setCurrentUser(null);
                setCollectionName("loggedOut");
                localStorage.removeItem("email");
            }
        });
        return () => unsubscribe();
    }, []);


    // ---  set the Firestore collection reference god i love useEffect---
    useEffect(() => {
        if (currentUser && collectionName !== "loggedOut") {
            setValueReference(collection(dataBase, collectionName));
        } else {
            setValueReference(collection(dataBase, "loggedOut"));
        }
    }, [currentUser, collectionName]);


    // --- Fetch user data whenever collectionName changes or meow changes i am totally sane ---
    useEffect(() => {
        if (currentUser && collectionName !== "loggedOut") {
            console.log("Fetching data for collection:", collectionName);
            getInformation()
                .then((data) => {
                    console.log("Fetching complete");
                    setUserData(data.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
                })
                .catch((error) => {
                    console.error("Error fetching information:", error);
                });
        } else {
            setUserData(null);
        }
    }, [currentUser, collectionName, meow]);


    // --- Add data on triggerData changes (only if we have a valid collection reference ofc) ---
    useEffect(() => {
        if (valueReference) {
            addData();
        }
    }, [triggerData, valueReference]);


    // --- Render the user’s saved history ---
    function renderHistoryContainers() {
        if (!currentUser) {
            return null; // not logged in, don't render anything (double checking for safety cause async gets funny)
        }
        if (!userData) {
            return <p>Loading data...</p>;
        }
        if (userData.length === 0) {
            return <p className="">No data available</p>;
        }

        return userData.map((doc, index) => {
            return (
                <>
                    <div key={index}>
                        <HistoryContainer
                            bookTitle={doc.title}
                            authorName={doc.author}
                            bookGenre={doc.bookGenre}
                            bookLength={doc.bookLength}
                            complexity={doc.complexity}
                            prompt={doc.prompt}
                            summary={doc.summary}
                            sliderValue={doc.sliderValue}
                            link={doc.link}
                            pages={doc.pages}
                            genre={doc.genre}
                            bookCoverSource={doc.bookCoverSource}
                            date={
                                doc.date?.toDate ? doc.date.toDate().toLocaleString() : "Unknown Date"
                            }
                            docID={doc.id}
                            collectionName={collectionName}
                            dataBase={dataBase}
                            setMeow={setMeow}
                            setPrompt={setPrompt}
                            setGenre={setGenre}
                            setBookLength={setBookLength}
                            setComplexity={setComplexity}
                            setSliderValue={setSliderValue}
                            setSummary={setSummary}
                            setTitle={setTitle}
                            setAuthor={setAuthor}
                            setLink={setLink}
                            setBookCoverSource={setBookCoverSource}
                            setPages={setPages}
                            setBookGenre={setBookGenre}
                            token={token}
                        />
                    </div>
                </>

            );
        });
    }

    // --- Firestore: get user info (ordered by timestamp) ---
    async function getInformation() {
        if (collectionName === "loggedOut") {
            throw new Error("Collection name is not set");
        }

        const sortedQuery = query(
            collection(dataBase, collectionName),
            orderBy("date", "desc")
        );
        const data = await getDocs(sortedQuery);
        return data;
    }


    // --- Firestore: add data to user’s collection ---
    async function addData() {
        try {
            await axios.post(`${process.env.REACT_APP_BACKEND_URL}/firebase/addData`, {
                email: collectionName,
                prompt: prompt,
                genre: genre,
                bookLength: bookLength,
                complexity: complexity,
                sliderValue: sliderValue,
                summary: summary,
                title: title,
                author: author,
                link: link,
                bookCoverSource: bookCoverSource,
                pages: pages,
                bookGenre: bookGenre,
                date: serverTimestamp(),
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },  withCredentials: true
            });
            setMeow((prev) => prev + 1);
        }
        catch (error) {
            console.error('Error adding document: ', error);
        }
    }
    //We don't use legacy code here
    // if (!valueReference) {
    //     return;
    // }
    // try {
    //     const docRef = await addDoc(valueReference, {
    //         prompt: prompt, // string
    //         genre: genre, // string
    //         bookLength: bookLength, // string
    //         complexity: complexity, // string
    //         sliderValue: sliderValue, // number
    //         summary: summary, // string
    //         title: title, // string
    //         author: author, // string
    //         link: link, // string
    //         bookCoverSource: bookCoverSource, // string
    //         pages: pages, // number
    //         bookGenre: bookGenre, // string
    //         date: serverTimestamp(),
    //     });
    //     setMeow((prev) => prev + 1);
    //     console.log("Document written with ID: ", docRef.id, meow);
    // } catch (e) {
    //     console.error("Error adding document: ", e);
    // }


    // --- Logged-out View ---
    function loggedOut() {
        return (
            <>

                    <div
                        className="bg-black w-3/4 h-9 center-flex flex-row gap-1 rounded-md cursor-pointer"
                        onClick={googleLogin}
                    >
                        <img src="./google-logo.svg" alt="Sign in with Google" />
                        <p className="text-white font-semibold hidden lg:inline text-md">
                            Sign in with Google
                        </p>
                    </div>
                    <p className="text-sm">Login to save results</p>

            </>
        );
    }

    // --- Logged-in View ---
    function loggedIn() {
        return (
            <>
   
                    <div className="h-full w-full flex flex-col items-center overflow-y-auto gap-1 p-2">
                        <p
                            className="cursor-pointer bg-red-800 w-full text-white center-flex font-semibold rounded-md"
                            onClick={logOut}
                        >
                            Log Out
                        </p>
                        <p className="text-sm">
                            User: <span className="font-bold"> {collectionName} </span>
                        </p>
                        <div className="w-full bg-gray-200" style={{ minHeight: "300px" }}>
                            {renderHistoryContainers()}
                        </div>
                    </div>

            </>
        );
    }

    // --- Render final output based on auth status ---
    if (currentUser) {
        return loggedIn();
    } else {
        return loggedOut();
    }
}

export default Login;
