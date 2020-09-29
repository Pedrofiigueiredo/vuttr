import React, { useEffect, useState } from 'react';
import './App.css';

import api from './services/api';

import Add from './components/Add';
import Remove from './components/Remove';

import Trash from './assets/trash.svg';

const App = () => {
  const [tools, setTools] = useState([]);
  const [query, setQuery] = useState('');

  const [showAdd, setShowAdd] = useState(false);
  const [showRemove, setShowRemove] = useState(false);
  const [checkTags, setCheckTags] = useState(false);

  const [idToolToDelete, setIdToolToDelete] = useState(0);

  interface ToolProps {
    id: number,
    title: string,
    link: string,
    description: string,
    tags: Array<string>
  }

  async function getTools() {
    if (checkTags) { /* Search by tags only */
      const response = await api.get(`/tools?tags_like=${query}`);
      setTools(response.data)
    } else {
      const response = await api.get(`/tools?q=${query}`);
      setTools(response.data);
    }
  }

  async function deleteTool(id: number) {
    await api.delete('/tools/' + id)
    setTools(tools.filter((tool: ToolProps) => tool.id !== id));
    setShowRemove(false)
  }

  useEffect(() => {
    getTools()
  }, [query])

  return (
    <div className="App">
      <header className="App-header">
        <h1>VUTTR</h1>
        <h2>Very Useful Tools to Remember</h2>
      </header>

      <div className="Actions-block">
        <form>
          <input 
            type="text" 
            placeholder="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <div className="checkbox">
            <input type="checkbox" id="check" onChange={() => setCheckTags(!checkTags)} />
            <label htmlFor="check">Search in tags only</label>
          </div>
        </form>

        <button onClick={() => setShowAdd(true)}>+</button>
      </div>

      <div className="tools-list">
        {tools.map((tool: ToolProps) => (
          <div key={tool.id} className="Tool-item">
            <header>
              <a href={tool.link} target="_blank" rel="noopener noreferrer">{tool.title}</a>
              <button onClick={() => {setShowRemove(true); setIdToolToDelete(tool.id)}} >
                <img src={Trash} alt="Ícone de uma lata de lixo em preto"/>
              </button>
            </header>

            <p>{tool.description}</p>
            
            {tool.tags.map(tag => (
              <strong key={tag}>#{tag} </strong>
            ))}           
          </div>
        ))}
      </div>

      {/* Controle do popup */}
      {showAdd ? (<Add close={() => {setShowAdd(false); getTools()}} />) : null}
      {showRemove ?
        <Remove 
          del={() => deleteTool(idToolToDelete)} 
          close={() => setShowRemove(false)} 
        /> : null
      }
    </div>
  );
}

export default App;
