// Tipos de datos de Supabase
export interface Alerta {
  id: number;
  timestamp: string;
  tipo_alerta: string | null;
  competidor: string | null;
  promocion: string | null;
  umbral: string | null;
  accion: string | null;
  created_at: string;
  agencia_cliente_id: number | null;
  activo: boolean;
  tipo: string | null;
  titulo: string | null;
  tiempo: string | null;
}

export interface Competidor {
  id: number;
  agencia_cliente_id: number | null;
  nombre_competidor: string | null;
  marca: string | null;
  url_promociones: string | null;
  created_at: string;
  segmento: string | null;
  ultima_actualizacion: string;
  ubicacion: string;
  tasa_actual: number;
  promocion_activa: string;
  nombre: string | null;
}

export interface KPI {
  id: number;
  metrica: string;
  valor_actual: number | null;
  valor_competencia: number | null;
  diferencial: number | null;
  updated_at: string;
}

export interface Metrica {
  id: string;
  tipo: string | null;
  valor: number | null;
  tendencia: string | null;
  fecha: string;
  descripcion: string | null;
}