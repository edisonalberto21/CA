import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'PersonasWebPartStrings';
import Personas from './components/Personas';
import { IPersonasProps } from './components/IPersonasProps';

export interface IPersonasWebPartProps {
  description: string;
  imagen: string;
  icono: string;
  color: string;
  texto: string;
}

export default class PersonasWebPart extends BaseClientSideWebPart <IPersonasWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IPersonasProps> = React.createElement(
      Personas,
      {
        description: this.properties.description,
        imagen: this.properties.imagen,
        icono: this.properties.icono,
        color: this.properties.color,
        texto: this.properties.texto
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('imagen', {
                  label: 'Ruta de la Imagen'
                }),
                PropertyPaneTextField('icono', {
                  label: 'Ruta del Icono'
                }),
                PropertyPaneTextField('color', {
                  label: 'Color'
                }),
                PropertyPaneTextField('texto', {
                  label: 'Texto del Banner'
                }),
              ]
            }
          ]
        }
      ]
    };
  }
}
