import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, SafeAreaView, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';


const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: 20,
    margin: 16,
  },
  listItemHeader:{
    marginBottom: 10,
  },
  listItemPlaceholder:{    
    marginBottom: 10, 
    borderWidth: 1,
    borderColor: '#4F4F4F', 
    borderRadius: 10,
    padding: 6,
  },
  listItem: {
    marginBottom: 16,
    padding: 8,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#4F4F4F',
    borderRadius: 20,
    flexDirection: 'row',  
    alignItems: 'center',  
    justifyContent: 'space-between',
    height: 80,
  },
  checkbuttons: {
    flexDirection: 'row',
  },
  listItemText: {
    fontSize: 16,
    flex: 1,
  },
  deleteButton: {
    padding: 8,
  },
  serieHeader: {
    fontWeight: 'bold',
  },
  ButtonAddAluno:{
    borderRadius: 40,
  },
  CheckList:{
    flexDirection: 'row',
    gap: 10,
  },
});

const App = () => {
  const [alunos, setAlunos] = useState({});
  const [nomeAluno, setNomeAluno] = useState('');
  const [serieAluno, setSerieAluno] = useState('');

  const adicionarAluno = () => {
    if (nomeAluno && serieAluno) {
      const novaSerie = serieAluno.trim().toLowerCase();
      const novoAluno = {
        nome: nomeAluno,
        serie: novaSerie,
        presente: false,
      };

      const novaListaAlunos = { ...alunos };
      if (!novaListaAlunos[novaSerie]) {
        novaListaAlunos[novaSerie] = [];
      }
      novaListaAlunos[novaSerie].push(novoAluno);
      novaListaAlunos[novaSerie].sort((a, b) => a.nome.localeCompare(b.nome));

      setAlunos(novaListaAlunos);

      setNomeAluno('');
      setSerieAluno('');
    }
  };

const [btnIda, setbtnitemState] = useState(false); 
const [btnVolta, setbtnitemState1] = useState(false);
const [btnFalta, setbtnitemState2] = useState(false);

const excluirAluno = (serie, index) => {
  const novosAlunos = { ...alunos };
    novosAlunos[serie].splice(index, 1); // Remove o aluno do array

  if (novosAlunos[serie].length === 0) {
      // Se não houver mais alunos na série, remova a série da lista
    delete novosAlunos[serie];
  }

  setAlunos(novosAlunos);
};

return (
  <SafeAreaView style={styles.safeArea}>
    <View >
      <Text style={styles.listItemHeader}>Presença de Alunos: </Text>
      <Text>Nome do Aluno: </Text> 
      <TextInput style={styles.listItemPlaceholder}
        placeholder=""
        value={nomeAluno}
        onChangeText={(text) => setNomeAluno(text)}
      />
      <Text>Serie do Aluno: </Text>
      <TextInput style={styles.listItemPlaceholder}
        placeholder=""
        value={serieAluno}
        onChangeText={(text) => setSerieAluno(text)}
      />
      <Button title="Adicionar Aluno" onPress={adicionarAluno} />
      <FlatList
        data={Object.entries(alunos)}
        keyExtractor={(item) => item[0]}
        renderItem={({ item }) => (
          <>
            <Text style={styles.serieHeader}>Série: {item[0]}</Text>
            {item[1].map((aluno, index) => (
              <View key={index} style={styles.listItem}>
                 <View style={{ flex: 1, gap: 10 }}>
                  <Text>Nome: {aluno.nome}</Text>
                  <View style={styles.CheckList}>
                    <Text>Ida: </Text>
                    <TouchableOpacity onPress={() => setbtnitemState(!btnIda)}>
                      {!btnIda && <MaterialCommunityIcons name="checkbox-blank-circle-outline" size={24} color="black" />}
                      {btnIda && <MaterialCommunityIcons name="checkbox-marked-circle" size={24} color="black" />}
                    </TouchableOpacity>
                    <Text>Volta: </Text>
                    <TouchableOpacity onPress={() => setbtnitemState1(!btnVolta)}>
                      {!btnVolta && <MaterialCommunityIcons name="checkbox-blank-circle-outline" size={24} color="black" />}
                      {btnVolta && <MaterialCommunityIcons name="checkbox-marked-circle" size={24} color="black" />}
                    </TouchableOpacity>
                    <Text>Faltou: </Text>
                    <TouchableOpacity onPress={() => setbtnitemState2(!btnFalta)}>
                      {btnFalta && <MaterialCommunityIcons name="checkbox-marked" size={24} color="black" />}
                      {!btnFalta && <MaterialCommunityIcons name="checkbox-blank-outline" size={24} color="black" />}
                    </TouchableOpacity>
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => excluirAluno(item[0], index)}>
                  <Ionicons name="ios-close" size={24} color="red" />
                </TouchableOpacity>
              </View>
            ))}
          </>
        )}
      />
    </View>
  </SafeAreaView>
);
};

export default App;