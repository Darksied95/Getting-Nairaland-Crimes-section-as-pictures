const puppeteer = require('puppeteer')


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
        const news = await page.goto(each)
        await page.screenshot({ path: each.split('/').at(-1) + '.png', fullPage: true })
    }


    // await page.pdf({ path: 'example.pdf', format: 'A4' })

    await browser.close()
}

run()

