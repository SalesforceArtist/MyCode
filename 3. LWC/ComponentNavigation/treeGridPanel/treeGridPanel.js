import { LightningElement,api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class TreeGridPanel extends NavigationMixin(LightningElement) {

    clickedButtonLabel;
    @api fieldSetForFinancialHolding;
    @api fieldSetForFinancialAccount;
    @api financialAccountRecordTypes;
    @api iconStyle;
    @api title;
    @api recordId;

    navigateToNewRecordPage() { 
        
    }

    navigateToNewAccount() {
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Opportunity',
                actionName: 'new'
            }
        });
    }
}
