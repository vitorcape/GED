import { useEffect, useState } from 'react';
import api from '../services/api';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Dashboard() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        api.get('/users/protegido') // exemplo de rota protegida
            .then(res => setUser(res.data))
            .catch(() => window.location.href = '/');
    }, []);

    return (
        <>
            <Header />
            <div className="container py-5">
                <h2>Dashboard</h2>
                {user ? (
                    <div className="alert alert-success">
                        Bem-vindo, {user.nome}! Seu cargo é <strong>{user.cargo}</strong>.
                    </div>
                ) : (
                    <p>Carregando...</p>
                )}
            </div>
            <Footer />
        </>
    );
}