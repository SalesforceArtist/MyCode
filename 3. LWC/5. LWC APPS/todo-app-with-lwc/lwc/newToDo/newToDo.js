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

import { LightningElement, track} from 'lwc';
import Id from '@salesforce/user/Id';
import TODO_OBJECT from '@salesforce/schema/ToDo__c';
import NOTES_FIELD from '@salesforce/schema/ToDo__c.Description__c';
import DUEDATE_FIELD from '@salesforce/schema/ToDo__c.DueDate__c';
import REMINDERDATE_FIELD from '@salesforce/schema/ToDo__c.ReminderDate__c';
import ASSIGNEDTO_FIELD from '@salesforce/schema/ToDo__c.AssignedTo__c';


export default class NewToDo extends LightningElement {
    @track currentUserId = Id;
    sObject = TODO_OBJECT;
    notesField = NOTES_FIELD;
    dueDateField = DUEDATE_FIELD;
    reminderDateField = REMINDERDATE_FIELD;
    assignedToField = ASSIGNEDTO_FIELD;

    handleRecordCreated() {
        // Run code when account is created.
        this.handleReset();
        this.dispatchEvent(new CustomEvent('success'));
    }

    handleReset() {
        const inputFields = this.template.querySelectorAll(
            'lightning-input-field'
        );
        if (inputFields) {
            inputFields.forEach(field => {
                field.reset();
            });
        }
    }

    renderedCallback(){
        this.currentUserId = Id;
    }
}