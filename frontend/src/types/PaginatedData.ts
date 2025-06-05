export type PaginatedData<T> = {
    data: T[];
    totalElements: number;
    totalPages: number;
}