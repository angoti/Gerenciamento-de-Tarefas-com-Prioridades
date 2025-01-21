import EntradaDados from './components/EntradaDados';
import ListaContatos from './components/ListaContatos';
import { useState } from 'react';
import { View, Text } from 'react-native';

export default function App() {
  const tarefaDataStructure = { nome: '', descricao: '', prioridade: 'Alta', id: '' };
  const [tarefas, setTarefas] = useState([]);
  const [idEditando, setIdEditando] = useState(-1);
  const [tarefaEditando, setTarefaEditando] = useState(tarefaDataStructure);

  function editarContato(index) {
    console.log('editando ' + index);
    setIdEditando(index);
    setTarefaEditando(tarefas[index]);
  }

  function excluirContato() {
    console.log(' excluindo ', tarefaEditando);
    setTarefas(tarefas.filter((contato) => contato !== tarefaEditando));
  }

  function adicionarContato(novoContato) {
    console.log('adicionando/atualizando ', novoContato);
    console.log('idContatoEditando ', idEditando);

    // cria novo contato
    if (idEditando === -1) {
      setTarefas([...tarefas, novoContato]);
    }
    // atualiza um contato existente
    else {
      let contatosAtualizados = [...tarefas];
      contatosAtualizados[idEditando] = novoContato;
      setTarefas(contatosAtualizados);
    }
    setIdEditando(-1);
    setTarefaEditando(tarefaDataStructure);
  }

  return (
    <View style={{ marginTop: 40, flex: 1, margin: 4, padding: 4 }}>
      <Text style={{
        fontSize: 18,
        fontWeight: 'bold',
        alignSelf: 'center',
        paddingVertical: 10,
      }}>Gerenciamento de Tarefas com Prioridades</Text>
      <View style={{ flex: 1, }}>
        <ListaContatos
          contatos={tarefas}
          editar={editarContato}
          editando={idEditando}
        />
      </View>
      <View style={{ height: 20 }} />
      <EntradaDados
        adicionar={adicionarContato}
        excluir={excluirContato}
        tarefaEditando={tarefaEditando}
        editando={idEditando}
      />
    </View>
  );
}

