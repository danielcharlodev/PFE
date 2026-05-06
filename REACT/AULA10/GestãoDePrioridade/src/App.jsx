// useState guarda informações que podem mudar Exemplo: Texto Digitado

import React, { useState, useEffect } from 'react'; 

import './App.css';

function App() {
  // Função do useState para guardar o texto da tarefa, a prioridade escolhida, a lista de tarefas, o filtro selecionado e o texto da busca
  const [taskText, setTaskText] = useState("");
  const [priority, setPriority] = useState("Baixa");
  const [taskList, setTaskList] = useState([]);
  const [filter, setFilter] = useState("Todas");
  const [search, setSearch] = useState("");

  // edição
  // Função para guardar o id da tarefa que está sendo editada, e o texto editado, se não estiver digitando ele esconde o input e mostra o texto normal, se estiver digitando ele mostra o input com o texto editado
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  // Salva localmente a as tarefas no navegador, quando a página é recarregada ele pega as tarefas salvas e mostra na tela
  useEffect(() => {
    const saved = localStorage.getItem("@taskflow_data");
    if (saved) setTaskList(JSON.parse(saved));
  }, []);
  // toda vez que a lista de tarefas mudar ele atualiza o localStorage com a nova lista
  useEffect(() => {
    localStorage.setItem("@taskflow_data", JSON.stringify(taskList));
  }, [taskList]);

    // Função para adicionar tarefa
  const addTask = (e) => {

    // Impede que o formulario recarregue a página e os valores de useState voltem ao etado inicial
    e.preventDefault();

    // Se estiver vazio ou só com espaços o valor é falso, o if verifica se é falso, se for o operador ! inverte para verdadeiro e bloqueia a criação da tarefa = if (true) return;
    if (!taskText.trim()) return;

    // Função para criar nova tarefa
    const newTask = {
      // Cria um id unico
      id: crypto.randomUUID(),
      // Guarda o texto da descrição da tarefa, a prioridade escolhida, sempre sem estar concluida e a data de criação
      text: taskText,
      priority: priority,
      completed: false,
      createdAt: new Date().toLocaleDateString()
    };

    // Adiciona a nova tarefa no início da lista, mantendo as anteriores
    setTaskList([newTask, ...taskList]);
    setTaskText("");
  };

  // Função para mudar o status da tarefa, map percorre a lista, verifica o id da tarefa clicada, se for igual ele altera o status e não for ele mantem igual
  const toggleTask = (id) => {
    setTaskList(taskList.map(t =>
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
  };

  // Confirmar exclusão
  const deleteTask = (id) => {
    // Pergunta se o usuario realmente quer excluir
    const confirmDelete = window.confirm("Tem certeza que deseja excluir essa tarefa?");
    // Se o usuario clicar em cancelar a função é interrompida
    if (!confirmDelete) return;
    // Se o usuario clicar em confirmar ignora o if e exclui a tarefa filtrando a lista e mantendo apenas as tarefas que não tem o id igual ao da tarefa clicada
    setTaskList(taskList.filter(t => t.id !== id));
  };

  // Salvar edição
  const saveEdit = (id) => {
    // Se vazio ou com apenas espaçoes ele não deixa salvar a edição
    if (!editText.trim()) return;
    // Percorre a lista e acha o id da tarefa clicada se for igual ele altera o texto da tarefa para o texto editado e se não for ele mantém igual
    setTaskList(taskList.map(t =>
      t.id === id ? { ...t, text: editText } : t
    ));

    // Para de mostrar o input
    setEditingId(null);
    // Limpa o texto editado
    setEditText("");
  };

  const prioridadeOrdem = {
    Alta: 1,
    Média: 2,
    Baixa: 3
  };

    // Filtra as tarefas com base no filtro selecionado e na busca, e depois ordena por prioridade
  const filteredTasks = taskList
    .filter(t => {
      // Se o filtro for pendentes ele vai esconder as concluidas
      if (filter === "Pendentes" && t.completed) return false;
      // Se o filtro for concluidas ele vai esconder as pendentes
      if (filter === "Concluídas" && !t.completed) return false;
      // Ele vai transformar tudo em minusculo e verifica se o texto existe na descrição, se não exstir ele esconde a tarefa, se existir ele mostra
      if (!t.text.toLowerCase().includes(search.toLowerCase())) return false;
      // Se passar por todas as condições ele mostra a tarefa
      return true;
    })

    // Ele ordena as tarefas com base na prioridade, acima eu defini um numero para cada prioridade, a função sort faz a conta e faz com que a alta vem sempre antes da media e media antes da baixa
    .sort((a, b) => prioridadeOrdem[a.priority] - prioridadeOrdem[b.priority]);

    

  return (
    <div className="app-container">
      <header>
        <h1>TaskFlow</h1>
        <p>Gestão de Produtividade</p>
      </header>

      <section className="form-section">
        <form onSubmit={addTask}>
          <input
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
            placeholder="Descrição da tarefa..."
          />
          <select value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option value="Baixa">Baixa</option>
            <option value="Média">Média</option>
            <option value="Alta">Alta</option>
          </select>
          <button type="submit">Criar</button>
        </form>
      </section>

      <section className="filter-section">
        {["Todas", "Pendentes", "Concluídas"].map(f => (
          <button
            key={f}
            className={filter === f ? "active" : ""}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </section>

      <section className="search-section">
        <input
          type="text"
          placeholder="Buscar tarefa..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </section>

      <main className="task-grid">
        {filteredTasks.map(item => (
          <div
            key={item.id}
            className={`task-card ${item.priority.toLowerCase()} ${item.completed ? 'done' : ''}`}
          >
            <div className="task-content">

              {editingId === item.id ? (
                <input
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
              ) : (
                <h3>{item.text}</h3>
              )}

              <span>Prioridade: {item.priority}</span>
              <small>Criada em: {item.createdAt}</small>
            </div>

            <div className="task-actions">
              <button onClick={() => toggleTask(item.id)}>
                {item.completed ? "Reabrir" : "Concluir"}
              </button>

              <button onClick={() => {
                setEditingId(item.id);
                setEditText(item.text);
              }}>
                Editar
              </button>

              {editingId === item.id && (
                <button onClick={() => saveEdit(item.id)}>
                  Salvar
                </button>
              )}

              <button onClick={() => deleteTask(item.id)} className="delete">
                Remover
              </button>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}

export default App;