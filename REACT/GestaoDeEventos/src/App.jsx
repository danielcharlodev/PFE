import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [eventTitle, setEventTitle] = useState("");
  const [eventType, setEventType] = useState("Palestra");
  const [eventList, setEventList] = useState([]);
  const [filter, setFilter] = useState("Todos");
  const [search, setSearch] = useState("");
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
      id: crypto.randomUUID(),
      title: eventTitle,
      type: eventType,
      status: "Agendado",
      date: new Date().toLocaleDateString(),
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

  const clearAllEvents = () => {
    const confirmacao = window.confirm("⚠️ Tem certeza que deseja limpar todo o cronograma?");
    if (confirmacao) {
      localStorage.removeItem("@eventpulse_data");
      setEventList([]);
    }
  };

  const inscreverAluno = (id) => {
    setEventList(eventList.map(evt => {
      if (evt.id === id && (evt.vagas ?? 0) > 0) {
        return { ...evt, vagas: evt.vagas - 1 };
      }
      return evt;
    }));
  };

  const filterMap = {
    "Todos": () => true,
    "Agendados": evt => evt.status === "Agendado",
    "Em Andamento": evt => evt.status === "Em Andamento",
    "Encerrados": evt => evt.status === "Encerrado",
  };

  const orderByType = {
    Workshop: 1,
    Palestra: 2,
    Painel: 3,
  };

  const filteredEvents = eventList
    .filter(filterMap[filter])
    .filter(evt =>
      evt.title.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => (orderByType[a.type] || 99) - (orderByType[b.type] || 99));

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
            value={eventVagas}
            onChange={(e) => setEventVagas(Number(e.target.value))}
          >
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
        <input
          type="text"
          placeholder="Buscar evento..."
          value={search}
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
                onClick={() => inscreverAluno(item.id)}
                disabled={(item.vagas ?? 0) === 0}
              >
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