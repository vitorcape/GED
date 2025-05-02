import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Header from '../components/header';
import Footer from '../components/footer';

export default function Register() {
    const [form, setForm] = useState({
        nome: '',
        nickname: '',
        email: '',
        cargo: '',
        senha: ''
    });

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users/cadastrar`, form);
            alert('Cadastro realizado com sucesso!');
            router.push('/login');
        } catch (err) {
            console.error(err);
            alert('Erro ao cadastrar usuário');
        }
    };

    return (
        <>
            <Header />
            <div className="container mt-5">
                <h2>Cadastro</h2>
                <form onSubmit={handleSubmit} className="w-50">
                    <div className="mb-3">
                        <label>Nome:</label>
                        <input
                            className="form-control"
                            value={form.nome}
                            onChange={e => setForm({ ...form, nome: e.target.value })}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label>Nickname:</label>
                        <input
                            className="form-control"
                            value={form.nickname}
                            onChange={e => setForm({ ...form, nickname: e.target.value })}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label>Email:</label>
                        <input
                            type="email"
                            className="form-control"
                            value={form.email}
                            onChange={e => setForm({ ...form, email: e.target.value })}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label>Cargo:</label>
                        <input
                            className="form-control"
                            value={form.cargo}
                            onChange={e => setForm({ ...form, cargo: e.target.value })}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label>Senha:</label>
                        <input
                            type="password"
                            className="form-control"
                            value={form.senha}
                            onChange={e => setForm({ ...form, senha: e.target.value })}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-success w-100">
                        Cadastrar
                    </button>
                </form>
            </div>
            <Footer />
        </>
    );
}