import { InjectionToken } from '@angular/core';

export type StatusClassFn = (status: string) => string;
export type StatusClassMapping = { [key: string]: string } | StatusClassFn;

export interface DatatableWrapperConfig {
    statusClass?: StatusClassMapping;
}

export const DATATABLE_WRAPPER_CONFIG = new InjectionToken<DatatableWrapperConfig>('DATATABLE_WRAPPER_CONFIG');
