import React, { useEffect } from 'react';
import styled from 'styled-components';

import HomeIcon from '../assets/search.svg';
import TodayIcon from '../assets/gym.svg';
import AccountIcon from '../assets/account.svg';
import AsyncStorage from "@react-native-async-storage/async-storage";

const TabArea = styled.View`
    height: 60px;
    background-color: #007BFF;
    flex-direction:row;
`;

const TabItem = styled.TouchableOpacity`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const TabItemCenter = styled.TouchableOpacity`
    width: 70px;
    height: 70px;
    justify-content: center;
    align-items: center;
    background-color: #FFF;
    border-radius: 35px;
    border: 3px solid #007BFF;
    margin-top: -20px;
`;

export default ({ state, navigation}) => {

    const goTo = (screenName) => {
        navigation.navigate(screenName);

    }

    const ReqsProfOrProfList = async () => {
        const isProfessor = await AsyncStorage.getItem('isProfessor');
        
        if (isProfessor == 1) {
          goTo('ReqsProf');
        } else {
          goTo('Home');
        }
    };

    const AlunosListOrAulasList = async () => {
        const isProfessor = await AsyncStorage.getItem('isProfessor');
        
        if (isProfessor == 1) {
            goTo('MeusAlunosProf');
        } else {
            goTo('Appointments');
        }
    };

    const PerfilProfOrAluno = async () => {
        const isProfessor = await AsyncStorage.getItem('isProfessor');
        
        if (isProfessor == 1) {
            goTo('MeuPerfilProfessor');
        } else {
            goTo('MeuPerfilAluno');
        }
    };

    useEffect(() => {
        AlunosListOrAulasList();
      }, []);
    return (
        <TabArea>
            <TabItem onPress={ReqsProfOrProfList}>
                <HomeIcon style={{opacity: state.index === 1 || state.index === 6 ? 1 : 0.5}} width="24" height="24" fill="#FFFFFF" />
            </TabItem>
            <TabItemCenter onPress={AlunosListOrAulasList}>
                <TodayIcon style={{opacity: state.index === 0 || state.index === 7 ? 1 : 0.5}} width="50" height="50" fill="#007BFF" />
            </TabItemCenter>
            <TabItem onPress={PerfilProfOrAluno}>
                <AccountIcon style={{opacity: state.index===3 || state.index === 2 ? 1 : 0.5}} width="24" height="24" fill="#FFFFFF" />
            </TabItem>
        </TabArea>
    );
};