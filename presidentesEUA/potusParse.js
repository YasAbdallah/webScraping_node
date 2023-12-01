const rp = require("request-promise")
const cheerrio = require('cheerio')

const potusParse = (url) => {
    return rp(url).then(html => {
        const $ = cheerrio.load(html)
        return {
            nome: $('.mw-page-title-main').text(),
            nascimento: $('th.infobox-label:contains("Born")+td.infobox-data').text()
        }
    }).catch(err => {
        console.log(err)
    })
}

module.exports = potusParse