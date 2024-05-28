import React, { useState, useEffect } from 'react';
import { Text, Button, TouchableOpacity, RefreshControl, Linking  } from 'react-native';
import { Container, HeaderArea, HeaderTitle, Texts, Middle, NameTitle, Scroller, ListArea, LoadingIcon, Buttons, ButtonTitle } from './styles';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import AccountIcon from '../../assets/account.svg';
import Api from '../../Api';

export default () => {
    const navigation = useNavigation();
    const [nameProfessor, setName] = useState('');
    const [cidadeProfessor, setCidade] = useState('');
    const [contatoProfessor, setContato] = useState('');
    const [enderecoProfessor, setEndereco] = useState('');
    const [generoProfessor, setGenero] = useState('');

    const [especialidade, setEspecialidade] = useState('');
    const [experiencia, setExperiencia] = useState('');
    const [certificacao, setCertificacao] = useState('');
    const [horario, setHorario] = useState('');
    const [nota, setNota] = useState('');
    const [descricao, setDescricao] = useState('');

    const getUsuarioById = async () => {
        const userID = await AsyncStorage.getItem('userID');
        if(userID) {
            let res = await Api.getUsuarioById(userID);
            setName(res.name)
            setCidade(res.cidade)
            setContato(res.contato)
            setEndereco(res.endereco)
            setGenero(res.genero)
        } 
    };

    const getProfessoresById = async () => {
        const professorID = await AsyncStorage.getItem('professorID');
        if(professorID) {
            let res = await Api.getProfessoresById(professorID);
            setEspecialidade(res[0].especialidade)
            setExperiencia(res[0].experiencia)
            setCertificacao(res[0].cerficacoes)
            setHorario(res[0].dispoHorario)
            setNota(res[0].notaMedia)
            setDescricao(res[0].descricao)     
        } 
    };

    const handleLogoutClick = async () => {
        await AsyncStorage.setItem('token', "invalid");
        navigation.reset({
            
            routes: [{name: 'SignIn'}]
        });
    }

    useEffect(() => {
        getUsuarioById();
        getProfessoresById();
      },[navigation]);

    return(
        <Container>
                <Scroller>
            <HeaderArea>
                <HeaderTitle>Meu Perfil</HeaderTitle>
            </HeaderArea>
            <Middle>
              <AccountIcon width="100" height="100" fill="#FFFFFF"/>
            </Middle>
            <Middle>
                <NameTitle>{nameProfessor}</NameTitle>
            </Middle>
            <Texts>Cidade: {cidadeProfessor}</Texts>
            <Texts>Endereço: {enderecoProfessor}</Texts>
            <Texts>Contato: {contatoProfessor}</Texts>
            <Texts>Genero: {generoProfessor}</Texts>
            <Texts>Especialidade: {especialidade}</Texts>
            <Texts>Experiencia: {experiencia}</Texts>
            <Texts>Certificação: {certificacao}</Texts>
            <Texts>Horário Disponível: {horario}</Texts>

                <Buttons onPress={handleLogoutClick}>
                    <ButtonTitle>Sair</ButtonTitle>
                </Buttons>
                </Scroller>
        </Container>
    );
};