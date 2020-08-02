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
        var compDefinition = {
        componentDef: "c:treeGrid",
        attributes: {
            srini : "258525",
            srini2:"Kavin"
        }
    };
    // Base64 encode the compDefinition JS object
    var encodedCompDef = btoa(JSON.stringify(compDefinition));
    this[NavigationMixin.Navigate]({
        type: 'standard__webPage',
        attributes: {
            url: '/one/one.app#' + encodedCompDef
        }
    });
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