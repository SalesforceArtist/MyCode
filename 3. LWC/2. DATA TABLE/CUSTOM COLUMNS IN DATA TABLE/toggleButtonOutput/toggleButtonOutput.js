
import { LightningElement, api } from 'lwc';

export default class ToggleButtonOutput extends LightningElement {
    @api checked = false;
    @api buttonDisabled = false;
    @api rowId;

    handleToggle(event) {
        const event = CustomEvent('selectedrec', {
            composed: true,
            bubbles: true,
            cancelable: true,
            detail: {
                value: { rowId: this.rowId, state: event.target.checked }
            },
        });
        this.dispatchEvent(event);
    }

    get getInactiveMsg(){
        return this.buttonDisabled?'Disabled':'Not Selected';
    }
}