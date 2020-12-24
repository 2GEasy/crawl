const axios = require("axios");
const cheerio = require("cheerio");

let html = "";
// const { getRec, getSmp } = require("./crawl.js");
// const cron = require("node-cron");

// async function handleAsync() {
//   const rec = await getRec();
//   const smp = await getSmp();
//   console.log("rec", rec, "smp", smp);
// }

// cron.schedule("*/2 * * * *", async () => {
//   console.log("running a task every two minutes");
//   await handleAsync();
// });

async function getHtml() {
  try {
    return await axios.get("https://www.kpx.or.kr/");
  } catch (error) {
    console.error(error);
  }
}

async function getSmp() {
  if (!html) {
    html = await getHtml();
  }

  const $ = cheerio.load(html.data);
  let smp = {};
  $("#m_contents .m_cont_lf .y_forecast_elec table")
    .find("tr")
    .each(function(index, elem) {
      switch (
        $(this)
          .find("th")
          .text()
          .trim()
      ) {
        case "거래일":
          smp[`date`] = $(this)
            .find("td")
            .text()
            .replace(/([\t|\n|\s])/gi, "");
          break;
        case "최대":
          smp[`max`] = $(this)
            .find("td")
            .text()
            .replace(/([\t|\n|\s])/gi, "");
          break;
        case "최소":
          smp[`min`] = $(this)
            .find("td")
            .text()
            .replace(/([\r|\n|\s])/gi, "");
          break;
        case "평균":
          smp[`avg`] = $(this)
            .find("td")
            .text()
            .replace(/([\r|\n|\s])/gi, "");
          break;
      }
    });

  return smp;
}

async function getRec() {
  if (!html) {
    html = await getHtml();
  }

  const $ = cheerio.load(html.data);
  let rec = {};
  $("#m_contents .m_today_rec table")
    .find("tr")
    .each(function(index, elem) {
      switch (
        $(this)
          .find("th")
          .text()
          .trim()
      ) {
        case "거래일":
          rec[`date`] = $(this)
            .find("td")
            .text()
            .replace(/([\t|\n|\s])/gi, "");
          break;
        case "거래량":
          rec[`volumn`] = $(this)
            .find("td")
            .text()
            .replace(/([\t|\n|\s])/gi, "");
          break;
        case "평균가":
          rec[`avg`] = $(this)
            .find("td")
            .text()
            .replace(/([\r|\n|\s])/gi, "");
          break;
        case "최고가":
          rec[`max`] = $(this)
            .find("td")
            .text()
            .replace(/([\r|\n|\s])/gi, "");
          break;
        case "최저가":
          rec[`min`] = $(this)
            .find("td")
            .text()
            .replace(/([\r|\n|\s])/gi, "");
          break;
        case "종가":
          rec[`last`] = $(this)
            .find("td")
            .text()
            .replace(/([\r|\n|\s])/gi, "");
          break;
      }
    });

  return rec;
}
module.exports = { getRec, getSmp };