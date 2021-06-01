import { LightningElement, api, track, wire } from 'lwc';
import { refreshApex } from '@salesforce/apex';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getResponse from '@salesforce/apex/LiveChatTranscriptController.getAPIResponse';
import getChatList from '@salesforce/apex/LiveChatTranscriptController.getChatData';

export default class LiveChatComponent extends LightningElement {
    
    rowRecordId;
    previousRowRecordId;
    isLoaded=false;
    isGridLoaded=false;
    chatId;
    @track calloutError = false;
    @track apiResponse;
    

    error;
    data;

    lastRow;
    

    @wire(getChatList)
    chatData;

    handleAnalyzeChat(event) {
        this.getResponseFromApiCall(this.rowRecordId);
        //this.showToast('Success','Data loaded Successfully','success');
    }


    setRowRecordId(event){
        this.rowRecordId=event.target.dataset.item;
        let querySel= '[data-highlight="'+ this.rowRecordId+'"]';

        debugger;

        if(this.previousRowRecordId!=undefined){
            let previousQuerySel= '[data-highlight="'+ this.previousRowRecordId+'"]';
            this.template.querySelector(previousQuerySel).classList.remove('colorHighlight');
        }

        
        debugger;
        
        
        
        this.template.querySelector(querySel).classList.add('colorHighlight');


        /*if(lastRow != undefined){
            lastRow.style.backgroundColor = 'green';
        }else{

            elem.style.backgroundColor = 'yellow';

        }
        lastRow = elem; */
        
        this.chatId=event.target.dataset.name;

      /*  const showToast = new ShowToastEvent({
            title: 'Success',
            message: 'Chat ID '+this.chatId+' selected. Click on Analyze Chat.',
            variant: 'success',
            mode: 'dismissable'
        });
        this.dispatchEvent(showToast);*/

        this.previousRowRecordId=event.target.dataset.item;
        
    }


    getResponseFromApiCall(rowRecordId) {
        debugger;
        this.isLoaded = !this.isLoaded;
        getResponse({
            rowRecordIdValue: rowRecordId
        })
            .then((result) => {
                debugger;

                if (
                    result == 'Exception' ||
                    result == 'Callout Exception' ||
                    result == 'Other Status Code Exception'
                ) {
                    this.isLoaded = !this.isLoaded;
                    this.calloutError = true;
                } else if (result) {
                   this.apiResponse=JSON.parse(result);
                      
                    this.isLoaded = !this.isLoaded;
                    this.calloutError = false;

                    

                    
                }
            })
            .catch((error) => {
                debugger;
                this.error = error;
               // this.handleError(error);
            });
    }


    showToast(toastTitle,toastMessage,toastVariant){
              
        this.dispatchEvent(
            new ShowToastEvent({
                title: toastTitle,
                message:toastMessage,
                variant: toastVariant,
            }),
        );
    } 
}