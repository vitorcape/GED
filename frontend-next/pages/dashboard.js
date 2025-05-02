import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Header from '../components/header';
import Footer from '../components/footer';

export default function Dashboard() {
    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) return router.push('/login');

        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/protegido`, {
            headers: { Authorization: `Bearer ${token}` }
        }).then(res => setUser(res.data))
            .catch(() => router.push('/login'));
    }, []);

    return (
        <>
            <Header />
            <div className="container mt-5">
                <h2>Dashboard</h2>
                {user ? <p>Bem-vindo, {user.nome}</p> : <p>Carregando...</p>}
            </div>
            <Footer />
        </>
    );
}