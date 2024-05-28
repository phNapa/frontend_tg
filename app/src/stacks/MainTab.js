import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import CustomTabBar from '../components/CustomTabBar';

import Home from '../screens/Home';
import Appointments from '../screens/Appointments';
import MeuPerfilProfessor from '../screens/MeuPerfilProfessor';
import PerfilProfessor from '../screens/PerfilProfessor';
import AulaAluno from '../screens/AulaAluno';
import ReqsProf from '../screens/ReqsProf';
import MeusAlunosProf from '../screens/MeusAlunosProf';
import VerReq from "../screens/VerReq";
import MeuAluno from '../screens/MeuAluno';
import NovaAula from '../screens/NovaAula';
import AulaDetalhes from '../screens/AulaDetalhes';
import MeuPerfilAluno from '../screens/MeuPerfilAluno';
import Acompanhamento from '../screens/Acompanhamento';


const Tab = createBottomTabNavigator();

export default () => {
    return(
    <Tab.Navigator
        tabBar={props=><CustomTabBar {...props} />}
        screenOptions={{ headerShown: false }}
    >
        <Tab.Screen name="Appointments" component={Appointments} />
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="MeuPerfilProfessor" component={MeuPerfilProfessor} />
        <Tab.Screen name="MeuPerfilAluno" component={MeuPerfilAluno} />
        <Tab.Screen name="PerfilProfessor" component={PerfilProfessor} />
        <Tab.Screen name="AulaAluno" component={AulaAluno} />
        <Tab.Screen name="ReqsProf" component={ReqsProf} />
        <Tab.Screen name="MeusAlunosProf" component={MeusAlunosProf} />
        <Tab.Screen name="VerReq" component={VerReq} />
        <Tab.Screen name="MeuAluno" component={MeuAluno} />
        <Tab.Screen name="NovaAula" component={NovaAula} />
        <Tab.Screen name="AulaDetalhes" component={AulaDetalhes} />
        <Tab.Screen name="Acompanhamento" component={Acompanhamento} />
    </Tab.Navigator>
    );
};