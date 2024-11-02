export interface PaginatedResult<T> {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  isNextPage: boolean;
  items: T[];
}
