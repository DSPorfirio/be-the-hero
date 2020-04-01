import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import './styles.css';
import logoImg from '../../assets/logo.svg';

import api from '../../services/api';

export default function UpdateIncident(id) {
    const ongId = localStorage.getItem('ongId');
    const history = useHistory();

    const [ong, setOng] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        api.get(`incidents/ong/${id.match.params.id}`, {
            headers: {
                Authorization: ongId
            }
        }).then(response => {
            setOng(response.data);
            setTitle(response.data.title);
            setDescription(response.data.description);
            
        });

        
    }, [ongId]);

    //console.log(id.match.params.id);
    async function handleSubmit(e) {
        e.preventDefault();

        const update = window.confirm("Deseja atualizar os dados?");

        if(update == true) {
            
            const data = {
                title,
                description
            };
        
            try {
                await api.put(`incidents/${id.match.params.id}`, data, {
                    headers: {
                        Authorization: ongId
                    }
                });

                alert("Atualizado com sucesso!");
                history.push('/profile');

            } catch (err) {
                alert('Erro ao atualizar, tente novamente');
            }
        } else {
            //continue...
        }
        
    }

    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero" />

                    <h1>Alterar caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um novo herói
                        para resolver isso.
                    </p>

                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#E02041" />
                        Voltar para home
                    </Link>
                </section>

                <form onSubmit={handleSubmit}>
                    <input 
                        placeholder="Titulo do caso" 
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />

                    <textarea 
                        placeholder="Descrição" 
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />

                    <input 
                        placeholder="O valor não pode ser alterado" 
                        disabled
                    />

                    <button className="button" type="submit">Alterar</button>
                </form>
            </div>
        </div>
    );
}