import React from 'react';
import styled from 'styled-components/native';
import CheckIcon from '../assets/check.svg';
import ArrowRight from '../assets/arrowright.svg';
import Stars from '../components/Stars';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";

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

const AulaName = styled.Text`
    font-weight: bold;
`;

const Finalizado = styled.View`
    flex-direction: row;
    align-items: center;
`;

const Text = styled.Text`
    font-weight: bold;
`;

const SeeAulaButton = styled.TouchableOpacity`
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
    const handleClick = async () => {
        const isProfessor = await AsyncStorage.getItem('isProfessor');
        if (isProfessor == 0){
            navigation.navigate('AulaAluno', {
                aulaID: data.aulaID,
                treinoID: data.treinoID,
                titulo: data.titulo,
                dataAula: data.dataAula,
                horario: data.horario,
                local: data.local,
                duracao: data.duracao,
                finalizado: data.finalizado,
            });
        } else {
            navigation.navigate('AulaDetalhes',{
                aulaID: data.aulaID,
                treinoID: data.treinoID,
                titulo: data.titulo,
                dataAula: data.dataAula,
                horario: data.horario,
                local: data.local,
                duracao: data.duracao,
                finalizado: data.finalizado,
            });
        }
        
    };

    return (
        <Area>
          <ProfileAndStars>
            <Stars stars={data.notaAula} />
            <Finalizado>
                {data.finalizado === 1 && (
                <CheckIcon width="25" height="25" />
                )}
                {data.finalizado === 1 && (
                <Text>Finalizado</Text>
                )}
                
            </Finalizado>
          </ProfileAndStars>

          <Area2>
            <InfoArea>
              <AulaName>{data.titulo}</AulaName>
              
              
            </InfoArea>
            
              
          </Area2>
          <SeeAulaButton onPress={handleClick}>
              <ArrowRight width="30" height="30"/>
            </SeeAulaButton>
        </Area>
      );
      
};