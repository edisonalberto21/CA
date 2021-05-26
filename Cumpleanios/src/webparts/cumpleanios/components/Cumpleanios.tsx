import * as React from 'react';
import { ICumpleaniosProps } from './ICumpleaniosProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { ICumpleaniosState } from './ICumpleaniosState'; 
import { IListItem } from './ILisItem';
import $ from 'jquery';
import { AadHttpClient, MSGraphClient } from "@microsoft/sp-http";
import { ClientMode } from './ClientMode';
import Popper from 'popper.js';
import pnp, { sp, Item, ItemAddResult, ItemUpdateResult, Items, ConsoleListener, CamlQuery } from "sp-pnp-js";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import * as moment from 'moment';
import './App.css';
import { IReconocimientos } from './IReconocimientos';
import * as jQuery from 'jquery';


var final= [];
var aniversario = [];
var serial =  true
var cum = true
var rec = true



export default class Cumpleanios extends React.Component<ICumpleaniosProps,ICumpleaniosState > {
 
  constructor(props: ICumpleaniosProps, state: ICumpleaniosState) {                     //Se define el constructor
    super(props);
    this.state = {                                                                   //Estado inicial, array items vacio
      users: [],
     // recono:[]
    };
    const { celebracion = 'directorio1' } = this.props;
    if(celebracion == 'directorio1'){
      this.directorio()
   
     }
      if(celebracion == 'directorio' && this.props.numeromodulo == 1){
      this.directorio()
      console.log('Paso 2')
      cum = false
    }else if(celebracion == 'reconocimientos'&& this.props.numeromodulo == 2 ){
      this.reconocimientos()
      console.log('Paso 3')
      rec = false
    }
   
    this.datosiniciales(); 
                                                     //Se ejecuta el método de consulta
   }

   public _renderCurrencies(imgitem) {                                                       //Funcion para mostrar la imagen de la lista 
    var img = document.createElement('div');
    img.innerHTML = imgitem;
    return img.getElementsByTagName('img')[0].getAttribute("src");
}

componentDidMount() {
  $("#focusrecono"+this.props.numeromodulo).removeClass("focusrecono");
  $("#focusani"+this.props.numeromodulo).removeClass("focusani");
  
}

