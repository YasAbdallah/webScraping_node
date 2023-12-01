const rp = require("request-promise")
const cheerrio = require('cheerio')
const potusParse = require("./potusParse")
const urlWiki = 'https://en.wikipedia.org'
const path = "/wiki/List_of_Presidents_of_the_United_States"

rp(urlWiki+path).then(html => {
    const $ = cheerrio.load(html)
    const wikiUrls = []
    const pesq = $('table>tbody>tr>td>b>a', html)
    for (let i = 0; i < pesq.length; i++){
        wikiUrls.push(pesq[i].attribs.href)
    }
    return Promise.all(
        wikiUrls.map(url => {
            return potusParse(urlWiki+url)
        })
    )
}).then(presidentes => {
    console.log(presidentes)
}).catch(err => {
    console.log(err)
})