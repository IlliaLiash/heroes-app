export interface PaginatedResult<T> {
  currentPage: number;
  totalPages: number;
  isNextPage: boolean;
  totalItems: number;
  items: T[];
}
