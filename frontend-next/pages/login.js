import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Header from '../components/header';
import Footer from '../components/footer';

export default function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, { email, senha });
            localStorage.setItem('token', res.data.token);
            router.push('/dashboard');
        } catch {
            alert('Erro no login');
        }
    };

    return (
        <>
            <Header />
            <div className="container mt-5">
                <h2>Login</h2>
                <form onSubmit={handleLogin} className="w-50">
                    <div className="mb-3">
                        <label>Email:</label>
                        <input type="email" className="form-control" onChange={e => setEmail(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label>Senha:</label>
                        <input type="password" className="form-control" onChange={e => setSenha(e.target.value)} required />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Entrar</button>
                </form>
            </div>
            <Footer />
        </>
    );
}