import React, { useState, useEffect } from 'react';
import { Bell, BarChart3, Star } from 'lucide-react';
import { supabase } from './supabaseClient';
import { Header } from './components/Header';
import { AlertView } from './components/AlertView';
import { DashboardView } from './components/DashboardView';
import { ReputationView } from './components/ReputationView';
import { Alerta, Competidor, KPI } from './types/supabase';
import './App.css';

type ViewType = 'alert' | 'dashboard' | 'reputation';

function App() {
  const [activeView, setActiveView] = useState<ViewType>('alert');
  const [animateMetrics, setAnimateMetrics] = useState(false);
  
  // Estados para datos de Supabase
  const [alertas, setAlertas] = useState<Alerta[]>([]);
  const [competidores, setCompetidores] = useState<Competidor[]>([]);
  const [kpis, setKpis] = useState<KPI[]>([]);
  const [loading, setLoading] = useState(true);

  // Cargar datos de Supabase
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      
      try {
        // Fetch Alertas Activas
        const { data: alertasData, error: alertasError } = await supabase
          .from('alertas')
          .select('*')
          .eq('activo', true)
          .order('timestamp', { ascending: false });

        if (alertasError) {
          console.error('Error fetching alertas:', alertasError);
        } else {
          setAlertas(alertasData || []);
        }

        // Fetch Competidores
        const { data: competidoresData, error: competidoresError } = await supabase
          .from('competidores')
          .select('*')
          .order('tasa_actual', { ascending: true });

        if (competidoresError) {
          console.error('Error fetching competidores:', competidoresError);
        } else {
          setCompetidores(competidoresData || []);
        }

        // Fetch KPIs
        const { data: kpisData, error: kpisError } = await supabase
          .from('kpis_dashboard')
          .select('*');

        if (kpisError) {
          console.error('Error fetching KPIs:', kpisError);
        } else {
          setKpis(kpisData || []);
        }
      } catch (error) {
        console.error('Error general:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Suscripción en tiempo real para alertas
    const alertasSubscription = supabase
      .channel('alertas-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'alertas'
        },
        (payload) => {
          console.log('Cambio detectado en alertas:', payload);
          fetchData(); // Recargar datos
        }
      )
      .subscribe();

    return () => {
      alertasSubscription.unsubscribe();
    };
  }, []);

  // Animaciones al cambiar de vista
  useEffect(() => {
    setAnimateMetrics(false);
    const timer = setTimeout(() => {
      setAnimateMetrics(true);
    }, 100);
    return () => clearTimeout(timer);
  }, [activeView]);

  const handleViewChange = (view: ViewType) => {
    setActiveView(view);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Cargando datos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <Header alertasActivas={alertas.length} />

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-lg p-2 mb-8 flex gap-2">
          <button
            onClick={() => handleViewChange('alert')}
            className={`flex-1 py-4 px-6 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
              activeView === 'alert'
                ? 'bg-red-600 text-white shadow-lg transform scale-105'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Bell size={20} />
            Alertas en Tiempo Real
          </button>
          <button
            onClick={() => handleViewChange('dashboard')}
            className={`flex-1 py-4 px-6 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
              activeView === 'dashboard'
                ? 'bg-green-600 text-white shadow-lg transform scale-105'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <BarChart3 size={20} />
            Dashboard Estratégico
          </button>
          <button
            onClick={() => handleViewChange('reputation')}
            className={`flex-1 py-4 px-6 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
              activeView === 'reputation'
                ? 'bg-purple-600 text-white shadow-lg transform scale-105'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Star size={20} />
            Análisis de Reputación
          </button>
        </div>

        {/* Content Views */}
        <div className="transition-all duration-300">
          {activeView === 'alert' && <AlertView alertas={alertas} />}
          {activeView === 'dashboard' && (
            <DashboardView 
              kpis={kpis} 
              competidores={competidores}
              animateMetrics={animateMetrics}
            />
          )}
          {activeView === 'reputation' && <ReputationView />}
        </div>

        {/* Footer Stats */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <div className="grid grid-cols-3 gap-6 text-center">
            <div className="border-r border-gray-200">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                <Bell className="text-red-600" size={32} />
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-1">{alertas.length}</p>
              <p className="text-sm text-gray-600">Alertas activas</p>
            </div>
            <div className="border-r border-gray-200">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                <BarChart3 className="text-green-600" size={32} />
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-1">{competidores.length}</p>
              <p className="text-sm text-gray-600">Competidores monitoreados</p>
            </div>
            <div>
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                <Star className="text-blue-600" size={32} />
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-1">4.6</p>
              <p className="text-sm text-gray-600">Rating promedio</p>
            </div>
          </div>
        </div>
      </div>

      {/* Animación CSS */}
      <style>{`
        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-in {
          animation: slide-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}

export default App;