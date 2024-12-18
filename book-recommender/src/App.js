import './App.css';
import Login from './components/Login.js'
import TextArea from './components/TextArea.js';
function App() {


  return (
    <div className='bg-gray-950 w-screen h-screen flex flex-col items-center justify-center'>
      <div className='bg-white w-2/3 h-4/5 flex flex-col gap-0.5'>

        <div className='bg-gray-500 w-full h-3/4 flex flex-row gap-0.5'>
        
          <Login> </Login>

          <div className='bg-red-200 h-full w-2/4 rounded-md center-flex flex-col gap-1'>
            <TextArea question={"What's on your mind"}> </TextArea>
            <TextArea> </TextArea>
          </div>


          <div className='bg-blue-200 h-full w-1/4 rounded-md'>

          </div>

        </div>


        <div className='bg-black w-full h-1/4 rounded-md'>

        </div>
      </div>

    </div>
  );
}

export default App;
