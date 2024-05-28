export default interface Page<T> {
    data: Array<T>,
    pageNumber: number,
    totalPages: number,
};