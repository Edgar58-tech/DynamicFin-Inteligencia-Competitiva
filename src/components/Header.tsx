import React from 'react';
import logo from '../assets/images/LOGO-DynamicFin-white.png';

interface HeaderProps {
  alertasActivas: number;
}

export const Header: React.FC<HeaderProps> = ({ alertasActivas }) => {
  return (
    <div className="bg-gradient-to-r from-blue-900 to-purple-900 text-white rounded-2xl shadow-2xl p-8 mb-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img 
            src={logo} 
            alt="DynamicFin" 
            className="h-16 w-auto"
          />
          <div>
            <h1 className="text-4xl font-bold mb-2">
              Sistema de Inteligencia Competitiva
            </h1>
            <p className="text-blue-200 text-lg">
              Agencias Automotrices - Monitoreo en Tiempo Real
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-blue-200 mb-1">Alertas Activas</p>
          <p className="text-5xl font-bold text-red-400">{alertasActivas}</p>
        </div>
      </div>
    </div>
  );
};