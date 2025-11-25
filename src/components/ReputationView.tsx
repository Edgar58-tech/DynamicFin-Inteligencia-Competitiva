import React from 'react';
import { Star, AlertTriangle, CheckCircle, Shield } from 'lucide-react';

interface ReputationViewProps {
  // Por ahora usaremos datos de ejemplo, luego conectaremos con Supabase
}

export const ReputationView: React.FC<ReputationViewProps> = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl p-6 shadow-xl">
        <h2 className="text-2xl font-bold mb-2">Análisis de Reputación y Sentimiento</h2>
        <p className="text-purple-100">
          Comparativa vs Competencia - {new Date().toLocaleDateString('es-MX', { month: 'long', year: 'numeric' })}
        </p>
      </div>

      {/* Rating Comparison */}
      <div className="grid grid-cols-2 gap-6">
        {/* Su Agencia */}
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-3 font-medium">Su Agencia</p>
            <div className="flex justify-center items-center gap-2 mb-2">
              {[1, 2, 3, 4].map((i) => (
                <Star key={i} className="fill-yellow-400 text-yellow-400" size={32} />
              ))}
              <Star className="text-gray-300" size={32} />
            </div>
            <p className="text-4xl font-bold text-gray-900 mb-2">4.6</p>
            <p className="text-sm text-gray-600">de 5.0</p>
            <div className="mt-4 bg-green-50 rounded-lg p-3">
              <p className="text-sm font-bold text-green-800">🏆 LÍDER EN CONFIANZA</p>
            </div>
          </div>
        </div>

        {/* Promedio Competencia */}
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-gray-400">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-3 font-medium">Promedio Competencia</p>
            <div className="flex justify-center items-center gap-2 mb-2">
              {[1, 2, 3, 4].map((i) => (
                <Star key={i} className="fill-gray-400 text-gray-400" size={32} />
              ))}
              <Star className="text-gray-300" size={32} />
            </div>
            <p className="text-4xl font-bold text-gray-900 mb-2">4.1</p>
            <p className="text-sm text-gray-600">de 5.0</p>
            <div className="mt-4 bg-gray-100 rounded-lg p-3">
              <p className="text-sm font-bold text-gray-700">Diferencial: +0.5 puntos</p>
            </div>
          </div>
        </div>
      </div>

      {/* Nube de Palabras - Quejas Comunes */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          Palabras Más Mencionadas en Reseñas de Competencia
        </h3>
        <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-lg p-8 border border-red-200">
          <div className="flex flex-wrap justify-center items-center gap-4">
            <span className="text-5xl font-bold text-red-600">SORPRESA</span>
            <span className="text-4xl font-bold text-orange-600">OCULTO</span>
            <span className="text-4xl font-bold text-red-500">ESPERA</span>
            <span className="text-3xl font-bold text-orange-500">POSTVENTA</span>
            <span className="text-3xl font-bold text-red-400">COMISIÓN</span>
            <span className="text-2xl font-semibold text-orange-400">ENGAÑO</span>
            <span className="text-2xl font-semibold text-red-400">TARDADO</span>
            <span className="text-xl font-semibold text-orange-400">CONFUSO</span>
          </div>
        </div>
        <p className="mt-4 text-sm text-gray-600 italic">
          💡 Estos son los puntos de dolor que su equipo debe evitar y usar como ventaja competitiva
        </p>
      </div>

      {/* Distribución de Quejas */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Distribución de Quejas - Competencia</h3>
        <div className="grid grid-cols-2 gap-8">
          {/* Gráfica Circular (simplificada) */}
          <div className="relative">
            <div className="w-64 h-64 mx-auto">
              <svg viewBox="0 0 100 100" className="transform -rotate-90">
                <circle cx="50" cy="50" r="40" fill="none" stroke="#FEE2E2" strokeWidth="20"/>
                <circle 
                  cx="50" cy="50" r="40" fill="none" 
                  stroke="#DC2626" 
                  strokeWidth="20"
                  strokeDasharray="138.23 251.2"
                  className="transition-all duration-1000"
                />
                <circle 
                  cx="50" cy="50" r="40" fill="none" 
                  stroke="#F59E0B" 
                  strokeWidth="20"
                  strokeDasharray="113.04 251.2"
                  strokeDashoffset="-138.23"
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-3xl font-bold text-gray-900">100%</p>
                  <p className="text-sm text-gray-600">Quejas</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Leyenda */}
          <div className="flex flex-col justify-center space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-red-600 rounded-lg"></div>
              <div>
                <p className="font-bold text-gray-900 text-xl">55%</p>
                <p className="text-sm text-gray-600">Quejas sobre Finanzas</p>
                <p className="text-xs text-gray-500">Tasa engañosa, comisiones, enganche</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-orange-500 rounded-lg"></div>
              <div>
                <p className="font-bold text-gray-900 text-xl">45%</p>
                <p className="text-sm text-gray-600">Quejas sobre Servicio</p>
                <p className="text-xs text-gray-500">Tiempo espera, postventa, atención</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 bg-purple-50 border border-purple-200 rounded-lg p-4">
          <p className="text-sm text-purple-900">
            <strong>📊 Insight clave:</strong> El 55% de las quejas son sobre transparencia financiera - tu área de oportunidad diferenciadora
          </p>
        </div>
      </div>

      {/* Alerta de Reseña Negativa */}
      <div className="bg-red-50 border-2 border-red-500 rounded-xl p-6 shadow-lg">
        <div className="flex items-start gap-4">
          <div className="bg-red-600 rounded-full p-3">
            <AlertTriangle className="text-white" size={28} />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-red-900 mb-3">
              🚨 RESEÑA ELEVADA A ALERTA ROJA - Toyota Insurgentes
            </h3>
            
            <div className="bg-white rounded-lg p-5 shadow-sm border border-red-200">
              <div className="flex items-center gap-2 mb-3">
                <Star className="text-red-500 fill-red-500" size={20} />
                {[1, 2, 3, 4].map((i) => (
                  <Star key={i} className="text-gray-300" size={20} />
                ))}
                <span className="ml-2 text-sm text-gray-500">1/5 estrellas</span>
              </div>
              
              <p className="text-gray-800 italic leading-relaxed mb-4 text-lg">
                "Me prometieron la Tasa 0% pero me cobraron{' '}
                <strong className="text-red-600">$18,000 de comisión por apertura</strong>{' '}
                que no estaba en la letra pequeña. Sentí que era un{' '}
                <strong className="text-red-600">FRAUDE</strong>. No recomiendo."
              </p>
              
              <div className="grid grid-cols-3 gap-4 text-sm text-gray-600 border-t pt-3">
                <div>
                  <p className="font-semibold">Cliente:</p>
                  <p>María González</p>
                </div>
                <div>
                  <p className="font-semibold">Fecha:</p>
                  <p>15 Marzo 2024</p>
                </div>
                <div>
                  <p className="font-semibold">Modelo:</p>
                  <p>Corolla 2024</p>
                </div>
              </div>
            </div>

            <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
              <Shield size={20} />
              Usar Script "Transparencia Garantizada"
            </button>
            <p className="mt-2 text-sm text-gray-600 text-center">
              💡 Incluye comparativa CAT y garantía por escrito
            </p>
          </div>
        </div>
      </div>

      {/* Ventaja Competitiva */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl shadow-xl p-6">
        <div className="flex items-center gap-4">
          <CheckCircle size={48} />
          <div>
            <h3 className="text-2xl font-bold mb-2">Su Ventaja: Transparencia Total</h3>
            <p className="text-green-100">
              Mientras la competencia pierde clientes por "sorpresas" y "letra pequeña", 
              usted gana mercado con procesos claros y honestos.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};