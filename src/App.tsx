import React, { useState, useEffect } from 'react';
import { AlertTriangle, TrendingUp, Star, Bell, BarChart3, Target, Clock, DollarSign, Users, ArrowRight, CheckCircle, MessageSquare, Shield } from 'lucide-react';
import { supabase } from './supabaseClient';
import { Alerta, Competidor, Metrica, Configuracion } from './types/database';
import './App.css';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState('alert');
  const [showNotification, setShowNotification] = useState(true);
  const [animateMetrics, setAnimateMetrics] = useState(false);
  const [alertas, setAlertas] = useState<Alerta[]>([]);
  const [competidores, setCompetidores] = useState<Competidor[]>([]);
  const [metricas, setMetricas] = useState<Metrica[]>([]);
  const [configuracion, setConfiguracion] = useState<Configuracion | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setAnimateMetrics(true);
    const timer = setTimeout(() => setShowNotification(true), 500);
    return () => clearTimeout(timer);
  }, [activeView]);

  useEffect(() => {
    cargarDatos();
    
    // Suscribirse a cambios en tiempo real
    const subscription = supabase
      .channel('alertas')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'alertas' }, cargarDatos)
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const cargarDatos = async () => {
    try {
      setLoading(true);
      
      // Cargar alertas
      const { data: alertasData, error: alertasError } = await supabase
        .from('alertas')
        .select('*')
        .eq('activo', true)
        .order('created_at', { ascending: false });
      
      if (alertasError) throw alertasError;
      setAlertas(alertasData || []);

      // Cargar competidores
      const { data: competidoresData, error: competidoresError } = await supabase
        .from('competidores')
        .select('*')
        .order('ultima_actualizacion', { ascending: false });
      
      if (competidoresError) throw competidoresError;
      setCompetidores(competidoresData || []);

      // Cargar métricas
      const { data: metricasData, error: metricasError } = await supabase
        .from('metricas')
        .select('*')
        .order('fecha', { ascending: false })
        .limit(10);
      
      if (metricasError) throw metricasError;
      setMetricas(metricasData || []);

      // Cargar configuración
      const { data: configData, error: configError } = await supabase
        .from('configuracion')
        .select('*')
        .single();
      
      if (configError) throw configError;
      setConfiguracion(configData);

    } catch (err) {
      console.error('Error cargando datos:', err);
      setError('Error al cargar datos de la base de datos');
    } finally {
      setLoading(false);
    }
  };

  const AnimatedNumber: React.FC<{ value: number; suffix?: string }> = ({ value, suffix = '' }) => {
    const [count, setCount] = useState(0);
    
    useEffect(() => {
      if (!animateMetrics) return;
      let start = 0;
      const end = value;
      const duration = 1000;
      const increment = end / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(start);
        }
      }, 16);
      
      return () => clearInterval(timer);
    }, [value, animateMetrics]);
    
    return <span>{count.toFixed(value % 1 === 0 ? 0 : 1)}{suffix}</span>;
  };

  const AlertView: React.FC = () => {
    const alertaCritica = alertas.find(a => a.tipo === 'critica');
    const alertasAdvertencia = alertas.filter(a => a.tipo === 'advertencia');
    
    return (
      <div className="space-y-6">
        {alertaCritica && showNotification && (
          <div className="bg-white rounded-xl shadow-2xl border-l-4 border-red-600 p-6 animate-slide-in">
            <div className="flex items-start gap-4">
              <div className="bg-red-100 rounded-full p-3">
                <AlertTriangle className="text-red-600" size={28} />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-gray-900">
                    🚨 {alertaCritica.titulo}
                  </h3>
                  <span className="text-sm text-gray-500 whitespace-nowrap ml-4">
                    {alertaCritica.tiempo}
                  </span>
                </div>
                
                <div className="space-y-3 bg-red-50 rounded-lg p-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600 font-medium">⚡ COMPETIDOR:</p>
                      <p className="text-lg font-bold text-gray-900">{alertaCritica.competidor}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 font-medium">📊 PROMOCIÓN:</p>
                      <p className="text-lg font-bold text-red-600">{alertaCritica.promocion}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 font-medium">🎯 UMBRAL:</p>
                      <p className="text-lg font-bold text-gray-900">{alertaCritica.umbral}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 font-medium">💰 ACCIÓN:</p>
                      <p className="text-lg font-bold text-blue-600">{alertaCritica.accion}</p>
                    </div>
                  </div>
                </div>

                <button className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2">
                  <MessageSquare size={20} />
                  Ver Guion de Refutación Rápida
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>
          </div>
        )}

        {alertasAdvertencia.map((alerta, index) => (
          <div key={alerta.id} className="bg-white rounded-xl shadow-xl p-6">
            <div className="border-b pb-4 mb-4">
              <div className="flex items-center gap-3 mb-2">
                <Bell className="text-orange-500" size={24} />
                <h4 className="text-lg font-bold text-gray-900">
                  ⚠️ {alerta.titulo}
                </h4>
              </div>
              <p className="text-sm text-gray-500">De: Sistema Inteligencia Competitiva → Para: Equipo Ventas</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600 font-medium">Competidor:</p>
                <p className="font-semibold">{alerta.competidor}</p>
              </div>
              <div>
                <p className="text-gray-600 font-medium">Promoción:</p>
                <p className="font-semibold text-orange-600">{alerta.promocion}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const DashboardView: React.FC = () => {
    const metricasActuales = metricas.slice(0, 6);
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metricasActuales.map((metrica) => (
          <div key={metrica.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-100 rounded-lg p-2">
                <BarChart3 className="text-blue-600" size={24} />
              </div>
              <span className={`text-sm font-medium ${
                metrica.tendencia === 'sube' ? 'text-green-600' : 
                metrica.tendencia === 'baja' ? 'text-red-600' : 'text-gray-600'
              }`}>
                {metrica.tendencia === 'sube' ? '↗' : 
                 metrica.tendencia === 'baja' ? '↘' : '→'} {metrica.tendencia.toUpperCase()}
              </span>
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-2">{metrica.tipo}</h3>
            <p className="text-2xl font-bold text-gray-900 mb-1">
              <AnimatedNumber value={metrica.valor} suffix="%" />
            </p>
            <p className="text-xs text-gray-500">{metrica.descripcion}</p>
          </div>
        ))}
      </div>
    );
  };

  const CompetitorsView: React.FC = () => (
    <div className="space-y-4">
      {competidores.map((competidor) => (
        <div key={competidor.id} className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold text-gray-900">{competidor.nombre}</h3>
              <p className="text-sm text-gray-600">{competidor.ubicacion} • {competidor.marca}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Tasa Actual</p>
              <p className="text-xl font-bold text-blue-600">{competidor.tasa_actual}%</p>
            </div>
          </div>
          
          <div className="border-t pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Promoción Activa</p>
                <p className="font-semibold text-gray-900">{competidor.promocion_activa}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500">Última actualización</p>
                <p className="text-sm text-gray-700">{new Date(competidor.ultima_actualizacion).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const SettingsView: React.FC = () => {
    if (!configuracion) return <div>Cargando configuración...</div>;
    
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Configuración del Sistema</h2>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tasa Máxima Permitida</label>
              <div className="bg-gray-100 rounded-lg p-3">
                <span className="text-lg font-bold text-gray-900">{configuracion.tasa_maxima}%</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tasa Mínima</label>
              <div className="bg-gray-100 rounded-lg p-3">
                <span className="text-lg font-bold text-gray-900">{configuracion.tasa_minima}%</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Umbral de Alerta</label>
              <div className="bg-gray-100 rounded-lg p-3">
                <span className="text-lg font-bold text-gray-900">{configuracion.umbral_alerta}%</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Frecuencia de Monitoreo</label>
              <div className="bg-gray-100 rounded-lg p-3">
                <span className="text-lg font-bold text-gray-900">{configuracion.frecuencia_monitoreo}</span>
              </div>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email de Notificaciones</label>
            <div className="bg-gray-100 rounded-lg p-3">
              <span className="text-gray-900">{configuracion.email_notificaciones}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando datos del sistema...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <AlertTriangle className="text-red-500 mx-auto mb-4" size={48} />
          <h2 className="text-xl font-bold text-gray-900 mb-2">Error de Conexión</h2>
          <p className="text-gray-600">{error}</p>
          <button 
            onClick={cargarDatos}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Shield className="text-blue-600 mr-3" size={32} />
              <h1 className="text-xl font-bold text-gray-900">
                Sistema Inteligencia Competitiva
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2">
                <Bell size={16} />
                <span>Alertas Activas ({alertas.filter(a => a.activo).length})</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveView('alert')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeView === 'alert'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Alertas
            </button>
            <button
              onClick={() => setActiveView('dashboard')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeView === 'dashboard'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveView('competitors')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeView === 'competitors'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Competidores
            </button>
            <button
              onClick={() => setActiveView('settings')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeView === 'settings'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Configuración
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeView === 'alert' && <AlertView />}
        {activeView === 'dashboard' && <DashboardView />}
        {activeView === 'competitors' && <CompetitorsView />}
        {activeView === 'settings' && <SettingsView />}
      </main>
    </div>
  );
};

export default App;