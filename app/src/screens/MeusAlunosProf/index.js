import React, { useState, useEffect } from 'react';
import { Text, RefreshControl, StyleSheet } from 'react-native';
import { Container, Scroller, HeaderArea, HeaderTitle, LoadingIcon, ListArea, LocationArea} from './styles';
import { useNavigation } from '@react-navigation/native';
import AlunoItem from '../../components/AlunoItem'
import AsyncStorage from "@react-native-async-storage/async-storage";
import Api from '../../Api';
import {Picker} from '@react-native-picker/picker';
import cidadesBrasil from '../CreateUserDetails/cidadesBrasil';

export default () => {
    const [loading, setLoading] = useState(false);
    const [list, setList] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [cidadeSelecionada, setCidadeSelecionada] = useState('');

    const listaFiltrada = list.filter((item) => {
        if (cidadeSelecionada === '') {
          return true;
        }
        return item.cidade === cidadeSelecionada;
    });
      
    const getProfAlunos = async () => {
        const professorID = await AsyncStorage.getItem('professorID');
        setLoading(true);
        setList([]);
        let res = await Api.getProfAlunos(professorID);
        if(res.data) {
            setList(res.data)
        }
        setLoading(false);
    };

    useEffect(()=>{
        getProfAlunos();

    }, []);

    const onRefresh = async () => {
        const professorID = await AsyncStorage.getItem('professorID');
        setRefreshing(false);
        getProfAlunos(professorID);
    }

    return(
        <Container>
            <Scroller refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
            }>
                <HeaderArea>
                    <HeaderTitle numberOfLines={2}>Meus alunos</HeaderTitle>
                </HeaderArea>
                <LocationArea>
                    <Picker
                        selectedValue={cidadeSelecionada}
                        onValueChange={(itemValue, itemIndex) => {
                            setCidadeSelecionada(itemValue);
                        }}
                        style={styles.picker}
                        >
                        <Picker.Item label="Filtrar por cidade" value="" />
                        {cidadesBrasil.map((cidade, index) => (
                        <Picker.Item key={index} label={cidade} value={cidade} />
                        ))}
                    </Picker>
                </LocationArea>
                {loading&&
                <LoadingIcon size="large" color="#007BFF"/>
                }
                <ListArea>
                    {listaFiltrada.length === 0 ? (
                        <Text style={styles.text}>Nenhum aluno encontrado!</Text>
                    ) : (
                        listaFiltrada.map((item, k) => (
                        <AlunoItem key={k} data={item} />
                        ))
                    )}
                </ListArea>

            </Scroller>
        </Container>
    );
};

const styles = StyleSheet.create({
    picker: {
      width: '90%',
      backgroundColor: '#D1E5FF',
      color: '#007BFF',
    },
    text: {
      color: '#007BFF', fontSize: 18
    }
});