import React from 'react';
import { 
  DollarSign, 
  Clock, 
  AlertTriangle, 
  TrendingUp, 
  CheckCircle, 
  Target 
} from 'lucide-react';
import { AnimatedNumber } from './AnimatedNumber';
import { KPI, Competidor } from '../types/supabase';

interface DashboardViewProps {
  kpis: KPI[];
  competidores: Competidor[];
  animateMetrics: boolean;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ 
  kpis, 
  competidores,
  animateMetrics 
}) => {
  // Buscar KPIs específicos
  const margenKPI = kpis.find(k => k.metrica === 'margen_diferencial');
  const tiempoRespuestaKPI = kpis.find(k => k.metrica === 'tiempo_respuesta');
  const alertasCriticasKPI = kpis.find(k => k.metrica === 'alertas_criticas');

  // Top 5 competidores por bono (simulado por ahora)
  const topBonos = [
    { name: 'Honda', amount: 45000, color: 'bg-red-500' },
    { name: 'Mazda', amount: 40000, color: 'bg-red-400' },
    { name: 'Kia', amount: 35000, color: 'bg-orange-500' },
    { name: 'Volkswagen', amount: 32000, color: 'bg-yellow-500' },
    { name: 'Su Agencia', amount: 30000, color: 'bg-green-500' }
  ];

  return (
    <div className="space-y-6">
      {/* Header del Dashboard */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-xl p-6 shadow-xl">
        <h2 className="text-2xl font-bold mb-2">Dashboard Competitivo</h2>
        <p className="text-blue-100">
          Actualizado: {new Date().toLocaleDateString('es-MX', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>
      </div>

      {/* KPIs Principales */}
      <div className="grid grid-cols-3 gap-6">
        {/* Diferencial de Margen */}
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
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
                  <div 
                    className="bg-orange-500 h-3 rounded-full transition-all duration-1000" 
                    style={{ width: animateMetrics ? '28%' : '0%' }}
                  />
                </div>
                <span className="text-lg font-bold text-gray-900">
                  {margenKPI?.valor_competencia || 28}%
                </span>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Su Agencia</p>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-green-500 h-3 rounded-full transition-all duration-1000" 
                    style={{ width: animateMetrics ? '20%' : '0%' }}
                  />
                </div>
                <span className="text-lg font-bold text-green-600">
                  {margenKPI?.valor_actual || 20}%
                </span>
              </div>
            </div>
          </div>
          
          <div className="mt-4 bg-green-50 rounded-lg p-3">
            <p className="text-sm font-semibold text-green-800">
              +{margenKPI?.diferencial || 8}% Ventaja en Liquidez
            </p>
            <p className="text-xs text-green-700 mt-1">VENTAJA COMPETITIVA</p>
          </div>
        </div>

        {/* Tiempo Respuesta */}
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
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
            <p className="text-5xl font-bold text-blue-600">
              {animateMetrics ? (
                <AnimatedNumber value={tiempoRespuestaKPI?.valor_actual || 1.8} suffix="h" decimals={1} />
              ) : (
                '0.0h'
              )}
            </p>
          </div>
          
          <div className="mt-4 bg-blue-50 rounded-lg p-3 flex items-center gap-2">
            <TrendingUp className="text-blue-600" size={20} />
            <p className="text-sm font-semibold text-blue-800">
              Mejoría 15% vs semana anterior
            </p>
          </div>
        </div>

        {/* Alertas Críticas */}
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
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
            <p className="text-5xl font-bold text-purple-600">
              {animateMetrics ? (
                <AnimatedNumber value={alertasCriticasKPI?.valor_actual || 4} />
              ) : (
                '0'
              )}
            </p>
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

      {/* Top 5 Bonos */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Top 5 Bonos de la Semana</h3>
        <div className="space-y-4">
          {topBonos.map((item, idx) => (
            <div key={idx} className="flex items-center gap-4">
              <div className="w-32 text-sm font-medium text-gray-700">{item.name}</div>
              <div className="flex-1 bg-gray-200 rounded-full h-8 relative">
                <div 
                  className={`${item.color} h-8 rounded-full transition-all duration-1000 flex items-center justify-end pr-3`}
                  style={{ width: animateMetrics ? `${(item.amount / 45000) * 100}%` : '0%' }}
                >
                  <span className="text-white font-bold text-sm">
                    ${(item.amount / 1000).toFixed(0)}k
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-sm text-green-800">
            <CheckCircle className="inline mr-2" size={16} />
            <strong>Posición óptima:</strong> Bono competitivo sin sobre-invertir
          </p>
        </div>
      </div>

      {/* Tabla de Promociones Activas */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">
          Promociones Activas - Competidores
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                  Competidor
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                  Tasa
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                  Ubicación
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                  Promoción
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                  Estado
                </th>
              </tr>
            </thead>
            <tbody>
              {competidores.slice(0, 5).map((comp) => {
                const tasaNum = comp.tasa_actual;
                const esAltoRiesgo = tasaNum < 8;
                const esMedioRiesgo = tasaNum >= 8 && tasaNum < 9.5;
                
                return (
                  <tr 
                    key={comp.id} 
                    className={`border-b border-gray-100 transition-colors ${
                      esAltoRiesgo ? 'hover:bg-red-50' : 
                      esMedioRiesgo ? 'hover:bg-yellow-50' : 
                      'hover:bg-green-50'
                    }`}
                  >
                    <td className="py-4 px-4 font-medium text-gray-900">
                      {comp.nombre_competidor || comp.nombre || 'N/A'}
                    </td>
                    <td className={`py-4 px-4 font-bold ${
                      esAltoRiesgo ? 'text-red-600' : 
                      esMedioRiesgo ? 'text-orange-600' : 
                      'text-green-600'
                    }`}>
                      {tasaNum}%
                    </td>
                    <td className="py-4 px-4 text-gray-700">
                      {comp.ubicacion}
                    </td>
                    <td className="py-4 px-4 text-gray-700">
                      {comp.promocion_activa}
                    </td>
                    <td className="py-4 px-4">
                      {esAltoRiesgo ? (
                        <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-semibold">
                          🔴 Alto Riesgo
                        </span>
                      ) : esMedioRiesgo ? (
                        <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-semibold">
                          🟡 Medio Riesgo
                        </span>
                      ) : (
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold">
                          🟢 Óptimo
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        
        {competidores.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <p>No hay datos de competidores disponibles</p>
          </div>
        )}
        
        <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            <Target className="inline mr-2" size={16} />
            <strong>Recomendación:</strong> Mantener posición premium con enfoque en liquidez
          </p>
        </div>
      </div>

      {/* ROI Card */}
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
    </div>
  );
};