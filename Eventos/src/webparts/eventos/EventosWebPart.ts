import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'EventosWebPartStrings';
import Eventos from './components/Eventos';
import { IEventosProps } from './components/IEventosProps';

export interface IEventosWebPartProps {
  description: string;
  descripcion: string;
  titulo: string;
  siteUrl : string;
}

export default class EventosWebPart extends BaseClientSideWebPart <IEventosWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IEventosProps> = React.createElement(
      Eventos,
      {
        description: this.properties.description,
        descripcion: this.properties.descripcion,
        titulo:this.properties.titulo,
        siteUrl :this.context.pageContext.web.absoluteUrl,
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
                PropertyPaneTextField('titulo', {
                  label: 'Titulo'
                }),
                PropertyPaneTextField('descripcion', {
                  label: 'Descripción'
                }),
              ]
            }
          ]
        }
      ]
    };
  }
}
