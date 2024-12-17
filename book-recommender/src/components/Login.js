
function Login() {

    function print(){
        console.log("hey");
    }
    
    return (
        <>
            <div className='bg-green-200 n-200 h-full w-1/4 rounded-md center-flex flex-col'>
                <div className = 'bg-black w-2/3 h-5 center-flex flex-row gap-1 rounded-md cursor-pointer' onClick={print}>
                    <img src = "./google-logo.svg" alt = "Sign in with Google" style = {{height : '0.75rem'}}></img>
                    <p style = {{fontSize : '0.5rem'}} className = 'text-white font-semibold hidden sm:inline'> Sign in with Google</p>
                </div>
                    <p className = 'text-tiny'> Login to save results</p>
            </div> 
        </>
    )
}

export default Login;