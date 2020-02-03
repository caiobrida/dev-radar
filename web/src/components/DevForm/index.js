import React, { useEffect, useState } from 'react';

import Input from '../common/Input';

function DevForm({ onSubmit }) {
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [github_username, setGithubUsername] = useState('');
    const [techs, setTechs] = useState('');

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
    
            setLatitude(latitude);
            setLongitude(longitude);
          },
          (err) => {
            console.log(err);
          },
          {
            timeout: 30000
          }
        );
      }, []);

    async function handleSubmit(e) {
        e.preventDefault();

        await onSubmit({
            github_username,
            techs,
            latitude,
            longitude
        });

        setGithubUsername('');
        setTechs('');
    }

    return(
        <form onSubmit={handleSubmit}>
          <div className='input-block'>
            <Input 
              for='github_username'
              label='Usuário do github'
              value={github_username}
              setAnState={setGithubUsername}
            />
          </div>

          <div className='input-block'>
            <Input 
              for='techs'
              label='Tecnologias'
              value={techs}
              setAnState={setTechs}
            />
          </div>

          <div className='input-group'>
            <div className='input-block'>
              <Input 
                for='latitude'
                label='Latitude'
                value={latitude}
                type='number'
                setAnState={setLatitude}
              />
            </div>

            <div className='input-block'>
              <Input 
                  for='longitude'
                  label='Longitude'
                  value={longitude}
                  type='number'
                  setAnState={setLongitude}
              />
            </div>
          </div>

          <button type='submit'>Salvar</button>
        </form>
    );
}

export default DevForm;