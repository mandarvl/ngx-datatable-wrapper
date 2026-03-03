import { DatatableSummary } from "./paging";
import { TableState } from "./table-state.interface";


export class TableModel<T> {
    summary: DatatableSummary;
    tableState?: TableState;
    data: Array<T>;

    constructor(ts?: TableState) {
        this.summary = new DatatableSummary();
        this.data = new Array<T>();

        this.tableState = ts;
    }
}