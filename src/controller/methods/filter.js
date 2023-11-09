
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

    var query = {};

    switch (key) {
        case 1:
            query = {  $and: [ {"price.value": {$lte: to}}, {"price.value": {$gte: from}}] }
            break;
        case 2: 
            query = {  $and: [ {rating: {$lte: to}}, {rating: {$gte: from}}] }
            break;
        case 3: 
            query = {  $and: [ {"details.abv": {$lte: to}}, {"details.abv": {$gte: from}}] }
            break;
        default:
            break;
    }

    return query;
};