import * as React from 'react';
import { IPersonasProps } from './IPersonasProps';
import { escape } from '@microsoft/sp-lodash-subset';
import pnp, { sp, Item, ItemAddResult, ItemUpdateResult, Items, ConsoleListener, CamlQuery } from "sp-pnp-js";
import { IAccesos } from './IAccesos'; 
import { IPersonasState } from './IPersonasState';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import './App.css';



export default class Personas extends React.Component<IPersonasProps, IPersonasState> {

  constructor(props: IPersonasProps, state: IPersonasState) {                     //Se define el constructor
    super(props);
    this.state = {                                                                   //Estado inicial, array items vacio
        accesos: []
    };
    this.Accesos();                                                     //Se ejecuta el método de consulta
   }

   public _renderCurrencies(imgitem) {                                                       //Funcion para mostrar la imagen de la lista 
    var img = document.createElement('div');
    img.innerHTML = imgitem;
    return img.getElementsByTagName('img')[0].getAttribute("src");
}

   public redireccion(url){
    window.open(url,'_top')
   } 

  public render(): React.ReactElement<IPersonasProps> {

   
    //Down
    $('#down').click(function(){
      $('.principioa').animate({
        scrollTop: '300px'
      }, 200);
    })

    //Up
    $('#up').click(function(){
      $('.principioa').animate({
            scrollTop: '0px'
          }, 200);
        });

   //Render Accesos Inicio
   const accesos: JSX.Element[] = this.state.accesos.map((itemacceso: IAccesos, i: number): JSX.Element => {   //Recorre el primer elemeto del array, para mostrar la primera noticia
    var url = itemacceso.url ? itemacceso.url['Url'] : "#";
    
   return (
      <div className="col px-0 col-6"><a onClick={() => this.redireccion(url)} className="btn btn-area text-white font-16 py-3 mb-1 font-weight-light acceso" style={{background:itemacceso.Color}}>
        <img className="icon-area" src={this._renderCurrencies(itemacceso.imagen)}/>
        <br/>{itemacceso.Title}<br/> 
     </a>
    </div>
   );
 });
   //Fin render Acceso

    return (
     <>
       <section>
     
     <div className="row ml-0 mr-0">
      <div className="col-lg-9 col-xl-9 col-md-12 col-12 px-0"> 
                  <div className="content-area-imagen">
                     <div className="row no-gutters">
                         <div className="col-12">
                           <nav aria-label="breadcrumb">
                             <ol className="breadcrumb ">
                               <li className="breadcrumb-item"><a href="#"><i className="fas fa-home"></i></a></li>
                               <li className="breadcrumb-item active" aria-current="page">Personas</li>
                             </ol>
                           </nav>
                       
                         </div>
                       </div>
                    
                      <img src={this.props.imagen} className="d-block w-100" alt="..."/>
                     <div className="caption-imagen1" style={{backgroundColor: this.props.color}}>
                       <img className="icon-area d-inline" src={this.props.icono}/>
                         <h4 className="d-inline ml-3">{this.props.texto}</h4>
                      
                    </div>
                  </div>
           
             
           
      </div> 
   
   
      <div className="col-xl-3 col-lg-3 px-1 ">
   
          <div className="container">
              <div className="row row-cols-4 row-cols-sm-4 row-cols-md-2 principioa">
                
               {accesos} 
   
               </div>
             
              <div >
                <span className="flechaacce">
                  <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAM1BMVEX///8AAADPz8/7+/vKysoGBgb5+fnJycnV1dUJCQnR0dH19fXT09PGxsbx8fG6urrAwMDilpEyAAADbklEQVR4nO3bXXuiMBCGYQOoq7Xb/f+/dhGJFfkwQJKZyfXcJz1lmrwJCePhAAAAAAAAAAAAAAAAAAAAAAAAAACL/ko/QFKnw6Fx1/ufupZ+llQq59ytLfBQaoWNc8dLO4r1SfpJEjm3BR6PzjXSD5LEV1dgr7nP0vKyWLlff+71lVbhS4HtTG26lbUo9wwOSyxpCAcZ9KqystiMCjy2WWwnaikVVqMC3aWoLDavGXyW2G0aBYxhm8Hv8QiWlcX5Art90X4Wx6toYVmczOCgRMtDeJraJt4Zf0ed2CYmsmj4vBhQYPsCd7Z7XlxYZF5KtHpeDMqgZzSLIRn0TGYxfAT7w5S1LJ6X9sFRia5dbiz5Wllgx1gW12TQM5XFDQXayuL6KeoMZXHyTiaUkSxuyaBn4u5mR4GPe1TtBW7K4LNE7Xc3uzLoda/heqtc8ao2S3UW9ywyPd3fNBbvZIJL1JrFKBn0lN6jLt2LrnXT+H0x3gjes1jpy+KufXCiRF1ZXHUnE0pZFiNsEyOqzovxR7C/8NeSxagZfClRx3kxSQY9JefFFBn0VGQx3Qgq+aaRJIPPEqW/aUR9F50jnMWUGfREe+AyFCh7XkyawUGJEkOYJYOe0Dtqjgw+CPXA5StQqO8myp1McIkCdzcJ32RmZM5i/gIz98BlzKCXN4tZMzgoMccQ1iIj2MuSxVokg16W86LcCGa6u5Ecwce+mNhNYpEZSHpePB2ustV1kmZRQYFp+27O0jO0KzFV3037bxNcRd8kyqKCKfqUJIs36ap+pcmininqEmSx/XeJbvSTImdR1Qj2ot7dKMqgF7cHrhJ/VZsQre+mrmUOvEEinRf1LTK/omRR4yLTe/TdFFxghHvUWvcUfdi5L+ovcGcPnOop+rCvB07lPvhuTw/c1UKBnU37ouy96FqbzosGMuhtu0fN9wk7gtU9cLXK08QHq/ZFHfeia63KoqEMeut64Boru8Sr4B64diabWmQGArNocIo+BfXA2VtFn8J64CyP4OceONMZ9D68o5oewd5iFi1u9G+Wz4t2jksLLm4+i5aOS8tmslhOgTM9cCUsMr3pHji9V/cbjHrg2hn7I/1Q0X2/zdKqul6rovwbTFO9v/Df4fRSU4Hl3ZMn/ZMwAAAAAAAAAAAAAAAAAAAAAAAAyPgP7ZA26dzMPdgAAAAASUVORK5CYII=" id="up" className="" style={{width:'20px'}}/>
                  <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOAAAADgCAMAAAAt85rTAAAANlBMVEX///8AAABjY2OFhYWLi4tsbGxycnL8/PySkpKNjY1cXFx4eHhvb29qamqIiIiQkJB8fHxVVVXNnr5oAAACyklEQVR4nO3ZiVLbMBhFYZc06WIo8P4v22EY90KxHVmW9C9zvifIHUmHJdMEAAAAAAAAAAAAAAAAAAAAAACQ1OVbaq/T9NP6M/Q0v51h4oXz+y1Nu3Be3uEv60/Sx1WlSbnw+rGlCW/p7fNPi3QL52lKvfDLvmTv8Pp1X6qFq/sS3dLb+r40C1feX6qFO/tSvMPHvX0JFm70RZ6tP+E5m31J8g5331+ChUX7At/SO32RoKW525fgZ1jQFwn4DgvfX9iFB/eFu6UH3t8iVGkeju8LdYZPNfsCvcND/Qy48PajdmCMW1p5P98FKE1VX+S79ee/59T5BVhY3RdxfUtP9EX+WK/YVvH7yxq333Kf7Is4PcPTfRGXpSn++72Ew9I06Yu4u6WN+iLOStOsL04XNuyLOCpN076Im9I07os4KU3zvoiLd9ihL64Wdt3noDSd+iLGpenWFzE9w2v/fabvsPP7M184aJ/ZLe3eFzEpzYC+iMEZPo7cZ/AOh70/o4XD9w2+pQP7IgNLM7QvMuwMB/dFBr1Dg/c3dKHhviG3tOPf7yW6l8aoL9L5DM36Il3foen7W3Rc6GJfx/8mGvdFOpWmwffvrXQpjYO+SId32OX7lXrNFzrpizQujZu+SNPSOOqLNCzNk6e+SLNb6u79LRqV5rf1jm1NztDt+b1pUJoh36/UO10a5/tO39IH7/tOlsZxX+TEGbrui1S/Q/fvb1G5MMy+ylsaoC9SUZoQfZHDZxikL3LwHQZ6f4tDv7UF3HfolobqixSXJlhfpPAMw/VFikrj7P+DxxTc0pB9kbsLg/ZFXvb3he2L7C5MsG/3lobui2wuDN4X2VgYvi+y+g5TvL/FysJU+1ZuaZK+yH8L0/RFPi10+v3YOR/eYbL3t3hJvu/fLU3XF7kk7YtckvZF5lfrTwAAAAAAAAAAAAAAAAAAAAAAAJDEX3wsN/7TJNYXAAAAAElFTkSuQmCC" id="down" className="" style={{width:'20px'}}/>
                </span>
              </div>
              </div> 
            
      </div>
   
    </div>
   
   </section>
     </>
    );
  }
  private Accesos(){
    pnp.sp.web.lists.getByTitle('Accesos')
      .items.select('Title,imagen,Color,url,Orden').orderBy('Orden', true).get()    //selecciona los items de la lista 
      .then((items: IAccesos[]): void => {
        this.setState({
          accesos: items
        }); 
    }, (error: any): void => {        //Imprime si existe el error
      console.log(error);
       });
      
  }
}
