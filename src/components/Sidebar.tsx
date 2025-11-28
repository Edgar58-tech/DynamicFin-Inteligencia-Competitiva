import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Building2, 
  Users, 
  Car, 
  ChevronDown, 
  ChevronRight, 
  LogOut,
  UserCheck,
  CarFront
} from 'lucide-react';

interface SidebarProps {
  currentView: string;
  onNavigate: (view: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onNavigate }) => {
  const [isCatalogoOpen, setIsCatalogoOpen] = useState(true);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'agencias', label: 'Admin. Agencias', icon: <Building2 size={20} /> },
    { id: 'competidores', label: 'Admin. Competidores', icon: <Users size={20} /> },
  ];

  const catalogoItems = [
    { id: 'vehiculos-clientes', label: 'Vehículos Clientes', icon: <CarFront size={18} /> },
    { id: 'vehiculos-competidores', label: 'Vehículos Competencia', icon: <Car size={18} /> },
  ];

  return (
    <div className="h-full w-full bg-white border-r border-gray-200 flex flex-col shadow-lg transition-all duration-300">
      
      {/* Header del Sidebar */}
      <div className="h-16 flex items-center justify-center border-b border-gray-200 bg-indigo-900 flex-shrink-0">
        <h2 className="text-white font-bold text-xl tracking-wider">DYNAMIC<span className="font-light">FIN</span></h2>
      </div>

      {/* Contenido del Menú */}
      <div className="flex-1 overflow-y-auto py-4 custom-scrollbar">
        <nav className="px-3 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                currentView === item.id 
                  ? 'bg-indigo-50 text-indigo-900 font-semibold border-l-4 border-indigo-900' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-indigo-900'
              }`}
            >
              <span className={currentView === item.id ? 'text-indigo-700' : 'text-gray-400'}>
                {item.icon}
              </span>
              <span>{item.label}</span>
            </button>
          ))}

          {/* Sección Desplegable */}
          <div className="pt-2">
            <button
              onClick={() => setIsCatalogoOpen(!isCatalogoOpen)}
              className="w-full flex items-center justify-between px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <div className="flex items-center space-x-3">
                <span className="text-gray-400"><Car size={20} /></span>
                <span className="font-medium">Catálogo Vehículos</span>
              </div>
              {isCatalogoOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </button>

            {isCatalogoOpen && (
              <div className="mt-1 ml-4 pl-4 border-l-2 border-gray-100 space-y-1">
                {catalogoItems.map((subItem) => (
                  <button
                    key={subItem.id}
                    onClick={() => onNavigate(subItem.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg text-sm transition-colors ${
                      currentView === subItem.id
                        ? 'bg-indigo-50 text-indigo-900 font-medium'
                        : 'text-gray-500 hover:text-indigo-700'
                    }`}
                  >
                    {subItem.icon}
                    <span>{subItem.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </nav>
      </div>

      {/* Footer del Sidebar */}
      <div className="p-4 border-t border-gray-200 bg-gray-50 flex-shrink-0">
        <div className="flex items-center space-x-3 mb-3 px-2">
          <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700">
            <UserCheck size={16} />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-700">Usuario Admin</p>
            <p className="text-xs text-gray-500">admin@dynamicfin.mx</p>
          </div>
        </div>
        <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors text-sm">
          <LogOut size={16} />
          <span>Cerrar Sesión</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;