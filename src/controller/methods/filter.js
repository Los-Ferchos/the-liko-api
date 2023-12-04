
/**
 * This method Returns the query in order to send a filter request
 * 
 * @param {*} array the filter string array received containing "n_n1_n2" 
 * n = key, n1 = from range number, n2 = final range number
 * 
 * key = 1.- Price Filter option query
 * key = 2.- Rating Filter option query
 * key = 3.- Abv Filter option query
 * 
 * @returns query for filter  
 */
export const getFilterQuery = (array) => {

    const operationsArray = array.split("_").map(Number);
    const key = operationsArray[0];
    const from = operationsArray[1];
    const to = operationsArray[2];

    var query = [];

    switch (key) {
        case 2: 
            query[0] = {rating: {$lte: to}}
            query[1] = {rating: {$gte: from}} 
            break;
        case 3: 
            query[0] = {"details.abv": {$lte: to}}
            query[1] = {"details.abv": {$gte: from}}
            break;
        default:
            break;
    }

    return query;
};


export const getFilterPriceWithCurrency = (products, filterString) => {

    const operationsArray = filterString.split("_").map(Number);
    const from = operationsArray[1];
    const to = operationsArray[2];

    return products.filter(item => item.price.value >= from && item.price.value <= to);
} 
 

/**
 * Ths method receives multiple filter queries to send a general query validating that are not empty
 * @param {*} ft1 first filter query
 * @param {*} ft2 second filter query
 * @param {*} ft3 third filter query
 * @returns genera query containing multiple filter queries
 */
export const getFiltersQuery = (ft1, ft2, ft3) => {
    const filters = [];
    
    const filterQuery1 = getFilterQuery(ft1);
    const filterQuery2 = getFilterQuery(ft2);
    const filterQuery3 = getFilterQuery(ft3);

    if (filterQuery1.length > 0) {
        filters[filters.length] = filterQuery1[0]; 
        filters[filters.length] = filterQuery1[1]; 
    }

    if (filterQuery2.length > 0) {
        filters[filters.length] = filterQuery2[0]; 
        filters[filters.length] = filterQuery2[1]; 
    }

    if (filterQuery3.length > 0) {
        filters[filters.length] = filterQuery3[0]; 
        filters[filters.length] = filterQuery3[1];  
    }

    return filters;

}