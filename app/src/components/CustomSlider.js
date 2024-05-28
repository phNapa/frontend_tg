import React, { useState } from 'react';
import { Slider } from 'react-native';

const CustomSlider = ({ initialValue, onValueChange }) => {
  const [sliderState, setSliderState] = useState(initialValue || 0);

  const handleValueChange = (value) => {
    setSliderState(value);
    if (onValueChange) {
      onValueChange(value);
    }
  };

  return (
    <Slider
      style={{ width: 200, height: 40 }}
      value={sliderState}
      onValueChange={handleValueChange}
      step={0.5}
      minimumValue={0}
      maximumValue={1}
      minimumTrackTintColor="red"
      maximumTrackTintColor="green"
    />
  );
};

export default CustomSlider;