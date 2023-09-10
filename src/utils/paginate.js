export function paginate(items, currentPage, pageSize) {
    const startIndex = currentPage * pageSize - pageSize;
    const endIndex = currentPage * pageSize;
    return items.slice(startIndex, endIndex);
}
