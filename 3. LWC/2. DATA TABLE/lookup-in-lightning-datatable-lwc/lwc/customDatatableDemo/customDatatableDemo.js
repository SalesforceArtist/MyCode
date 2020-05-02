import { LightningElement, track } from 'lwc';

export default class CustomDatatableDemo extends LightningElement {

    @track data = [];

    connectedCallback() {
        this.columns = [
            { label: 'Name', fieldName: 'Name' },
            { label: 'Account Number', fieldName: 'AccountNumber', type: 'number' },
            {
                label: 'Rating', fieldName: 'Rating', type: 'picklist', typeAttributes: {
                    placeholder: 'Choose rating', options: [
                        { label: 'Hot', value: 'Hot' },
                        { label: 'Warm', value: 'Warm' },
                        { label: 'Cold', value: 'Cold' },
                    ] // list of all picklist options
                    , value: { fieldName: 'Rating' } // default value for picklist
                    , context: { fieldName: 'Id' } // binding account Id with context variable to be returned back
                }
            },
            {
                label: 'Parent', fieldName: 'ParentId', type: 'lookup', typeAttributes: {
                    placeholder: 'Select Parent Account',
                    uniqueId: { fieldName: 'Id' }, //pass Id of current record to lookup for context
                    object: "Account",
                    icon: "standard:account",
                    label: "Account",
                    displayFields: "Name, AccountNumber",
                    displayFormat: "Name (AccountNumber)",
                    filters: ""
                }
            }
        ];

        //sample data
        this.data = [{ 'Id': '12345', 'Name': 'Acme', 'AccountNumber': 12345, 'Rating': 'Hot' }, { 'Id': '34567', 'Name': 'Mace', 'AccountNumber': 34567, 'Rating': 'Cold' }]
    }

    //listener handler to get the context and data
    //updates datatable
    picklistChanged(event) {
        event.stopPropagation();
        let dataRecieved = event.detail.data;
        this.data.forEach(element => {
            if (element.Id === dataRecieved.context) {
                element.Rating = dataRecieved.value;
            }
        });
    }

    handleSelection(event) {
        event.stopPropagation();
        let dataRecieved = event.detail.data;
        this.data.forEach(element => {
            if (element.Id === dataRecieved.key) {
                element.ParentId = dataRecieved.selectedId;
                console.log('Element', element);
            }
        });
    }
}