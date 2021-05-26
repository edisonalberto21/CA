import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneDropdown
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'TransaccionesWebPartStrings';
import Transacciones from './components/Transacciones';
import { ITransaccionesProps } from './components/ITransaccionesProps';

export interface ITransaccionesWebPartProps {
  description: string;
  biblioteca: string;
  mostrar: string;
}

export default class TransaccionesWebPart extends BaseClientSideWebPart <ITransaccionesWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ITransaccionesProps> = React.createElement(
      Transacciones,
      {
        description: this.properties.description,
        biblioteca: this.properties.biblioteca,
        mostrar: this.properties.mostrar
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
                PropertyPaneTextField('biblioteca', {
                  label: 'Seleccione el nombre de la biblioteca de documentos'
                }),
                PropertyPaneTextField('description', {
                  label: 'Descripcion'
                }),
                PropertyPaneDropdown('mostrar', {
                  label: 'Mostrar Sección',
                  options: [
                    { key: '', text: 'Mostrar' },
                    { key: 'none', text: 'Ocultar' },
                  ],
                }),
              ]
            }
          ]
        }
      ]
    };
  }
}
