import React, { useState, useEffect } from 'react';
import { FlatList, View, Text, Modal, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import Api from '../../Api';
import { Container, HeaderTitle, Texts, ExericioArea, Nota, Buttons, ButtonTitle} from './styles';
import Stars from '../../components/Stars';

const ExerciseScreen = () => {
  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);

  const navigation = useNavigation();
  const route = useRoute();
  const { aulaID, treinoID, titulo, dataAula, horario, local, duracao, finalizado} = route.params;
  const [lessonName, setLessonName] = useState('');
  const [series, setSeries] = useState('');
  const [repetitions, setRepetitions] = useState('');
  const [restTime, setRestTime] = useState('');
  const [exerciseList, setExerciseList] = useState([]);
  const [textoDificuldades, setTextoDificuldades] = useState('');
  const [notaAula, setNotaAula] = useState('');
  const [notaProf, setNotaProfessor] = useState('');
  const [pesoAtual, setPesoAtual] = useState('');
  useEffect(() => {
    setLessonName(route.params.lessonName);
    setSeries('');
    setRepetitions('');
    setRestTime('');
    setExerciseList([]);
    getTreinoByAulaID();
    getAulaID();
  }, [route.params.titulo]);

  const getTreinoByAulaID = async () => {
    if(treinoID) {
        let res = await Api.getTreinoByAulaID(treinoID);
        setLessonName(titulo);
        setSeries(res[0].series);
        setRepetitions(res[0].repeticoes);
        setRestTime(res[0].descanso);
        setExerciseList(JSON.parse([res[0].exercicios]));
    } 
  };

  const getAulaID = async () => {
    if(aulaID) {
        let res = await Api.getAulaID(aulaID);
        setTextoDificuldades(res[0].dificuldades);
        setNotaAula(res[0].notaAula);
        setPesoAtual(res[0].pesoAtual);
    } 
  };

  const handleShowConfirmation = () => {
    setIsConfirmationVisible(true);
  };
  

  const handleDeleteAula = async () => {
    if(aulaID) {
        let res = await Api.deleteAula(aulaID);
        setIsConfirmationVisible(false);
        alert("Aula apagada com Sucesso!")
              navigation.reset({
                routes:[{name:'MeusAlunosProf'}]
        });
        
    } 
  };


  return (
    <Container>
      <HeaderTitle>Detalhes da aula</HeaderTitle>
        

        <Nota>
        <HeaderTitle>{lessonName}</HeaderTitle>
        <Stars stars={notaAula} />
        <Texts>Nota: {notaAula}</Texts>
        
        </Nota>
        
        <Texts>Data aula: {dataAula}</Texts>
        <Texts>Horario: {horario}</Texts>
        <Texts>Local: {local}</Texts>
        <Texts>Duracao: {duracao}</Texts>
        <Texts>Séries: {series}</Texts>
        <Texts>Repetições: {repetitions}</Texts>
        <Texts>Descanso: {restTime} segundos</Texts>
        <Texts>Dificuldades: {textoDificuldades}</Texts>
        <Texts>Exercicios:</Texts>
        <ExericioArea>
          <FlatList
            data={exerciseList}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => <Texts>{item}</Texts>}
          />
        </ExericioArea>
        <Buttons onPress={handleShowConfirmation}>
          <ButtonTitle>Excluir Aula</ButtonTitle>
        </Buttons>
        <Modal
          visible={isConfirmationVisible}
          transparent={true}
          animationType="slide"
        >
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
              <Texts>Deseja realmente excluir esta aula?</Texts>
              <Buttons onPress={handleDeleteAula}>
                <ButtonTitle>Sim</ButtonTitle>
              </Buttons>
              <Buttons onPress={() => setIsConfirmationVisible(false)}>
                <ButtonTitle>Não</ButtonTitle>
              </Buttons>
            </View>
          </View>
        </Modal>
    </Container>
  );
};

export default ExerciseScreen;
