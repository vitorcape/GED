import React from 'react';

export default function Header() {
    return (
        <header className="bg-dark text-white py-3">
            <div className="container d-flex justify-content-between align-items-center">
                <h1 className="h4 mb-0">GED</h1>
                <i className="fas fa-user-circle fa-2x"></i>
            </div>
        </header>
    );
}