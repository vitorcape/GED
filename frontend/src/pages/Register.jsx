import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Register() {
    const [form, setForm] = useState({ nome: '', nickname: '', email: '', cargo: '', senha: '' });
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await api.post('/users/cadastrar', form);
            alert('Usuário registrado!');
            navigate('/');
        } catch {
            alert('Erro ao registrar');
        }
    };

    return (
        <>
            <Header />
            <div className="container py-5">
                <h2 className="mb-4">Cadastro</h2>
                <form onSubmit={handleRegister} className="w-50 mx-auto">
                    {['nome', 'nickname', 'email', 'cargo', 'senha'].map((campo, i) => (
                        <div className="mb-3" key={i}>
                            <label className="form-label">{campo.charAt(0).toUpperCase() + campo.slice(1)}:</label>
                            <input className="form-control"
                                type={campo === 'senha' ? 'password' : 'text'}
                                value={form[campo]} required
                                onChange={e => setForm({ ...form, [campo]: e.target.value })}
                            />
                        </div>
                    ))}
                    <button className="btn btn-success w-100" type="submit">
                        <i className="fas fa-user-plus me-2"></i> Cadastrar
                    </button>
                </form>
            </div>
            <Footer />
        </>
    );
}