import { useEffect, useState } from "react";
import { googleProvider } from "../firebase.js";
import { auth } from "../firebase.js";
import { signInWithPopup, signOut } from "firebase/auth";
import { dataBase } from "../firebase.js";
import { getDocs, collection } from "firebase/firestore";

function Login() {
    const [value, setValue] = useState([]);
    const valueReference = collection(dataBase, "test");
    useEffect(() => {
        async function getData(){
            const data = await getDocs(valueReference);
            const filteredData = data.docs.map((doc) => ({...doc.data(), id: doc.id,}))
            console.log(filteredData);
        }
        getData();
    })

    async function googleLogin(){
        console.log(auth?.currentUser?.email);
        try{
            await signInWithPopup(auth, googleProvider);
        }catch(e){
            console.error(e);
        }
    }

    async function logOut(){
        await signOut(auth);
    }
    
    return (
        <>
            <div className='bg-green-200 n-200 h-full w-1/4 rounded-md center-flex flex-col'>
                <div className = 'bg-black w-3/4 h-9 center-flex flex-row gap-1 rounded-md cursor-pointer' onClick={googleLogin}>
                    <img src = "./google-logo.svg" alt = "Sign in with Google" ></img>
                    <p className = 'text-white font-semibold hidden lg:inline text-md'> Sign in with Google</p>
                </div>
                    <p className = 'text-tiny'> Login to save results</p>
                    <button onClick={logOut}> log out </button>
            </div> 
        </>
    )
}

export default Login;