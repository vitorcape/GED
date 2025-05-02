import Link from 'next/link';

export default function Header() {
    return (
        <header className="bg-dark text-white py-3">
            <div className="container d-flex justify-content-between align-items-center">
                <h1 className="h4 mb-0">GED</h1>
                <nav>
                    <Link href="/dashboard" className="text-white me-3">
                        <i className="fas fa-home"></i> Dashboard
                    </Link>
                    <Link href="/login" className="text-white me-3">
                        <i className="fas fa-sign-in-alt"></i> Login
                    </Link>
                    <Link href="/register" className="text-white">
                        <i className="fas fa-user-plus"></i> Cadastrar
                    </Link>
                </nav>
            </div>
        </header>
    );
}