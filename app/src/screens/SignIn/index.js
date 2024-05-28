import React, { useState, useContext } from "react";
import { useNavigation } from '@react-navigation/native';
import { View, Text, TouchableOpacity, StyleSheet, Modal} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserContext } from "../../contexts/UserContext";
import {
    Container,
    InputArea,
    CustomButton,
    CustomButtonText,
    SignMessageButton,
    SignMessageButtonText,
    SignMessageButtonTextBold
} from './styles'

import Api from '../../Api';

import SignInput from "../../components/SignInput";
import GymLogo from '../../assets/gym.svg'
import EmailIcon from '../../assets/email.svg'
import LockIcon from '../../assets/lock.svg'

export default () => {
    const { dispatch: userDispatch} = useContext(UserContext);
    const navigation = useNavigation();

    const [emailField, setEmailField] = useState('');
    const [passwordField, setPasswordField] = useState('');
    
    const [error, setError] = useState('');
    const [showError, setShowError] = useState(false);

    const handleSignClick = async () => {
        try {
            if(emailField != '' && passwordField != ''){
                let json = await Api.signIn(emailField,passwordField);
                if(json.error){
                    setError("Email e/ou senha incorreta!");
                    setShowError(true);
                } else{
                    await AsyncStorage.setItem('token', json.token);
                    await AsyncStorage.setItem('userID', json.userID.toString());
                    await AsyncStorage.setItem('isProfessor', json.isProfessor.toString());
                    await AsyncStorage.setItem('expiracaoToken', json.expiracaoToken.toString());
                    
                    const isProfessor = await AsyncStorage.getItem('isProfessor');
                    if (isProfessor == 1){
                        await AsyncStorage.setItem('professorID', json.professorID.toString());
                    } else{
                        await AsyncStorage.setItem('alunoID', json.alunoID.toString());
                    }

                    navigation.reset({
                        routes:[{name:'MainTab'}]
                    });

                }
            } else{
                setError("Preencha todos os campos!");
                setShowError(true);
            }
        } catch (error) {
        console.error('Ocorreu um erro:', error);
        }
    };

    const handleMessageButtonClick = () => {
        navigation.navigate('SignUp')
    };

    const [visivel, setVisivel]=useState(false)

    return (
        <Container>
            <Modal
        animationType="slide"
        visible={visivel}
      >
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
          <Text style={{ fontSize: 20, color: 'black' }}>Este projeto representa o trabalho de conclusão de curso dos alunos Lucas Eiji Hara e Paulo Henrique de Siqueira, para curso de Análise e Desenvolvimento de Sistemas da Fatec Indaiatuba.</Text>
          <TouchableOpacity onPress={()=>{setVisivel(false)}}>
                <Text style={{ fontSize: 15, color: 'red' }}>Fechar</Text>
            </TouchableOpacity>
        </View>
        </View>    
      </Modal>
    
            <GymLogo width="100%" height="160"/>
            <InputArea>
            <CustomButtonText style={{
                fontSize: 50,       
                fontWeight: 'bold', 
                textAlign: 'center',
                color: '#007BFF',       
                marginBottom: 20,   
            }}>FiTogether</CustomButtonText>
                <SignInput 
                    IconSvg={EmailIcon}
                    placeholder="Digite seu e-mail"
                    value={emailField}
                    onChangeText={t=>setEmailField(t)}
                />
                <SignInput 
                    IconSvg={LockIcon}
                    placeholder="Digite sua senha"
                    value={passwordField}
                    onChangeText={t=>setPasswordField(t)}
                    password={true}
                />
                

                <CustomButton onPress={handleSignClick}>
                    <CustomButtonText>LOGIN</CustomButtonText>
                </CustomButton>
                {showError && <Text style={{ color: 'red' }}>{error}</Text>}
            </InputArea>

            <SignMessageButton onPress={handleMessageButtonClick}>
                <SignMessageButtonText>Ainda não possui uma conta?</SignMessageButtonText>
                <SignMessageButtonTextBold>Cadastre-se</SignMessageButtonTextBold>
            </SignMessageButton>

            <TouchableOpacity onPress={()=>{setVisivel(true)}}>
                <Text style={{ fontSize: 15, color: 'blue' }}>Sobre</Text>
            </TouchableOpacity>

        </Container>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      backgroundColor: '#fff',
      padding: 30,
      borderRadius: 5,
    },
  });