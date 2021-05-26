import * as React from 'react';
import { ITransaccionesProps } from './ITransaccionesProps';
import 'bootstrap/dist/css/bootstrap.min.css';
import pnp, { sp, Item, ItemAddResult, ItemUpdateResult, Items, ConsoleListener } from "sp-pnp-js";  
import { IListItem } from './IListItem';
import { ITransaccionesState } from './ITransaccionesState'; 


export default class Transacciones extends React.Component<ITransaccionesProps, ITransaccionesState> {
  constructor(props: ITransaccionesProps, state: ITransaccionesState) {                     //Se define el constructor
    super(props);
    this.state = {                                                                   //Estado inicial, array items vacio
      items: [],
      
    };
    this.Trans()     
                                                         //Se ejecuta el método de consulta
   }
  public render(): React.ReactElement<ITransaccionesProps> {
    console.log(this.state.items)
     //Renderiza los elementos de control del slider
     const elementos4: JSX.Element[] = this.state.items.map((item1: IListItem, index: number): JSX.Element => {   //Recorre el primer elemeto del array, para mostrar la primera noticia
      //var url = item1.FileDirRef + "/" + item1.FileLeafRef
     var url = item1.url['Url'] ? item1.url['Url'] : '#'
      
      return (
        <div className="col-lg-6">             
        <a href={url}>
          <div className="card mb-3 shadow  bg-white rounde">
              <div className="row no-gutters">
                <div className="col-2">
                  <img src={item1.icono} className=" mx-auto d-block mt-3" alt="..."/>
                </div>
                <div className="col-8">
                  <div className="card-body p-0 pl-2 pt-2">
                     <h5 className="card-title mb-0 txt-recursos-humanos">{item1.Title}</h5>
                        <p className="text-dark">{item1.Descripcion}</p>
                    </div>
                </div>
                   <div className="col-2">
                    <img className="mx-auto d-block mt-4" src="/sites/conectacarga/PublishingImages/Lists/Accesos/AllItems/ico-transacciones.svg"/>
                  </div>

                <div className="card-footer p-0">
                    <h5 className="txtfotter txt-recursos-humanos font-16 "></h5>
                  </div>
              </div>
            </div>
         </a></div>
     );
   });
   //Render Accesos Inicio
    return (
     <>
     <section id="transacciones" className="my-4" style={{display: this.props.mostrar}}>
    <div className="container-fluid ">
      <div className="row ">
        <div className="col-12">
          <div className="row">
            <div className="col-12 px-4">
                <h5 className="subtite-section">Información</h5>
                <h3 className="title-section ">Transacciones</h3>
                <p>{this.props.description} </p>
              </div>
             
                <div className="container mt-5 pb-5 ">
                  <div className="row">
                 
              
                    {elementos4}
                 
                  </div>
                  </div>
              </div>
           
        </div>

      </div>

</div></section>
     </>
    );
  }


  private Trans(){
    pnp.sp.web.lists.getByTitle(this.props.biblioteca)
      .items.select('Descripcion,Title,icono,FileLeafRef,fileSystemObjectType,FSObjType,FileDirRef,url').orderBy('Created', false).get()    //selecciona los items de la lista 
      .then((items: IListItem[]): void => {
        this.setState({
          items: items
        }); 
    }, (error: any): void => {        //Imprime si existe el error
      console.log(error);
       });
      
  }

}
