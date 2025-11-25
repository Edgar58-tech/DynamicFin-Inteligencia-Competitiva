import React from 'react';
import { AlertTriangle, Bell, MessageSquare, ArrowRight, Shield } from 'lucide-react';
import { Alerta } from '../types/supabase';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

interface AlertViewProps {
  alertas: Alerta[];
}

// Función mejorada para parsear la promoción con múltiples intentos
const parsePromocion = (promocion: string | null): any => {
  if (!promocion) return null;
  
  // Intento 1: Parsear directamente como JSON limpio
  try {
    const parsed = JSON.parse(promocion);
    return parsed;
  } catch (error1) {
    // Intento 2: Limpiar caracteres de escape y parsear
    try {
      let cleaned = promocion
        .replace(/\\"/g, '"')     // Reemplazar \" por "
        .replace(/\\n/g, ' ')     // Reemplazar \n por espacio
        .replace(/\n/g, ' ')      // Reemplazar saltos de línea
        .replace(/\\/g, '')       // Eliminar backslashes solitarios
        .trim();
      
      const parsed = JSON.parse(cleaned);
      return parsed;
    } catch (error2) {
      // Intento 3: Extraer JSON de dentro de un string
      try {
        // Buscar patrón {"content":{"partb":[{"text":"AQUI_ESTA_EL_JSON"
        const match = promocion.match(/"text"\s*:\s*"({[^}]+}[^"]*})"/);
        if (match && match[1]) {
          const jsonStr = match[1]
            .replace(/\\"/g, '"')
            .replace(/\\n/g, ' ')
            .replace(/\\/g, '');
          const parsed = JSON.parse(jsonStr);
          return parsed;
        }
      } catch (error3) {
        console.warn('Intento 3 falló');
      }
      
      // Intento 4: Extracción manual con regex
      try {
        const extraerCampo = (campo: string) => {
          const regex = new RegExp(`"${campo}"\\s*:\\s*"([^"]*)"`, 'i');
          const match = promocion.match(regex);
          return match ? match[1] : null;
        };
        
        const competidor = extraerCampo('competidor');
        const tasa = extraerCampo('tasa_nominal');
        const cat = extraerCampo('cat_promedio');
        const beneficio = extraerCampo('beneficio_principal');
        const modelo = extraerCampo('modelo_vehiculo');
        const enganche = extraerCampo('enganche_minimo');
        const plazo = extraerCampo('plazo_maximo');
        const script = extraerCampo('script_refutacion');
        const riesgo = extraerCampo('posible_riesgo');
        const transparencia = extraerCampo('nivel_transparencia');
        
        if (competidor || tasa || beneficio) {
          return {
            analisis_oferta: {
              competidor,
              tasa_nominal: tasa,
              cat_promedio: cat,
              beneficio_principal: beneficio,
              modelo_vehiculo: modelo,
              enganche_minimo: enganche,
              plazo_maximo: plazo
            },
            sales_enablement: {
              script_refutacion: script
            },
            evaluacion_riesgo: {
              posible_riesgo: riesgo,
              nivel_transparencia: transparencia
            }
          };
        }
      } catch (error4) {
        console.error('Todos los intentos de parseo fallaron');
      }
    }
  }
  
  // Si todo falla, devolver el texto crudo
  console.error('No se pudo parsear la promoción:', promocion?.substring(0, 100));
  return { 
    texto_simple: promocion,
    error_parsing: true 
  };
};

