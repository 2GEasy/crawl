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
    
    const fr = "Busan";
    const to_ = "Qingdao";
    
    const url = ("https://elines.coscoshipping.com/ebusiness/sailingSchedule/searchByCity");//webdriver URL 호출
    try{
        await driver.get(url);
        await driver.sleep(1000);
        
    }catch(error) {
        console.error("getUrl ERR",error);
    }
    await driver.wait(until.elementLocated(By.xpath("/html/body/div[3]/div[2]/div/div/div[3]/div/button"))).click();
    await driver.wait(until.elementLocated(By.xpath("/html/body/div[1]/div[4]/div[1]/div/div/div/div/div/form/div[1]/div[1]/div/div/div/div[2]/div/div[1]/input"))).sendKeys(fr);
    await driver.wait(until.elementLocated(By.xpath("/html/body/div[1]/div[4]/div[1]/div/div/div/div/div/form/div[1]/div[1]/div/div/div/div[2]/div/div[2]/ul[2]/div/li[1]"))).click(); 
    await driver.wait(until.elementLocated(By.xpath("/html/body/div[1]/div[4]/div[1]/div/div/div/div/div/form/div[2]/div[1]/div/div/div/div[2]/div/div[1]/input"))).sendKeys(to_);
    await driver.wait(until.elementLocated(By.xpath("/html/body/div[1]/div[4]/div[1]/div/div/div/div/div/form/div[2]/div[1]/div/div/div/div[2]/div/div[2]/ul[2]/div/li[1]"))).click(); 
    await driver.wait(until.elementLocated(By.xpath("/html/body/div[1]/div[4]/div[1]/div/div/div/div/div/form/div[6]/div/div"))).click();

    let json = [];
    var results = await driver.wait(until.elementsLocated(By.xpath("//*[@id='capture']/div/div/div[2]/table/tbody/tr")));
    console.log("results:",results.length);
    let temp;
    for(var i=0; i<results.length; i++) {
        await driver.wait(until.elementLocated(By.xpath("//*[@id='capture']/div/div/div[2]/table/tbody/tr['+(i+1)+']/td[3]/div/div[1]")));
        var src_at = await results[i].findElement(By.xpath('td[3]/div/div[1]')).getText();
        await driver.wait(until.elementLocated(By.xpath("//*[@id='capture']/div/div/div[2]/table/tbody/tr['+(i+1)+']/td[5]/div/ul/li[1]/div[3]/div/p[1]")));
        await driver.wait(until.elementLocated(By.xpath("//*[@id='capture']/div/div/div[2]/table/tbody/tr['+(i+1)+']/td[5]/div/ul/li[1]/div[3]/div/p[2]")));
        var vessel_name = (await results[i].findElement(By.xpath('td[5]/div/ul/li[1]/div[3]/div/p[1]')).getText()) + (await results[i].findElement(By.xpath('td[5]/div/ul/li[1]/div[3]/div/p[2]')).getText());
        await driver.wait(until.elementLocated(By.xpath("//*[@id='capture']/div/div/div[2]/table/tbody/tr['+(i+1)+']/td[6]/div/span")));
        var dst_at = await results[i].findElement(By.xpath('td[6]/div/span')).getText();
        temp = {
            "src_at":src_at,
            "vessel_name":vessel_name,
            "dst_at":dst_at
        }
        json.push(temp);
    }
    // console.log(await results[0].getAttribute());
    console.log(json);
})();