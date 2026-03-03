import { Injectable } from '@angular/core';
import { FilterConfiguration, PageInfo, SortInfo, TableState } from '../types/table-state.interface';

@Injectable({
  providedIn: 'root'
})
export class DatatableService {

  constructor() { }

  addFilter(ts: TableState, config: FilterConfiguration) {
    ts.filter = ts.filter || {};

    if (config) {
      Object.keys(config).forEach(field => {
        if (ts.filter) {
          if (config[field]) {
            ts.filter[field] = config[field];
          }
          else {
            delete ts.filter[field];
          }
        }
      });
    }
  }

  applyFilter(ts: TableState, field: string, value: any, operator = 'eq'): TableState {
    ts.filter = ts.filter || {};

    if (value != null) {
      ts.filter[field] = [
        {
          value,
          operator
        }
      ];
    }
    else {
      delete ts.filter[field];
    }

    return ts;

  }

  clearFilter(ts: TableState) {
    ts.filter = {};
    return ts;
  }

  getFilterValue(tableState: TableState | undefined, field: string) {
    const filter = tableState?.filter || {};
    if (!filter || !filter[field] || !filter[field].length)
      return null;

    return filter[field][0].value;
  }

  getFilterValueState(tableState: TableState | undefined, field: string) {
    const filter = tableState?.filter || {};
    if (!filter || !filter[field] || !filter[field].length)
      return null;
    const { value, operator } = filter[field][0];
    if (operator === 'is' && value === null) {
      return false;
    }
    else if (operator === 'not' && value === null) {
      return true;
    }
    return null;
  }

  getFilterValueArray(tableState: TableState | undefined, field: string) {
    if (tableState) {
      const filter = tableState.filter;
      if (!filter || !filter[field] || !filter[field].length)
        return [];
  
      return filter[field].map(f => {
        return f.value
      });
    }
    else {
      return null;
    }
  }
}
