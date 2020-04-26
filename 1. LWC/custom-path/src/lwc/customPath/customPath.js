import { LightningElement, api } from 'lwc';

export default class CustomPath extends LightningElement {
    @api allStages;
    @api lastCompletedStage;

    renderedCallback(){
        this.updateCurrentStage(this.lastCompletedStage);
    }

    updateCurrentStage(stageName) {
        /* Get all the li elements */
        let liElements = this.template.querySelectorAll('li');
        /* Variable to store the index of active stage on path */
        let activeIndex = 0;
        /* Get the index of the active stage on path */
        for (let i = 0; i < liElements.length; i++) {
            if (liElements[i].dataset.identifier === 'pathstage') {
                if (liElements[i].dataset.key === stageName) {
                    /* Index next to the last completed stage will mark the active stage */
                    activeIndex = i + 1;
                    break;
                }
            }
        }

        /* Mark all the stages prior to active index as completed */
        for (let i = 0; i < activeIndex; i++) {
            if (liElements[i].dataset.identifier === 'pathstage') {
                liElements[i].className = 'slds-path__item slds-is-complete';
            }   
        }

        /* Update the class for active stage */
        if (activeIndex < liElements.length) {
            liElements[activeIndex].className = 'slds-path__item slds-is-current slds-is-active';
        }
    }
}