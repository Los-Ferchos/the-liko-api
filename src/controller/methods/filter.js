
export const getFilterQuery = (key, from, to) => {

    var query = {};

    switch (key) {
        case 1:
            query = {  $and: [ {"price.value": {$lte: to}}, {"price.value": {$gte: from}}] }
            break;
        case 2:
    
        default:
            break;
    }

    return query;
};