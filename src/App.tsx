import React, { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';

function App() {
  const [currentView, setCurrentView] = useState('dashboard');

  // Esta función decide qué contenido mostrar a la derecha del menú
  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        // ✅ AHORA RENDERIZA EL DASHBOARD COMPLETO
        return <Dashboard />;
        
      case 'agencias':
        return (
          <div className="bg-white p-8 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Administración de Agencias</h2>
            <div className="p-4 bg-gray-50 border border-gray-200 rounded text-gray-600">
              Aquí cargarás el CRUD de la tabla: <strong>agencias_cliente</strong>
            </div>
          </div>
        );
        
      case 'competidores':
        return (
          <div className="bg-white p-8 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Administración de Competidores</h2>
            <div className="p-4 bg-gray-50 border border-gray-200 rounded text-gray-600">
              Aquí cargarás el CRUD de la tabla: <strong>competidores</strong>
            </div>
          </div>
        );
        
      case 'vehiculos-clientes':
        return (
          <div className="bg-white p-8 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Catálogo: Vehículos Clientes</h2>
            <div className="p-4 bg-gray-50 border border-gray-200 rounded text-gray-600">
              Aquí cargarás el CRUD de la tabla: <strong>productos_propios</strong>
            </div>
          </div>
        );
        
      case 'vehiculos-competidores':
        return (
          <div className="bg-white p-8 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Catálogo: Vehículos Competencia</h2>
            <div className="p-4 bg-gray-50 border border-gray-200 rounded text-gray-600">
              Aquí cargarás el CRUD de la tabla: <strong>vehiculos_competencia</strong>
            </div>
          </div>
        );
        
      default:
        return <div>Página no encontrada</div>;
    }
  };

  return (
    <Layout currentView={currentView} onNavigate={setCurrentView}>
      {renderContent()}
    </Layout>
  );
}

export default App;