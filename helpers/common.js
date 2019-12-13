export function arrayFromLength (number) {
    return Array.from(new Array(number).keys()).map(el => el+1)
}

export function formatAllCurrancy(data) {

    const currancyArr = data.replace('$', '• ').split(' • ');
    const [USD, UAH, EUR] = currancyArr.map(price => parseInt(price.replace(/[^0-9]/g, '')));
    return {
        USD,
        UAH,
        EUR
    }
}