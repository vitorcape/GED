import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/auth/login', { email, senha });
            localStorage.setItem('token', res.data.token);
            navigate('/dashboard');
        } catch {
            alert('Falha no login');
        }
    };

    return (
        <>
            <Header />
            <div className="container py-5">
                <h2 className="mb-4">Login</h2>
                <form onSubmit={handleLogin} className="w-50 mx-auto">
                    <div className="mb-3">
                        <label className="form-label">Email:</label>
                        <input className="form-control" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Senha:</label>
                        <input className="form-control" type="password" value={senha} onChange={e => setSenha(e.target.value)} required />
                    </div>
                    <button className="btn btn-primary w-100" type="submit">
                        <i className="fas fa-sign-in-alt me-2"></i> Entrar
                    </button>
                </form>
            </div>
            <Footer />
        </>
    );
}