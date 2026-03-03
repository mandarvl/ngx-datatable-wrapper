import { Component, EventEmitter, Inject, Input, OnDestroy, OnInit, Optional, Output, TemplateRef, ViewChild } from '@angular/core';
import { SelectionType, TableColumn } from '@swimlane/ngx-datatable';
import { BehaviorSubject, Subscription } from 'rxjs';
import { SortInfo, TableState } from './types/table-state.interface';
import { TableModel } from './types/tableModel';
import { DatatableService } from './services/datatable.service';
import { DATATABLE_WRAPPER_CONFIG, DatatableWrapperConfig, StatusClassMapping } from './types/datatable-wrapper-config.interface';
import * as moment from 'moment';

@Component({
  selector: 'datatable-wrapper',
  templateUrl: './datatable-wrapper.component.html',
  styleUrls: ['./datatable-wrapper.component.css']
})
export class DatatableWrapperComponent<T> implements OnInit, OnDestroy {
  @Input()
  name!: string;

  @Input()
  editUrl!: string;

  @Input()
  columns!: TableColumn[];

  @Input()
  searchFields?: string[];

  @Input()
  dateField?: string;

  @Input()
  statuses?: string[];

  @Input()
  statusClass?: StatusClassMapping;

  selectedStatus?: string;

  private _tableModelInput = new BehaviorSubject<TableModel<T> | undefined>(undefined);

  dates: Date[] | null = null;

  SelectionType = SelectionType;

  @ViewChild('emptyTemplate')
  public emptyTemplate!: TemplateRef<any>;

  @ViewChild('actionTemplate')
  public actionTemplate!: TemplateRef<any>;

  @ViewChild('colorTemplate')
  public colorTemplate!: TemplateRef<any>;

  @ViewChild('currencyTemplate')
  public currencyTemplate!: TemplateRef<any>;

  @ViewChild('currencyWithSymbolTemplate')
  public currencyWithSymbolTemplate!: TemplateRef<any>;

  @ViewChild('idAnchorEditTemplate')
  public idAnchorEditTemplate!: TemplateRef<any>;

  @ViewChild('idAnchorTemplate')
  public idAnchorTemplate!: TemplateRef<any>;

  @ViewChild('translateTemplate')
  public translateTemplate!: TemplateRef<any>;

  @ViewChild('objectNameTemplate')
  public objectNameTemplate!: TemplateRef<any>;

  @ViewChild('listObjectNameTemplate')
  public listObjectNameTemplate!: TemplateRef<any>;

  @ViewChild('booleanTemplate')
  public booleanTemplate!: TemplateRef<any>;

  @ViewChild('statusTemplate')
  public statusTemplate!: TemplateRef<any>;

  @ViewChild('dateTemplate')
  public dateTemplate!: TemplateRef<any>;

  @ViewChild('dateTimeTemplate')
  public dateTimeTemplate!: TemplateRef<any>;

  @ViewChild('arrayCountTemplate')
  public arrayCountTemplate!: TemplateRef<any>;

  @ViewChild('contactTemplate')
  public contactTemplate!: TemplateRef<any>;

  @ViewChild('activeTemplate')
  public activeTemplate!: TemplateRef<any>;

  // change data to use getter and setter
  @Input()
  set tableModelInput(value) {
    // set the latest value for _data BehaviorSubject
    if (value !== undefined) {
      this._tableModelInput.next(value);
    }
  };

  get tableModelInput() {
    // get the latest value from _data BehaviorSubject
    return this._tableModelInput.getValue();
  }

  @Output()
  onFetchDataRequired = new EventEmitter<TableModel<T>>();

  @Output()
  edit = new EventEmitter<T>();
  @Output()
  delete = new EventEmitter<T>();
  @Output()
  select = new EventEmitter<T>();
  @Output()
  tableContextmenu = new EventEmitter<T>();
  @Output()
  exportExcel = new EventEmitter<TableState>();

  tableModel?: TableModel<T>;

  isLoading: boolean = false;

  searchTerm?: string;
  currentPageLimit!: number;

  pageLimitOptions = [
    { value: 10 },
    { value: 25 },
    { value: 50 },
    { value: 100 },
  ];

  subscription = new Subscription();

