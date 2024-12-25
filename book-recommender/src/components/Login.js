import { useEffect, useState } from "react";
import { googleProvider } from "../firebase.js";
import { auth } from "../firebase.js";
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { dataBase } from "../firebase.js";
import { getDocs, collection } from "firebase/firestore";

import HistoryContainer from "./HistoryContainer.js";

function Login() {

    const valueReference = collection(dataBase, "test");
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        async function getData() {
            const data = await getDocs(valueReference);
            const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id, }))
            console.log(filteredData);
        }
        getData();
    })

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
        // Define a regular function to handle auth changes
        function handleAuthChange(user) {
            setCurrentUser(user);
        }

        // onAuthStateChanged returns a function for unsubscribing
        const unsubscribe = onAuthStateChanged(auth, handleAuthChange);

        // Return a cleanup function that unsubscribes when the component unmounts
        return function cleanup() {
            unsubscribe();
        };
    }, []);



    if (currentUser) {
        return loggedIn();
    } else {
        return loggedOut();
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

            </>
        )
    }

}


export default Login;