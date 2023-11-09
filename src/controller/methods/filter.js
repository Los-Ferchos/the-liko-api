
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