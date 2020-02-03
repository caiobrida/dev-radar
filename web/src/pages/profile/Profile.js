import React, { useEffect, useState } from 'react';
import api from '../../services/api';

import Input from '../../components/common/Input';

import './styles.css';


function Profile(props) {
    const [name, setName] = useState('');
    const [avatar_url, setAvatar] = useState('');
    const [techs, setTechs] = useState([]);
    const [bio, setBio] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');

    const { id } = props.match.params;
    useEffect(() => {
        async function loadDevProfile() {
            const response = await api.get(`/devs/${id}`);

            const { name, avatar_url, techs, bio, location } = response.data
                       
            setName(name);
            setAvatar(avatar_url);
            setTechs(techs.join(', '));
            setBio(bio);
            setLatitude(location.coordinates[1]);
            setLongitude(location.coordinates[0]);
        } 
        loadDevProfile();
    }, [id]);
    
    async function handleSubmit(e) {
        e.preventDefault();


        await api.put(`/devs/${id}`, {
            name,
            avatar_url,
            techs,
            bio,
            latitude,
            longitude
        });
        props.history.push('/');
    }

    return (
        <form className='form-profile' onSubmit={handleSubmit}>
            <div className='input-block'>
                <Input 
                    for='name'
                    label='Nome'
                    value={name || ''}
                    setAnState={setName}
                />
            </div>
            <div className='input-block'>
                    <Input 
                        for='bio'
                        label='Bio'
                        value={bio || ''}
                        setAnState={setBio}
                    />
            </div>
            <div className='input-block'>
                    <Input 
                        for='techs'
                        label='Tecnologias'
                        value={techs || ''}
                        setAnState={setTechs}
                    />
            </div>
            <div className='input-block'>
                    <Input 
                        for='avatar_url'
                        label='URL Avatar'
                        value={avatar_url || ''}
                        setAnState={setAvatar}
                    />
            </div>
            <div className='input-group'>
                <div className='input-block'>
                        <Input 
                            for='latitude'
                            label='Latitude'
                            value={latitude || ''}
                            type='number'
                            setAnState={setLatitude}
                        />
                </div>
                <div className='input-block'>
                        <Input 
                            for='longitude'
                            label='Longitude'
                            value={longitude || ''}
                            type='number'
                            setAnState={setLongitude}
                        />
                </div>
            </div>
            <button type='submit'>Salvar</button>
        </form>
    );
}

export default Profile;