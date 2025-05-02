import { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/header';
import Footer from '../components/footer';
import { useRouter } from 'next/router';

export default function Dashboard() {
    const [user, setUser] = useState(null);
    const [erro, setErro] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            setErro('Token ausente');
            return router.push('/login');
        }

        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/protegido`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => setUser(res.data))
            .catch(err => {
                console.error('Erro no dashboard:', err);
                setErro('Erro ao carregar dados: ' + (err.response?.data?.erro || err.message));
                router.push('/login');
            });
    }, []);

    return (
        <>
            <Header />
            <div className="container py-5">
                <h2>Dashboard</h2>
                {erro && <div className="alert alert-danger">{erro}</div>}
                {user ? (
                    <div className="alert alert-success">
                        Bem-vindo, {user.nome || 'usuário'}!
                    </div>
                ) : (
                    <p>Carregando...</p>
                )}
            </div>
            <Footer />
        </>
    );
}
