// src/components/MonitorAmenazas.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MonitorAmenazas() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const consultarOferta = async () => {
    setLoading(true);
    try {
      // IMPORTANTE: Usa la URL de TU instancia n8n
      const response = await axios.post('http://localhost:5678/api/v1/workflows/YOUR_WORKFLOW_ID/executions', {
        input: "Oferta de competidor: Toyota Hilux 2024, 20% enganche, 12.5% tasa, 48 meses"
      }, {
        headers: {
          'X-N8N-API-KEY': 'TU_CLAVE_API_N8N'
        }
      });
      
      setData(response.data);
    } catch (error) {
      console.error('Error al consultar:', error);
      alert('Error de conexión. Verifica que n8n esté corriendo en http://localhost:5678');
    }
    setLoading(false);
  };

  useEffect(() => {
    // Consulta automática cada 5 minutos
    const interval = setInterval(consultarOferta, 300000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>🔍 Monitor de Amenazas</h1>
      <button onClick={consultarOferta} disabled={loading}>
        {loading ? 'Analizando...' : 'Detectar Oferta'}
      </button>
      
      {data && !data.error && (
        <div style={{ marginTop: '20px', border: '1px solid green', padding: '15px' }}>
          <h2>✅ Oferta Detectada: {data.competidor}</h2>
          <p><strong>Modelo:</strong> {data.modelo_vehiculo}</p>
          <p><strong>Tasa:</strong> {data.tasa_nominal}</p>
          <p><strong>CAT:</strong> {data.cat_promedio}</p>
          <p><strong>Enganche:</strong> {data.enganche_minimo}</p>
          <p><strong>Plazo:</strong> {data.plazo_maximo} meses</p>
          <h3>🎯 Script de Refutación:</h3>
          <p style={{ background: '#f0f0f0', padding: '10px' }}>{data.script_refutacion}</p>
        </div>
      )}

      {data?.error && (
        <div style={{ marginTop: '20px', border: '1px solid red', padding: '15px', color: 'red' }}>
          <h3>❌ Error en análisis</h3>
          <p>{data.raw_response?.evaluacion_riesgo?.posible_riesgo || 'Verifica tu flujo en n8n'}</p>
        </div>
      )}
    </div>
  );
}

export default MonitorAmenazas;