  public  render(): React.ReactElement<ICumpleaniosProps> {
   
    const {  numeromodulo = 0 } = this.props;
    moment.locale('es');
    console.log(this.state.users)
    if(cum == false && this.props.numeromodulo == 1){
     $("#focusrecono"+this.props.numeromodulo).css('display','none')
     $('#focusani'+this.props.numeromodulo).css('display','none')
    }
   else if(rec == false && this.props.numeromodulo == 2){
      $('#focuscumple'+this.props.numeromodulo).css('display','none')
      $('#focusani'+this.props.numeromodulo).css('display','none')
    }
    
    $('#contact-tab'+this.props.numeromodulo).click()
    
    
   const elementos1: JSX.Element[] = this.state.users.map((item2: any, i: number): JSX.Element => {   //Recorre el primer elemeto del array, para mostrar la primera noticia
     
    var ani = item2.aniversario ? item2.aniversario : item2.Fecha;
    var fechacumple = item2.birthday ? item2.birthday : item2.Fecha;
    var canva = serial ? fechacumple : ani
   
    var mes = moment(canva, ["MM-DD-YYYY", "YYYY-MM-DD", "DD/MM/YYYY", "MM/DD/YYYY"]).format('MMMM');
    var dia = moment(canva, ["MM-DD-YYYY", "YYYY-MM-DD", "DD/MM/YYYY", "MM/DD/YYYY"]).format('DD');
    var semana = moment(canva).weeks()
    var cumplehoy = moment().weeks()
    var fil = item2.imagen ? this._renderCurrencies(item2.imagen) : ""
    var colorsecun = serial ? '#6784c3' : '#0062cc'
    var color = item2.Persona ? '#6c757d' : colorsecun
   

    //Inicio variables
         var foto = item2.foto ? item2.foto : fil
         var ciudad = item2.ciudad ? item2.ciudad : item2.Sede
         var Nombre = item2.Nombre ? item2.Nombre : item2.Persona
         var cargo = item2.Cargo ? item2.Cargo : item2.Puesto
         var destino = item2.correo ? item2.correo : item2.email
         

    //Fin Variables
    
    
    if(fechacumple && cumplehoy === semana){
      
     return (
      <div className="d-flex border-black my-2">
      <div className="cont-foto"><img className="tamimg" src={foto}/></div>
      <div className="col">
     <p className="m-1 text-secondary">Sede Principal {ciudad}<span className="reconocimient"><strong>{item2.Title}</strong></span></p>
          <div className="row colorp" style={{background:color}}>
            <div className="col-12 col-sm-8 col-xl-8">
                <h4>{Nombre}</h4>
                 <p>{cargo}</p>
            </div>
            <span className="float-right  mt-1">{dia} {mes} 2020 <a onClick={this.mensaje1.bind(destino)} title="Envia tu mensaje de felicitación" className={destino}  data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo"><i className={"far fa-envelope " + destino}></i></a></span>
          </div>
      </div>
    </div>
    );
     }
  });

  const elementos2: JSX.Element[] = this.state.users.map((item2: any, i: number): JSX.Element => {   //Recorre el primer elemeto del array, para mostrar la primera noticia
     
    var fechacumple = item2.birthday ? item2.birthday : item2.Fecha;
    var ani = item2.aniversario ? item2.aniversario : item2.Fecha;
    var canva = serial ? fechacumple : ani
  
    
    var mes = moment(canva, ["MM-DD-YYYY", "YYYY-MM-DD", "DD/MM/YYYY", "MM/DD/YYYY"]).format('MMMM');
    var dia = moment(canva, ["MM-DD-YYYY", "YYYY-MM-DD", "DD/MM/YYYY", "MM/DD/YYYY"]).format('DD');
    var semana = item2.birthday ? moment(canva).date() + 1 : moment(canva).date()
    var cumplehoy = moment().date()
    var fil = item2.imagen ? this._renderCurrencies(item2.imagen) : ""
    var colorsecun = serial ? '#6784c3' : '#0062cc'
    var color = item2.Persona ? '#6c757d' : colorsecun
   
      //Inicio variables
      var foto = item2.foto ? item2.foto : fil
      var ciudad = item2.ciudad ? item2.ciudad : item2.Sede
      var Nombre = item2.Nombre ? item2.Nombre : item2.Persona
      var cargo = item2.Cargo ? item2.Cargo : item2.Puesto
      var destino = item2.correo ? item2.correo : item2.email
      //Fin Variables
      

   
    if(cumplehoy == semana && fechacumple){
     
     return (
      <div className="d-flex border-black my-2">
      <div className="cont-foto"><img className="tamimg" src={foto}/></div>
      <div className="col">
         <p className="m-1 text-secondary">Sede Principal {ciudad}<span className="reconocimient"><strong>{item2.Title}</strong></span></p>
          <div className="row colorp" style={{background:color}}>
            <div className="col-12 col-sm-8 col-xl-8">
                <h4>{Nombre}</h4>
                 <p>{cargo}</p>
            </div>
            <span className="float-right  mt-1">{dia} {mes} 2020 <a onClick={this.mensaje1.bind(destino)} className={destino} title="Envia tu mensaje de felicitación"  data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo"><i  className={"far fa-envelope " + destino} ></i></a></span>
          </div>
      </div>
    </div>
    );
     }
  });
  
  const elementos3: JSX.Element[] = this.state.users.map((item2: any, i: number): JSX.Element => {   //Recorre el primer elemeto del array, para mostrar la primera noticia
   
    const fechacumple =  item2.birthday ? item2.birthday : item2.Fecha;
    var ani = item2.aniversario ? item2.aniversario : item2.Fecha;
    var canva = serial ? fechacumple : ani
    
    
    var mes = moment(canva, ["MM-DD-YYYY", "YYYY-MM-DD", "DD/MM/YYYY", "MM/DD/YYYY"]).format('MMMM');
    var dia = moment(canva, ["MM-DD-YYYY", "YYYY-MM-DD", "DD/MM/YYYY", "MM/DD/YYYY"]).format('DD');
    var semana = moment(canva).month()
    var cumplehoy = moment().month()
    var fil = item2.imagen ? this._renderCurrencies(item2.imagen) : ""
    var colorsecun = serial ? '#6784c3' : '#0062cc'
    var color = item2.Persona ? '#6c757d' : colorsecun

       //Inicio variables
       var foto = item2.foto ? item2.foto : fil
       var ciudad = item2.ciudad ? item2.ciudad : item2.Sede
       var Nombre = item2.Nombre ? item2.Nombre : item2.Persona
       var cargo = item2.Cargo ? item2.Cargo : item2.Puesto
       var destino = item2.correo ? item2.correo : item2.email
       //Fin Variables 

    if(fechacumple && cumplehoy === semana){
      
     return (
      <div className="d-flex border-black my-2">
      <div className="cont-foto"><img className="tamimg" src={foto}/></div>
      <div className="col">
         <p className="m-1 text-secondary">Sede Principal {ciudad}<span className="reconocimient"><strong>{item2.Title}</strong></span></p>
          <div className="row colorp" style={{background:color}}>
            <div className="col-12 col-sm-8 col-xl-8">
                <h4>{Nombre}</h4>
                 <p>{cargo}</p>
            </div>
            <span className="float-right  mt-1">{dia} {mes} 2020 <a onClick={this.mensaje1.bind(destino)} className={destino} title="Envia tu mensaje de felicitación"  data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo"><i className={"far fa-envelope "+ destino}></i></a></span>
          </div>
      </div>
    </div>
    );
     }
  });
    
    return (
       <>
      
      <div className="col-lg-12 col-12 shadow p-3 mb-0 bg-white rounded">
            <h5 className="subtite-section">Información</h5>
                <h3 className="title-section mb-4">{this.props.titulo}</h3>
                  <div className="row">
                    <div className="col-xs-12 pt-1 btnevento">
                        <button id={"focuscumple"+this.props.numeromodulo} type="button"  onClick={() => this.directorio1()} style={{display: this.props.ocultar}}  className="btn btn-primary btn-sm focuscumple cumplebtn">Cumpleaños</button>
                        <button id={"focusrecono"+this.props.numeromodulo} type="button" onClick={() => this.reconocimientos()} style={{display: this.props.ocultar}} className="btn btn-secondary btn-sm btnleft focusrecono recobtn">Reconocimientos</button>
                        <button id={"focusani"+this.props.numeromodulo} type="button" onClick={() => this.directorio2()} style={{display: this.props.ocultar}} className="btn btn-success btn-sm btnleft focusani direbtn">Aniversarios</button>
                    </div>
                  
                    <ul className="nav nav-tabs col-xs-12 intel" id="myTab" role="tablist">
                        <li className="nav-item">
                          <a className="nav-link  nan" id={"home-tab"+this.props.numeromodulo} data-toggle="tab" href={"#home1"+this.props.numeromodulo} role="tab" aria-controls="home" aria-selected="false">Día de hoy</a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link  nan" id={"profile-tab"+this.props.numeromodulo} data-toggle="tab" href={"#profile"+this.props.numeromodulo}  role="tab" aria-controls="profile" aria-selected="true">Esta semana</a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link  nan" id={"contact-tab"+this.props.numeromodulo} data-toggle="tab" href={"#contact"+this.props.numeromodulo} role="tab" aria-controls="contact" aria-selected="false">Este mes</a>
                        </li>
                      </ul>

                  </div>

                    
        <div className="tab-content eventotam" id="myTabContent">
        <div className="tab-pane fade" id={"home1"+this.props.numeromodulo} role="tabpanel" aria-labelledby="home-tab1">
          <div className="tab-pane fade show active" id={"home1"+numeromodulo} role="tabpanel" aria-labelledby="home-tab">
                
              
                {elementos2}

            </div>
            </div>
            
            
            
          <div className="tab-pane fade" id={"profile"+this.props.numeromodulo} role="tabpanel" aria-labelledby="profile-tab">
            <div className="tab-pane fade show active" id={"profile"+numeromodulo} role="tabpanel" aria-labelledby="home-tab">

                {elementos1}
            
            </div>
            
            </div>
            
            
          <div className="tab-pane fade" id={"contact"+this.props.numeromodulo} role="tabpanel" aria-labelledby="contact-tab">
            <div className="tab-pane fade show active" id={"contact"+numeromodulo} role="tabpanel" aria-labelledby="home-tab">
               
                {elementos3}
               
            </div>
            </div>
        </div>           
          </div>
          
          <div className="modal fade" id="exampleModal" onClick={this.limpiar}  role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Mensaje de Felicitacion</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        <form>
         
          <div className="form-group">
            <label  className="col-form-label">Mensaje:</label>
            <textarea className="form-control" id="message-text"></textarea>
          </div>
        </form>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-dismiss="modal">Cerrar</button>
        <button  onClick={this.mensaje} type="button" data-dismiss="modal" className="btn btn-primary">Enviar Mensaje</button>
      </div>
    </div>
  </div>
</div>
<div id="message-text2" style={{display:'none'}}></div>
<div id="message-text1" style={{display:'none'}}></div>
       </>
    );
 


}

private mensaje1(ca){

 jQuery('#message-text1').html(ca.target.className.split("envelope ")[1]);
//jQuery('#message-text1').html(ca.target.className);
} 

