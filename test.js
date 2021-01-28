const {webdriver,until,Builder, By, Key} = require('selenium-webdriver');
const fs = require('fs');
var chrome = require('selenium-webdriver/chrome');

(async ()=> {
    try{
        var driver = await new Builder().forBrowser('chrome').setChromeOptions(new chrome.Options().addArguments('disable-gpu').addArguments('user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36')).build();
        // var driver = await new Builder().forBrowser('chrome').setChromeOptions(new chrome.Options().addArguments('disable-gpu').addArguments('user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36').addArguments('headless')).build();
        //headless, 가속화 disabled 및 selenium 필터링 방지를 위한 user-agent 설정
    }catch(error) {
        console.error("getDriver ERR",error);
    }
    await driver.executeScript("Object.defineProperty(navigator, 'plugins', {get: function() {return[1, 2, 3, 4, 5];},});");//selenium 필터링 방지
    
    const url = ("http://ecomm.one-line.com/ecom/CUP_HOM_3001.do?sessLocale=en");//webdriver URL 호출
    try{
        await driver.get(url);
        await driver.sleep(1000);
        
    }catch(error) {
        console.error("getUrl ERR",error);
    }
    
})();