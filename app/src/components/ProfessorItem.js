import React from 'react';
import styled from 'styled-components/native';
import AccountIcon from '../assets/account.svg';
import Stars from '../components/Stars';
import { useNavigation } from '@react-navigation/native';

const Area = styled.View`
    border: 1px solid #007BFF;
    background-color: #D1E5FF;
    margin-bottom: 20px;
    border-radius: 10px;
    padding: 15px;
    flex-direction: row;
    justify-content: space-between;
`;

const Area2 = styled.View`
    background-color: #D1E5FF;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const ProfileAndStars = styled.View`
    flex-direction: column;
`;

const InfoArea = styled.View`
    margin-right: 20px;
`;

const UserName = styled.Text`
    font-weight: bold;
`;

const Especialidade = styled.Text`
    font-weight: bold;
`;

const Cidade = styled.Text`
    font-weight: bold;
`;

const Contato = styled.Text`
    font-weight: bold;
`;

const SeeProfileButton = styled.TouchableOpacity`
    width: 85px;
    height: 26px;
    background-color: #007BFF;
    border: 1px solid #007BFF;
    border-radius: 5px;
    justify-content: center;
    align-items: center;
`;

const SeeProfileButtonText = styled.Text`
    font-size: 13px;
    color: #FFFFFF;
`;

export default ({data}) => {

    const navigation = useNavigation();
    const handleClick = () => {
        navigation.navigate('PerfilProfessor', {
            name: data.name,
            notaMedia: data.notaMedia,
            contato: data.contato,
            cidade: data.cidade,
            especialidade: data.especialidade,
            experiencia: data.experiencia,
            certificacoes: data.certificacoes,
            dispoHorario: data.dispoHorario,
            professorID: data.professorID,
            descricao: data.descricao,
        });
    };

    return (
        <Area>
            <ProfileAndStars>
                <AccountIcon width="70" height="70" fill="#FFFFFF"/>
                <Stars stars={data.notaMedia}/>
            </ProfileAndStars>
            <Area2>
                <InfoArea>
                    <UserName>{data.name}</UserName>

                    <Especialidade>{data.especialidade}</Especialidade>
                    <Contato>{data.contato}</Contato>
                    <Cidade>{data.cidade}</Cidade>
                    
                </InfoArea>
                
                <SeeProfileButton onPress={handleClick}>
                        <SeeProfileButtonText>Ver perfil</SeeProfileButtonText>
                </SeeProfileButton>
                
                
            </Area2>
            
        </Area>
    );
};