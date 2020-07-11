import LightningDatatable from 'lightning/datatable';
import toggleButtonColumnTemplate from './toggleButtonColumnTemplate.html';
import richTextColumnTemplate from './richTextColumnTemplate.html';
import iconColumnTemplate from './iconColumnTemplate.html';

export default class CustomDatatable extends LightningDatatable {
    static customTypes = {
        toggleButton: {
            template: toggleButtonColumnTemplate,
            standardCellLayout: true,
            typeAttributes: ['buttonDisabled', 'rowId'],
        },
        richText: {
            template: richTextColumnTemplate,    
            standardCellLayout: true,
            typeAttributes: [''],
        },
        icon: {
            template: iconColumnTemplate,
            standardCellLayout: true,
            typeAttributes: [''],
        }
    };
}