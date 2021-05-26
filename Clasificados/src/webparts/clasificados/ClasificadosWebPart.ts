import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'ClasificadosWebPartStrings';
import Clasificados from './components/Clasificados';
import { IClasificadosProps } from './components/IClasificadosProps';

export interface IClasificadosWebPartProps {
  description: string;
  imagen:string;
}

export default class ClasificadosWebPart extends BaseClientSideWebPart <IClasificadosWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IClasificadosProps> = React.createElement(
      Clasificados,
      {
        description: this.properties.description,
        imagen: this.properties.imagen
        
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
                PropertyPaneTextField('description', {
                  label: 'Descripción'
                }),
                PropertyPaneTextField('imagen', {
                  label: 'Imagen'
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
