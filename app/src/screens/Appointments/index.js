import React, { useState, useEffect } from 'react';
import { Text, RefreshControl, StyleSheet } from 'react-native';
import { Container, Scroller, HeaderArea, HeaderTitle, LoadingIcon, ListArea} from './styles';
import { useNavigation } from '@react-navigation/native';
import AulaItem from '../../components/AulaItem'
import Api from '../../Api';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default () => {

    
    const navigation = useNavigation();

    const [loading, setLoading] = useState(false);
    const [list, setList] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const getAulaUser = async () => {
        const alunoID = await AsyncStorage.getItem('alunoID');
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

    useEffect(()=>{
        getAulaUser();

    }, []);

    const onRefresh = () => {
        setRefreshing(false);
        getAulaUser();
    }

    return(
        <Container>
            <Scroller refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
            }>
                <HeaderArea>
                    <HeaderTitle numberOfLines={2}>Minhas aulas</HeaderTitle>
                </HeaderArea>

            
                {loading&&
                <LoadingIcon size="large" color="#007BFF"/>
                }

                <ListArea>
                {list.length === 0 ? (
                    <Text style={styles.text}>Nenhuma aula encontrada, para iniciar suas aulas contate um professor!</Text>
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

const styles = StyleSheet.create({
    text: {
      color: '#007BFF', fontSize: 20
    }
  });