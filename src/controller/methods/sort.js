export const getSortTypeField = (sortNumber) => {
    let sortField = 'asdaf';

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
        default:
            break;
    }

    return sortField;
};