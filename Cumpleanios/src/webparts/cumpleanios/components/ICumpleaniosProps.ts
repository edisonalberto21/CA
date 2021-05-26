import { WebPartContext } from '@microsoft/sp-webpart-base';
import { ClientMode } from './ClientMode';

export interface ICumpleaniosProps {
  clientMode: ClientMode;
  context: WebPartContext;
  ruta: string;
  celebracion: string; 
  numeromodulo: number;
  titulo: string;
  ocultar: string;
  
 }