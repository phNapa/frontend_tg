import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Picker} from '@react-native-picker/picker';
import Api from '../../Api';
import GymLogo from '../../assets/gym.svg'

const CreateAlunoScreen = () => {
  const [certificacoes, setCertificacoes] = useState('');
  const [dispoHorario, setDispoHorario] = useState('Manhã');
  const [especialidade, setEspecialidade] = useState('');
  const [experiencia, setExperiencia] = useState('');
  const [error, setError] = useState('');
  const [showError, setShowError] = useState(false);

  const navigation = useNavigation();

  const handleSignClick = async () => {

  const userID = await AsyncStorage.getItem('userID');
  if (certificacoes && especialidade && dispoHorario && experiencia) {
  try {
    const res = await Api.createProfessor(certificacoes, dispoHorario, especialidade, experiencia, userID);
    
    if (res.insertId) {
      alert("Preenchimento concluído, faça login na aplicação!");
      navigation.reset({
        routes: [{ name: 'SignIn' }]
      });
    } else {
      throw new Error("Algo deu errado, preencha todos os campos!");
    }
  } catch (error) {
    setError(error.message);
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
        <Text style={styles.text}>Detalhes do professor</Text>
        <View width="80%">
          <Text style={styles.text}>Certificações</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex. CREF"
            placeholderTextColor="#007BFF"
            backgroundColor="#D1E5FF"
            onChangeText={(text) => setCertificacoes(text)}
          />
        </View>

        <View width="80%">
          <Text style={styles.text}>Disponibilidade de Horário</Text>
          <Picker style={styles.picker}
          selectedValue={dispoHorario}
          onValueChange={(itemValue, itemIndex) =>
            setDispoHorario(itemValue)
          }>
          <Picker.Item label="Manhã" value="Manhã" />
          <Picker.Item label="Tarde" value="Tarde" />
          <Picker.Item label="Noite" value="Noite" />
        </Picker>
        </View>

        <View width="80%">
          <Text style={styles.text}>Especialidade</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex. Fraturas"
            placeholderTextColor="#007BFF"
            backgroundColor="#D1E5FF"
            onChangeText={(text) => setEspecialidade(text)}
          />
        </View>

        <View width="80%">
          <Text style={styles.text}>Experiência</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex. 5 anos"
          placeholderTextColor="#007BFF"
          backgroundColor="#D1E5FF"
          onChangeText={(text) => setExperiencia(text)}
        />
        {showError && <Text style={{ color: 'red' }}>{error}</Text>}
        <Button title="Finalizar" onPress={handleSignClick} color="#007BFF" />
        </View>
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

export default CreateAlunoScreen;
