import React, { useState, useEffect } from 'react';
import { Text, RefreshControl, StyleSheet } from 'react-native';
import { Container, Scroller, HeaderArea, HeaderTitle, SearchButton, LocationArea, LocationInput, LocationFinder, LoadingIcon, ListArea} from './styles';
import { useNavigation } from '@react-navigation/native';
import ReqItem from '../../components/ReqItem'
import Api from '../../Api';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Picker} from '@react-native-picker/picker';
import cidadesBrasil from '../CreateUserDetails/cidadesBrasil';

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

    const getProfReqs = async () => {
        const professorID = await AsyncStorage.getItem('professorID');
        setLoading(true);
        setList([]);
        if(professorID) {
            let res = await Api.getProfReqs(professorID);
            if(res.data) {
                setList(res.data)
            } else {
                // Alert("Erro: "+ res.error);
            }
        } 
        setLoading(false);
    };


    useEffect(()=>{
        getProfReqs();
    }, []);

    const onRefresh = () => {
        setRefreshing(false);
        getProfReqs();
    }

    return(
        <Container>
            <Scroller refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
            }>
                <HeaderArea>
                    <HeaderTitle numberOfLines={2}>Minhas requisições</HeaderTitle>
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
                        <Text style={styles.text}>Nenhuma requisição encontrada!</Text>
                    ) : (
                        listaFiltrada.map((item, k) => (
                        <ReqItem key={k} data={item} />
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
      color: '#007BFF', fontSize: 20
    }
  });