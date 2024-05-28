import React from 'react';
import styled from 'styled-components/native';


export const Container = styled.SafeAreaView`
    flex: 1;
    background-color: #F9F9F9;
`;

export const HeaderTitle = styled.Text`
    width: 250px;
    font-size: 24px;
    font-weight: bold;
    color: #007BFF;
    padding-left: 20px;
    padding-top: 10px;
`;

export const Buttons = styled.TouchableOpacity`
  background-color: ${(props) => (props.disabled ? '#ccc' : '#007BFF')};
  width: 150%;
  height: 20%;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  margin: 5px;
`;

export const ButtonsModal = styled.TouchableOpacity`
  background-color: ${(props) => (props.disabled ? '#ccc' : '#007BFF')};
  width: 50%;
  height: 5%;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  margin-left: 25%;
  margin-bottom: 10px;
`;

export const ButtonTitle = styled.Text`
    font-size: 18px;
    font-weight: bold;
    color: #FFFFFF;
`;

export const Texts = styled.Text`
    font-size: 18px;
    font-weight: bold;
    color: #007BFF;
    padding-left: 20px;
`;

export const Area1 = styled.View`
    justify-content: space-between;
    height: 30%;
    flex-direction: row;
    align-items: center;
    padding-left: 20px;
    padding-right: 50px;
    padding-top: 10px;
`;

export const Area2 = styled.View`
    background-color: #F9F9F9;
    align-items: center;
`;

export const ExericioArea = styled.View`
    margin: 10px;
    border: 3px solid #007BFF;
    border-radius: 10px;
    padding: 10px;
`;

export const Cronometro = styled.View`
    width: 125px;
    height: 125px;
    background-color: #FFFFFF;
    border-radius: 90px;
    justify-content: center;
    align-items: center;
    border: 3px solid #007BFF;
`;

export const CronometroText = styled.Text`
    font-size: 24px;
    font-weight: bold;
    color: #007BFF;
`;

export const ModalArea = styled.View`
    justify-content: space-between;
    background-color: #F9F9F9;
    border-radius: 10px;
`;

export const ReqInput = styled.TextInput`
    border: 3px solid #007BFF;
    border-radius: 10px;
    height: 20%;
    font-size: 16px;
    color: #007BFF;
    padding: 10px;
    margin: 15px;
`;

export const NotasInput = styled.TextInput`
    border: 3px solid #007BFF;
    border-radius: 10px;
    height: 7%;
    font-size: 16px;
    color: #007BFF;
    padding: 10px;
    margin: 15px;
`;

export const ExercicioArea2 = styled.View`
    margin: 10px;
    border: 3px solid #007BFF;
    border-radius: 10px;
    padding: 10px;
    height: 60%;
`;