import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [eventTitle, setEventTitle] = useState("");
  const [eventType, setEventType] = useState("Palestra");
  const [eventList, setEventList] = useState([]);
  const [filter, setFilter] = useState("Todos");
  // Estado que guarda o texto digitado
  // pelo usuário no campo de pesquisa
  const [search, setSearch] = useState("");
  // Estado que guarda a quantidade de vagas
  // escolhida no formulário
  const [eventVagas, setEventVagas] = useState(10);
  const [showModal, setShowModal] = useState(false); // ✅ MODAL

  useEffect(() => {
    const savedEvents = localStorage.getItem("@eventpulse_data");
    if (savedEvents) setEventList(JSON.parse(savedEvents));
  }, []);

  useEffect(() => {
    localStorage.setItem("@eventpulse_data", JSON.stringify(eventList));
  }, [eventList]);

  const addEvent = (e) => {
    e.preventDefault();
    if (!eventTitle.trim()) return;

    const newEvent = {
      // ID único
      id: crypto.randomUUID(),
      title: eventTitle,
      type: eventType,

      // Status inicial
      status: "Agendado",

      // Data atual
      date: new Date().toLocaleDateString(),

      // Quantidade de vagas escolhida
      vagas: eventVagas
    };

    setEventList([newEvent, ...eventList]);
    setEventTitle("");
  };

  const toggleStatus = (id) => {
    setEventList(eventList.map(evt => {
      if (evt.id === id) {
        const nextStatus =
          evt.status === "Agendado"
            ? "Em Andamento"
            : evt.status === "Em Andamento"
              ? "Encerrado"
              : "Agendado";
        return { ...evt, status: nextStatus };
      }
      return evt;
    }));
  };

  const deleteEvent = (id) => {
    setEventList(eventList.filter(evt => evt.id !== id));
  };

  // Função responsável por apagar todos os eventos
  const clearAllEvents = () => {
    // Mostra uma caixa de confirmação
    const confirmacao = window.confirm("⚠️ Tem certeza que deseja limpar todo o cronograma?");
    // Só executa se o usuário clicar em OK
    if (confirmacao) {
       // Remove os dados salvos do navegador 
      localStorage.removeItem("@eventpulse_data");
      setEventList([]);
    }
  };

  // Função responsável por diminuir vagas
  const inscreverAluno = (id) => {
    // Atualiza a lista de eventos
    // Percorre todos os eventos
    setEventList(eventList.map(evt => {
      // Verifica:
      // 1. se é o evento correto
      // 2. se ainda possui vagas
      if (evt.id === id && (evt.vagas ?? 0) > 0) {
        // Mantém dados antigos
        // Diminui 1 vaga
        return { ...evt, vagas: evt.vagas - 1 };
      }
      // Eventos não alterados continuam iguais
      return evt;
    }));
  };

  const filterMap = {
    "Todos": () => true,
    "Agendados": evt => evt.status === "Agendado",
    "Em Andamento": evt => evt.status === "Em Andamento",
    "Encerrados": evt => evt.status === "Encerrado",
  };

  // Objeto usado para definir a prioridade de cada tipo de evento
  const orderByType = {

    // Workshop recebe prioridade 1
    // então aparece primeiro
    Workshop: 1,

    // Palestra recebe prioridade 2
    // aparece depois do Workshop
    Palestra: 2,

    // Painel recebe prioridade 3
    // aparece por último
    Painel: 3,
  };

  const filteredEvents = eventList
    .filter(filterMap[filter])

    // Filtra os eventos
    .filter(evt =>
      // Verifica se o título do evento
      // contém o texto digitado
      evt.title.toLowerCase().includes(search.toLowerCase())
    )

    // Ordena os eventos antes de renderizar
    .sort((a, b) =>

      // Pega o valor do tipo do evento A
      // e subtrai do valor do evento B
      (orderByType[a.type] || 99) -

      (orderByType[b.type] || 99)

      // se negativo o A sobe e se for positivo desce
    )

  return (
    <div className="app-container">
      <header>
        <h1>EventPulse</h1>
        <p>Gestão de Eventos Acadêmicos</p>

        <button onClick={clearAllEvents}>
          Limpar Cronograma
        </button>
      </header>

      <section className="form-section">
        <form onSubmit={addEvent}>
          <input
            value={eventTitle}
            onChange={(e) => setEventTitle(e.target.value)}
            placeholder="Nome do evento..."
          />

          <select
            value={eventType}
            onChange={(e) => setEventType(e.target.value)}
          >
            <option value="Palestra">Palestra</option>
            <option value="Workshop">Workshop</option>
            <option value="Painel">Painel</option>
          </select>

          <select

            // Valor atual selecionado
            value={eventVagas}

            // Atualiza o estado quando mudar
            onChange={(e) => setEventVagas(Number(e.target.value))}
          >

              /* Opções disponíveis */
            <option value={10}>10 vagas</option>
            <option value={30}>30 vagas</option>
            <option value={50}>50 vagas</option>
          </select>

          <button type="submit">Agendar</button>
        </form>
      </section>

      <section className="filter-section">
        {["Todos", "Agendados", "Em Andamento", "Encerrados"].map(f => (
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

        /* Campo onde o usuário digita */
        <input
          type="text"
          placeholder="Buscar evento..."
          value={search}
          // Atualiza o estado a cada tecla digitada
          onChange={(e) => setSearch(e.target.value)}
        />
      </section>

      <main className="event-grid">
        {filteredEvents.map(item => (
          <div
            key={item.id}
            className={`event-card ${item.type.toLowerCase()} ${item.status.toLowerCase().replace(" ", "-")}`}
          >
            <div className="event-content">
              <h3>{item.title}</h3>
              <span>Tipo: {item.type}</span>
              <span>Status: {item.status}</span>
              <small>{item.date}</small>
              <small>Vagas: {item.vagas ?? 0}</small>
            </div>

            <div className="event-actions">
              <button onClick={() => toggleStatus(item.id)}>
                {item.status === "Agendado"
                  ? "Iniciar"
                  : item.status === "Em Andamento"
                    ? "Encerrar"
                    : "Reiniciar"}
              </button>

              <button
              // Ao clicar chama a função
                onClick={() => inscreverAluno(item.id)}
                // Desabilita quando vagas chegar em 0
                disabled={(item.vagas ?? 0) === 0}
              >

                  /* Troca o texto automaticamente */
                {(item.vagas ?? 0) === 0 ? "Esgotado" : "Inscrever"}
              </button>

              <button
                onClick={() => deleteEvent(item.id)}
                className="delete"
              >
                Remover
              </button>
            </div>
          </div>
        ))}
      </main>

      {/* 🔘 BOTÃO COM FAVICON */}
      <div className="fab" onClick={() => setShowModal(true)}>
        <img src="/favicon_css.svg" alt="info" />
      </div>

      {/* 📋 MODAL */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Alterações no CSS</h2>

            <ul>
              <li>🌌 Fundo com gradiente moderno</li>
              <li>🧊 Cards com efeito glass (blur)</li>
              <li>✨ Botões modernos com hover</li>
            </ul>

            <button onClick={() => setShowModal(false)}>
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;