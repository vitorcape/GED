// frontend-next/pages/admin.js
import { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/header';
import Footer from '../components/footer';
import { useRouter } from 'next/router';

export default function AdminPanel() {
    const [usuarios, setUsuarios] = useState([]);
    const [logs, setLogs] = useState([]);
    const [erro, setErro] = useState(null);
    const [editandoId, setEditandoId] = useState(null);
    const [novoNome, setNovoNome] = useState('');
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

        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/logs`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => setLogs(res.data))
            .catch(err => console.error('Erro ao buscar logs:', err));
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

    const editarUsuario = (id, nomeAtual) => {
        setEditandoId(id);
        setNovoNome(nomeAtual);
    };

    const salvarEdicao = async (id) => {
        const token = localStorage.getItem('token');
        try {
            await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}`, { nome: novoNome }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUsuarios(usuarios.map(u => u._id === id ? { ...u, nome: novoNome } : u));
            setEditandoId(null);
        } catch (err) {
            console.error('Erro ao editar usuário:', err);
            alert('Erro ao editar usuário.');
        }
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
                                <td>
                                    {editandoId === usuario._id ? (
                                        <input
                                            value={novoNome}
                                            onChange={e => setNovoNome(e.target.value)}
                                            className="form-control form-control-sm"
                                        />
                                    ) : (
                                        usuario.nome
                                    )}
                                </td>
                                <td>{usuario.email}</td>
                                <td>{usuario.permissao}</td>
                                <td>
                                    {editandoId === usuario._id ? (
                                        <button
                                            className="btn btn-sm btn-success me-2"
                                            onClick={() => salvarEdicao(usuario._id)}
                                        >
                                            <i className="fas fa-check"></i>
                                        </button>
                                    ) : (
                                        <button
                                            className="btn btn-sm btn-secondary me-2"
                                            onClick={() => editarUsuario(usuario._id, usuario.nome)}
                                        >
                                            <i className="fas fa-edit"></i>
                                        </button>
                                    )}

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

                <h4 className="mt-5">Histórico de Acesso</h4>
                <table className="table table-bordered table-sm">
                    <thead>
                        <tr>
                            <th>Usuário</th>
                            <th>Email</th>
                            <th>Data</th>
                            <th>IP</th>
                            <th>Navegador</th>
                        </tr>
                    </thead>
                    <tbody>
                        {logs.map((log, index) => (
                            <tr key={index}>
                                <td>{log.usuario?.nome || '-'}</td>
                                <td>{log.email}</td>
                                <td>{new Date(log.data).toLocaleString()}</td>
                                <td>{log.ip}</td>
                                <td>{log.userAgent}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Footer />
        </>
    );
}