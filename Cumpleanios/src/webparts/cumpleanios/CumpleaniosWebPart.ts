import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneChoiceGroup,
  PropertyPaneDropdown,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'CumpleaniosWebPartStrings';
import Cumpleanios from './components/Cumpleanios';
import { ICumpleaniosProps } from './components/ICumpleaniosProps';
import { ClientMode } from './components/ClientMode';

export interface ICumpleaniosWebPartProps {
  clientMode: ClientMode;
  ruta: string;
  celebracion: string;
  numeromodulo: number;
  titulo: string;
  ocultar: string;
}

export default class CumpleaniosWebPart extends BaseClientSideWebPart <ICumpleaniosWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ICumpleaniosProps> = React.createElement(
      Cumpleanios,
      {
        clientMode: this.properties.clientMode,
        context: this.context,
        ruta: this.properties.ruta,
        celebracion: this.properties.celebracion,
        numeromodulo: this.properties.numeromodulo,
        titulo: this.properties.titulo,
        ocultar: this.properties.ocultar
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
                PropertyPaneChoiceGroup('clientMode', {
                  label: strings.ClientModeLabel,
                  options: [
                    { key: ClientMode.aad, text: "AadHttpClient"},
                    { key: ClientMode.graph, text: "MSGraphClient"},
                  ]
                }), 
                PropertyPaneDropdown('celebracion', {
                  label: 'Tipo de Celebración',
                  options: [
                    { key: 'directorio', text: 'Cumpleaños' },
                    { key: 'reconocimientos', text: 'Reconocimientos' },
                    ]
                   }),
                   PropertyPaneDropdown('numeromodulo', {
                    label: 'Numero de Módulo',
                    options: [
                      { key: '1', text: '1' },
                      { key: '2', text: '2' },
                      ]
                     }),   
                     PropertyPaneTextField('titulo', {
                      label: 'Titulo'
                    }),
                    PropertyPaneDropdown('ocultar', {
                      label: 'Ocultar Boton',
                      options: [
                        { key: 'none', text: 'Si' },
                        { key: '', text: 'No' },
                        ]
                       })   
               ]
            }
          ]
        }
      ]
    };
  }
}
