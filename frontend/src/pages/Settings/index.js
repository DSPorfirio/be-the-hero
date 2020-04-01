import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import './styles.css';
import logoImg from '../../assets/logo.svg';

import api from '../../services/api';

export default function Settigs() {
    const ongId = localStorage.getItem('ongId');
    const [ong, setOng] = useState([]);
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');

    const history = useHistory();

    useEffect(() => {
        api.get(`ongs/${ongId}`, {
            headers: {
                Authorization: ongId,
            }
        })
        .then(response => {
            setOng(response.data);
            setEmail(response.data.email);
            setWhatsapp(response.data.whatsapp);
            setCity(response.data.city);
            setUf(response.data.uf);
        });
    }, [ongId]);

    async function handleSubmit(e) {
        e.preventDefault();

        const update = window.confirm("Deseja atualizar os dados?");

        if(update == true) {
            const data = {
                email,
                whatsapp,
                city,
                uf
            };
            
            try {
                await api.put(`ongs/${ongId}`, data, {
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

    async function handleDelete() {
        const deleted = await window.confirm("Sua conta e todos os seus dados serão escluídos, essa alteração não poderá ser desfeita. Tem certeza?");
        
        if(deleted == true){
            await api.delete(`ongs/${ongId}`, {
                headers: {
                    Authorization: ongId
                }
            });
            
            alert('Conta excluída !');
            await localStorage.clear();
            history.push('/');
        } else {
            //continue...
        }
        
    }
    
    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero" />

                    <h1>Cadastro</h1>
                    <p>Atualize seus dados ou exclua sua conta. Ao excluir sua conta,
                        todos os casos cadastrados serão excluídos permanentemente, essas
                        alterações não poderão ser desfeitas.
                    </p>

                    <div>
                        <Link className="back-link" to="/">
                            <FiArrowLeft size={16} color="#E02041" />
                            Voltar
                        </Link>

                        <button className="back-link" onClick={handleDelete}>
                            <FiArrowLeft size={16} color="#E02041" />
                            Excluir minha conta
                        </button>
                    </div>
                </section>

                <form onSubmit={handleSubmit}>
                    <input 
                        placeholder="O nome da ONG não pode ser alterado" 
                        disabled
                    />

                    <input 
                        type="email" 
                        value={email} 
                        onChange={e => setEmail(e.target.value)} 
                        
                    />

                    <input 
                        value={whatsapp} 
                        onChange={e => setWhatsapp(e.target.value)} 
                    />

                    <div className="input-group">
                        <input 
                            value={city} onChange={e => setCity(e.target.value)} 
                        />

                        <input 
                            style={{ width: 80 }}
                            value={uf} 
                            onChange={e => setUf(e.target.value)} 
                        />
                    </div>

                    <button className="button" type="submit">Atualizar</button>
                </form>
            </div>
        </div>
    );
}