import { TableColumn } from "@swimlane/ngx-datatable";

export interface SortConfiguration {
    prop?: string,
    dir?: 'ASC' | 'DESC'
}

export interface PredicateDefinition {
    operator?: string;
    value?: any;
}

export interface FilterConfiguration{
    [field: string]: PredicateDefinition[]
}

export interface TableState { 
    search?: {
       value?: string,
       fields?: string[]
    };
    filter?: FilterConfiguration;
    sort?: SortConfiguration;
    slice: {pageNumber: number, size: number} 
}

export interface PageInfo {
    offset: number;
    pageSize: number;
    limit: number;
    count: number;
}

export interface SortInfo {
    sorts: SortConfiguration[];
    column: TableColumn;
    prevValue?: string;
    newValue: string;
}