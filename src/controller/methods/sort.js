const getSortTypeField = (sortNumber) => {

    switch (sortNumber) {
        case 1:
            return 'name'
        case 2:
            return 'price'
        default:
            return 'name'
    }
}