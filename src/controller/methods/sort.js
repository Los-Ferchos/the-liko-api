
/**
 * 
 * @param {number} sortNumber Sort number 
 * 1, -1 .- For Name Sorting
 * 2, -2 .- For Price Sorting
 * 3, -3 .- For Rating Sorting
 * 4, -4 .- For Total Reviews Sorting
 * @returns the key value for the sort way
 */
export const getSortTypeField = (sortNumber) => {
    let sortField = 'name';

    switch (sortNumber) {
        case '1':
            sortField = 'name';
            break;
        case '-1':
            sortField = 'name';
            break;
        case '2':
            sortField = 'price';
            break;
        case '-2':
            sortField = 'price';
            break;
        case '3':
            sortField = 'rating';
            break;
        case '-3':
            sortField = 'rating';
            break;
        case '4':
            sortField = 'totalReviews';
            break;
        case '-4':
            sortField = 'totalReviews';
            break;
        default:
            break;
    }

    return sortField;
};