/*
MIT License

Copyright (c) 2020 Playground, https://www.playg.app

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

import { LightningElement, api, track } from 'lwc';
import { updateRecord, deleteRecord } from 'lightning/uiRecordApi';

export default class ToDoList extends LightningElement {
    @api title;
    @api colorCss;
    @api items;
    @track noItems;

    renderedCallback() {
        this.noItems = (!this.items || !this.items.data || this.items.data.length === 0);
    }

    startAction(event) {
        let currentStatus = event.target.dataset.status;
        let record = {
            fields: {
                Id: event.target.dataset.id,
                Status__c: (currentStatus === 'Completed') ? 'Pending' : 'Completed'
            },
        };
        updateRecord(record)
            .then(() => {
                this.dispatchEvent(new CustomEvent('update'));
            })
            .catch(error => {
                console.log('Error', error);
            });
    }

    update(event) {
        let fieldValue = event.detail;
        let fieldName = event.target.dataset.fieldname;
        let recordId = event.target.dataset.id;
        let record = {
            fields: {
                Id: recordId,
            },
        };
        record.fields[fieldName] = fieldValue;
        updateRecord(record)
            .then(() => {
                this.dispatchEvent(new CustomEvent('update'));
            })
            .catch(error => {
                console.log('Error', error);
            });
    }

    deleteItem(event) {
        let recordId = event.target.dataset.id;
        deleteRecord(recordId)
            .then(() => {
                this.dispatchEvent(new CustomEvent('update'));
            })
            .catch(error => {
                console.log('Error', error);
            });
    }
}