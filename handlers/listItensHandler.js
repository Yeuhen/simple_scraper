import cheerio from 'cheerio';
import chalk from 'chalk';

import saveData from '../handlers/saver';
import { getPageContent } from '../helpers/puppeteer';
import { formatCurrancyUSD, formatCurrancyUAHAndEUR} from '../helpers/common';



export default async function listItensHandler(data) {
    try {
        for (const initialData of data) {
            console.log(chalk.green(`Getting data from: `) + chalk.green.bold(initialData.url));
            const detailContent = await getPageContent(initialData.url);
            const $ = cheerio.load(detailContent);
        
        const currancyUSD = $('.auto-sidebar .price_value').text();
        // const dateOfPrice = $('.auto-sidebar .checked-list--indent .item_inner').text();
        // console.log('dateOfPrice: ', dateOfPrice);

        let price =  formatCurrancyUSD(currancyUSD);

        await saveData({
            ...initialData,
            price
        })
 

        }
    } catch(err) {
        throw err
    }

}