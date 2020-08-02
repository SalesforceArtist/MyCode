import { LightningElement, api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import {
    EXAMPLES_COLUMNS_DEFINITION_BASIC,
    EXAMPLES_DATA_BASIC,
} from './sampleData';

export default class TreeGridBasic extends NavigationMixin(LightningElement) {

    @api gridColumns;
    @api srini;
    @api srini2;

    
    // definition of columns for the tree grid
    gridColumns2 = EXAMPLES_COLUMNS_DEFINITION_BASIC;

    // data provided to the tree grid
    gridData = EXAMPLES_DATA_BASIC;
}
