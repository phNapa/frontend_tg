import React, { useState, useEffect } from 'react';
import { Text, RefreshControl } from 'react-native';
import { Container, HeaderArea, HeaderTitle, Texts, Middle, NameTitle, Scroller, ListArea, LoadingIcon, Buttons, ButtonTitle } from './styles';
import { useRoute, useNavigation } from '@react-navigation/native';
import AccountIcon from '../../assets/account.svg';
import AulaItem from '../../components/AulaItem';

import Api from '../../Api';

export default () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { alunoID, name, contato, cidade} = route.params;
    const [nameAluno, setName] = useState(name);
    const [contatoAluno, setContato] = useState(contato);
    const [cidadeAluno, setCidade] = useState(cidade);
    const [pesoAluno, setPeso] = useState('');
    const [alturaAluno, setAltura] = useState('');
    const [imcAluno, setIMC] = useState('');
    const [objetivoAluno, setObjetivo] = useState('');
    const [loading, setLoading] = useState(false);
    const [list, setList] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const getAlunoById = async () => {
        if(alunoID) {
            let res = await Api.getAlunoById(alunoID);
            setPeso(res[0].pesoOrigem)
            setAltura(res[0].altura)
            setIMC(res[0].imc)
            setObjetivo(res[0].objetivos)
        } 
    };

    useEffect(() => {
      setName(name);
      setContato(contato);
      setCidade(cidade);
      getAlunoById();
      getAulaUser();
    }, [alunoID]);

    const getAulaUser = async () => {
      setLoading(true);
      setList([]);
      if(alunoID) {
          let res = await Api.getAulaUser(alunoID);
          if(res.data) {
              setList(res.data)
          } else {
              // Alert("Erro: "+ res.error);
          }
      } 
      setLoading(false);
    };

    const onRefresh = () => {
      setRefreshing(false);
      getAulaUser();
    }

    const handleNovaAula = () => {
      navigation.navigate('NovaAula', {
        alunoID: alunoID,
        name: name,
        contato: contato,
        cidade: cidade,
    });
    };

    const handleAcompanhamentoClick = async () => {
      navigation.navigate('Acompanhamento', {
        alunoID: alunoID,
      });
  }
    
    return(
        <Container>
          <Scroller refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
            }>
            <HeaderArea>
                <HeaderTitle>Meu Aluno</HeaderTitle>
            </HeaderArea>
            <Middle>
              <AccountIcon width="100" height="100" fill="#FFFFFF"/>
            </Middle>
            <Middle>
              <NameTitle>{nameAluno}</NameTitle>
            </Middle>
            <Texts>Contato: {contatoAluno}</Texts>
            <Texts>Cidade: {cidadeAluno}</Texts>
            <Texts>Objetivo: {objetivoAluno}</Texts>
            <Texts>Peso: {pesoAluno} Kg</Texts>
            <Texts>Altura: {alturaAluno}</Texts>
            <Texts>IMC: {imcAluno}</Texts>

            <Buttons onPress={handleAcompanhamentoClick}>
                    <ButtonTitle>Acompanhamento</ButtonTitle>
            </Buttons>
            
            <Buttons onPress={handleNovaAula}>
              <ButtonTitle>Nova Aula</ButtonTitle>
            </Buttons>
            <Texts>Treinos anteriores:</Texts>
            {loading&&
                  <LoadingIcon size="large" color="#007BFF"/>
                  }

                  <ListArea>
                  {list.length === 0 ? (
                      <Text>Nenhuma aula encontrada, clique em novo treino para criar uma aula!</Text>
                  ) : (
                      list.map((item, k) => (
                      <AulaItem key={k} data={item} />
                      ))
                  )}
                  </ListArea>
          </Scroller>
        </Container>
    );
};