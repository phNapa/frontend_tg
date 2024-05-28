import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { Container, Scroller, HeaderArea, HeaderTitle, Buttons, ButtonTitle, Texts, ReqArea, Middle, NameTitle, Aceito} from './styles';
import { useRoute, useNavigation } from '@react-navigation/native';
import AccountIcon from '../../assets/account.svg';
import CheckIcon from '../../assets/check.svg';
import Api from '../../Api';

export default () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { id, alunoID, name, contato, cidade, requisicao, aceito } = route.params;
    const [alunoid, setLessonName] = useState(alunoID);
    const [nameAluno, setName] = useState(name);
    const [contatoAluno, setContato] = useState(contato);
    const [cidadeAluno, setCidade] = useState(cidade);
    const [descricaoReq, setDescricao] = useState(requisicao);
    const [pesoAluno, setPeso] = useState('');
    const [alturaAluno, setAltura] = useState('');
    const [imcAluno, setIMC] = useState('');
    const [objetivoAluno, setObjetivo] = useState('');
    

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
      setDescricao(requisicao);
      getAlunoById()
    }, [alunoID]);

    const aceitarReq = async () => {
      let res = await Api.putAceitarRequisicao(id);
      alert("Requisição aceita com sucesso!");
      
      navigation.reset({
        routes:[{name:'ReqsProf'}]
      });
    };

    const deletarReq = async () => {
      // let res = await Api.deleteRequisicaoo(id);
      alert("Requisição recusada!");
      
      navigation.reset({
        routes:[{name:'ReqsProf'}]
      });
    };
    
    return(
        <Container>
          <HeaderArea>
              <HeaderTitle>Ver Requisição</HeaderTitle>
          </HeaderArea>
          <Middle>
            <AccountIcon width="100" height="100" fill="#FFFFFF"/>
          </Middle>
          <Middle>
            <NameTitle>{nameAluno}</NameTitle>
          </Middle>
          <Aceito>
                
                {aceito === 1 && (
                <Texts>Aluno Aceito</Texts>
                )}
                {aceito === 1 && (
                <CheckIcon width="40" height="40" />
                )}                
          </Aceito>
          <Texts>Contato: {contatoAluno}</Texts>
          <Texts>Cidade: {cidadeAluno}</Texts>
          <Texts>Objetivo: {objetivoAluno}</Texts>
          <Texts>Peso: {pesoAluno} Kg</Texts>
          <Texts>Altura: {alturaAluno}</Texts>
          <Texts>IMC: {imcAluno}</Texts>
          
          <ReqArea>
          <Texts>Descrição:</Texts>
          <Texts>{descricaoReq}</Texts>
          </ReqArea>
          
          
          <Buttons onPress={aceitarReq} disabled={aceito === 1}>
            <ButtonTitle>Aceitar</ButtonTitle>
          </Buttons>
          
          <Buttons onPress={deletarReq} disabled={aceito === 1}>
            <ButtonTitle>Recusar</ButtonTitle>
          </Buttons>



          
        </Container>
    );
};