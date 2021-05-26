import * as React from 'react';
import { IProcesosProps } from './IProcesosProps';
import './App.css';
import { IListItem } from './IListItem';
import { IProcesosState } from './IProcesosState'; 
import pnp, { sp, Item, ItemAddResult, ItemUpdateResult, Items, ConsoleListener } from "sp-pnp-js";  
import 'bootstrap/dist/css/bootstrap.min.css';



export default class Procesos extends React.Component<IProcesosProps, IProcesosState> {

  constructor(props: IProcesosProps, state: IProcesosState) {                     //Se define el constructor
    super(props);
    this.state = {                                                                   //Estado inicial, array items vacio
      items: [],
      
    };
          this.Procesos()                                              //Se ejecuta el método de consulta
   }


   public _renderCurrencies(imgitem) {                                                       //Funcion para mostrar la imagen de la lista 
    var img = document.createElement('div');
    img.innerHTML = imgitem;
    return img.getElementsByTagName('img')[0].getAttribute("src");
}

  public render(): React.ReactElement<IProcesosProps> {

    const elementos6: JSX.Element[] = this.state.items.map((item1: any, index: number): JSX.Element => {   //Recorre el primer elemeto del array, para mostrar la primera noticia
  
      
      return (
       <>
        <section id="gestion-procesos" className="py-5">
        <div className="container-fluid">
          <div className="row">
            
            <div className="col-lg-7 col-md-12 mt-5">
              <h5 className="subtite-section">Información</h5>
              <h3 className="title-section ">{item1.Title}</h3>
              <div className="justi" dangerouslySetInnerHTML={{__html: item1.contenido}}></div> 
            </div>

            <div className="col-lg-5 col-md-12">
                <img className="w-100 mx-auto d-block" src={this._renderCurrencies(item1.imagen)}/>
              </div>
          </div>
        </div>
      </section>
       </>
     );
   });

    return (
     <>
       {elementos6}
     </>
    );
  }
  public Procesos(){     
    pnp.sp.web.lists.getByTitle(this.props.description)
      .items.select('Title,imagen,contenido').get()    //selecciona los items de la lista 
      .then((items: IListItem[]): void => {
        this.setState({
          items: items
        }); 
    }, (error: any): void => {        //Imprime si existe el error
      console.log(error);
       });
      
  }
}
