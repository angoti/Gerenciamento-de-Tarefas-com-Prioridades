import React, { useState } from 'react';
import { View, Text, Pressable, FlatList, StyleSheet } from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';

export default function ListaContatos({ contatos, editar, editando }) {
  const [ordemAscendente, setOrdemAscendente] = useState(true);

  function toggleOrdem() {
    setOrdemAscendente(!ordemAscendente);
  }

  function ordenarContatos(contatos) {
    return contatos.sort((a, b) => {
      const prioridades = { 'Alta': 3, 'Média': 2, 'Baixa': 1 };
      return ordemAscendente
        ? prioridades[a.prioridade] - prioridades[b.prioridade]
        : prioridades[b.prioridade] - prioridades[a.prioridade];
    });
  }

  function renderizarContato({ item, index }) {
    return (
      <Pressable style={styles.container} onPress={() => editar(index)}>
        <View style={{ flex: 1 }}>
          {item.prioridade === 'Alta' ? (
            <FontAwesome name="battery-full" size={24} color="black" />
          ) : item.prioridade === 'Média' ? (
            <FontAwesome name="battery-half" size={24} color="black" />
          ) : (
            <FontAwesome name="battery-empty" size={24} color="black" />
          )}
        </View>
        <View style={{ flex: 7, flexDirection: 'column' }}>
          <Text style={styles.tarefa}>{item.nome}</Text>
          <Text style={styles.desc}>{item.descricao}</Text>
        </View>
        <View style={{ flex: 1 }}>
          {editando === index && (
            <MaterialIcons name="edit" size={16} color="red" />
          )}
        </View>
      </Pressable>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Pressable onPress={toggleOrdem} style={styles.botaoOrdenar}>
        <Text style={styles.textoBotao}>
          Ordenar por prioridade ({ordemAscendente ? 'Ascendente' : 'Descendente'})
        </Text>
      </Pressable>
      <FlatList
        style={styles.lista}
        data={ordenarContatos([...contatos])}
        renderItem={(item, index) => renderizarContato(item, index)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  tarefa: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  desc: {
    fontSize: 14,
    color: '#666',
  },
  botaoOrdenar: {
    padding: 10,
    backgroundColor: '#ddd',
    alignItems: 'center',
  },
  textoBotao: {
    fontSize: 16,
  },
  lista: {
    marginTop: 10,
    shadowColor: '#845',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
    elevation: 1,
    borderRadius: 5,
  },
});