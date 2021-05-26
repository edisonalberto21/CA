import { IListItem } from './ILIstItem';  
import { Categoria } from './Categoria';

export interface ICursosState {  
  items: IListItem[]; 
  Categorias: Categoria[]; 
  filtro: string;
  contador: number,
  seleccion : string,
  
 } 