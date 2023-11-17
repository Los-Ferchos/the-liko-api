
/**
 * This method Returns the key value for the query in order to sent a sort request
 * 
 * @param {number} sortNumber Sort number 
 * 1, -1 .- For Name Sorting
 * 2, -2 .- For Price Sorting
 * 3, -3 .- For Rating Sorting
 * 4, -4 .- For Total Reviews Sorting
 * default .- Popularity (Sells)
 * @returns the key value for the sort way
 */
export const getSortTypeField = (sortNumber) => {
    let sortField = 'sells';

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
        case '5':
            sortField = 'sells';
            break;
        case '-5':
            sortField = 'sells';
            break;
        default:
            break;
    }

    return sortField;
};