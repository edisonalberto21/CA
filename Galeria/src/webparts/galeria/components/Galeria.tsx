import * as React from 'react';
//import ImageGallery from 'react-image-gallery';
import { IGaleriaProps } from './IGaleriaProps';
//import "react-image-gallery/styles/css/image-gallery.css"
//import "react-image-gallery/styles/scss/image-gallery.scss"
import { IListItem } from './IListItem';
import { IGaleriaState } from './IGaleriaState'; 
import pnp, { sp, Item, ItemAddResult, ItemUpdateResult, Items, ConsoleListener } from "sp-pnp-js";  
//import 'bootstrap/dist/css/bootstrap.min.css';
import Popper from 'popper.js';
//import 'bootstrap/dist/js/bootstrap.bundle.min';
import './App.css';

var Contenido = [];

export default class Galeria extends React.Component<IGaleriaProps, IGaleriaState> {

  constructor(props: IGaleriaProps, state: IGaleriaState) {                     //Se define el constructor
    super(props);
    this.state = {                                                                   //Estado inicial, array items vacio
      items: [],
      cambio: this.props.Carpeta.replace(" ","")
    };
      this.GetItems();                                             //Se ejecuta el método de consulta
   }
 
  public render(): React.ReactElement<IGaleriaProps> {
    console.log(this.state.items)
    var contador = 0
    Contenido = [];
 //Renderiza los elementos 
      const elementos: JSX.Element[] = this.state.items.map((item1: IListItem, index: number): JSX.Element => {   //Recorre el primer elemeto del array, para mostrar la primera noticia
        
        var imgcont = item1.FileDirRef + "/" +item1.FileLeafRef + "/" + item1.FileLeafRef + "." + "jpg"
        
        if(item1.FileDirRef.split('/').length == 4 && contador < 3){
          contador ++
          console.log(contador)
         var destino = item1.FileLeafRef.replace(" ","")
        
        return (
         <>
         <div className="card shadow-sm  bg-white rounded mb-2 col-4 col-lg-12 prt" onClick={e => this.setState({ cambio: destino})} id={destino}>
                      <img src={imgcont} className={"card-img-top imgsub" + " " + destino} alt="..."/>
                      <div className="card-body p-1">
                       <p className="card-text text-secondary">{item1.FileLeafRef}</p>
                      </div>
                      <div className="card-footer p-0">
                        <h5 className="font-12 ">{item1.Created.split('T')[0]}</h5>
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
      
      var inv = item1.FileDirRef.split("/")[4] ? item1.FileDirRef.split("/")[4].replace(" ","") : ""
      
      var active = t===0 ? "active" : ""; 
      var imagen = item1.FileDirRef + "/" + item1.FileLeafRef
      if(inv.toLowerCase().indexOf(this.state.cambio.toLowerCase())!= -1 ){
       
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
        <div className="col-12 col-xl-12">
            <h5 className="subtite-section ">Información</h5>
            <h3 className="title-section ">Galería de Imágenes</h3>
            <p>Encuentra las Fotografías de Carga S.A.S</p>
            <div className="row">
          <div className="col-lg-9 shadow-sm mb-2 bg-white rounded">
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
               <p>{Contenido}</p>
                  <div className="card-footer p-0 pbfoot">
                      <a href="/sites/conectacarga/Paginas/Galería.aspx"><span className="spfoo">Ver Galería<i className="far fa-play-circle nas"></i></span></a>
                    </div>
            </div>

            <div className="col-lg-3 row">
                {elementos}
            </div>
          </div>

        </div>
        </>
    );
  }


   private GetItems(){
    pnp.sp.web.lists.getByTitle('ImagenesCarga')
      .items.select('Created,FileLeafRef,fileSystemObjectType,FSObjType,FileDirRef,Contenido').orderBy('Created', false).get()    //selecciona los items de la lista 
      .then((items: IListItem[]): void => {
        this.setState({
          items: items
        }); 
    }, (error: any): void => {        //Imprime si existe el error
      console.log(error);
       });
      
  }

  private mensaje1(ca){

     console.log(ca.target.className.split(" ")[1]);
   //jQuery('#message-text1').html(ca.target.className);
   } 

}
