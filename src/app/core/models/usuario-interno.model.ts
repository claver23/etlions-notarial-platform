export type RolInterno = 'admin' | 'notario' | 'validador' | 'asistente';
export type EstadoUsuarioInterno = 'activo' | 'invitado' | 'revocado';

export interface UsuarioInterno {
  id: string;
  nombre: string;
  correo: string;
  rol: RolInterno;
  estado: EstadoUsuarioInterno;
  ultimoAcceso?: string;
  invitadoEl?: string;
}
