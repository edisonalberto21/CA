import * as React from 'react';
import { IEventosProps } from './IEventosProps';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/js/bootstrap.min.js';
import pnp, { sp, Item, ItemAddResult, ItemUpdateResult, Items, ConsoleListener, CamlQuery } from "sp-pnp-js";
import * as jQuery from 'jquery';
import 'bootstrap/js/dist/collapse.js';
import { IEventosState } from './IEventosState'; 
import { IListItem } from './IListItem';
import * as moment from 'moment';

export default class Eventos extends React.Component<IEventosProps, IEventosState> {
  constructor(props: IEventosProps, state: IEventosState) {                     //Se define el constructor
    super(props);
    this.state = {                                                                   //Estado inicial, array items vacio
      items: [],
      
    };
    this.Eventos('semana');     
                                                      //Se ejecuta el método de consulta
   }

   public _renderCurrencies(imgitem) {                                                       //Funcion para mostrar la imagen de la lista 
    var img = document.createElement('div');
    img.innerHTML = imgitem;
    return img.getElementsByTagName('img')[0].getAttribute("src");
}

componentDidMount() {
  this.Eventos('mes')
  
}

private interna(id){

  window.location.href = this.props.siteUrl+"/Paginas/eventos.aspx?Buscar="+id;             //Abre una interna filtrada por la clase especificada
}

