import React from 'react';
import styled from 'styled-components/native';
import CheckIcon from '../assets/check.svg';
import ArrowRight from '../assets/arrowright.svg';
import { useNavigation } from '@react-navigation/native';
import AccountIcon from '../assets/account.svg';

const Area = styled.View`
    border: 1px solid #007BFF;
    background-color: #D1E5FF;
    margin-bottom: 20px;
    border-radius: 10px;
    padding: 15px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const Area2 = styled.View`
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const ProfileAndStars = styled.View`
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const InfoArea = styled.View`
    justify-content: center;
    align-items: center;
    margin-right: 20px;
`;

const NomeAluno = styled.Text`
    font-weight: bold;
`;

const Aceito = styled.View`
    flex-direction: row;
    align-items: center;
`;

const Text = styled.Text`
    font-weight: bold;
`;

const SeeReqButton = styled.TouchableOpacity`
    width: 40px;
    height: 40px;
    background-color: #007BFF;
    border: 1px solid #007BFF;
    border-radius: 5px;
    justify-content: center;
    align-items: center;
`;


export default ({data}) => {

    const navigation = useNavigation();
    const handleClick = () => {
        navigation.navigate('VerReq', {
            alunoID: data.alunoID,
            name: data.name,
            contato: data.contato,
            cidade: data.cidade,
            id: data.id,
            requisicao: data.requisicao,
            aceito: data.aceito
        });
    };

    return (
        <Area>
          <ProfileAndStars>
            <AccountIcon width="50" height="50" fill="#FFFFFF"/>
            <Aceito>
                {data.aceito === 1 && (
                <CheckIcon width="25" height="25" />
                )}
                {data.aceito === 1 && (
                <Text>Aceito</Text>
                )}
                
            </Aceito>
          </ProfileAndStars>

          <Area2>
            <InfoArea>
              <NomeAluno>{data.name}</NomeAluno>
              <NomeAluno>{data.contato}</NomeAluno>
              <NomeAluno>{data.cidade}</NomeAluno>
            </InfoArea>
          </Area2>
          <SeeReqButton onPress={handleClick}>
              <ArrowRight width="30" height="30"/>
            </SeeReqButton>
        </Area>
      );
      
};