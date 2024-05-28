import React, { useState, useEffect } from 'react';
import { Text, Button, StyleSheet, View, Dimensions, ScrollView } from 'react-native';
import { Container, Chart, HeaderArea, HeaderTitle } from './styles';
import { useRoute, useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { render } from "react-dom";
import { VictoryPie, VictoryTooltip, VictoryLine, VictoryChart, VictoryTheme, VictoryLabel } from "victory-native";
import Api from '../../Api';

export default () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { alunoID } = route.params;
    const [data, setData] = useState([]);
    const screenWidth = Dimensions.get('window').width;
    const [list, setList] = useState([]);
    const [dificuldadesLista, setDificuldadesLista] = useState([]);
    const [primeiroExercicio, setPrimeiroExercicio] = useState("");
    const [segundoExercicio, setSegundoExercicio] = useState("");
    const [terceiroExercicio, setTerceiroExercicio] = useState("");
    const [primeiroExercicioF, setPrimeiroExercicioF] = useState("");
    const [segundoExercicioF, setSegundoExercicioF] = useState("");
    const [terceiroExercicioF, setTerceiroExercicioF] = useState("");
    const [countExecDifPri, setCountExecDifPri] = useState("");
    const [countExecDifSeg, setCountExecDifSeg] = useState("");
    const [countExecDifTer, setCountExecDifTer] = useState("");
    const [countExecFacPri, setCountExecFacPri] = useState("");
    const [countExecFacSeg, setCountExecFacSeg] = useState("");
    const [countExecFacTer, setCountExecFacTer] = useState("");

    useEffect(()=>{
        getAulaUser();

    }, []);

    const getAulaUser = async () => {
        const alunoID = await AsyncStorage.getItem('alunoID');
    
        if (alunoID) {
            try {
                let res = await Api.getAulaUser(alunoID);
                if (res.data) {
                    const dificuldadesLista = res.data.reduce((acc, aula) => {
                        if (aula.dificuldades) {
                            try {
                                const dificuldades = JSON.parse(aula.dificuldades);
                                if (Array.isArray(dificuldades)) {
                                    acc.push(...dificuldades);
                                }
                            } catch (error) {
                                //console.error("erro");
                            }
                        }
                        return acc;
                    }, []);
    
                    setList(dificuldadesLista);  // Atualiza a lista com apenas as dificuldades
                    console.log(dificuldadesLista); // Log para verificação
                } else {
                    console.error("Erro: " + res.error);
                }
            } catch (error) {
                console.error("Erro ao buscar as aulas: ", error);
            }
        }
    };

    const contarFrequencia = (lista, valor) => {
        return lista
            .filter(item => item.sliderValue === valor)
            .reduce((acc, item) => {
                if (!acc[item.exercicio]) {
                    acc[item.exercicio] = 0;
                }
                acc[item.exercicio] += 1;
                return acc;
            }, {});
    };
    
    // Contar a frequência dos exercícios com sliderValue 0 e 1
    const frequenciaDificeis = contarFrequencia(list, 0);
    const frequenciaFaceis = contarFrequencia(list, 1);
    
    // Converter os objetos de frequência em arrays e ordenar pela frequência
    const ordenarPorFrequencia = (frequenciaObj) => {
        return Object.keys(frequenciaObj)
            .map(exercicio => ({
                exercicio,
                count: frequenciaObj[exercicio]
            }))
            .sort((a, b) => b.count - a.count);
    };
    
    const top3MaisDificeis = ordenarPorFrequencia(frequenciaDificeis).slice(0, 3);
    const top3MaisFaceis = ordenarPorFrequencia(frequenciaFaceis).slice(0, 3);
    
    console.log("Top 3 Mais Difíceis:", top3MaisDificeis);
    console.log("Top 3 Mais Fáceis:", top3MaisFaceis);

    console.log(typeof top3MaisDificeis[0]);
 
    const countSliderValueZero = list.filter(item => item.sliderValue === 0).length;
    console.log("Quantidade de objetos com sliderValue igual a 0:", countSliderValueZero);

    const countSliderValueOne = list.filter(item => item.sliderValue === 1).length;
    console.log("Quantidade de objetos com sliderValue igual a 1:", countSliderValueOne);

    useEffect(() => {
        if (top3MaisDificeis.length > 0) {
            setPrimeiroExercicio(top3MaisDificeis[0]["exercicio"]);
            setSegundoExercicio(top3MaisDificeis[1]["exercicio"]);
            setTerceiroExercicio(top3MaisDificeis[2]["exercicio"]);
            setCountExecDifPri(((top3MaisDificeis[0]["count"])/countSliderValueOne)*100);
            setCountExecDifSeg(((top3MaisDificeis[1]["count"])/countSliderValueOne)*100);
            setCountExecDifTer(((top3MaisDificeis[2]["count"])/countSliderValueOne)*100);
        } else {
            console.log("O array de dados está vazio.");
        }
    }, [top3MaisDificeis]);

    useEffect(() => {
        if (top3MaisFaceis.length > 0) {
            setPrimeiroExercicioF(top3MaisFaceis[0]["exercicio"]);
            setSegundoExercicioF(top3MaisFaceis[1]["exercicio"]);
            setTerceiroExercicioF(top3MaisFaceis[2]["exercicio"]);
            setCountExecFacPri(((top3MaisFaceis[0]["count"])/countSliderValueOne)*100);
            setCountExecFacSeg(((top3MaisFaceis[1]["count"])/countSliderValueOne)*100);
            setCountExecFacTer(((top3MaisFaceis[2]["count"])/countSliderValueOne)*100);
        } else {
            console.log("O array de dados está vazio.");
        }
    }, [top3MaisFaceis]);

    console.log(countExecFacPri);
    console.log(countExecFacSeg);
    console.log(countExecFacTer);

    return(
        <Container>
            <ScrollView>
            <View style={styles.container}>
                <Text style={styles.text}>Acompanhamento</Text>
            </View>

                <Chart>
                    <Text style={styles.textTitulo}>Exercicios mais difíceis</Text>
                <VictoryPie 
                    data={[
                        { x: terceiroExercicio, y: countExecDifTer},
                        { x: segundoExercicio, y: countExecDifSeg},
                        { x: primeiroExercicio, y: countExecDifPri}
                    ]}
                    innerRadius={80}
                    padAngle={3}
                    colorScale={["#ee6b6e", "#ff2c2c", "#c30010"]}
                    labelComponent={
                        <VictoryTooltip/>
                    }          
                />

                </Chart>
                
                <Chart>
                    <Text style={styles.textTitulo}>Exercicios mais fáceis</Text>
                <VictoryPie 
                    data={[
                        { x: terceiroExercicioF, y: countExecFacTer},
                        { x: segundoExercicioF, y: countExecFacSeg},
                        { x: primeiroExercicioF, y: countExecFacPri}
                    ]}
                    innerRadius={80}
                    padAngle={3}
                    colorScale={["#64FFDA", "#1DE9B6", "#00BFA5"]}
                    labelComponent={
                        <VictoryTooltip/>
                    }          
                />
                </Chart>

            </ScrollView>
        </Container>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', // Alinha itens em uma linha
        justifyContent: 'space-between', // Espaço entre os itens
        alignItems: 'center', // Alinha itens no centro verticalmente
        margin: 10, // Margem ao redor do contêiner
    },
    text: {
        width: 250, // Define a largura do texto
        fontSize: 24, // Define o tamanho da fonte como 24
        fontWeight: 'bold', // Define o texto em negrito
        color: '#007BFF', // Define a cor do texto como azul
    },
    textTitulo: {
        color: 'blue', // Define a cor azul
        fontSize: 20, // Define o tamanho da fonte como 20
        fontWeight: 'bold', // Define o texto em negrito
      },
  });