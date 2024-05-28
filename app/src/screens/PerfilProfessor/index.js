import React, { useState } from 'react';
import { Text, Button, Linking, TouchableOpacity, View, StyleSheet } from 'react-native';
import { Container, Area, Area2, HeaderTitle, ReqInput, Middle, HeaderArea } from './styles';
import AsyncStorage from "@react-native-async-storage/async-storage";
import WhatsAppIcon from '../../assets/whatsapp-svg';
import AccountIcon from '../../assets/account.svg';
import { useRoute } from '@react-navigation/native';
import Api from '../../Api';
import Modal from 'react-native-modal';
import Stars from '../../components/Stars';

export default () => {
    const route = useRoute();
    const { name, notaMedia, contato, cidade, especialidade, experiencia, certificacoes, dispoHorario, professorID, descricao } = route.params;
    const [isModalVisible, setModalVisible] = useState(false);
    const [textoRequisicao, setTextoRequisicao] = useState('');
    const [error, setError] = useState('');
    const [showError, setShowError] = useState(true);

    
    const handleRequisição = async () => {
        const alunoID = await AsyncStorage.getItem('alunoID');
        let res = await Api.createRequisicao(alunoID, professorID, textoRequisicao);

        if(res.insertId){
            alert("Requisição enviada com sucesso!");
            
        } else {
            setError("Algo deu errado!");
            setShowError(true);
        }
        setModalVisible(false);
    }

    const handleWhatsAppClick = async () => {
        if (contato.length != 11) {
            alert('Número invalido');
        return;
      }
      let url =
        'whatsapp://send?text=' + "oi" + '&phone=55' + contato;
      Linking.openURL(url)
        .then((data) => {
        })
        .catch(() => {
          alert('WhatsApp não está instalado!');
        });
    }

    return (
        <Container>
            <TouchableOpacity onPress={handleWhatsAppClick} >
                <View>
                <Text style={styles.text}>Perfil professor</Text>
                </View>
                <Middle>
                    <AccountIcon width="100" height="100" fill="#FFFFFF"/>
                </Middle>
                <Middle>
                    <Text style={styles.textNome}>{name}</Text>
                </Middle>
                <Middle>
                <Stars stars={notaMedia} />
                </Middle>
                <Middle>
                    <WhatsAppIcon width="30" height="30"/>
                </Middle>
                        <Text style={styles.textDados}>Cidade: {cidade}</Text>
                        <Text style={styles.textDados}>Contato: {contato}</Text>
                        <Text style={styles.textDados}>Especialidade: {especialidade}</Text>
                        <Text style={styles.textDados}>Experiencia: {experiencia}</Text>
                        <Text style={styles.textDados}>CREF: {certificacoes}</Text>
                        <Text style={styles.textDados}>Horário Disponível: {dispoHorario}</Text>
            </TouchableOpacity>
            <Button color="#007BFF" title="Enviar requisição" onPress={() => setModalVisible(true)} />

            <Modal color="#F9F9F9" width="90%" isVisible={isModalVisible}>
                <Area>
                    <HeaderTitle>Descreva a sua necessidade:</HeaderTitle>
                    <Area2>
                        <ReqInput
                            placeholder="Digite sua requisição"
                            onChangeText={(text) => setTextoRequisicao(text)}
                            multiline={true}
                        />
                    </Area2>
                    
                    <Button color="#007BFF" title="Finalizar e Enviar" onPress={handleRequisição} />
                    {showError && <Text style={{ color: 'red' }}>{error}</Text>}
                    <Button color="#007BFF" title="Cancelar" onPress={() => setModalVisible(false)} />
                    <Text/>
                </Area>
            </Modal>
        </Container>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#007BFF'
    },
    textNome: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'black'
      },
      textDados: {
        fontSize: 18,
        color: 'black'
      },
  });