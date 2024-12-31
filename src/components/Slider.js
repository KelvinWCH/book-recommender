import React from "react";
import ReactSlider from "react-slider";
import "./SliderStyles.css";

function Slider({ value, onChange }) {
  return (
    <div className='bg-white w-full h-full rounded-md center-flex flex-col gap-5 px-4 py-2'>
      <ReactSlider
        className="horizontal-slider"
        markClassName="example-mark"
        thumbClassName="example-thumb"
        trackClassName="example-track"
        defaultValue={value} // Use the initial value passed from props
        value={value} // Controlled slider
        onChange={onChange} // Update parent state on change
        renderThumb={(props, state) => (
          <div {...props}>{state.valueNow}</div> // Display current value on thumb
        )}
      />
      <div className='flex flex-row justify-between w-full'>
        <p className='font-semibold'>Deterministic</p>
        <p className='font-semibold'>Creative</p>
      </div>
    </div>
  );
}

export default Slider;
