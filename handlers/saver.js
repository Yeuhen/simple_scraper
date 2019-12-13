import path from 'path';
import fs from 'fs';
import chalk from 'chalk';

export default async function saveData(data) {
    const { code } = data;
    const fileName = `${code}.json`;
    const savePath = path.join(__dirname, '..', 'data', fileName);

    return new Promise( (resolve, reject) => {
        fs.appendFile(savePath, `${JSON.stringify(data)},\n`, err => {
            if(err){
                return reject(err)
            }

            console.log(
                chalk.blue('File was saved saccessfully: ') + chalk.blue.bold(fileName) + '\n'
                );
            resolve()
        })
    })

}