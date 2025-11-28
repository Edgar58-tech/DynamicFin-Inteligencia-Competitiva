// src/components/Dashboard.tsx
import React, { useState, useEffect } from 'react';
import { TrendingUp, BarChart3, AlertTriangle, Clock, DollarSign, Target, CheckCircle } from 'lucide-react';

const Dashboard: React.FC = () => {
  const [dashboardData] = useState({
    ratingPromedio: 4.6,
    evaluacionCompetencia: 4.1,
    tasaRespuesta: 100,
    alertasActivas: 4,
    comparativosRealizados: 0
  });

  const [activeSection, setActiveSection] = useState<'alertas' | 'estrategico' | 'reputacion'>('alertas');

  useEffect(() => {
    console.log('✅ Dashboard montado correctamente');
  }, []);

  // Componente de Alertas en Tiempo Real
  const AlertasEnTiempoReal = () => (
    <div className="space-y-6">
      {/* ROI Banner Superior */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-purple-700 text-white rounded-xl shadow-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-purple-100 text-sm mb-2">ROI Proyectado</p>
            <p className="text-6xl font-bold">850%</p>
          </div>
          <div className="text-right">
            <p className="text-purple-100 text-sm mb-1">Demo Interactivo</p>
            <p className="text-lg font-semibold">Agencias Automotrices</p>
          </div>
        </div>
      </div>

      {/* Alerta Crítica Principal */}
      <div className="bg-white rounded-xl shadow-lg border-l-4 border-red-500 p-6">
        <div className="flex items-start gap-4">
          <div className="bg-red-500 text-white rounded-full p-3 flex-shrink-0">
            <AlertTriangle size={28} />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-bold text-red-800">🚨 ALERTA CRÍTICA: TASA AGRESIVA DETECTADA</h3>
              <span className="text-xs text-gray-500">Hace 3 minutos</span>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <p className="text-xs text-gray-600 mb-1">👥 COMPETIDOR</p>
                <p className="font-bold text-gray-900">Nissan Perisar CDMX</p>
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-1">📊 UMBRAL</p>
                <p className="font-bold text-gray-900">Supera tasa mínima (8.5%)</p>
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-1">🎁 PROMOCIÓN</p>
                <p className="font-bold text-red-600">Tasa 6.99% a 48 meses</p>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3">
              <p className="text-sm text-blue-800">
                ⚡ <strong>ACCIÓN:</strong> Promoción <span className="font-bold">"ENGANCHE/CAT"</span>
              </p>
            </div>

            <button className="w-full bg-red-600 text-white py-3 px-6 rounded-lg hover:bg-red-700 transition-colors font-semibold flex items-center justify-center gap-2">
              📋 Ver Guión de Refutación Rápida →
            </button>
          </div>
        </div>
      </div>

      {/* Alerta Competitiva */}
      <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <div className="bg-yellow-500 text-white rounded-full p-2">
            ⚠️
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-gray-900 mb-3">
              ⚠️ ALERTA: Toyota Santa Fe ofrece Tasa 0% - Acción Inmediata
            </h3>
            <p className="text-sm text-gray-600 mb-3">
              De <strong>Sedilec Inteligencia Competitiva</strong> - Para Equipo Ventas
            </p>

            <div className="bg-white rounded-lg p-4 mb-4 border border-yellow-200">
              <h4 className="font-semibold text-gray-900 mb-3">Alerta Competitiva - Acción Inmediata</h4>
              
              <div className="grid grid-cols-2 gap-4 mb-3">
                <div>
                  <p className="text-xs text-gray-600 mb-1">Competidor:</p>
                  <p className="font-semibold text-gray-900">Toyota Santa Fe</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">Promoción:</p>
                  <p className="font-semibold text-red-600">Tasa 0% a 36m</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-3">
                <div>
                  <p className="text-xs text-gray-600 mb-1">Umbral:</p>
                  <p className="font-semibold text-orange-600">ALTA PRIORIDAD</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">Tiempo Respuesta:</p>
                  <p className="font-semibold text-gray-900">&lt; 2 horas</p>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-sm font-semibold text-blue-900 mb-1">📋 Acción Recomendada:</p>
                <p className="text-sm text-blue-800">
                  Usar Smart 'Tasa 0' Transparencia:<br/>
                  Enfocate en CAT real y liquidez
                </p>
              </div>
            </div>

            <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium">
              💬 Abrir Script de Respuesta
            </button>
          </div>
        </div>
      </div>

      {/* KPIs Inferiores */}
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6 text-center border-t-4 border-red-500">
          <Clock size={32} className="mx-auto text-red-500 mb-3" />
          <div className="text-4xl font-bold text-gray-900 mb-1">1.8 hrs</div>
          <div className="text-sm text-gray-600">Tiempo promedio de respuesta</div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6 text-center border-t-4 border-green-500">
          <DollarSign size={32} className="mx-auto text-green-500 mb-3" />
          <div className="text-4xl font-bold text-gray-900 mb-1">$120k</div>
          <div className="text-sm text-gray-600">Ventas recuperadas/semana</div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6 text-center border-t-4 border-blue-500">
          <Target size={32} className="mx-auto text-blue-500 mb-3" />
          <div className="text-4xl font-bold text-gray-900 mb-1">+0.5</div>
          <div className="text-sm text-gray-600">Puntos sobre competencia</div>
        </div>
      </div>

      {/* CTA Final */}
      <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl shadow-xl p-6">
        <h3 className="text-xl font-bold mb-2">
          ¿Cuántos clientes perdió la semana pasada por no tener esta información?
        </h3>
        <p className="text-orange-100 mb-4">
          El costo del servicio ($10,000/mes) se recupera con una sola venta adicional
        </p>
        <div className="grid grid-cols-2 gap-4">
          <button className="bg-white text-orange-600 py-3 px-6 rounded-lg hover:bg-orange-50 transition-colors font-semibold">
            Agendar Demo Personalizado
          </button>
          <button className="bg-orange-700 text-white py-3 px-6 rounded-lg hover:bg-orange-800 transition-colors font-semibold border-2 border-white">
            Ver Caso de Éxito
          </button>
        </div>
      </div>
    </div>
  );

  // Componente de Dashboard Estratégico
  const DashboardEstrategico = () => (
    <div className="space-y-6">
      {/* Header Dashboard Competitivo */}
      <div className="bg-gradient-to-r from-blue-500 via-teal-500 to-green-500 text-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-1">Dashboard Competitivo</h2>
        <p className="text-blue-100 text-sm">Semana del 10 Marzo 2024</p>
      </div>

      {/* KPIs Principales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Diferencial de Margen */}
        <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-green-500">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-green-100 rounded-full p-3">
              <DollarSign className="text-green-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-600 font-medium">Diferencial de Margen</p>
              <p className="text-xs text-gray-500">vs Mercado</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-600 mb-1">Competencia Promedio</p>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-gray-200 rounded-full h-3">
                  <div className="bg-orange-500 h-3 rounded-full transition-all duration-1000" style={{ width: '28%' }} />
                </div>
                <span className="text-lg font-bold text-gray-900">28%</span>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Su Agencia</p>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-gray-200 rounded-full h-3">
                  <div className="bg-green-500 h-3 rounded-full transition-all duration-1000" style={{ width: '20%' }} />
                </div>
                <span className="text-lg font-bold text-green-600">20%</span>
              </div>
            </div>
          </div>
          
          <div className="mt-4 bg-green-50 rounded-lg p-3">
            <p className="text-sm font-semibold text-green-800">+8% Ventaja en Liquidez</p>
            <p className="text-xs text-green-700 mt-1">VENTAJA COMPETITIVA</p>
          </div>
        </div>

        {/* Tiempo Respuesta */}
        <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-blue-500">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-blue-100 rounded-full p-3">
              <Clock className="text-blue-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-600 font-medium">Tiempo Respuesta</p>
              <p className="text-xs text-gray-500">Promedio</p>
            </div>
          </div>
          
          <div className="text-center py-4">
            <p className="text-5xl font-bold text-blue-600">1.8h</p>
          </div>
          
          <div className="mt-4 bg-blue-50 rounded-lg p-3 flex items-center gap-2">
            <TrendingUp className="text-blue-600" size={20} />
            <p className="text-sm font-semibold text-blue-800">
              Mejoría 15% vs semana anterior
            </p>
          </div>
        </div>

        {/* Alertas Críticas */}
        <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-purple-500">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-purple-100 rounded-full p-3">
              <AlertTriangle className="text-purple-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-600 font-medium">Alertas Críticas</p>
              <p className="text-xs text-gray-500">Esta Semana</p>
            </div>
          </div>
          
          <div className="text-center py-4">
            <p className="text-5xl font-bold text-purple-600">4</p>
          </div>
          
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Tasa Agresiva</span>
              <span className="font-bold text-red-600">2</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Bono Alto</span>
              <span className="font-bold text-orange-600">1</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Reseña Negativa</span>
              <span className="font-bold text-yellow-600">1</span>
            </div>
          </div>
        </div>
      </div>

      {/* Top 5 Bonos de la Semana */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Top 5 Bonos de la Semana</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-32 text-sm font-medium text-gray-700">Honda</div>
            <div className="flex-1 bg-gray-200 rounded-full h-8 relative">
              <div className="bg-red-500 h-8 rounded-full transition-all duration-1000 flex items-center justify-end pr-3" style={{ width: '100%' }}>
                <span className="text-white font-bold text-sm">$45k</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="w-32 text-sm font-medium text-gray-700">Mazda</div>
            <div className="flex-1 bg-gray-200 rounded-full h-8 relative">
              <div className="bg-red-400 h-8 rounded-full transition-all duration-1000 flex items-center justify-end pr-3" style={{ width: '89%' }}>
                <span className="text-white font-bold text-sm">$40k</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="w-32 text-sm font-medium text-gray-700">Kia</div>
            <div className="flex-1 bg-gray-200 rounded-full h-8 relative">
              <div className="bg-orange-500 h-8 rounded-full transition-all duration-1000 flex items-center justify-end pr-3" style={{ width: '78%' }}>
                <span className="text-white font-bold text-sm">$35k</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="w-32 text-sm font-medium text-gray-700">Volkswagen</div>
            <div className="flex-1 bg-gray-200 rounded-full h-8 relative">
              <div className="bg-yellow-500 h-8 rounded-full transition-all duration-1000 flex items-center justify-end pr-3" style={{ width: '71%' }}>
                <span className="text-white font-bold text-sm">$32k</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="w-32 text-sm font-medium text-gray-700">Su Agencia</div>
            <div className="flex-1 bg-gray-200 rounded-full h-8 relative">
              <div className="bg-green-500 h-8 rounded-full transition-all duration-1000 flex items-center justify-end pr-3" style={{ width: '67%' }}>
                <span className="text-white font-bold text-sm">$30k</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-sm text-green-800">
            <CheckCircle className="inline mr-2" size={16} />
            <strong>Posición óptima:</strong> Bono competitivo sin sobre-invertir
          </p>
        </div>
      </div>

      {/* Tabla de Promociones Activas - SUV Compactos */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Promociones Activas - SUV Compactos</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Modelo</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Tasa</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Plazo</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Depósito</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Estado</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100 hover:bg-red-50">
                <td className="py-4 px-4 font-medium text-gray-900">Nissan Kicks</td>
                <td className="py-4 px-4 font-bold text-red-600">4.99%</td>
                <td className="py-4 px-4 text-gray-700">48 meses</td>
                <td className="py-4 px-4 text-gray-700">25%</td>
                <td className="py-4 px-4">
                  <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-semibold">
                    🔴 Alto Riesgo
                  </span>
                </td>
              </tr>
              <tr className="border-b border-gray-100 hover:bg-orange-50">
                <td className="py-4 px-4 font-medium text-gray-900">Hyundai Creta</td>
                <td className="py-4 px-4 font-bold text-orange-600">8.85%</td>
                <td className="py-4 px-4 text-gray-700">50 meses</td>
                <td className="py-4 px-4 text-gray-700">20%</td>
                <td className="py-4 px-4">
                  <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-semibold">
                    🟡 Medio Riesgo
                  </span>
                </td>
              </tr>
              <tr className="border-b border-gray-100 hover:bg-green-50">
                <td className="py-4 px-4 font-medium text-gray-900">Su Agencia - Modelo X</td>
                <td className="py-4 px-4 font-bold text-green-600">9.5%</td>
                <td className="py-4 px-4 text-gray-700">48 meses</td>
                <td className="py-4 px-4 text-gray-700">15%</td>
                <td className="py-4 px-4">
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold">
                    🟢 Óptimo
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            <Target className="inline mr-2" size={16} />
            <strong>Recomendación:</strong> Mantener posición premium con enfoque en liquidez
          </p>
        </div>
      </div>

      {/* Banner ROI Inferior */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl shadow-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-green-100 text-sm mb-2">Ventas Recuperadas Esta Semana</p>
            <p className="text-4xl font-bold">3 ventas</p>
            <p className="text-2xl font-semibold mt-1">$120,000 MXN</p>
          </div>
          <div className="text-right">
            <p className="text-green-100 text-sm mb-2">ROI Mensual</p>
            <p className="text-5xl font-bold">850%</p>
          </div>
        </div>
      </div>

      {/* KPIs Inferiores */}
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6 text-center border-t-4 border-red-500">
          <Clock size={32} className="mx-auto text-red-500 mb-3" />
          <div className="text-4xl font-bold text-gray-900 mb-1">1.8 hrs</div>
          <div className="text-sm text-gray-600">Tiempo promedio de respuesta</div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6 text-center border-t-4 border-green-500">
          <DollarSign size={32} className="mx-auto text-green-500 mb-3" />
          <div className="text-4xl font-bold text-gray-900 mb-1">$120k</div>
          <div className="text-sm text-gray-600">Ventas recuperadas/semana</div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6 text-center border-t-4 border-blue-500">
          <Target size={32} className="mx-auto text-blue-500 mb-3" />
          <div className="text-4xl font-bold text-gray-900 mb-1">+0.5</div>
          <div className="text-sm text-gray-600">Puntos sobre competencia</div>
        </div>
      </div>

      {/* CTA Final */}
      <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl shadow-xl p-6">
        <h3 className="text-xl font-bold mb-2">
          ¿Cuántos clientes perdió la semana pasada por no tener esta información?
        </h3>
        <p className="text-orange-100 mb-4">
          El costo del servicio ($10,000/mes) se recupera con una sola venta adicional
        </p>
        <div className="grid grid-cols-2 gap-4">
          <button className="bg-white text-orange-600 py-3 px-6 rounded-lg hover:bg-orange-50 transition-colors font-semibold">
            Agendar Demo Personalizado
          </button>
          <button className="bg-orange-700 text-white py-3 px-6 rounded-lg hover:bg-orange-800 transition-colors font-semibold border-2 border-white">
            Ver Caso de Éxito
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full space-y-6">
      {/* Header Principal */}
      <div className="relative bg-gradient-to-r from-indigo-700 via-purple-600 to-purple-700 text-white p-6 rounded-lg shadow-lg overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full translate-y-1/2 -translate-x-1/2"></div>
        </div>
        
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-1 tracking-wide">
              Sistema de Inteligencia Competitiva
            </h1>
            <p className="text-purple-100 text-sm font-light">
              Agencias Automotrices - Monitoreo en Tiempo Real
            </p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/30">
            <span className="text-sm font-semibold">Módulo 4</span>
          </div>
        </div>
      </div>

      {/* Botones de Navegación */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button 
          onClick={() => setActiveSection('alertas')}
          className={`border rounded-lg p-4 transition-all duration-200 flex items-center justify-center gap-2 font-medium ${
            activeSection === 'alertas'
              ? 'bg-red-600 text-white shadow-lg border-red-600'
              : 'bg-white text-gray-700 border-gray-200 hover:shadow-md hover:border-red-300'
          }`}
        >
          <AlertTriangle size={20} className={activeSection === 'alertas' ? 'text-white' : 'text-red-600'} />
          <span>🔔 Alertas en Tiempo Real</span>
        </button>
        
        <button 
          onClick={() => setActiveSection('estrategico')}
          className={`border rounded-lg p-4 transition-all duration-200 flex items-center justify-center gap-2 font-medium ${
            activeSection === 'estrategico'
              ? 'bg-green-600 text-white shadow-lg border-green-600'
              : 'bg-white text-gray-700 border-gray-200 hover:shadow-md hover:border-green-300'
          }`}
        >
          <BarChart3 size={20} className={activeSection === 'estrategico' ? 'text-white' : 'text-green-600'} />
          <span>📈 Dashboard Estratégico</span>
        </button>
        
        <button 
          onClick={() => setActiveSection('reputacion')}
          className={`border rounded-lg p-4 transition-all duration-200 flex items-center justify-center gap-2 font-medium ${
            activeSection === 'reputacion'
              ? 'bg-indigo-600 text-white shadow-lg border-indigo-600'
              : 'bg-white text-gray-700 border-gray-200 hover:shadow-md hover:border-indigo-300'
          }`}
        >
          <span>🔍</span>
          <span>Análisis de Reputación</span>
        </button>
      </div>

      {/* Contenido según sección activa */}
      {activeSection === 'alertas' && <AlertasEnTiempoReal />}
      {activeSection === 'estrategico' && <DashboardEstrategico />}

      {activeSection === 'reputacion' && (
        <>
          {/* Análisis de Reputación y Sentimiento */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-1">Análisis de Reputación y Sentimiento</h2>
            <p className="text-blue-100 text-sm">Competencia vs Competencia - Reportes del 2025</p>
          </div>

          {/* Cards de Rating */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-green-500">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <h3 className="font-semibold text-gray-700">Su Agencia</h3>
              </div>
              <div className="text-center">
                <div className="text-6xl font-bold text-gray-800 mb-3">{dashboardData.ratingPromedio}</div>
                <div className="text-yellow-400 text-3xl mb-3">
                  ⭐⭐⭐⭐<span className="text-gray-300">⭐</span>
                </div>
                <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-lg text-sm font-semibold">
                  <span>📊</span>
                  <span>{dashboardData.tasaRespuesta}% DE CONFIANZA</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-blue-500">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <h3 className="font-semibold text-gray-700">Evaluación Competencia</h3>
              </div>
              <div className="text-center">
                <div className="text-6xl font-bold text-gray-800 mb-3">{dashboardData.evaluacionCompetencia}</div>
                <div className="text-yellow-400 text-3xl mb-3">
                  ⭐⭐⭐⭐<span className="text-gray-300">⭐</span>
                </div>
                <div className="text-sm text-gray-600 mt-2">
                  Diferencial: +{(dashboardData.ratingPromedio - dashboardData.evaluacionCompetencia).toFixed(1)} puntos
                </div>
              </div>
            </div>
          </div>

          {/* Palabras Más Mencionadas */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">
              Palabras Más Mencionadas en Reseñas de Competencia
            </h2>
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-4">
              <p className="text-sm text-gray-700">
                📌 Estos son los puntos más débiles que tu equipo debe atender y a su vez hacen más competitiva
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <span className="px-4 py-2 bg-red-100 text-red-700 rounded-full text-sm font-semibold">SORPRESA</span>
              <span className="px-4 py-2 bg-gray-800 text-white rounded-full text-sm font-semibold">OCULTO</span>
              <span className="px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold">ESPERA</span>
              <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">POST VENTA</span>
              <span className="px-4 py-2 bg-red-100 text-red-700 rounded-full text-sm font-semibold">COMISIÓN</span>
              <span className="px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold">ENGAÑO</span>
              <span className="px-4 py-2 bg-red-100 text-red-700 rounded-full text-sm font-semibold">TARDADO</span>
              <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-semibold">CONFIADO</span>
            </div>
          </div>

          {/* Distribución de Quejas */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Distribución de Quejas - Competencia</h2>
            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
              <div className="relative w-48 h-48">
                <svg className="transform -rotate-90" width="192" height="192" viewBox="0 0 192 192">
                  <circle cx="96" cy="96" r="70" fill="none" stroke="#fbbf24" strokeWidth="28" />
                  <circle cx="96" cy="96" r="70" fill="none" stroke="#ef4444" strokeWidth="28" strokeDasharray="220 220" strokeDashoffset="0" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-gray-800">100%</div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-red-500 rounded"></div>
                  <div className="text-sm">
                    <div className="font-semibold text-gray-800">55%</div>
                    <div className="text-gray-600">SEO (Sitio sobre Directo)</div>
                    <div className="text-gray-500 text-xs">Experiencia de ventas no alineada</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-yellow-500 rounded"></div>
                  <div className="text-sm">
                    <div className="font-semibold text-gray-800">45%</div>
                    <div className="text-gray-600">SEO (Sitio sobre Directo)</div>
                    <div className="text-gray-500 text-xs">Experiencia de ventas no alineada</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-sm text-blue-800">
                💡 InsightAI: El 70% de las quejas sobre experiencia financiera ocurren cuando los equipos <strong>NO</strong> están preparados para comunicar diferenciadores.
              </p>
            </div>
          </div>

          {/* Alerta de Ejemplo */}
          <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6">
            <div className="flex items-start gap-4">
              <div className="bg-red-500 text-white rounded-full p-3 flex-shrink-0">
                <AlertTriangle size={24} />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-red-800 text-lg mb-2">
                  ⚠️ RESEÑA ELEVADA & ALBERTO ROJA - Toyota Insurgentes
                </h3>
                <div className="bg-white rounded-lg p-4 mb-4">
                  <p className="text-gray-700 mb-3">
                    "No pensaríamos ir, pero nos cobraron{' '}
                    <span className="font-bold text-red-600 bg-red-100 px-2 py-1 rounded">
                      $1,600.00 de comisión por apertura
                    </span>{' '}
                    que no se nos dijo en el sitio presencial, hasta que se nos envió el contrato"
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm border-t pt-3">
                    <div>
                      <span className="text-gray-500 block mb-1">Cliente:</span>
                      <span className="font-semibold text-gray-800">Pedro González</span>
                    </div>
                    <div>
                      <span className="text-gray-500 block mb-1">Fecha:</span>
                      <span className="font-semibold text-gray-800">5 Marzo 2025</span>
                    </div>
                    <div>
                      <span className="text-gray-500 block mb-1">Modelo:</span>
                      <span className="font-semibold text-gray-800">Camrille SXI</span>
                    </div>
                  </div>
                </div>
                <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2">
                  <span>⚡</span>
                  <span>Muev Ventaja "Transparencia Contractual"</span>
                </button>
                <p className="text-center text-sm text-gray-600 mt-2">
                  ❤️ Acción recomendada: DAY 1 proactividad con el cliente
                </p>
              </div>
            </div>
          </div>

          {/* Su Ventaja */}
          <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6">
            <div className="flex items-start gap-4">
              <div className="bg-green-500 text-white rounded-full p-3 flex-shrink-0">
                <TrendingUp size={24} />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-green-800 mb-3">
                  ✅ Su Ventaja: Transparencia Total
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Difunda su transparencia con una promoción que diga "Suma preciso" utilizad para diferenciar 
                  promociones que ayudan a beneficios.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6 text-center border-t-4 border-red-500">
              <div className="text-red-500 mb-2">
                <AlertTriangle size={32} className="mx-auto" />
              </div>
              <div className="text-4xl font-bold text-gray-800 mb-1">{dashboardData.alertasActivas}</div>
              <div className="text-gray-600 text-sm">Alertas Activas</div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 text-center border-t-4 border-green-500">
              <div className="text-green-500 mb-2">
                <BarChart3 size={32} className="mx-auto" />
              </div>
              <div className="text-4xl font-bold text-gray-800 mb-1">{dashboardData.comparativosRealizados}</div>
              <div className="text-gray-600 text-sm">Comparativos Realizados</div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 text-center border-t-4 border-blue-500">
              <div className="text-blue-500 mb-2">
                <TrendingUp size={32} className="mx-auto" />
              </div>
              <div className="text-4xl font-bold text-gray-800 mb-1">{dashboardData.ratingPromedio}</div>
              <div className="text-gray-600 text-sm">Rating Promedio</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;