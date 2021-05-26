import * as React from 'react';
import { ICursosProps } from './ICursosProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { IListItem } from './ILIstItem';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import pnp, { sp, Item, ItemAddResult, ItemUpdateResult, Items, ConsoleListener } from "sp-pnp-js"; 
import $ from 'jquery';
import * as moment from 'moment';
import { ICursosState } from './ICursosState';
import { Categoria } from './Categoria';

var i = 0
export default class Cursos extends React.Component<ICursosProps, ICursosState > {

  constructor(props: ICursosProps, state: ICursosState) {                     //Se define el constructor
    super(props);
    this.state = {                                                                   //Estado inicial, array items vacio
      items: [],
      Categorias:[],
      filtro: "",
      contador : 12,
      seleccion: "Educación Vial",
      

      
    };
     this.Cursos()  
     this.Categorias();                                          //Se ejecuta el método de consulta
   }

  public render(): React.ReactElement<ICursosProps> {
    
    console.log(this.state.items)
    moment.locale('es');
    var tr = this.state.items.slice(this.state.contador)
  //Renderiza los elementos de control del slider
  const curs: JSX.Element[] = this.state.items.map((item1: any, index: number): JSX.Element => {   //Recorre el primer elemeto del array, para mostrar la primera noticia
    var mes = moment(item1.Fecha, ["MM-DD-YYYY", "YYYY-MM-DD", "DD/MM/YYYY", "MM/DD/YYYY"]).format('MMMM');
    var dia = moment(item1.Fecha, ["MM-DD-YYYY", "YYYY-MM-DD", "DD/MM/YYYY", "MM/DD/YYYY"]).format('DD');
    var anio = moment(item1.Fecha, ["MM-DD-YYYY", "YYYY-MM-DD", "DD/MM/YYYY", "MM/DD/YYYY"]).format('YYYY');
    var urlpdf = item1.FileDirRef + "/" + item1.FileLeafRef
    var urls = "/sites/conectacarga/Paginas/videos.aspx?Buscar="+item1.Id
    var urlvideo = item1.UrlVideo ? item1.UrlVideo['Url'] : ''
    var url = item1.FileLeafRef.indexOf('.url') == -1 ? urlpdf : urls
    var filtro = this.state.filtro == 'Filtar por:' ? "" : this.state.filtro;
    if( item1.Categorias['Title'].toLowerCase().indexOf(filtro.toLowerCase())!= -1){ 
   
    return (
    <>
   <div className="col-xl-4 col-md-4 col-12 mb-4 ">
                
                <div className="card shadow-sm  bg-white rounded"><a href={url} target="_blank">
                   <div className="cont-fecha" style={{background:item1.Categorias['Color']}}><h3 className="tith">{dia}</h3>{mes}<br/>
                    {anio}</div>
                     <img src={item1.imagen} className="card-img-top" alt="..."/>
                     <div className="card-body">
                         <h5 className="card-title">{item1.Title}</h5>
                         <p className="card-text text-secondary">{item1.Descripcion}</p>
                     </div>
                     <div className="card-footer p-0">
                      <h5 className="txtfotter font-16 " style={{color:item1.Categorias['Color']}}>{item1.Categorias['Title']}</h5>
                       </div>
                       </a>  
                   </div>
              </div>
        </>
      );
    }
 });
   ///ini
   const cat: JSX.Element[] = this.state.Categorias.map((item: Categoria, i: number): JSX.Element => {   //Recorre el primer elemeto del array, para mostrar la primera noticia
     
    return(
      <>
      <option>{item.Title}</option>
      
    </>
    )

 });
 //fin
 //Render Accesos Inicio

    
    return (
      <>
       <section className="mt-5">
  <div className="container-fluid">
    <div className="row">
        <div className="col-12 ">
          <h3 className="title-section ">Histórico de cursos</h3>
          <div className="container">
           <div className="row">
          <div className="form-group col ">
          <select className="form-control col-5 float-right" id="exampleFormControlSelect1" onChange={e => this.setState({ filtro:e.target.value })}>
        <option>Filtar por:</option> 
             {cat}
             </select>

            </div>
          </div>
          </div>
          <div className="card-group">
              {curs}
           </div>
          
          

        </div>
        </div>
      </div>
</section>
      </>
    );
  }

  public Cursos(){
    pnp.sp.web.lists.getByTitle('UniversidadCarga')
      .items.select('Title,Descripcion,Id,FileLeafRef,fileSystemObjectType,FSObjType,FileDirRef,Fecha,UrlVideo,imagen,Categorias/Title,Categorias/Color&$expand=Categorias').top(12).orderBy('Fecha', false).get()    //selecciona los items de la lista 
      .then((items: IListItem[]): void => {
        this.setState({
          items: items
        }); 
    }, (error: any): void => {        //Imprime si existe el error
      console.log(error);
       });
      
      }

      private Categorias(){
  
        pnp.sp.web.lists.getByTitle('CategoriasUniversidadCarga')
          .items.orderBy('Created', false).get()    //selecciona los items de la lista 
          .then((items: Categoria[]): void => {
            this.setState({
              Categorias: items
            }); 
        }, (error: any): void => {        //Imprime si existe el error
          console.log(error);
           });
          
      }
  
    private Cargar(){
       console.log(this.state.items)
    }
}
