import { useState, useEffect } from "react";
import './App.css';
import Login from './components/Login.js';
import TextArea from './components/promptInput.js';
import BlackButton from './components/BlackButton.js';
import Slider from './components/Slider.js';
import BookOutput from './components/BookOutput.js';
import AiSummary from './components/AiSummary.js';
import axios from 'axios';

function App() {

  const [prompt, setPrompt] = useState("");
  const [genre, setGenre] = useState("");
  const [bookLength, setBookLength] = useState("");
  const [complexity, setComplexity] = useState("");
  const [sliderValue, setSliderValue] = useState(50);


  const [summary, setSummary] = useState("Lorem ipsum dolor sit ametLorem ipsum dolor sit amet, consecteturadipiscing elit, sed do eiusmod tempor incididuntLorem ipsum dolor sit amet, consecteturadipiscing elit, sed do consecteturadipiscing elit, sed do eiusmod tempor incididunt, eiusmod tempor incididunteiusmod tempor eiusmod tempor incididuntLorem ipsum dolor sit amet, eiusmod tempor incididunteiusmod tempor incididunteiusmod tempor incididunt");
  const [title, setTitle] = useState("Title");
  const [author, setAuthor] = useState("Author");
  const [link, setLink] = useState("");


  const [bookCoverSource, setBookCoverSource] = useState("");
  const [pages, setPages] = useState();
  const [bookGenre, setBookGenre] = useState("");

  const [triggerData, setTriggerData] = useState(0);

  function handleClick() {
    console.log("Prompt:", prompt);
    console.log("Genre:", genre);
    console.log("Book Length:", bookLength);
    console.log("Complexity:", complexity);
    console.log("Slider Value:", sliderValue);
  }



  function openGoodreads() {
    window.open(link);
  }

  function addData() {
    setTriggerData((prev) => prev + 1);
  }

  async function generateRecommendation() {
    console.log("pressed");
    const payload = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/generateBook`, {
      message: `Prompt: ${prompt}, Genre: ${genre}, length ${bookLength}, complexity ${complexity}, creative: ${sliderValue}`
    });

    const result = payload.data.response.content;
    console.log(result);
    const jsonResult = JSON.parse(result);

    setSummary(jsonResult.summary);
    setTitle(jsonResult.title);
    setAuthor(jsonResult.author);
    setLink(jsonResult.source);
    grabBookCover(jsonResult.title);
    addData();
  }


  async function grabBookCover(title) {
    const result = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${title}:keyes&key=${process.env.REACT_APP_GOOGLE_API_KEY}`);
    try {
      console.log(result.data.items[0].volumeInfo.infoLink);
      setLink(result.data.items[0].volumeInfo.infoLink);
      setBookCoverSource(result.data.items[0].volumeInfo.imageLinks.thumbnail);
      setPages(result.data.items[0].volumeInfo.pageCount);
      setBookGenre(result.data.items[0].volumeInfo.categories[0]);
    } catch (e) {
      console.log(e);
    }

  }

  return (
    <div className='bg-black w-screen h-screen flex flex-col items-center justify-center'>
      <div className='w-2/3 h-4/5 flex flex-col gap-1 flex-grow-0 '>
        <div className='bg-transparent w-full h-3/4 flex flex-row gap-1'>

          <div className='bg-gray-200 n-200 h-full w-1/4 rounded-md center-flex flex-col'>
            <Login
              prompt={prompt}
              genre={genre}
              bookLength={bookLength}
              complexity={complexity}
              sliderValue={sliderValue}
              summary={summary}
              title={title}
              author={author}
              link={link}
              bookCoverSource={bookCoverSource}
              pages={pages}
              bookGenre={bookGenre}

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
              triggerData={triggerData}
            />
          </div>


          <div className="bg-gray-200 h-full w-2/4 rounded-md flex flex-col gap-2 p-5">
            <TextArea
              question={"What's on your mind"}
              limit={500}
              placeHolder={"Your prompt. Can be anything or everything"}
              resizeable={true}
              value={prompt}
              onChange={setPrompt}
              required={true}
            />

            <div className='p-0 m-0'>
              <TextArea
                question={"Genre(s)"}
                limit={100}
                placeHolder={"Can be a real genre, or not."}
                value={genre}
                onChange={setGenre}
              />
            </div>

            <div className="w-full flex flex-row gap-2">
              <TextArea
                question={"Length of book"}
                limit={50}
                placeHolder={"Estimated length of book or time you have"}
                value={bookLength}
                onChange={setBookLength}
              />
              <TextArea
                question={"Complexity style"}
                limit={50}
                placeHolder={"Eg. Poetic novel, casual fantasy"}
                value={complexity}
                onChange={setComplexity}
              />
            </div>

            <div className="w-full">
              <Slider value={sliderValue} onChange={setSliderValue} />
            </div>

            <div className="flex w-full h-10 gap-1">
              <BlackButton src="./Sparkle.svg" text="Surprise me" onClick={handleClick} />
              <BlackButton src="./lightning.svg" text="Generate" onClick={generateRecommendation} />
            </div>
          </div>

          <div className='bg-gray-200 h-full w-1/4 rounded-md center-flex flex-col'>
            <BookOutput title={title} author={author} pictureSource={bookCoverSource} bookGenre={bookGenre} pages={pages} />
            <span className='w-full px-5 py-3'>
              <BlackButton src="./link.svg" text="Google Books" onClick={openGoodreads} />
            </span>
          </div>
        </div>

        <div className='bg-gray-200 w-full h-1/5 rounded-md p-3'>
          <AiSummary summaryText={summary} />
        </div>

        <div className="w-full flex flex-row justify-evenly">
          <p className="text-white font-bold"> Created by <a className="text-red-500 underline cursor-pointer"
            href="https://www.linkedin.com/in/kelvin-chung-536720245/"
            rel="noopener noreferrer" //vulnerability 
            target="_blank"
          >
            Kelvin Chung
          </a>
          </p>
          <a className="text-red-500 underline cursor-pointer font-bold"
            href="https://github.com/KelvinWCH/book-recommender"
            rel="noopener noreferrer" //vulnerability
            target="_blank"
          >
            GitHub
          </a>
        </div>
      </div>

    </div>
  );
}

export default App;
