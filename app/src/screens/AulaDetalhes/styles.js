import React from 'react';
import styled from 'styled-components/native';


export const Container = styled.SafeAreaView`
    flex: 1;
    background-color: #F9F9F9;
    margin: 20px;
`;

export const HeaderTitle = styled.Text`
    font-size: 24px;
    font-weight: bold;
    color: #007BFF;
`;

export const Nota = styled.View`
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
`;

export const Texts = styled.Text`
    font-size: 18px;
    font-weight: bold;
    color: #007BFF;
`;

export const ExericioArea = styled.View`
    margin: 10px;
    border: 3px solid #007BFF;
    border-radius: 10px;
    padding: 10px;
`;

export const Buttons = styled.TouchableOpacity`
  flex-direction: row;
  background-color: #007BFF;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  margin: 5px;
`;

export const ButtonTitle = styled.Text`
    font-size: 18px;
    font-weight: bold;
    color: #FFFFFF;
`;