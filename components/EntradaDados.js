import { useState, useEffect } from 'react';
import {
  StyleSheet,
  TextInput,
  Button,
  View,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function EntradaDados({
  adicionar,
  excluir,
  tarefaEditando,
  editando,
}) {
  const [prioridade, setPrioridade] = useState('');
  const [descricao, setDescricao] = useState('');
  const [nome, setNome] = useState('');

  useEffect(() => {
    setDescricao(tarefaEditando.descricao);
    setPrioridade(tarefaEditando.prioridade);
    setNome(tarefaEditando.nome);
  }, [tarefaEditando]);

  function atualizarContato() {
    if (nome !== '' && descricao !== '' && prioridade !== '') {
      adicionar({ ...tarefaEditando, nome, descricao, prioridade });
    }
  }

  function excluirContato() {
    excluir();
  }
  function adicionarContato() {
    if (nome !== '' && descricao !== '' && prioridade !== '') {
      adicionar({ nome, descricao, prioridade });
    }
  }
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nome da tarefa"
        onChangeText={(texto) => setNome(texto)}
        value={nome}
      />
      <TextInput
        style={styles.input}
        placeholder="Descrição da tarefa"
        onChangeText={(texto) => setDescricao(texto)}
        value={descricao}
        multiline={true}
        numberOfLines={4}
        height={100}
      />
      <View style={styles.radioGrupo}>
        <Pressable style={styles.radio} onPress={() => setPrioridade('Alta')}>
          <FontAwesome name="battery-full" size={24} color="black" />
          {prioridade === 'Alta' ? (
            <Ionicons
              style={styles.radioIcon}
              name="radio-button-on"
              size={24}
              color="black"
            />
          ) : (
            <Ionicons
              style={styles.radioIcon}
              name="radio-button-off"
              size={24}
              color="black"
            />
          )}
        </Pressable>
        <Pressable style={styles.radio} onPress={() => setPrioridade('Média')}>
          <FontAwesome name="battery-half" size={24} color="black" />
          {prioridade === 'Média' ? (
            <Ionicons
              style={styles.radioIcon}
              name="radio-button-on"
              size={24}
              color="black"
            />
          ) : (
            <Ionicons
              style={styles.radioIcon}
              name="radio-button-off"
              size={24}
              color="black"
            />
          )}
        </Pressable>
        <Pressable style={styles.radio} onPress={() => setPrioridade('Baixa')}>
          <FontAwesome name="battery-empty" size={24} color="black" />
          {prioridade === 'Baixa' ? (
            <Ionicons
              style={styles.radioIcon}
              name="radio-button-on"
              size={24}
              color="black"
            />
          ) : (
            <Ionicons
              style={styles.radioIcon}
              name="radio-button-off"
              size={24}
              color="black"
            />
          )}
        </Pressable>
      </View>
      {editando >= 0 ? (
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 3 }}>
            <Button title="Atualizar" onPress={() => atualizarContato()} />
          </View>
          <View style={{ flex: 1 }}></View>
          <View style={{ flex: 3 }}>
            <Button title="Excluir" onPress={() => excluirContato()} />
          </View>
        </View>
      ) : (
        <Button title="Adicionar" onPress={() => adicionarContato()} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
  },
  input: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 4,
    padding: 4,
    marginBottom: 10,
    textAlignVertical:'top',
  },
  radio: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioIcon: {
    marginLeft: 4,
  },
  radioGrupo: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 4,
  },
});
