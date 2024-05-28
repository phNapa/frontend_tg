import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Button, ScrollView } from 'react-native';
import { Container, HeaderArea, Scroller, HeaderTitle, Texts, ModalArea, NameTitle, TextsInputMenor, ExercicioArea, ExercicioArea2, TextsInputMaior, InputArea, Buttons, ButtonTitle } from './styles';
import { useRoute, useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Modal from 'react-native-modal';
import Api from '../../Api';

export default () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { alunoID, name} = route.params;
    const [nameAluno, setName] = useState(name);
    const [pesoAluno, setPeso] = useState('');
    const [alturaAluno, setAltura] = useState('');
    const [imcAluno, setIMC] = useState('');
    const [objetivoAluno, setObjetivo] = useState('');
    const [exerciseName, setExerciseName] = useState('');
    const [series, setSeries] = useState('');
    const [repetitions, setRepetitions] = useState('');
    const [rest, setRest] = useState('');
    const [exercicios, setExercicios] = useState([]);
    const [selecionados, setSelecionados] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [newExercicio, setNewExercicio] = useState('');
    const [error, setError] = useState('');
    const [showError, setShowError] = useState(false);

    const getAlunoById = async () => {
        if(alunoID) {
            let res = await Api.getAlunoById(alunoID);
            setPeso(res[0].pesoOrigem)
            setAltura(res[0].altura)
            setIMC(res[0].imc)
            setObjetivo(res[0].objetivos)
        } 
    };

    const getExerciciosList = async () => {
      try {
        const res = await Api.getExerciciosList();
        setExercicios(res);
      } catch (error) {
        console.error('Erro ao buscar exercícios:', error);
      }
    };

    const postNewExercicio = async () => {
      try {
        if(newExercicio){
          const res = await Api.postNovoExercicio(newExercicio);
          getExerciciosList();
          setNewExercicio();
          alert("Novo exercício adicionado!")
        } else {
          alert("Preencha o nome do exercicio!")
        }
      } catch (error) {
        console.error('Erro ao criar exercício:', error);
      }
      
    };

    const createNewAula = async () => {
      const professorID = await AsyncStorage.getItem('professorID');

      const objeto = exerciciosSelecionadosNomes
      const exercicios = JSON.stringify(objeto);
      
      if (exercicios && series && repetitions && rest) {
        try {
          const res = await Api.postNovoTreino(exercicios, series, repetitions, rest);
          const treinoID = res.insertId
          if (res.insertId) {
            const res1 = await Api.postNovaAula(treinoID, exerciseName, alunoID, professorID);
            if(res1.insertId){
              alert("Aula Criada com Sucesso!")
              navigation.reset({
                routes:[{name:'MeusAlunosProf'}]
            });
            }
          } else {
            throw new Error("Algo deu errado!");
            
          }
        } catch (error) {
          setError(error.message);
          setShowError(true);
        }
      } else {
        setError("Preencha todos os campos!");
        setShowError(true);
      }
    };

    useEffect(() => {
      setName(name);
      getAlunoById();
      getExerciciosList();
    }, [alunoID]);

    const toggleSelecionado = (exercicio) => {
      if (selecionados.includes(exercicio.exercicioID)) {
        setSelecionados(selecionados.filter((exercicioID) => exercicioID !== exercicio.exercicioID));
      } else {
        setSelecionados([...selecionados, exercicio.exercicioID]);
      }
    };

    const exerciciosSelecionadosNomes = selecionados.map((exercicioID) => {
      const exercicio = exercicios.find((ex) => ex.exercicioID === exercicioID);
      return exercicio ? exercicio.nome : '';
    });
    
    return(
        <Container>
            <HeaderArea>
                <HeaderTitle>Nova Aula</HeaderTitle>
            </HeaderArea>
            
            <NameTitle>{nameAluno}</NameTitle>
            
            <Texts>Objetivo: {objetivoAluno}</Texts>
            <Texts>Peso: {pesoAluno} Kg         Altura: {alturaAluno}         IMC: {imcAluno}</Texts>
            
            <InputArea>
            <Texts>Aula:</Texts>
              <TextsInputMenor
                value={exerciseName}
                onChangeText={(text) => setExerciseName(text)}
              />
            </InputArea>

            <InputArea>
            <Texts>Séries:</Texts>
              <TextsInputMenor
                keyboardType="numeric"
                value={series}
                onChangeText={(text) => setSeries(text)}
              />
            </InputArea>
            
            <InputArea>
            <Texts>Repetições:</Texts>
            <TextsInputMenor
              keyboardType="numeric"
              value={repetitions}
              onChangeText={(text) => setRepetitions(text)}
            />
            </InputArea>
            
            <InputArea>
            <Texts>Descanso:</Texts>
            <TextsInputMenor
              keyboardType="numeric"
              value={rest}
              onChangeText={(text) => setRest(text)}
            />
            </InputArea>
            
            <Texts>Exercícios selecionados:</Texts>
            <ExercicioArea>
              <FlatList
                nestedScrollEnabled
                data={exerciciosSelecionadosNomes}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => <Texts> - {item}</Texts>}
              />
            </ExercicioArea>

            <Buttons onPress={() => setModalVisible(true)}>
              <ButtonTitle>Selecionar Exercícios</ButtonTitle>
            </Buttons>
            <Modal color="#F9F9F9" visible={modalVisible}>
              <ModalArea>
                <HeaderArea>
                  <HeaderTitle>Selecione os exercicios</HeaderTitle>
                </HeaderArea>
                
                <ExercicioArea2>
                <FlatList
                  nestedScrollEnabled
                  data={exercicios}
                  keyExtractor={(item) => item.exercicioID.toString()}
                  renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => toggleSelecionado(item)}>
                      <Texts>
                        {selecionados.includes(item.exercicioID) ? '✅' : '❌'} {item.nome} 
                      </Texts>
                    </TouchableOpacity>
                  )}
                />
                </ExercicioArea2>
                
                <Buttons onPress={() => setModalVisible(false)}>
                  <ButtonTitle>Fechar</ButtonTitle>
                </Buttons>
                <Texts>Não encontrou um exercicio especifico?</Texts>
                <InputArea>
                  <Texts>Nome do novo exercicio:</Texts>
                    <TextsInputMenor
                      value={newExercicio}
                      onChangeText={(text) => setNewExercicio(text)}
                    />
                </InputArea>
                
                <Buttons onPress={postNewExercicio}>
                  <ButtonTitle>Adicionar Novo Exercício</ButtonTitle>
                </Buttons>
              </ModalArea>
            </Modal>
            {showError && <Text style={{ color: 'red' }}>{error}</Text>}
            <Buttons onPress={createNewAula}>
              <ButtonTitle>Salvar</ButtonTitle>
            </Buttons>
        </Container>
    );
};