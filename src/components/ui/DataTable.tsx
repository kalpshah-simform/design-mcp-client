import { useState, type ReactNode } from "react";
import Button from "./Button";

export type TableDensity = "compact" | "comfortable";
export type SortDirection = "asc" | "desc";

export interface SortState {
  key: string;
  direction: SortDirection;
}

export interface Column<T> {
  key: string;
  header: string;
  sortable?: boolean;
  render?: (row: T) => ReactNode;
}

interface DataTableProps<T extends Record<string, unknown>> {
  columns: Column<T>[];
  rows: T[];
  rowKey?: keyof T;
  density?: TableDensity;
  sort?: SortState;
  onSortChange?: (sort: SortState) => void;
  caption: string;
  pagination?: boolean;
  pageSize?: number;
}

const DENSITIES: Record<TableDensity, string> = {
  compact: "px-sm py-xs",
  comfortable: "px-md py-md",
};

/**
 * Design-system DataTable (props per MCP: density compact|comfortable, pagination true|false).
 * Sorting is controlled via sort/onSortChange; pagination is composed externally.
 */
export default function DataTable<T extends Record<string, unknown>>({
  columns,
  rows,
  rowKey = "id" as keyof T,
  density = "comfortable",
  sort,
  onSortChange,
  caption,
  pagination = false,
  pageSize = 5,
}: DataTableProps<T>) {
  const [page, setPage] = useState(1);
  const cell = DENSITIES[density];

  const pageCount = Math.max(1, Math.ceil(rows.length / pageSize));
  const currentPage = Math.min(page, pageCount);
  const visibleRows = pagination
    ? rows.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    : rows;

  const handleSort = (col: Column<T>) => {
    if (!col.sortable || !onSortChange) return;
    const direction: SortDirection =
      sort?.key === col.key && sort.direction === "asc" ? "desc" : "asc";
    onSortChange({ key: col.key, direction });
  };

  return (
    <div>
      <table className="w-full border-collapse text-left" aria-label={caption}>
        <thead>
          <tr className="border-b border-gray-100 bg-gray-100">
            {columns.map((col) => (
              <th
                key={col.key}
                scope="col"
                className={`${cell} font-semibold text-gray-600`}
              >
                {col.sortable ? (
                  <button
                    type="button"
                    onClick={() => handleSort(col)}
                    aria-label={`Sort by ${col.header}`}
                    className="inline-flex min-h-touch items-center gap-xs font-semibold hover:text-secondary"
                  >
                    {col.header}
                    <span aria-hidden="true" className="text-sm">
                      {sort?.key === col.key
                        ? sort.direction === "asc"
                          ? "▲"
                          : "▼"
                        : "↕"}
                    </span>
                  </button>
                ) : (
                  col.header
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {visibleRows.map((row) => (
            <tr
              key={String(row[rowKey])}
              className="border-b border-gray-100 transition-colors hover:bg-background"
            >
              {columns.map((col) => (
                <td key={col.key} className={`${cell} text-secondary`}>
                  {col.render ? col.render(row) : (row[col.key] as ReactNode)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {pagination && rows.length > 0 && (
        <nav
          aria-label="Table pagination"
          className="flex flex-col items-center justify-between gap-md border-t border-gray-100 px-sm py-md sm:flex-row"
        >
          <p className="text-sm text-gray-600">
            Showing {(currentPage - 1) * pageSize + 1}–{Math.min(currentPage * pageSize, rows.length)} of {rows.length}
          </p>
          <div className="flex items-center gap-sm">
            <Button
              variant="secondary"
              size="sm"
              aria-label="Previous page"
              disabled={currentPage <= 1}
              onClick={() => setPage(currentPage - 1)}
            >
              ← Prev
            </Button>
            {Array.from({ length: pageCount }, (_, i) => i + 1).map((p) => (
              <Button
                key={p}
                variant={p === currentPage ? "primary" : "secondary"}
                size="sm"
                aria-label={`Page ${p}`}
                aria-current={p === currentPage ? "page" : undefined}
                onClick={() => setPage(p)}
              >
                {p}
              </Button>
            ))}
            <Button
              variant="secondary"
              size="sm"
              aria-label="Next page"
              disabled={currentPage >= pageCount}
              onClick={() => setPage(currentPage + 1)}
            >
              Next →
            </Button>
          </div>
        </nav>
      )}
    </div>
  );
}
