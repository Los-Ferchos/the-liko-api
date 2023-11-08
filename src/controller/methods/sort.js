export const getSortTypeField = (sortNumber) => {
    let sortField = 'name';

    switch (sortNumber) {
        case '1' || '1':
            sortField = 'name';
            break;
        case '2' || '-2':
            sortField = 'price';
            break;
        default:
            break;
    }

    return sortField;
};