 //Hace la consulta al DA para agregar el campo de cordialmete en el correo
 private datosiniciales() {
  this.props.context.msGraphClientFactory
      .getClient()
      .then((client: MSGraphClient) => {
        client
          .api("me")
          .version("v1.0")
          .get((err, res) => {  

            var nombreI = res.displayName;                  // Campo remitente
            jQuery('#message-text2').html(nombreI);         //Lo asigna virtualmente para consultarlo posteriormente
           
          });
         
      });
    }

//Agrega el contenido de la modal a la lista birthday
public mensaje(){
 
  pnp.sp.web.lists.getByTitle("FelicitacionCumpleaños").items.add({
           mensaje: jQuery('#message-text').val(),
           destinatario: jQuery('#message-text1').text(),
           Title: "Mensaje de Cumpleaños",
           remitente: jQuery('#message-text2').text(),
          
         }).then((iar) => {
          
         });
         
         jQuery('form').find('textarea').val('');    
}

private directorio() {
 
this.props.context.msGraphClientFactory       
      .getClient()                                               //Consulta por graph, para los datos  seleccionados
      .then((client: MSGraphClient) => {
        
        client
          .api("users")
          .version("v1.0")
          .select("displayName,jobTitle,userPrincipalName,city,id,companyName,mail,officeLocation")
          .orderby('displayName desc')
          .top(999)
          .get((err, res) => {  

            if (err) {
              console.error(err);    //Imprime esi existe error
              return;
            }
     
          console.log(res.value)
         res.value.map((item: any) =>{                        //Hace la consulta por la fotografia al directorio activo
             
             // if(item.extension_0515aba7e98647caa976c721ba1303b7_msDS_cloudExtensionAttribute10){
               
              var blobUrl =  "";
              this.props.context.msGraphClientFactory.getClient().then((cliente: MSGraphClient) => {
                client
                .api("https://graph.microsoft.com/beta/users/{"+item.id+"}/photo/$value")
                .responseType('blob')
                .get((error,response) => {
                  blobUrl = response ? window.URL.createObjectURL(response)  : "" ;     //Url de la imagen

                 
                final.push({
 
                  Nombre: item.displayName,
                  mail: item.userPrincipalName,
                  Cargo: item.jobTitle,
                  Departamento : item.department,
                  id:item.id,
                  correo: item.mail,
                  displayName: item.displayName,
                  foto: blobUrl,
                  ciudad:item.city,
                  birthday: item.companyName,
                  aniversario: item.officeLocation

                })
                 
                if(final.length===res.value.length){
                this.setState({
                  users: final
                });
              }
               
                
               
              });
        
            });   
            
        // }
          });
         
         
       
        });

      });
    
  }

