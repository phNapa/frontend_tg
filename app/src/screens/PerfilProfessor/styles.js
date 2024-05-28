import React from 'react';
import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
    flex: 1;
    background-color: #F9F9F9;
`;

export const Area = styled.View`
    width: 100%;
    height: 100%;
    border: 1px solid #007BFF;
    background-color: #F9F9F9;
    border-radius: 10px;
    justify-content: center;
    align-items: center;
`;

export const Area2 = styled.View`
    flex: 1;
    background-color: #D1E5FF;
    width: 80%;
    margin-top: 30px;
    margin-bottom: 30px;
    margin-left: 10px;
    margin-right: 10px;
    border: 1px solid #007BFF;
    border-radius: 10px;
    justify-content: center;
    align-items: center;
`;

export const HeaderTitle = styled.Text`
    margin-top: 30px;
    width: 250px;
    font-size: 24px;
    font-weight: bold;
    color: #007BFF;
`;

export const ReqInput = styled.TextInput`
    flex: 1;
    font-size: 16px;
    color: #007BFF;
`;

export const Middle = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin: 10px;
`;

export const NameTitle = styled.Text`
    font-size: 27px;
    font-weight: bold;
    color: #007BFF;
`;