// table.component.ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-table',
  template: `<ag-grid-angular class="ag-theme-alpine" [rowData]="data" [columnDefs]="columnDefs" style="width: 100%; height: 300px;"></ag-grid-angular>`
})
export class TableComponent {
  @Input() data: any[] = [];
  columnDefs = [
    { field: 'date' },
    { field: 'temperature', headerName: 'Temperature (°C)' },
    { field: 'humidity', headerName: 'Humidity (%)' }
  ];
}
