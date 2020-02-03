import React, { useState, useEffect } from 'react';
import DevItem from '../components/DevItem';
import DevForm from '../components/DevForm';

import api from '../services/api';


import '../global.css';
import '../App.css';
import '../Sidebar.css';
import '../Main.css';

function Dashboard() {
  const [devs, setDevs] = useState([]);

  useEffect(() => {
    loadDevs();
  }, []);
  
  async function loadDevs() {
    const response = await api.get('/devs');

    setDevs(response.data);
  }
  async function handleAddDev(data) {
    const response = await api.post('/devs', data);
    setDevs([...devs, response.data]);
  }

  async function handleDeleteDev(_id) {
    await api.delete(`/devs/${_id}`)
    loadDevs();
  }

    return (
        <div id="app">
          <aside>
            <strong>Cadastrar</strong>
            <DevForm onSubmit={handleAddDev}/>
          </aside>
          <main>
            <ul>
              {devs.map(dev => (
                <DevItem onDelete={handleDeleteDev} key={dev._id} dev={dev} />
              ))}      
            </ul>
          </main>
        </div>
      );
}

export default Dashboard;