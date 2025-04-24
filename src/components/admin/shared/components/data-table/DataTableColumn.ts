
import { ReactNode } from "react";

export interface DataTableColumn<T> {
  header: string;
  accessor: keyof T | ((item: T) => ReactNode);
  className?: string;
}
