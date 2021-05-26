import * as React from 'react';
import pnp, { sp, Item, ItemAddResult, ItemUpdateResult, Items, ConsoleListener } from "sp-pnp-js"; 
import { IGaleriaIntProps } from './IGaleriaIntProps';
import './App.css';
import { IGaleriaState } from './IGaleriaState';
import { IListItem } from './IListItem';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';


var Contenido = [];

export default class GaleriaInt extends React.Component<IGaleriaIntProps, IGaleriaState> {

  constructor(props: IGaleriaIntProps, state: IGaleriaState) {                     //Se define el constructor
    super(props);
    this.state = {                                                                   //Estado inicial, array items vacio
      items: [],
      cambio: this.props.Carpeta
    };
      this.GetItems();                                             //Se ejecuta el método de consulta
   }

  public render(): React.ReactElement<IGaleriaIntProps> {
   
   
    Contenido = [];
 //Renderiza los elementos 
      const elementos: JSX.Element[] = this.state.items.map((item1: IListItem, index: number): JSX.Element => {   //Recorre el primer elemeto del array, para mostrar la primera noticia
        
        var imgcont = item1.FileDirRef + "/" +item1.FileLeafRef + "/" + item1.FileLeafRef + "." + "jpg"
       
        if(item1.FileDirRef.split('/').length == 4){
         
         var destino = item1.FileLeafRef.replace(" ","")
         
        return (
         <>
                 <div className="card col-6 col-lg-4 lineas" style={{width: "18rem"}}>
                  <img src={imgcont} className="card-img-top" alt="..."/>
                  <div className="card-body">
                    <h5 className="card-title">{item1.FileLeafRef}</h5>
                      <p className="card-text">{item1.Contenido}</p>
                    <a href="#"  data-toggle="modal" data-target="#exampleModalCenter" onClick={e => this.setState({ cambio: item1.FileLeafRef})} id={item1.FileLeafRef}  className="btn btn-primary">Ver Galería</a>
                  </div>
                </div>

         </>
       );
        }
     });
     //Fin Render 

     //Inicio Slider
     var t =0
     const slider: JSX.Element[] = this.state.items.map((item1: IListItem, index: number): JSX.Element => {   //Recorre el primer elemeto del array, para mostrar la primera noticia
      
       // var inv = item1.FileDirRef.split("/")[4] ? item1.FileDirRef.split("/")[4].replace(" ","") : ""
       var inv = item1.FileDirRef.split("/")[4] ? item1.FileDirRef.split("/")[4] : ""
       var active = t===0 ? "active" : ""; 
       
        
        if(inv.toLowerCase().indexOf(this.state.cambio.toLowerCase())!= -1 ){
          var imagen = item1.FileDirRef + "/" + item1.FileLeafRef
          console.log(imagen)
          t++
        Contenido.push(item1.Contenido)
       
      return (
       <>
      <div className={"carousel-item" + " " + active}>
         <img src={imagen} className="d-block imgslider" alt="..."/>
      </div>
      </>
       );
      }
   });

     //Fin Slider
     
    const indicadores: JSX.Element[] = this.state.items.map((item1: IListItem, index: number): JSX.Element => {   //Recorre el primer elemeto del array, para mostrar la primera noticia

      var inv = item1.FileDirRef.split("/")[4] ? item1.FileDirRef.split("/")[4].replace(" ","") : ""
      var active = t===0 ? "active" : ""; 
     
      if(inv.toLowerCase().indexOf(this.state.cambio.toLowerCase())!= -1 ){
        t++
        
      return (
        <>
      <li data-target="#carouselExampleIndicators" data-slide-to={index} className={active}></li>
      </>
        );
      }
    });  
    return (
      <>
      <div className="bvc row">
      {elementos}
       </div>
<button type="button" id="btnmodal" style={{display:'none'}} className="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter"></button>


<div className="modal fade" id="exampleModalCenter"  role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5>Galería de Imagenes</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
      <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                <ol className="carousel-indicators">
                  {indicadores}
                </ol>
                <div className="carousel-inner">
                  {slider}
                </div>
                <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                  <span className="carousel-control-next-icon" aria-hidden="true"></span>
                  <span className="sr-only">Next</span>
                </a>
              </div>
        </div>
      </div>
  </div>
</div>
      </>
  );
}

private GetItems(){
  pnp.sp.web.lists.getByTitle('ImagenesCarga')
    .items.select('Created,FileLeafRef,fileSystemObjectType,FSObjType,FileDirRef,Contenido').top(999).get()    //selecciona los items de la lista 
    .then((items: IListItem[]): void => {
      this.setState({
        items: items
      }); 
  }, (error: any): void => {        //Imprime si existe el error
    console.log(error);
     });
    
}

private abrir(){

   
 //jQuery('#message-text1').html(ca.target.className);
 } 
  }

