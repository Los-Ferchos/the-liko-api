/**
 * Generates a pagination object based on the provided parameters.
 *
 * @param {number} page - The current page number.
 * @param {number} limit - The number of items displayed per page.
 * @param {number} totalItems - The total number of items to be paginated.
 * @returns {Object} - Pagination object containing metadata for current page, total pages,
 *                    next and previous page information if applicable.
 */
export const generatePagination = (page, limit, totalProductsCount) => {
    const parsedPage = parseInt(page), parsedLimit = parseInt(limit), parsedTotal = parseInt(totalProductsCount);
    const startIndex = (parsedPage - 1) * parsedLimit;
    const endIndex = parsedPage * parsedLimit;
    
    const pagination = {
      total: parsedTotal,
      limit: parseInt(limit),
      totalPages: Math.ceil(parsedTotal / limit),
      page: parsedPage
    };
  
    if (endIndex < parsedTotal) {
      pagination.next = {
        page: parsedPage + 1
      };
    }
  
    if (startIndex > 0) {
      pagination.prev = {
        page: parsedPage - 1
      };
    }
  
    return pagination;
};