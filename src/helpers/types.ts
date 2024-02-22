export type RenderFunction = (item: Record<string, any>) => React.ReactNode;

export type AllowedLimits = 10 | 25 | 50 | 100 | 250 | 500 | 1000 | 2000;

export interface Column {
  id: string;
  title: string;
  render: RenderFunction;
}

export interface TableProps {
  data: Record<string, any>[];
  columns: Column[];
  defaultLimit: AllowedLimits;
}
export interface TableState {
  selectedColumns: string[];
  searchInput: string;
  searchedData: Record<string, any>[];
  inputValue: string | number;
  selectedRows: string[];
  sortedColumn: string | undefined;
  limit: number;
}
