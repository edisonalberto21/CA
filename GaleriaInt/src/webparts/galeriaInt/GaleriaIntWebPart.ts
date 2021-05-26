import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'GaleriaIntWebPartStrings';
import GaleriaInt from './components/GaleriaInt';
import { IGaleriaIntProps } from './components/IGaleriaIntProps';

export interface IGaleriaIntWebPartProps {
  description: string;
  Carpeta: string;
}

export default class GaleriaIntWebPart extends BaseClientSideWebPart <IGaleriaIntWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IGaleriaIntProps> = React.createElement(
      GaleriaInt,
      {
        description: this.properties.description,
        Carpeta: this.properties.Carpeta
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
                PropertyPaneTextField('Carpeta', {
                  label: 'Carpeta Inicial'
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
