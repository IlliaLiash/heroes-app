export interface PaginatedResult<T> {
  currentPage: number;
  totalPages: number;
  isNextPage: boolean;
  items: T[];
}
