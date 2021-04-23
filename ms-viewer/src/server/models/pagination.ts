export interface PaginateParams {
  perPage: number;
  currentPage: number;
  isFromStart?: boolean;
  isLengthAware?: boolean;
}

export interface WithPagination<T = any> {
  data: T;
  pagination: Pagination;
}

export interface Pagination {
  total?: number;
  lastPage?: number;
  currentPage: number;
  perPage: number;
  from: number;
  to: number;
}
