import React, { useState } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
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

    const navigation = useNavigation();

    const [emailField, setEmailField] = useState('');
    const [passwordField, setPasswordField] = useState('');
    const [passwordField2, setPasswordField2] = useState('');
    const [error, setError] = useState('');
    const [showError, setShowError] = useState(false);
    
    const [isProfessor, setIsProfessor] = useState(false);

    const [isValidEmail, setIsValidEmail] = useState(true);
    const [isValidPassword, setIsValidPassword] = useState(true);
    
    const validateEmail = (email) => {
        const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        return emailRegex.test(email);
    };

    const handleTextChange = (text) => {
        setEmailField(text);
        setIsValidEmail(validateEmail(text));
    };

    const handlePassChange = (text) => {
        setPasswordField(text);
        setIsValidPassword(validatePassword(text));
    };

    const validatePassword = (password) => {
       const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    };

    const toggleProfessor = () => {
        setIsProfessor(!isProfessor);
    };

    const handleComparePasswords = () => {
        try {
            if (passwordField === passwordField2) {
              setError('');
              setShowError(false);
            } else {
              setError('As senhas não coincidem. Tente novamente.');
              setShowError(true);
            }
          } catch (error) {
            console.error('Ocorreu um erro:', error);
          }
    };

    const handleSignClick = async () => {
        if(emailField != '' && passwordField != ''){
            let res = await Api.signUp(emailField, passwordField);
            await AsyncStorage.setItem('userID', res.insertIdCredentials.toString());
            if(res.insertIdCredentials){
                alert("Conta criada com sucesso, para finalizar preencha alguns detalhes!");
                
                const isProfessorBoolean = isProfessor ? 1 : 0;
                await AsyncStorage.setItem('isProfessor', isProfessorBoolean.toString());
                navigation.reset({
                    routes: [{name: 'CreateUserDetails'}]
                });
                
            } else if (res.error){
                setError("Email ou senha invalida!");
                setShowError(true);
            }
        } else {
            setError("Preencha todos os campos!");
            setShowError(true);
        }
    };

    const handlePress = () => {
        handleComparePasswords();
        handleSignClick();
      };

    const handleMessageButtonClick = () => {
        navigation.reset({
            routes: [{name: 'SignIn'}]
        });
    };

    const styles = StyleSheet.create({
        container: {
          flexDirection: 'row',
          alignItems: 'center',
          borderBottomWidth: 1,
          borderColor: '#CCCCCC',
          paddingVertical: 8,
        },
        input: {
          flex: 1,
          marginLeft: 8,
          fontSize: 16,
          color: '#333333',
        },
        invalidInput: {
          borderColor: 'red',
        },
        errorText: {
          color: 'red',
          fontSize: 12,
          marginTop: 4,
        },
        professorToggle:{
            width: 30,
            height: 30,
            borderWidth: 1,
            borderRadius:5,
            borderColor: '#007BFF',
            marginTop: 10,
            marginRight: 10,
            marginBottom: 25,
            backgroundColor: isProfessor ? '#007BFF' : '#F9F9F9',
        },
        professorToggleText:{
            color: '#007BFF',
            marginBottom: 25,
            fontSize: 18,
            marginTop: 10
        }
      });
    return (
        <Container>
            <GymLogo width="100%" height="160"/>
            
            <InputArea>
                <CustomButtonText style={{
                    fontSize: 30,       
                    fontWeight: 'bold', 
                    textAlign: 'center',
                    color: '#007BFF',       
                    marginBottom: 20,   
                }}>Criação de conta</CustomButtonText>

                <SignInput 
                    style={[styles.input, !isValidEmail && styles.invalidInput]}
                    IconSvg={EmailIcon}
                    placeholder="Digite seu e-mail"
                    value={emailField}
                    onChangeText={handleTextChange}
                />
                {!isValidEmail && <Text style={styles.errorText}>Email inválido</Text>}

                <SignInput 
                    style={[styles.input, !isValidPassword && styles.invalidInput]}
                    IconSvg={LockIcon}
                    placeholder="Digite sua senha"
                    value={passwordField}
                    onChangeText={handlePassChange}
                    password={true}
                />
                 {!isValidPassword && (
                    <Text style={styles.errorText}>
                    A senha deve conter pelo menos 8 caracteres, incluindo pelo menos uma letra maiúscula, uma letra minúscula e um número.
                    </Text>
                )}
                <SignInput 
                    IconSvg={LockIcon}
                    placeholder="Confirme sua senha"
                    value={passwordField2}
                    onChangeText={t=>setPasswordField2(t)}
                    password={true}
                />

                <Text style={{ color: '#007BFF', fontSize: 18}}>Você é professor?</Text>
                    <TouchableOpacity onPress={toggleProfessor}>
                        <View style={{
                            flexDirection: 'row', 
                            alignItems: 'center' }}>
                        <View
                            style={styles.professorToggle}
                        />
                        <Text style={styles.professorToggleText}>{isProfessor ? 'Sim' : 'Sim'}</Text>
                        </View>
                    </TouchableOpacity>

                <CustomButton onPress={handlePress}>
                    <CustomButtonText>CONTINUAR</CustomButtonText>
                    
                </CustomButton>
                {showError && <Text style={{ color: 'red' }}>{error}</Text>}
                <SignMessageButton onPress={handleMessageButtonClick}>
                <SignMessageButtonText>Já possui uma conta?</SignMessageButtonText>
                <SignMessageButtonTextBold>Faça Login</SignMessageButtonTextBold>
            </SignMessageButton>
            </InputArea>

            

        </Container>
        
    );
    
    
};