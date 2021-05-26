import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'ProcesosWebPartStrings';
import Procesos from './components/Procesos';
import { IProcesosProps } from './components/IProcesosProps';

export interface IProcesosWebPartProps {
  description: string;
}

export default class ProcesosWebPart extends BaseClientSideWebPart <IProcesosWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IProcesosProps> = React.createElement(
      Procesos,
      {
        description: this.properties.description
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
                  label: 'Lista Asociada'
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
