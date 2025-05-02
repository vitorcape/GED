import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Header from '../components/header';
import Footer from '../components/footer';

export default function Perfil() {
    const [user, setUser] = useState(null);
    const [editando, setEditando] = useState(false);
    const [form, setForm] = useState({});
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) return router.push('/login');

        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/protegido`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => {
                setUser(res.data);
                setForm(res.data);
            })
            .catch(() => router.push('/login'));
    }, []);

    const handleUpdate = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.put(
                `${process.env.NEXT_PUBLIC_API_URL}/users/${user._id}`,
                form,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setUser(res.data);
            setEditando(false);
        } catch (err) {
            console.error(err);
            alert('Erro ao atualizar perfil.');
        }
    };

    return (
        <>
            <Header />
            <div className="container mt-5">
                <h2>Perfil</h2>

                {!user ? (
                    <p>Carregando...</p>
                ) : (
                    <>
                        {['nome', 'nickname', 'email', 'cargo'].map((campo, i) => (
                            <div className="mb-3" key={i}>
                                <label className="form-label">{campo.charAt(0).toUpperCase() + campo.slice(1)}:</label>
                                <input
                                    className="form-control"
                                    value={form[campo] || ''}
                                    disabled={!editando}
                                    onChange={e => setForm({ ...form, [campo]: e.target.value })}
                                />
                            </div>
                        ))}

                        {editando ? (
                            <button className="btn btn-success" onClick={handleUpdate}>
                                Salvar
                            </button>
                        ) : (
                            <button className="btn btn-primary" onClick={() => setEditando(true)}>
                                Editar
                            </button>
                        )}
                    </>
                )}
            </div>
            <Footer />
        </>
    );
}