  public render(): React.ReactElement<IEventosProps> {
    console.log(this.state.items)
    const { titulo='Historial de eventos', descripcion='Encuentra los eventos de tu interes dentro de la compañia' } = this.props;
    moment.locale('es');
   
    const elementos: JSX.Element[] = this.state.items.map((item1: IListItem, i: number): JSX.Element => {   //Recorre el primer elemeto del array, para mostrar la primera noticia
      

    var Horario = new Date().getHours() +":"+ new Date().getMinutes() +":00Z";
      const fecha =item1.Fecha ? item1.Fecha : ""; 
      const fechaGrupo1 = item1.Grupo1 ? item1.Grupo1 : ""
      const fechaGrupo2 = item1.Grupo2 ? item1.Grupo2 : ""
      
      //nombredia Inicio
      var nombreDia = newFunction(fecha);
      //Fin nombredia
      //inicio #dia
      var dia = moment(fecha, ["MM-DD-YYYY", "YYYY-MM-DD", "DD/MM/YYYY", "MM/DD/YYYY"]).format('DD'); 
      //Fin #dia
      //Inicio Mes
      var mes = moment(fecha, ["MM-DD-YYYY", "YYYY-MM-DD", "DD/MM/YYYY", "MM/DD/YYYY"]).format('MMMM');
      var miMes = mes.toUpperCase().charAt(0) + mes.substring(1,mes.length);
      //fin Mes
      //inicio Hora
      var horarioinicial = newFunction_1(fecha); //fin hora
      var fechaRgrupo1 = newFunction_1(fechaGrupo1);
      var fechaRgrupo2 = newFunction_1(fechaGrupo2);
      
      return (
        <div className="card ">
        <div className="card-header shadow-sm p-1 mb-2 bg-white rounded" id="headingOne">
          <h2 className="mb-0 text-left">
            <button className="btn btn-link text-left collapsed" type="button" data-toggle="collapse" data-target={"#collapseOne"+i} aria-expanded="false" aria-controls="collapseOne">
             <h5 className="mb-0">{nombreDia}, {dia} {miMes} de  2020</h5>
                 <p className="mb-0">{item1.Title}</p>
            </button>
            <span>{horarioinicial}</span>
          </h2>
        </div>
    
        <div id={"collapseOne"+i} className="collapse" aria-labelledby="headingOne" data-parent="#accordionExample" >
          <div className="row row-striped medio" onClick={() => this.interna(item1.Id)}>
             <div className="col-xs-1 text-center bg-fecha-date pad-v-15 mini" ></div>
               <div className="col-xs-4 pad-0 text-center">
                 <div className="row imgp"  ><img className="eventoimg" src={this._renderCurrencies(item1.imagen)}/>
             </div>
           </div>
      <div className="col-xs-12 col-md-8 conten"><h5 className="titulo-evento">{item1.Descripcion}</h5>
        <ul className="list-inline">
          <li className="list-inline-item"><strong>Agencia: </strong>{item1.Agencia}</li><br/>
          <li className="list-inline-item"><strong>Lugar: </strong>{item1.Lugar}</li><br/>
          <li className="list-inline-item"><strong>Grupo 1: </strong>{fechaRgrupo1}</li><br/>
          <li className="list-inline-item"><strong>Grupo 2: </strong>{fechaRgrupo2}</li>
        </ul>
          </div>
         </div>
        </div>
      </div>
    );
  });
    return (
  <>
  <div className="col-lg-12 col-12 shadow p-3 mb-0 bg-white rounded">
              <h5 className="subtite-section">Información</h5>
    <h3 className="title-section mb-4">{titulo}</h3>
                    <p>{descripcion}</p>
                    <div className="row no-gutters">
                      <ul className="nav nav-tabs col-12" id="myTab" role="tablist">
                          <li className="nav-item">
                            <a className="nav-link  linkevento" id="home-tab" data-toggle="tab" href="#eventsemana" onClick={() => this.Eventos('semana')} role="tab" aria-controls="home" aria-selected="true">Esta Semana</a>
                          </li>
                          <li className="nav-item">
                            <a className="nav-link linkevento active" id="profile-tab"  data-toggle="tab" href="#eventmes" onClick={() => this.Eventos('mes')} role="tab" aria-controls="profile" aria-selected="false">Este Mes</a>
                          </li>
                          <li className="nav-item">
                            <a className="nav-link linkevento" id="contact-tab" data-toggle="tab" href="#eventfull" onClick={() => this.Eventos('todos')} role="tab" aria-controls="contact" aria-selected="false">Todos los eventos</a>
                          </li>
                        </ul>
                    </div>
     
          <div className="tab-content cont-eventos" id="myTabContent">
            
            <div className="tab-pane fade show active" id="eventsemana" role="tabpanel" aria-labelledby="home-tab">
                <div className="accordion" id="accordionExample">

                  {elementos}
                    
                  </div>
      
              </div>
              
              
              
            <div className="tab-pane fade" id="eventmes" role="tabpanel" aria-labelledby="profile-tab">
              <div className="tab-pane fade show active" id="eventmes" role="tabpanel" aria-labelledby="home-tab">
      
              {elementos}
             
              </div>
              </div>
              
              
            <div className="tab-pane fade" id="eventfull" role="tabpanel" aria-labelledby="contact-tab">
              <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
               
              {elementos}

              </div>
              </div>

          </div>           
          </div>
  </>
    );
  }

