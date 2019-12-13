import cheerio from 'cheerio';
import chalk from 'chalk';
import {slugify} from 'transliteration';

import listItensHandler from './handlers/listItensHandler';
import { arrayFromLength } from './helpers/common';
import { getPageContent } from './helpers/puppeteer';
import { log } from 'util';

const URL_HOME = 'https://auto.ria.com';
const SITE = 'https://auto.ria.com/newauto/search/?page=';
const FILTER = '&type=new&priceTo=32000&categoryId=1'
const page = 1;

(async function main() {
    try {
        for (const page of arrayFromLength(page)){
            const url = `${SITE}${page}${FILTER}`;
            const pageContent = await getPageContent(url);
            const $ = cheerio.load(pageContent);
            const carsItems = [];

            $('[data-element="name"]').each((i, header) => {             
                    const url = `${URL_HOME}${$(header).attr('href')}`;
                    const title = $(header).text();                   
                    let clearingData = new RegExp('акция|кредит','i').test(title);                    

                    if(!clearingData){
                    carsItems.push({
                        title,
                        url,
                        code: slugify(title)
                        })
                }
            })
            await listItensHandler(carsItems);
        }
    } catch (err) {
        console.log(chalk.red('An error has occured \n'));
        console.log(err);
    }
})();