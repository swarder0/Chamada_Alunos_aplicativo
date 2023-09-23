import React, { useState } from 'react';
import { View, Text, Button, FlatList, SafeAreaView, StyleSheet, TouchableOpacity, Modal, } from 'react-native';
import { Picker } from '@react-native-picker/picker';

function groupBy(arr, key) {
  return arr.reduce(function (rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
}

function sortSeries(series) {
  return series.sort((a, b) => {
    const serieA = parseInt(a.replace('º ano', ''), 10);
    const serieB = parseInt(b.replace('º ano', ''), 10);
    return serieA - serieB;
  });
}

const styles = StyleSheet.create({
  safeArea: {
    paddingTop: 40,
    margin: 20,
  },
  listItemHeader: {
    marginBottom: 20,
    fontSize: 16,
    fontWeight: '600',
    alignSelf: 'center',
    backgroundColor: '#191970',
    color: '#F0E68C',
    borderRadius: 20,
    padding: 10,
  },
  btnSelecionarEscola: {
    backgroundColor: '#191970',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    margin: 30,
    width: 300,
  },
  btnBuscarEscola: {
    backgroundColor: '#191970',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    alignSelf: 'center',
    margin: 10,
  },
  buttonText: {
    color: '#F0E68C',
    fontSize: 16,
    fontWeight: '600',
  },
  TeladeBusca: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  containerBusca: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: 350,
  },
  MenuSuperior: {
    backgroundColor: '#DAA520',
    height: 240,
    borderBottomWidth: 2,
    borderColor: '#1C1C1C',
  },
  listaAlunos: {
    flex: 1,
    fontSize: 10,
  },
});

const App = () => {
  const [alunos, setAlunos] = useState({});
  const [selecionarEscola, setselecionarEscola] = useState('');
  const [TelaPopUP, setTelaPopUP] = useState(false);
  const [nomeEscolaSelecionada, setNomeEscolaSelecionada] = useState('');
  const buscarAlunos = () => {

    const dadosAlunos = {
      escola_a: [
        { id: 6, nome: 'Pedro', serie: '6º ano', periodo: 'Tarde' },
      ],
      escola_b: [
        { id: 1, nome: 'João guilherme', serie: '5º ano', periodo: 'Tarde' },
        { id: 2, nome: 'Maria clara', serie: '4º ano', periodo: 'Manhã' },
        { id: 3, nome: 'Pedro joaquim', serie: '3º ano', periodo: 'Manhã' },
        { id: 4, nome: 'Ana costa', serie: '5º ano', periodo: 'Tarde' },
        { id: 5, nome: 'Carlos alberto', serie: '4º ano', periodo: 'Manhã' },
      ],
      escola_c: [
        { id: 7, nome: 'Ana', serie: '7º ano', periodo: 'Manhã' },
      ]
    }
    if (dadosAlunos[selecionarEscola]) {
      const alunosOrganizados = groupBy(dadosAlunos[selecionarEscola], 'serie');

      const seriesOrdenadas = sortSeries(Object.keys(alunosOrganizados));

      setAlunos(seriesOrdenadas.map((serie) => ({
        serie,
        alunos: alunosOrganizados[serie],

      })));
    } else {

      setAlunos({});
    }
    setTelaPopUP(false);
  };

  return (
    <View style={styles.BackColor}>
      <View style={styles.MenuSuperior}>
        <SafeAreaView style={styles.safeArea}>
          <View>
            <Text style={styles.listItemHeader}>MCS Transporte: </Text>
            <TouchableOpacity
              style={styles.btnSelecionarEscola}
              onPress={() => setTelaPopUP(true)}>
              <Text style={styles.buttonText}>Selecionar Escola</Text>
            </TouchableOpacity>
            <Modal
              animationType="slide"
              transparent={true}
              visible={TelaPopUP}>
              <View style={styles.TeladeBusca}>
                <View style={styles.containerBusca}>
                  <Text style={styles.TextHeader}>Escolha a Escola:</Text>
                  <Picker
                    selectedValue={selecionarEscola}
                    onValueChange={(itemValue) => {
                      setselecionarEscola(itemValue);
                      const escolaSelecionada = {
                        escola_a: 'Escola A',
                        escola_b: 'Escola B',
                        escola_c: 'Escola C',
                      }[itemValue];
                      setNomeEscolaSelecionada(escolaSelecionada);
                    }}
                  >
                    <Picker.Item label="Escola A" value="escola_a" />
                    <Picker.Item label="Escola B" value="escola_b" />
                    <Picker.Item label="Escola C" value="escola_c" />
                  </Picker>
                  <TouchableOpacity
                    style={styles.btnBuscarEscola}
                    onPress={() => {
                      buscarAlunos();
                      setTelaPopUP(false);
                    }}>
                    <Text style={styles.buttonText}>Buscar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
            <View style={{ alignItems: 'center', gap: 5, marginTop: 20, }}>
              {nomeEscolaSelecionada !== '' && (
                <Text style={{ fontWeight: 'bold' }}>{nomeEscolaSelecionada}</Text>
              )}
              <FlatList
                data={alunos}
                keyExtractor={(item) => item.serie}

                renderItem={({ item }) => (

                  <>
                    {item.alunos.map((aluno) => (
                      <View key={aluno.id}>
                        <View style={{ flexDirection: 'row', marginTop: 20 }}>
                          <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 20 }}>
                            <Text style={{ fontWeight: 'bold' }}>Nome: </Text>
                            <Text> {aluno.nome} </Text>
                          </View>

                          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontWeight: 'bold' }}>Série: </Text>
                            <Text> {aluno.serie} </Text>
                          </View>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 10 }}>
                          <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 20 }}>
                            <Text style={{ fontWeight: 'bold' }}>Período: </Text>
                            <Text> {aluno.periodo} </Text>
                          </View>

                          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontWeight: 'bold' }}>Escola: </Text>
                            <Text> {aluno.escola} </Text>
                          </View>
                        </View>
                      </View>
                    ))}
                  </>
                )}
              />
            </View>
          </View>
        </SafeAreaView>
      </View>
    </View>
  );
};

export default App;
