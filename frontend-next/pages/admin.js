// frontend-next/pages/admin.js
import { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/header';
import Footer from '../components/footer';
import { useRouter } from 'next/router';

export default function AdminPanel() {
    const [usuarios, setUsuarios] = useState([]);
    const [erro, setErro] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) return router.push('/login');

        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => setUsuarios(res.data))
            .catch(err => {
                console.error('Erro ao buscar usuários:', err);
                setErro('Acesso negado ou erro ao carregar.');
                router.push('/login');
            });
    }, []);

    const promoverParaAdmin = async (id) => {
        const token = localStorage.getItem('token');
        try {
            await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}/promover`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUsuarios(usuarios.map(u => u._id === id ? { ...u, permissao: 'admin' } : u));
        } catch (err) {
            console.error('Erro ao promover:', err);
            alert('Erro ao promover usuário.');
        }
    };

    const editarUsuario = (id) => {
        alert(`Função de edição ainda não implementada para o usuário ${id}`);
    };

    const apagarUsuario = async (id) => {
        const token = localStorage.getItem('token');
        try {
            await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUsuarios(usuarios.filter(u => u._id !== id));
        } catch (err) {
            console.error('Erro ao apagar:', err);
            alert('Erro ao apagar usuário.');
        }
    };

    return (
        <>
            <Header />
            <div className="container py-5">
                <h2>Painel Administrativo</h2>
                {erro && <div className="alert alert-danger">{erro}</div>}
                <table className="table table-striped mt-4">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Permissão</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.map(usuario => (
                            <tr key={usuario._id}>
                                <td>{usuario.nome}</td>
                                <td>{usuario.email}</td>
                                <td>{usuario.permissao}</td>
                                <td>
                                    <button
                                        className="btn btn-sm btn-secondary me-2"
                                        onClick={() => editarUsuario(usuario._id)}
                                    >
                                        <i className="fas fa-edit"></i>
                                    </button>

                                    <button
                                        className="btn btn-sm btn-danger me-2"
                                        onClick={() => apagarUsuario(usuario._id)}
                                    >
                                        <i className="fas fa-trash"></i>
                                    </button>

                                    {usuario.permissao !== 'admin' && (
                                        <button
                                            className="btn btn-sm btn-warning"
                                            onClick={() => promoverParaAdmin(usuario._id)}
                                        >
                                            <i className="fas fa-user-shield"></i>
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Footer />
        </>
    );
}