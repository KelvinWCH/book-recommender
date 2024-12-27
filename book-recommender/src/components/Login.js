import { useEffect, useState } from "react";
import { googleProvider } from "../firebase.js";
import { auth } from "../firebase.js";
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { dataBase } from "../firebase.js";
import { getDocs, collection, addDoc, deleteDoc,serverTimestamp } from "firebase/firestore";


import HistoryContainer from "./HistoryContainer.js";

function Login() {


    const [currentUser, setCurrentUser] = useState(null);
    const [userData, setUserData] = useState(null); // State to store fetched data
    const [collectionName, setCollectionName] = useState("test");
    const [valueReference, setValueReference] = useState(null);

    async function googleLogin() {
        console.log(auth?.currentUser?.email);
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (e) {
            console.error(e);
        }
    }

    async function logOut() {
        await signOut(auth);
    }

    useEffect(function componentMountEffect() {
        function handleAuthChange(user) {
            setCurrentUser(user);
            setCollectionName(user.email);
            setValueReference(collection(dataBase, collectionName));
        }

    
        const unsubscribe = onAuthStateChanged(auth, handleAuthChange);

        return function cleanup() {
            unsubscribe();
        };
    }, []);


    useEffect(() => {
        if (currentUser) {
            getInformation()
                .then(data => {
                    setUserData(data.docs.map((doc) => ({...doc.data()}))); // Store fetched data in state
                    console.log(userData);
                })
                .catch(error => {
                    console.error("Error fetching information:", error);
                });
        } else {
            setUserData(null);
        }
    }, [currentUser]);



    async function getInformation() {
        const data = await getDocs(valueReference);
        return data;
    }

    if (currentUser) {
        return loggedIn();
    } else {
        return loggedOut();
    }


    async function addData(){
        try {
            const docRef = await addDoc(valueReference, {
                name: "Tokyo",
                country: "Japan",
                date: serverTimestamp(),
            });
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    async function deleteDoc(){
        try {
            await deleteDoc(valueReference, "Tokyo");
            console.log("Document successfully deleted!");
        } catch (e) {
            console.error("Error removing document: ", e);
        }
    }

    function loggedOut() {
        return (
            <>
                <div className='bg-black w-3/4 h-9 center-flex flex-row gap-1 rounded-md cursor-pointer' onClick={googleLogin}>
                    <img src="./google-logo.svg" alt="Sign in with Google" ></img>
                    <p className='text-white font-semibold hidden lg:inline text-md'> Sign in with Google</p>
                </div>
                <p className='text-sm'> Login to save results</p>
            </>
        )
    }


    function loggedIn() {
        return (
            <>
                <div
                    className="h-full w-full flex flex-col items-center overflow-y-auto gap-1 p-2"
                >
                    <p className="cursor-pointer" onClick={logOut}>
                        Log Out
                    </p>
                    <div onClick = { addData }> hey </div>
                    <div onClick={deleteDoc}> bye</div>
                    <div className="w-full bg-gray-200" style={{ height: "2000px" }} >
                        <HistoryContainer />
                        <HistoryContainer />
                        <HistoryContainer />
                        <HistoryContainer />
                        <HistoryContainer />
                        <HistoryContainer />
                        <HistoryContainer />
                        <HistoryContainer />
                        <HistoryContainer />
                        <HistoryContainer />
                    </div>
                </div>


            </>
        )
    }

}


export default Login;