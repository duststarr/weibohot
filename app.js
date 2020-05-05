const cheerio = require("cheerio")
const superagent = require("superagent")
const fs = require("fs")

const weiboURL = "https://s.weibo.com"
const hotSearchURL = weiboURL + "/top/summary?cate=realtimehot"

superagent.get(hotSearchURL, (err, res) => {
    if(err) console.log(err);
    const $ = cheerio.load(res.text);
    let hotList = [];
    $("#pl_top_realtimehot tbody tr").each( function(index) {
        if(0 !== index){
            // console.log($(this))
            const $td = $(this).children().eq(1);
            // console.log($td);
            const link = weiboURL + $td.find("a").attr('href');
            const text = $td.find("a").text();
            hotList.push({
                index,
                link,
                text,
            })
        }
    })
    fs.writeFileSync(
        `${__dirname}/hotSearch.json`,
        JSON.stringify(hotList),
        "utf-8"
    )
})