# @mandarvl/ngx-datatable-wrapper

A powerful, reusable datatable wrapper for Angular applications, built on top of `@swimlane/ngx-datatable`.

## Features

- **Integrated Search**: easily filter data with specific fields.
- **Date Range Filtering**: Built-in support for `ngx-bootstrap` daterangepicker.
- **Status Filtering**: Integrated `ng-select` for status-based filtering.
- **Dynamic Templates**: Pre-configured templates for common data types (Currency, Status, Date, Boolean, etc.).
- **Debounced Search**: Optimized search input to reduce API calls.
- **External Paging & Sorting**: Designed to work seamlessly with server-side operations.

## Installation

```bash
npm install @etsena/ngx-datatable-wrapper
```

### Compatibility

| Library Version | Angular Version |
| --------------- | --------------- |
| 2.x.x           | 19.x.x          |
| 1.x.x           | 18.x.x          |

### Peer Dependencies

Ensure you have the following dependencies installed in your project:

```bash
npm install @swimlane/ngx-datatable @ng-select/ng-select ngx-bootstrap @ngx-translate/core moment sweetalert2
```

## Usage

### 1. Import the Module

```typescript
import { DatatableWrapperModule } from "@mandarvl/ngx-datatable-wrapper";

@NgModule({
  imports: [
    // ...
    DatatableWrapperModule,
  ],
})
export class YourModule {}
```

### 2. Component Implementation

```html
<datatable-wrapper
  [name]="'Orders'"
  [columns]="columns"
  [tableModelInput]="tableModel"
  [searchFields]="['orderNumber', 'customerName']"
  [dateField]="'createdAt'"
  (onFetchDataRequired)="loadData($event)"
  (edit)="onEdit($event)"
  (delete)="onDelete($event)"
>
</datatable-wrapper>
```

```typescript
import { TableModel, TableColumn } from '@mandarvl/ngx-datatable-wrapper';

// ...
columns: TableColumn[] = [
    { prop: 'orderNumber', name: 'Order #' },
    { prop: 'total', name: 'Total', cellTemplate: this.datatable.currencyTemplate }
];
tableModel = new TableModel();

loadData(event: TableModel) {
    // Call your service here
}
```

## License

MIT