  public limpiar(){
    $('#exampleModal').click(function(e){
      var target = $(e.target);
       if (!target.is(".btn-primary")) {
          $("#exampleModal").find("textarea").val("");         
  
                  }
  })
}

  private reconocimientos(){
    $("#focusrecono"+this.props.numeromodulo).addClass("focusrecono");
    $("#focuscumple"+this.props.numeromodulo).removeClass("focuscumple");
    $("#focusani"+this.props.numeromodulo).removeClass("focusani");

    aniversario = []
    pnp.sp.web.lists.getByTitle('Reconocimientos')
      .items.select('Title,imagen,Sede,Fecha,Persona,Puesto,email').top(4).orderBy('Created', false).get()    //selecciona los items de la lista 
      .then((items: any[]): void => {
        this.setState({
          users: items
        }); 
    }, (error: any): void => {        //Imprime si existe el error
      console.log(error);
       });
      
  }

  private directorio1(){
    $("#focusrecono"+this.props.numeromodulo).removeClass("focusrecono");
    $("#focuscumple"+this.props.numeromodulo).addClass("focuscumple");
    $("#focusani"+this.props.numeromodulo).removeClass("focusani");
   serial = true
    this.setState({
      users: final
    }); 
  }


 

  private directorio2(){  

    $("#focusrecono"+this.props.numeromodulo).removeClass("focusrecono");
    $("#focuscumple"+this.props.numeromodulo).removeClass("focuscumple");
    $("#focusani"+this.props.numeromodulo).addClass("focusani"); 
                                                                                     //Recibe el state inicial y llena el array deneral miarray
    serial = false
    aniversario = []
    final.map((item, i: number) => {   //Recorre el primer elemeto del array
     
        
           if(item.aniversario){                                                    //Filra el array por el tem seleccionado en el boton de la vista
             
               aniversario.push({                                                              //Llena el array auxiliar
                Nombre: item.Nombre,
                mail: item.mail,
                Cargo: item.Cargo,
                Departamento : item.Departamento,
                id:item.id,
                correo: item.correo,
                displayName: item.displayName,
                foto: item.foto,
                ciudad:item.ciudad,
                birthday: item.birthday,
                aniversario: item.aniversario 
           
               }) ;
           }
       
       this.setState({
           users:aniversario                                                                       //Inicializa el estado con la nueva data
       });
   });
        
   
   }

}


