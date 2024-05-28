import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Api from '../../Api';
import GymLogo from '../../assets/gym.svg'
import {Picker} from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import cidadesBrasil from './cidadesBrasil';



const CreateUserScreen = () => {
  const [cpf, setCPF] = useState('');

  const [dataNasc, setDataNasc] = useState('');
  const [date, setDate] = useState(new Date());

  const [genero, setGenero] = useState('Masculino');
  const [name, setNome] = useState('');
  const [contato, setContato] = useState('');
  const [endereco, setEndereco] = useState('');
  const [cidade, setCidade] = useState('');
  const [error, setError] = useState('');
  const [showError, setShowError] = useState(false);
  const [showPicker, setShowPicker] = useState(false);

  const toggleDatepicker = () => {
    setShowPicker(!showPicker);
  };

  const onChangePicker = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPicker(false);
    setDate(currentDate);
    const formattedDisplayDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;
    const formattedStorageDate = formatDate(currentDate);
    setDataNasc(formattedStorageDate);
  };

  const formatDate = (rawDate) => {
    let date = new Date(rawDate);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;

    return `${day}-${month}-${year}`;
  }
    
  const validarCPF = () => {
    const cpfLimpo = cpf.replace(/\D/g, '');

    if (cpfLimpo.length !== 11) {
      setError("CPF inválido.");
      setShowError(true);
      return false;
    }

    let soma = 0;
    for (let i = 0; i < 9; i++) {
      soma += parseInt(cpfLimpo.charAt(i)) * (10 - i);
    }

    let digito1 = soma % 11;
    digito1 = digito1 < 2 ? 0 : 11 - digito1;

    if (parseInt(cpfLimpo.charAt(9)) !== digito1) {
      setError("CPF inválido.");
      setShowError(true);
      return false;
    }

    soma = 0;
    for (let i = 0; i < 10; i++) {
      soma += parseInt(cpfLimpo.charAt(i)) * (11 - i);
    }

    let digito2 = soma % 11;
    digito2 = digito2 < 2 ? 0 : 11 - digito2;

    if (parseInt(cpfLimpo.charAt(10)) !== digito2) {
      setError("CPF inválido.");
      setShowError(true);
      return false;
    }

    return true;
  };

  const navigation = useNavigation();
  const handleSignClick = async () => {

  const isProfessor = await AsyncStorage.getItem('isProfessor');

  const userCredentialsID = await AsyncStorage.getItem('userID');

  if(cpf != '' && name != ''){
      let res = await Api.createUserDetails(cpf, dataNasc, genero, name, contato, endereco, cidade, isProfessor, userCredentialsID);
      if(res.insertId){
          alert("Detalhes preenchidos com sucesso, para finalizar preencha alguns detalhes!");

          if(isProfessor == 1){
              navigation.reset({
                  routes: [{name: 'CreateProfessor'}]
              });
          } else{
              navigation.reset({
                  routes: [{name: 'CreateAluno'}]
              });
          }
          
      } else {
          setError("Algo deu errado!");
          setShowError(true);
      }
  } else {
      setError("Preencha todos os campos!");
      setShowError(true);
  }
};


  return (
    <ScrollView>
      <View style={styles.container}>
        <GymLogo width="100%" height="80"/>
        <Text style={styles.text}>Detalhes do usuário</Text>

        <View width="80%">
        <Text style={{ color: '#007BFF', fontSize: 15}}>Nome</Text>
          <TextInput
          style={styles.input}
          placeholder="Insira seu nome"
          placeholderTextColor="#007BFF"
          backgroundColor="#D1E5FF"
          onChangeText={(text) => setNome(text)}
          />
        </View>

        <View width="80%">
        <Text style={styles.text}>CPF</Text>
          <TextInput
            style={styles.input}
            placeholder="Insira o CPF"
            placeholderTextColor="#007BFF"
            backgroundColor="#D1E5FF"
            onChangeText={(text) => setCPF(text)}
            keyboardType="numeric"
          />
        </View>

        <View width="80%">
          <Text style={styles.text}>Data de Nascimento</Text>
          {showPicker && (
            <DateTimePicker
              mode="date"
              display="spinner"
              value={date}
              onChange={onChangePicker}
            />
          )
          }

          {!showPicker &&(
            <Pressable
            style={width="100%"} onPress={toggleDatepicker}>
              <TextInput
                style={styles.input}
                width='100%'
                placeholder="Selecionar"
                placeholderTextColor="#007BFF"
                backgroundColor="#D1E5FF"
                value={dataNasc}
                onChangeText={setDataNasc}
                editable={false}
              />
            </Pressable> 
          )}
        </View>
        

        <View width="80%">
          <Text style={styles.text}>Genero</Text>
          <Picker style={styles.picker}
          selectedValue={genero}
          onValueChange={(itemValue, itemIndex) =>
            setGenero(itemValue)
          }>
          <Picker.Item label="Masculino" value="Masculino" />
          <Picker.Item label="Feminino" value="Feminino" />
          <Picker.Item label="Outros" value="Outros" />
          </Picker>
        </View>
        
        <View width="80%">
          <Text style={styles.text}>Contato</Text>
          <TextInput
            style={styles.input}
            placeholder="Insira seu contato"
            placeholderTextColor="#007BFF"
            backgroundColor="#D1E5FF"
            onChangeText={(text) => setContato(text)}
            keyboardType="numeric"
          />
        </View>


        <View width="80%">
          <Text style={styles.text}>Endereço</Text>
          <TextInput
            style={styles.input}
            placeholder="Insira seu endereço"
            placeholderTextColor="#007BFF"
            backgroundColor="#D1E5FF"
            onChangeText={(text) => setEndereco(text)}
          />
        </View>
        <View width="80%">
          <Text style={styles.text}>Cidade</Text>
          <Picker
            style={styles.picker}
            selectedValue={cidade}
            onValueChange={(itemValue, itemIndex) => setCidade(itemValue)}
          >
            <Picker.Item label="Selecione uma cidade" value="" />
            {cidadesBrasil.map((cidade, index) => (
              <Picker.Item key={index} label={cidade} value={cidade} />
            ))}
          </Picker>
        </View>
        {showError && <Text style={{ color: 'red' }}>{error}</Text>}
        <Button title="Próximo" onPress={() => {
            if (validarCPF()) {
                handleSignClick(); 
            }}} color="#007BFF" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F9F9F9',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  picker: {
    backgroundColor: '#D1E5FF',
    color: '#007BFF',
  },
  input: {
    color: '#007BFF',
    fontSize: 15,
    width: '100%',
    marginVertical: 5,
    padding: 10,
  },
  text: {
    color: '#007BFF', fontSize: 18
  }
});

export default CreateUserScreen;
