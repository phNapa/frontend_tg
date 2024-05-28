import React from "react";
import { createStackNavigator } from '@react-navigation/stack';

import Preload from "../screens/Preload";
import SignIn from "../screens/SignIn";
import SignUp from "../screens/SignUp";
import MainTab from "./MainTab";
import CreateProfessor from "../screens/CreateProfessor";
import CreateAluno from "../screens/CreateAluno";
import CreateUserDetails from "../screens/CreateUserDetails";
import PerfilProfessor from "../screens/PerfilProfessor";
import AulaAluno from "../screens/AulaAluno";
import ReqsProf from "../screens/ReqsProf";
import MeusAlunosProf from "../screens/MeusAlunosProf";
import VerReq from "../screens/VerReq";
import MeuAluno from "../screens/MeuAluno";
import NovaAula from "../screens/NovaAula";
import AulaDetalhes from "../screens/AulaDetalhes";
import Acompanhamento from "../screens/Acompanhamento";

const Stack = createStackNavigator();

export default () => {
  return (
    <Stack.Navigator
        initialRouteName="Preload"
        screenOptions={{ headerShown: false }}
    >
        <Stack.Screen name="Preload" component={Preload} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="CreateProfessor" component={CreateProfessor} />
        <Stack.Screen name="CreateAluno" component={CreateAluno} />
        <Stack.Screen name="CreateUserDetails" component={CreateUserDetails} />
        <Stack.Screen name="MainTab" component={MainTab} />
        <Stack.Screen name="PerfilProfessor" component={PerfilProfessor} />
        <Stack.Screen name="AulaAluno" component={AulaAluno} />
        <Stack.Screen name="ReqsProf" component={ReqsProf} />
        <Stack.Screen name="MeusAlunosProf" component={MeusAlunosProf} />
        <Stack.Screen name="VerReq" component={VerReq} />
        <Stack.Screen name="MeuAluno" component={MeuAluno} />
        <Stack.Screen name="NovaAula" component={NovaAula} />
        <Stack.Screen name="AulaDetalhes" component={AulaDetalhes} />
        <Stack.Screen name="Acompanhamento" component={Acompanhamento} />
    </Stack.Navigator>
  );
};
