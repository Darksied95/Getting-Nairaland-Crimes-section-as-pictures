const puppeteer = require('puppeteer')
const cleaner = require('./CleanUpNews')

/*

Cleans news folder

*/
cleaner()
const section = 'crime'

async function run() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`https://www.nairaland.com/${section}`)

    const news = await page.evaluate(() => {
        return Array.from(document.querySelectorAll(".body tr td b a"), e => e.href)
    })

    const filteredNews = news.filter(each => each.split('/').length > 4 ? each : false)


    for (let i = 0; i < filteredNews.length; i++) {

        await page.goto(filteredNews[i])
        await page.screenshot({ path: './news/' + filteredNews[i].split('/').at(-1) + '.png', fullPage: true })

        console.clear()

            (i !== filteredNews.length - 1)
            ?
            console.log(Math.floor(i / filteredNews.length * 100) + '%')
            :
            console.log('Completed')
    }
    await browser.close()
}

run()

