import React, { useState } from 'react';
import { CheckBox } from '@react-native-community/checkbox';
import styled from 'styled-components/native';

const ExerciseCheckbox = ({ exercise, onToggle }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = () => {
    setIsChecked(!isChecked);
    onToggle(exercise.id, !isChecked);
  };

  return (
    <Container>
      <CheckBox value={isChecked} onValueChange={handleToggle} />
      <Label>{exercise.name}</Label>
    </Container>
  );
};

const Container = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Label = styled.Text`
  margin-left: 8px;
`;

export default ExerciseCheckbox;
