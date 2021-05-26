import * as React from 'react';
import { IClasificadosProps } from './IClasificadosProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { IListItem } from './IListItem';
import pnp, { sp, Item, ItemAddResult, ItemUpdateResult, Items, ConsoleListener } from "sp-pnp-js";  
import { IClasificadosState } from './IClasificadosState'; 
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';




export default class Clasificados extends React.Component<IClasificadosProps,IClasificadosState> {

  constructor(props: IClasificadosProps, state: IClasificadosState) {                     //Se define el constructor
    super(props);
    this.state = {                                                                   //Estado inicial, array items vacio
      items: [],
      
 }
    this.Clasificados()  
                                                        //Se ejecuta el método de consulta
   }

   //Metodo para convertir el campo Imagen
   public _renderCurrencies(imgitem) {                                                       //Funcion para mostrar la imagen de la lista 
    var img = document.createElement('div');
    img.innerHTML = imgitem;
    return img.getElementsByTagName('img')[0].getAttribute("src");
  }

  public render(): React.ReactElement<IClasificadosProps> {
   
   console.log(this.state.items)
  //inicio Componente
  const items: JSX.Element[] = this.state.items.map((item: IListItem, i: number): JSX.Element => {   //Recorre el primer elemeto del array, para mostrar la primera noticia
   
    var Fecha = item.Created.split("T")[0]
    var url = "/sites/conectacarga/Lists/Clasificados/Attachments/"+item.Id+"/"+item.NombreImagen+""
    console.log(url)
 return (
       <>
        <div className="col-6">
                <div className="card  shadow-sm  bg-white mb-3">
                      <img src={url} className="card-img-top" alt="..."/>
                      <div className="card-body p-1">
                       <p className="card-text text-secondary">{item.Title}</p>
                       <p className="card-text text-secondary">{item.Descripcion}</p>
                        <p className="card-text text-secondary"><strong>Info: </strong>{item.Info}</p>
                      </div>
                      <div className="card-footer p-0">
                      <h5 className="font-12 ">{Fecha}</h5>
                        </div>
                    </div>
                  </div>
         </>
     );
    
  });
   //fin Componente

    return (
      <>
      <div className="col-12 col-xl-12 clasif">
            <h5 className="subtite-section ">Información</h5>
            <h3 className="title-section ">Clasificados Carga</h3>
            <p>{this.props.description}</p>
            <div className="row shadow p-1 mb-5 bg-white rounded">
                {items}
            <div className="col-6" style={{cursor: 'pointer'}}><a href="/sites/conectacarga/Paginas/clasificados.aspx">
              <img src={this.props.imagen} style={{width:'100%'}}/></a></div>
             </div>

        </div>
      </>
    );
  }
  //Inicio Método
  private Clasificados(){
    pnp.sp.web.lists.getByTitle('Clasificados')
      .items.top(3).orderBy('Created', false).filter("Aprobado eq '1'").get()    //selecciona los items de la lista 
      .then((items: IListItem[]): void => {
        this.setState({
          items: items
        }); 
    }, (error: any): void => {        //Imprime si existe el error
      console.log(error);
       });
      
  }
  //Fin Método
}
