import React from 'react';
import { Link } from 'react-router-dom';

import './styles.css';

function DevItem({ dev, onDelete }) {
    return(
        <li className='dev-item'>
            <header>    
              <img src={dev.avatar_url} alt={dev.name}/>
              <div className='user-info'>
                <Link to={`/profile/${dev._id}`}>
                  <strong className='dev-name'>{dev.name}</strong>
                </Link>
                <span>{dev.techs.join(', ')}</span>
              </div>
            </header>
            <p>{dev.bio}</p>
            <a href={`https://github.com/${dev.github_username}`}>Acessar perfil no Github</a>
            <button onClick={ ()=>{ onDelete(dev._id) } }className='destroy-dev'>EXCLUIR</button>         
        </li>
    );
}

export default DevItem;