  private Eventos(data){                  //Hace la consulta a la lista eventos, organizada en forma descendente, por encima de la fecha actual
    
  
    var Fecha = new Date().toISOString();    //Toma el tiempo actual, para hacer el query actualizado
    Fecha = Fecha.split('T')[0];
    var Horario = new Date().getHours() +":"+ new Date().getMinutes() +":00Z";
   
    var fechaActual = new Date().toISOString(); 
    var mes = moment(fechaActual, ["MM-DD-YYYY", "YYYY-MM-DD", "DD/MM/YYYY", "MM/DD/YYYY"]).format('MM');
    
    var xml = "";
    if(data==='todos'){
      xml = "<View>"+
    "<ViewFields>"+
        "<FieldRef Name='Title'/>"+
        "<FieldRef Name='imagen'/>"+
        "<FieldRef Name='Fecha'/>"+
        "<FieldRef Name='Agencia'/>"+
        "<FieldRef Name='Lugar'/>"+
        "<FieldRef Name='Grupo1'/>"+
        "<FieldRef Name='Grupo2'/>"+
        "<FieldRef Name='Descripcion'/>"+
        "</ViewFields>"+
         "<Query>"+
         "<Where>"+
         "<And>"+
             "<Geq>"+
               "<FieldRef Name='Fecha' />"+
               "<Value IncludeTimeValue='TRUE' Type='DateTime'>"+ Fecha +"T00:00:00Z</Value>"+
             "</Geq>"+
             "<Geq>"+
               "<FieldRef Name='Fecha' />"+
               "<Value IncludeTimeValue='TRUE' Type='DateTime'>"+ Fecha +"T"+ Horario +"</Value>"+
             "</Geq>"+
         "</And>"+
       "</Where>"+
       "<OrderBy><FieldRef Name='Fecha' Ascending='False'/></OrderBy>"+
      "</Query>"+
      "</View>"
}else if(data === 'mes'){
  xml = "<View>"+
    "<ViewFields>"+
        "<FieldRef Name='Title'/>"+
        "<FieldRef Name='imagen'/>"+
        "<FieldRef Name='Fecha'/>"+
        "<FieldRef Name='Agencia'/>"+
        "<FieldRef Name='Lugar'/>"+
        "<FieldRef Name='Grupo1'/>"+
        "<FieldRef Name='Grupo2'/>"+
        "<FieldRef Name='Descripcion'/>"+
        "</ViewFields>"+
         "<Query>"+
         "<Where>"+
            "<And>"+
               "<Geq>"+
                  "<FieldRef Name='Fecha' />"+
                  "<Value IncludeTimeValue='TRUE' Type='DateTime'>2020-"+mes+"-01T12:51:38Z</Value>"+
               "</Geq>"+
               "<Leq>"+
                  "<FieldRef Name='Fecha' />"+
                  "<Value IncludeTimeValue='TRUE' Type='DateTime'>2020-"+mes+"-30T12:59:58Z</Value>"+
               "</Leq>"+
            "</And>"+
         "</Where>"+
         "<OrderBy><FieldRef Name='Fecha' Ascending='False'/></OrderBy>"+
      "</Query>"+
      "</View>"
   }else if(data==='semana'){
    xml = "<View>"+
    "<ViewFields>"+
        "<FieldRef Name='Title'/>"+
        "<FieldRef Name='imagen'/>"+
        "<FieldRef Name='Fecha'/>"+
        "<FieldRef Name='Agencia'/>"+
        "<FieldRef Name='Lugar'/>"+
        "<FieldRef Name='Grupo1'/>"+
        "<FieldRef Name='Grupo2'/>"+
        "<FieldRef Name='Descripcion'/>"+
        "</ViewFields>"+
            "<Query>"+
      "<Where>"+
          "<And>"+
            "<Leq>"+
                "<FieldRef Name='sw' />"+
                "<Value Type='Calculated'>"+ Fecha +"T00:00:00Z</Value>"+
            "</Leq>"+
            "<Geq>"+
                "<FieldRef Name='ss' />"+
                "<Value Type='Calculated'>"+ Fecha +"T00:00:00Z</Value>"+
            "</Geq>"+
          "</And>"+
      "</Where>"+
      "<OrderBy><FieldRef Name='sw' Ascending='False'/></OrderBy>"+
    "</Query>"+
         "</View>"
   }


    
     

var q: CamlQuery = {
ViewXml: xml,
};

pnp.sp.web.lists.getByTitle('Eventos').getItemsByCAMLQuery(q).then((items: any[]) => {      //Hace la consulta por pnp a la lista

  this.setState({
    items:items
});

});
}

}
function newFunction_1(fecha: string) {
  var fechaini = fecha ? fecha.split("T")[1].split(":") : "";
  var horarioinicial = fechaini[0] + ":" + fechaini[1]; //fin hora
  return horarioinicial;
}

function newFunction(fecha: string) {
  var nombredia = moment(fecha, ["MM-DD-YYYY", "YYYY-MM-DD", "DD/MM/YYYY", "MM/DD/YYYY"]).format('dddd');
  var nombreDia = nombredia.toUpperCase().charAt(0) + nombredia.substring(1, nombredia.length);
  return nombreDia;
}