export const AlertView: React.FC<AlertViewProps> = ({ alertas }) => {
  const alertasCriticas = alertas.filter(a => a.tipo === 'critica');
  const alertasNormales = alertas.filter(a => a.tipo !== 'critica');

  return (
    <div className="space-y-6">
      {/* Alertas Críticas */}
      {alertasCriticas.map((alerta) => {
        const promocionData = parsePromocion(alerta.promocion);
        const analisisOferta = promocionData?.analisis_oferta || {};
        const evaluacionRiesgo = promocionData?.evaluacion_riesgo || {};
        const salesEnablement = promocionData?.sales_enablement || {};

        return (
          <div 
            key={alerta.id}
            className="bg-white rounded-xl shadow-2xl border-l-4 border-red-600 p-6 animate-slide-in"
          >
            <div className="flex items-start gap-4">
              <div className="bg-red-100 rounded-full p-3">
                <AlertTriangle className="text-red-600" size={28} />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-gray-900">
                    🚨 {alerta.titulo || 'ALERTA CRÍTICA: TASA AGRESIVA DETECTADA'}
                  </h3>
                  <span className="text-sm text-gray-500 whitespace-nowrap ml-4">
                    {alerta.timestamp && formatDistanceToNow(new Date(alerta.timestamp), { 
                      addSuffix: true, 
                      locale: es 
                    })}
                  </span>
                </div>
                
                <div className="space-y-3 bg-red-50 rounded-lg p-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600 font-medium">⚡ COMPETIDOR:</p>
                      <p className="text-lg font-bold text-gray-900">
                        {analisisOferta.competidor || alerta.competidor || 'N/A'}
                      </p>
                      {analisisOferta.modelo_vehiculo && (
                        <p className="text-sm text-gray-600">
                          Modelo: {analisisOferta.modelo_vehiculo}
                        </p>
                      )}
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 font-medium">📊 PROMOCIÓN:</p>
                      <p className="text-lg font-bold text-red-600">
                        {analisisOferta.tasa_nominal 
                          ? `Tasa ${analisisOferta.tasa_nominal}` 
                          : analisisOferta.beneficio_principal 
                          || promocionData?.texto_simple 
                          || alerta.promocion 
                          || 'N/A'}
                      </p>
                      {analisisOferta.cat_promedio && (
                        <p className="text-xs text-gray-600 mt-1">
                          CAT: {analisisOferta.cat_promedio}
                        </p>
                      )}
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 font-medium">🎯 TIPO:</p>
                      <p className="text-lg font-bold text-gray-900">
                        {analisisOferta.tipo_financiamiento || alerta.umbral || 'N/A'}
                      </p>
                      {analisisOferta.plazo_maximo && (
                        <p className="text-xs text-gray-600 mt-1">
                          Plazo: {analisisOferta.plazo_maximo}
                        </p>
                      )}
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 font-medium">💰 ACCIÓN:</p>
                      <p className="text-lg font-bold text-blue-600">
                        {alerta.accion || 'Revisar estrategia'}
                      </p>
                      {analisisOferta.enganche_minimo && (
                        <p className="text-xs text-gray-600 mt-1">
                          Enganche: {analisisOferta.enganche_minimo}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Detalles adicionales de la oferta */}
                  {analisisOferta.beneficio_principal && (
                    <div className="mt-4 bg-orange-50 border border-orange-200 rounded-lg p-3">
                      <p className="text-sm font-semibold text-orange-900">
                        🎁 Beneficio Principal:
                      </p>
                      <p className="text-sm text-orange-800 mt-1">
                        {analisisOferta.beneficio_principal}
                      </p>
                    </div>
                  )}

                  {/* Script de refutación */}
                  {salesEnablement.script_refutacion && (
                    <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <p className="text-sm font-semibold text-blue-900">
                        💬 Script de Refutación:
                      </p>
                      <p className="text-sm text-blue-800 mt-1 italic">
                        "{salesEnablement.script_refutacion}"
                      </p>
                    </div>
                  )}

                  {/* Riesgo detectado */}
                  {evaluacionRiesgo.posible_riesgo && (
                    <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                      <p className="text-sm font-semibold text-yellow-900">
                        ⚠️ Riesgo Detectado:
                      </p>
                      <p className="text-sm text-yellow-800 mt-1">
                        {evaluacionRiesgo.posible_riesgo}
                      </p>
                      <p className="text-xs text-yellow-700 mt-1">
                        Transparencia: {evaluacionRiesgo.nivel_transparencia || 'N/A'}
                      </p>
                    </div>
                  )}
                </div>

                <button className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2">
                  <MessageSquare size={20} />
                  Ver Guion de Refutación Rápida
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>
          </div>
        );
      })}

      {/* Alertas Normales */}
      {alertasNormales.map((alerta) => {
        const promocionData = parsePromocion(alerta.promocion);
        const analisisOferta = promocionData?.analisis_oferta || {};

        return (
          <div key={alerta.id} className="bg-white rounded-xl shadow-xl p-6">
            <div className="border-b pb-4 mb-4">
              <div className="flex items-center gap-3 mb-2">
                <Bell className="text-orange-500" size={24} />
                <h4 className="text-lg font-bold text-gray-900">
                  ⚠️ {alerta.titulo || 'ALERTA: Acción Inmediata'}
                </h4>
              </div>
              <p className="text-sm text-gray-500">
                De: Sistema Inteligencia Competitiva → Para: Equipo Ventas
              </p>
            </div>

            <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-5 border border-orange-200">
              <h5 className="font-bold text-gray-900 mb-4 text-lg">
                Alerta Competitiva - Acción Inmediata
              </h5>
              
              <div className="grid grid-cols-2 gap-4 bg-white rounded-lg p-4 shadow-sm">
                <div className="border-r border-gray-200 pr-4">
                  <p className="text-sm text-gray-600 mb-1">Competidor</p>
                  <p className="font-bold text-gray-900">
                    {analisisOferta.competidor || alerta.competidor || 'N/A'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Promoción</p>
                  <p className="font-bold text-red-600">
                    {analisisOferta.beneficio_principal 
                      || promocionData?.texto_simple 
                      || alerta.promocion 
                      || 'N/A'}
                  </p>
                </div>
                <div className="border-r border-gray-200 pr-4">
                  <p className="text-sm text-gray-600 mb-1">Umbral</p>
                  <p className="font-bold text-orange-600">{alerta.umbral || 'ALTA PRIORIDAD'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Tiempo Respuesta</p>
                  <p className="font-bold text-gray-900">&lt; 2 horas</p>
                </div>
              </div>

              <div className="mt-4 bg-blue-50 rounded-lg p-4 border border-blue-200">
                <p className="font-semibold text-gray-900 mb-2">📋 Acción Recomendada:</p>
                <p className="text-gray-700 italic">
                  {alerta.accion || '"Usar Script de Respuesta Estándar"'}
                </p>
              </div>

              <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
                <Shield size={20} />
                Abrir Script de Respuesta
              </button>
            </div>
          </div>
        );
      })}

      {alertas.length === 0 && (
        <div className="bg-white rounded-xl shadow-lg p-12 text-center">
          <Bell className="mx-auto text-gray-300 mb-4" size={64} />
          <h3 className="text-2xl font-bold text-gray-600 mb-2">
            No hay alertas activas
          </h3>
          <p className="text-gray-500">
            El sistema está monitoreando la competencia en tiempo real
          </p>
        </div>
      )}
    </div>
  );
};