const BASE_API = 'https://backendapitg-production-0590.up.railway.app';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default {
    signIn: async (email, password) => {
            const req = await fetch(`${BASE_API}/auth/login`, {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                "email": `${email}`,
                "senha": `${password}`
            }),
            });
            const json = await req.json();
            return json;
    },
    signUp: async (email, password) => {
        const req = await fetch(`${BASE_API}/user`,{
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "email": `${email}`,
                "senha": `${password}`
            })
        });
        const json = await req.json();
        return json;
    },
    createUserDetails: async(cpf, dataNasc, genero, name, contato, endereco, cidade, isProfessor, userCredentialsID) => {
        const req = await fetch(`${BASE_API}/userDetails`,{
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "cpf": `${cpf}`,
                "dataNasc": `${dataNasc}`,
                "genero": `${genero}`,
                "name": `${name}`,
                "contato": `${contato}`,
                "endereco": `${endereco}`,
                "cidade": `${cidade}`,
                "isProfessor": `${isProfessor}`,
                "userCredentialsID": `${userCredentialsID}`
            })
            
        });
        const json = await req.json();
        return json;
    },
    createProfessor: async(certificacoes, dispoHorario, especialidade, experiencia, userID) => {
        const req = await fetch(`${BASE_API}/prof`,{
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "certificacoes": `${certificacoes}`,
                "dispoHorario": `${dispoHorario}`,
                "especialidade": `${especialidade}`,
                "experiencia": `${experiencia}`,
                "userID": `${userID}`
            })
            
        });
        const json = await req.json();
        return json;
    },
    createAluno: async(altura, nivelExperiencia, objetivos, pesoOrigem, prefHorario, restrMedicas, userID, imc) => {
        const req = await fetch(`${BASE_API}/aluno`,{
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "altura": `${altura}`,
                "nivelExperiencia": `${nivelExperiencia}`,
                "objetivos": `${objetivos}`,
                "pesoOrigem": `${pesoOrigem}`,
                "prefHorario": `${prefHorario}`,
                "restrMedicas": `${restrMedicas}`,
                "userID": `${userID}`,
                "imc": `${imc}`
            })
            
        });
        const json = await req.json();
        return json;
    },
    getUsuarioById: async (id) => {
        const token = await AsyncStorage.getItem('token');
        const req = await fetch(`${BASE_API}/users/${id}`,{
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            }
        })
        const json = await req.json();
        return json;
    },
    getProfessores: async () => {
        const token = await AsyncStorage.getItem('token');
        const req = await fetch(`${BASE_API}/prof`,{
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            }
        })
        const json = await req.json();
        return json;
    },
    getProfessoresById: async (id) => {
        const token = await AsyncStorage.getItem('token');
        const req = await fetch(`${BASE_API}/prof/${id}`,{
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            }
        })
        const json = await req.json();
        return json;
    },
    getUserProf: async (id) => {
        const token = await AsyncStorage.getItem('token');
        const req = await fetch(`${BASE_API}/prof/user/${id}`,{
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            }
        })
        const json = await req.json();
        return json;
    },
    getProfessoresCidade: async (cidade) => {
        const token = await AsyncStorage.getItem('token');
        const req = await fetch(`${BASE_API}/prof/cidade/${cidade}`,{
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            }
        })
        const json = await req.json();
        return json;
    },
    getAulaUser: async (userID) =>{
        const token = await AsyncStorage.getItem('token');
        const req = await fetch(`${BASE_API}/aula/user/${userID}`,{
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            }
        })
        const json = await req.json();
        return json;
    },
    getAulaID: async (aulaID) =>{
        const token = await AsyncStorage.getItem('token');
        const req = await fetch(`${BASE_API}/aula/${aulaID}`,{
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            }
        })
        const json = await req.json();
        return json;
    },
    createRequisicao: async(alunoID, professorID, requisicao) => {
        const token = await AsyncStorage.getItem('token');
        const req = await fetch(`${BASE_API}/requisicao`,{
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            },
            body: JSON.stringify({
                "alunoID": `${alunoID}`,
                "professorID": `${professorID}`,
                "requisicao": `${requisicao}`
            })
            
        });
        const json = await req.json();
        return json;
    },
    getProfReqs: async (professorID) =>{
        const token = await AsyncStorage.getItem('token');
        const req = await fetch(`${BASE_API}/requisicao/prof/${professorID}`,{
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            }
        })
        const json = await req.json();
        return json;
    },
    getAlunoReqs: async (alunoID) =>{
        const token = await AsyncStorage.getItem('token');
        const req = await fetch(`${BASE_API}/requisicao/aluno/${alunoID}`,{
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            }
        })
        const json = await req.json();
        return json;
    },
    getAlunoById: async (alunoID) =>{
        const token = await AsyncStorage.getItem('token');
        const req = await fetch(`${BASE_API}/aluno/${alunoID}`,{
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            }
        })
        const json = await req.json();
        return json;
    },
    getProfAlunos: async (profID) =>{
        const token = await AsyncStorage.getItem('token');
        const req = await fetch(`${BASE_API}/aluno/prof/${profID}`,{
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            }
        })
        const json = await req.json();
        return json;
    },
    getTreinoByAulaID: async (treinoID) =>{
        const token = await AsyncStorage.getItem('token');
        const req = await fetch(`${BASE_API}/treino/${treinoID}`,{
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            }
        })
        const json = await req.json();
        return json;
    },
    putFinalizarAula: async(aulaID, dificuldades, duracao, finalizado, notaAula, notaProf, pesoAtual) => {
        const token = await AsyncStorage.getItem('token');
        const req = await fetch(`${BASE_API}/aula/finalizar/${aulaID}`,{
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            },
            body: JSON.stringify({
                "dificuldades": `${dificuldades}`,
                "duracao": `${duracao}`,
                "finalizado": `${finalizado}`,
                "notaAula": `${notaAula}`,
                "notaProf": `${notaProf}`,
                "pesoAtual": `${pesoAtual}`
            })
            
        });
        // const json = await req.json();
        // return json;
    },
    putAceitarRequisicao: async (id) =>{
        const token = await AsyncStorage.getItem('token');
        const req = await fetch(`${BASE_API}/requisicao/aceitar/${id}`,{
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            }
        })
        // const json = await req.json();
        // return json;
    },
    deleteRequisicao: async (id) =>{
        const token = await AsyncStorage.getItem('token');
        const req = await fetch(`${BASE_API}/requisicao/${id}`,{
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            }
        })
        // const json = await req.json();
        // return json;
    },
    getExerciciosList: async () => {
        const token = await AsyncStorage.getItem('token');
        const req = await fetch(`${BASE_API}/exercicio`,{
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            }
        })
        const json = await req.json();
        return json;
    },
    postNovoExercicio: async(newExercicio) => {
        const token = await AsyncStorage.getItem('token');
        const req = await fetch(`${BASE_API}/exercicio`,{
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            },
            body: JSON.stringify({
                "nome": `${newExercicio}`
            })
            
        });
        const json = await req.json();
        return json;
    },
    postNovoTreino: async(exercicios, series, repetitions, rest) => {
        const token = await AsyncStorage.getItem('token');
        const req = await fetch(`${BASE_API}/treino`,{
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            },
            body: JSON.stringify({
                "exercicios": `${exercicios}`,
                "series": `${series}`,
                "repeticoes": `${repetitions}`,
                "descanso": `${rest}`
            })
        });
        const json = await req.json();
        return json;
    },
    postNovaAula: async(treinoID, exerciseName, alunoID, professorID) => {
        const token = await AsyncStorage.getItem('token');
        const req = await fetch(`${BASE_API}/aula`,{
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            },
            body: JSON.stringify({
                "treinoID": `${treinoID}`,
                "titulo": `${exerciseName}`,
                "alunoID": `${alunoID}`,
                "professorID": `${professorID}`,
                "finalizado": "0"
            })
            
        });
        const json = await req.json();
        return json;
    },
    deleteAula: async (id) =>{
        const token = await AsyncStorage.getItem('token');
        const req = await fetch(`${BASE_API}/aula/${id}`,{
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            }
        })
        // const json = await req.json();
        // return json;
    },
};
