import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, SafeAreaView, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: 20,
    margin: 16,
  },
  listItem: {
    marginBottom: 16,
    padding: 8,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 100,
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

  const excluirAluno = (serie, index) => {
    const novosAlunos = { ...alunos };
    novosAlunos[serie].splice(index, 1); // Remove o aluno do array

    if (novosAlunos[serie].length === 0) {
      // Se não houver mais alunos na série, remova a série da lista
      delete novosAlunos[serie];
    }

    setAlunos(novosAlunos);
  };

  const alternarPresenca = (serie, index) => {
    const novosAlunos = { ...alunos };
    novosAlunos[serie][index].presente = !novosAlunos[serie][index].presente;
    setAlunos(novosAlunos);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View>
        <Text>Registro de Presença de Alunos</Text>
        <TextInput
          placeholder="Nome do Aluno"
          value={nomeAluno}
          onChangeText={(text) => setNomeAluno(text)}
        />
        <TextInput
          placeholder="Série do Aluno"
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
                  <TouchableOpacity
                    style={styles.listItemText}
                    onPress={() => alternarPresenca(item[0], index)}
                  >
                    <Text>Nome: {aluno.nome}</Text>
                    <Text>Presença: {aluno.presente ? 'Presente' : 'Ausente'}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => excluirAluno(item[0], index)}
                  >
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