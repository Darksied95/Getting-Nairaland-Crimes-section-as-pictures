const puppeteer = require('puppeteer')
const cleaner = require('./CleanUpNews')


cleaner()
async function run() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.nairaland.com/crime')

    const news = await page.evaluate(() => {
        return Array.from(document.querySelectorAll(".body tr td b a"), (e) => e.href)
    })

    const filteredNews = news.filter(each => {
        if (each.split('/').length > 4) return each
    })


    for (const each of filteredNews) {
        await page.goto(each)
        await page.screenshot({ path: './news/' + each.split('/').at(-1) + '.png', fullPage: true })
    }



    await browser.close()
}

run()