  constructor(
    private datatableService: DatatableService,
    @Optional() @Inject(DATATABLE_WRAPPER_CONFIG) private config: DatatableWrapperConfig
  ) {
  }

  ngOnInit(): void {
    this.subscription.add(
      this._tableModelInput.subscribe(tableModel => {
        const isFirst = !this.tableModel;

        this.tableModel = tableModel;
        const size = this.tableModel?.tableState?.slice.size;
        const term = this.tableModel?.tableState?.search?.value;

        this.currentPageLimit = size || 25;
        this.searchTerm = term;

        this.isLoading = false;

        if (isFirst) {
          const dateFilter = this.datatableService.getFilterValueArray(this.tableModelInput?.tableState, this.dateField || 'createdAt');
          this.dates = dateFilter?.length ? [(moment as any)(dateFilter[0]).toDate(), (moment as any)(dateFilter[1]).toDate()] : null;
          this.selectedStatus = this.datatableService.getFilterValue(this.tableModelInput?.tableState, 'status');
          this.loadPage();
        }
      })
    );

    if (!this.tableModel) {
      this.tableModel = new TableModel<T>();
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  filterTable(field: string, value: any) {
    if (!this.tableModel?.tableState) {
      return;
    }
    this.datatableService.applyFilter(this.tableModel.tableState, field, value);
    this.loadPage();
  }

  protected clearDate() {
    this.dates = [];
    this.filterByDate();
  }

  protected filterByDate() {
    if (this.tableModel?.tableState && this.dateField) {
      const filter: any = {
        [this.dateField]: null
      };

      if (this.dates?.length) {
        filter[this.dateField] = [
          {
            value: (moment as any)(this.dates[0]).startOf('day').toISOString(),
            operator: 'gte'
          },
          {
            value: (moment as any)(this.dates[1]).endOf('day').toISOString(),
            operator: 'lte'
          }
        ]
      }

      this.datatableService.addFilter(this.tableModel.tableState, filter);

      this.loadPage();
    }
  }

  protected loadPage() {
    this.onFetchDataRequired.emit(this.tableModel);
    this.isLoading = true;
  }

  protected onDelete(item: T) {
    this.delete.next(item);
  }

  protected onEdit(item: T) {
    this.edit.next(item);
  }

  protected onExport() {
    const ts = {
      ...this.tableModel?.tableState,
      slice: {
        pageNumber: 0,
        size: 9999
      }
    }
    this.exportExcel.next(ts);
  }

  protected onSelect(event: any) {
    this.select.next(event.selected[0]);
  }

  protected onSearch(term: string) {
    if (this.tableModel?.tableState?.slice) {
      if (term != this.tableModel?.tableState?.search?.value) {
        this.tableModel.tableState.slice.pageNumber = 0;
        this.tableModel.tableState.search = {
          fields: this.searchFields,
          value: term
        };
        this.loadPage();
      }
    }
  }

  protected onSort(event: SortInfo) {
    if (this.tableModel && this.tableModel.tableState?.sort) {
      if (this.tableModel.tableState.sort?.prop != event.sorts[0].prop) {
        this.tableModel.tableState.slice.pageNumber = 0;
      }

      this.tableModel.tableState.sort.prop = event.sorts[0].prop;
      this.tableModel.tableState.sort.dir = event.sorts[0].dir;

      this.loadPage();
    }
  }

  protected onContextMenu(event: any) {
    this.tableContextmenu.next(event);
  }

  public onLimitChange(limit: any): void {
    if (this.tableModel?.tableState?.slice) {
      this.tableModel.tableState.slice.size = this.currentPageLimit = parseInt(limit, 10);
      this.tableModel.tableState.slice.pageNumber = 0;
      this.loadPage();
    }
  }

  public onPageChange(pageEvent = { offset: 0 }): void {
    if (this.tableModel?.tableState?.slice) {
      this.tableModel.tableState.slice.pageNumber = pageEvent.offset;
      this.loadPage();
    }
  }

  public getStatusClass(status: string): string {
    const resolve = (mapping?: StatusClassMapping) => {
      if (typeof mapping === 'function') {
        return mapping(status);
      }
      if (typeof mapping === 'object' && mapping !== null) {
        return mapping[status];
      }
      return undefined;
    };

    return resolve(this.statusClass) || resolve(this.config?.statusClass) || 'primary';
  }

}
