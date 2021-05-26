import * as React from 'react';
import { IHacemosProps } from './IHacemosProps';
import 'bootstrap/dist/css/bootstrap.min.css';
import pnp, { sp, Item, ItemAddResult, ItemUpdateResult, Items, ConsoleListener } from "sp-pnp-js";  
import { IHacemosState } from './IHacemosState'; 
import { IListItem } from './IListItem';
import './App.css';


export default class Hacemos extends React.Component<IHacemosProps, IHacemosState> {

  constructor(props: IHacemosProps, state: IHacemosState) {                     //Se define el constructor
    super(props);
    this.state = {                                                                   //Estado inicial, array items vacio
      items: [],
    
    };
        this.Hacemos();                                               //Se ejecuta el método de consulta
   }

   public _renderCurrencies(imgitem) {                                                       //Funcion para mostrar la imagen de la lista 
    var img = document.createElement('div');
    img.innerHTML = imgitem;
    return img.getElementsByTagName('img')[0].getAttribute("src");
}

public _renderCurrencies1(imgitem) {                                                       //Funcion para mostrar la imagen de la lista 
  var img1 = document.createElement('div');
  img1.innerHTML = imgitem;
  return img1.getElementsByTagName('div')[0];
}

  public render(): React.ReactElement<IHacemosProps> {
   console.log(this.state.items)
    const elementos5: JSX.Element[] = this.state.items.map((item1: any, index: number): JSX.Element => {   //Recorre el primer elemeto del array, para mostrar la primera noticia
  
      var sectionStyle = {
         backgroundImage: `url(${"/sites/conectacarga/Style%20Library/Images/bg-cifras.jpg"})`
      };
      return (
       <>
   <section className="pt-3" id="sect-nosotros-gestion" style={sectionStyle}>
    <div className="container">
      <div className="row m-0">
        <div className="col-12 col-sm-12 col-xl-5 ">
                <img className="w-100 mx-auto d-block" src={this._renderCurrencies(item1.imagen)}/>
        </div>

        <div className="col-12 col-sm-12 col-xl-7 p-5 colort">
            <h5 className="subtite-section text-light">Información</h5>
                <h3 className="title-section text-light">{item1.Title}</h3>
                <div dangerouslySetInnerHTML={{__html: item1.contenido}}></div>
                  </div>
             </div>
    </div>

    </section>
       </>
     );
   });

    return (
    <>
    <div>{elementos5}</div>
      
    </>
    );
  }
  public Hacemos(){     
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
