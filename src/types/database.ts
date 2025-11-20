export interface Alerta {
  id: string
  created_at: string
  tipo: 'critica' | 'advertencia' | 'info'
  titulo: string
  competidor: string
  promocion: string
  umbral: string
  accion: string
  tiempo: string
  activo: boolean
}

export interface Competidor {
  id: string
  nombre: string
  ubicacion: string
  marca: string
  tasa_actual: number
  promocion_activa: string
  ultima_actualizacion: string
}

export interface Metrica {
  id: string
  tipo: string
  valor: number
  tendencia: 'sube' | 'baja' | 'estable'
  fecha: string
  descripcion: string
}

export interface Configuracion {
  id: string
  tasa_maxima: number
  tasa_minima: number
  umbral_alerta: number
  email_notificaciones: string
  frecuencia_monitoreo: string
}