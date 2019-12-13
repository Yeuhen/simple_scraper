export function arrayFromLength (number) {
    return Array.from(new Array(number).keys()).map(el => el+1)
}

export function formatCurrancyUSD(currancyUSD) {
    // const priceUSD = parseInt(currancyUSD);
    // return priceUSD
    const currancyArr = currancyUSD.replace('$', '• ').split(' • ');
    const [USD, UAH, EUR] = currancyArr.map(price => parseInt(price.replace(/[^0-9]/g, '')));
    return {
        USD,
        UAH,
        EUR
    }
}