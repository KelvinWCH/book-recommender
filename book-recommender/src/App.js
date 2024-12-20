import './App.css';
import Login from './components/Login.js'
import TextArea from './components/promptInput.js';
import BlackButton from './components/BlackButton.js';
import Slider from './components/Slider.js';
import BookOutput from './components/BookOutput.js';
import AiSummary from './components/AiSummary.js';
function App() {
  function handleCLick() {
    console.log("hey");
  }

  return (
    <div className='bg-gray-950 w-screen h-screen flex flex-col items-center justify-center'>
      <div className='w-2/3 h-4/5 flex flex-col gap-0.5 flex-grow-0 '>

        <div className='bg-gray-500 w-full h-3/4 flex flex-row gap-0.5'>

          <Login> </Login>

          <div className="bg-red-200 h-full w-2/4 rounded-md flex flex-col gap-2 p-5">
            <TextArea
              question={"What's on your mind"}
              limit={500}
              placeHolder={"Your prompt. Can be anything or everything"}
              resizeable="true"
            />
            <div className='h-2/5 p-0 m-0'>
            <TextArea question={"Genre(s)"} limit={100} placeHolder={"Can be a real genre, or not."} />
            </div>

            <div className="w-full flex flex-row gap-2">
              <TextArea
                question={"Length of book"}
                limit={50}
                placeHolder={"Estimated length of book or time you have"}
              />
              <TextArea question={"Complexity style"} limit={50} placeHolder={"Eg. Poetic novel, casual fantasy"} />
            </div>

            <div className="w-full">
              <Slider>hey</Slider>
            </div>

            <div className="flex w-full h-10 gap-1">
              <BlackButton src="./Sparkle.svg" text="Surprise me" onClick={handleCLick} />
              <BlackButton src="./lightning.svg" text="Generate" />
            </div>
          </div>


          <div className='bg-blue-200 h-full w-1/4 rounded-md center-flex flex-col'>
            <BookOutput > </BookOutput>
            <span className='h-2/3 w-full px-5 py-3'> <BlackButton src="./link.svg" text="GoodReads" > </BlackButton> </span>
          </div>

        </div>


        <div className='bg-teal-100 w-full h-1/5 rounded-md p-3'>
          <AiSummary> </AiSummary>
        </div>
      </div>

    </div>
  );
}

export default App;
