import React, { useState, useEffect } from 'react';
import { Text, RefreshControl, StyleSheet } from 'react-native';
import { Container, Scroller, HeaderArea, HeaderTitle, SearchButton, LocationArea, LocationInput, LocationFinder, LoadingIcon, ListArea} from './styles';
import SearchIcon from '../../assets/search.svg'
import MyLocationIcon from '../../assets/my_location.svg'
import { useNavigation } from '@react-navigation/native';
import ProfessorItem from '../../components/ProfessorItem'
import Api from '../../Api';
import {Picker} from '@react-native-picker/picker';
import cidadesBrasil from '../CreateUserDetails/cidadesBrasil';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default () => {

    const navigation = useNavigation();

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

    const getProfessores = async () => {
        const professorID = await AsyncStorage.getItem('professorID');
        setLoading(true);
        setList([]);
        let res = await Api.getProfessores(professorID);
        if(res.data) {
            setList(res.data)
        }
        setLoading(false);
    };

    useEffect(()=>{
        getProfessores();

    }, []);

    const onRefresh = () => {
        setRefreshing(false);
        getProfessores();
    }

    return(
        <Container>
            <Scroller refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
            }>
                <HeaderArea>
                    <HeaderTitle numberOfLines={2}>Encontre o seu professor!</HeaderTitle>
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
                            <ProfessorItem key={k} data={item}/>
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