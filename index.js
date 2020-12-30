const {webdriver,until,Builder, By, Key} = require('selenium-webdriver');
const fs = require('fs');
var chrome = require('selenium-webdriver/chrome');

let json = [];

(async ()=> {
    try{
        var driver = await new Builder().forBrowser('chrome').setChromeOptions(new chrome.Options().addArguments('disable-gpu').addArguments('user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36')).build();
        // var driver = await new Builder().forBrowser('chrome').setChromeOptions(new chrome.Options().addArguments('disable-gpu').addArguments('user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36').addArguments('headless')).build();
        //headless, 가속화 disabled 및 selenium 필터링 방지를 위한 user-agent 설정
    }catch(error) {
        console.error("getDriver ERR",error);
    }
    
    const fr = "Busan, Korea, South";
    const to_ = "Ushuaia, Argentina";
    const maersk_url = ("https://www.maersk.com/schedules/");//webdriver URL 호출
    await driver.executeScript("Object.defineProperty(navigator, 'plugins', {get: function() {return[1, 2, 3, 4, 5];},});");//selenium 필터링 방지
    try{
        await driver.get(maersk_url);
        await driver.sleep(1000);
        
    }catch(error) {
        console.error("getUrl ERR",error);
    }
    
    try{
        var allowcookie = await driver.findElement(By.xpath('//*[@id="coiPage-1"]/div[2]/button[2]'));

    }catch(error) {
        console.error("getAllowCookie ERR",error);
    }
    allowcookie.click();
    
    
    
    try{
        var ol = await driver.findElement(By.xpath('//*[@id="originLocation"]'));
        
        await ol.sendKeys(fr);
        await driver.wait(until.elementLocated(By.xpath('//*[@id="originLocationContainer"]/div/span/div/div/a'))).click();
        
    }catch(error) {
        console.error("getOl ERR",error);
    }//origin

    try{
        var dl = await driver.findElement(By.xpath('//*[@id="destinationLocation"]'));
        
        await dl.sendKeys(to_);
        await driver.wait(until.elementLocated(By.xpath('//*[@id="destinationLocationContainer"]/div/span/div/div/a'))).click();
        await driver.sleep(300);
        
    }catch(error) {
        console.error("getDl ERR",error);
    }

    try{
        var searchButton = await driver.findElement(By.xpath('//*[@id="searchSchedulesByPoint2Point"]'));
        await searchButton.click().catch(err=>{console.log("search ERR",err)});
    }catch(error) {
        console.error("getSearchButton ERR",error);
    };//search



    var results = await driver.wait(until.elementsLocated(By.xpath('//*[@id="shipmentResults"]/div')));

    console.log("results.length:",await results.length);


    
    //var dptext = await driver.wait(until.elementLocated(By.xpath('//*[@id="shipmentResults"]/div[1]/div[1]/div/dl[1]/dd[2]')));
    await driver.sleep(3000);
    for(var i=1; i<results.length+1; i++) {
        console.log(i,"라인");
        // var dtime = await driver.findElement(By.xpath('//*[@id="shipmentResults"]/div['+i+']/div[1]/div/dl[1]/dd[3]')); //depart time
        var dtime = await driver.findElement(By.xpath('//*[@id="shipmentResults"]/div['+i+']/div[1]/div/dl[1]/dd[3]')); //depart time
        console.log("dtime:",await dtime);
        
        var dname = await driver.findElement(By.xpath('//*[@id="shipmentResults"]/div['+i+']/div[1]/div/dl[1]/dd[4]/a')); //depart name
        console.log("dname:", await dname.getText());
        var atime = await driver.findElement(By.xpath('//*[@id="shipmentResults"]/div['+i+']/div[1]/div/dl[2]/dd[3]')); //arrival time
        console.log("atime:", await atime.getText());
        var aname = await driver.findElement(By.xpath('//*[@id="shipmentResults"]/div['+i+']/div[1]/div/dl[2]/dd[4]/a')); //arrival name
        console.log("aname:", await aname.getText());
        var vname = await driver.findElement(By.xpath('//*[@id="shipmentResults"]/div['+i+']/div[1]/div/dl[3]/dd[3]/a')); //vessel name //*[@id="shipmentResults"]/div[1]/div[1]/div/dl[3]/dd[3]/a
        console.log("vname:", await vname.getText());
        var vwatt = await driver.findElement(By.xpath('//*[@id="shipmentResults"]/div['+i+']/div[1]/div/dl[3]/dd[4]')); //vessel watt
        console.log("vwatt:", await vwatt.getText());//voyage number
        var trasitt = await driver.findElement(By.xpath('//*[@id="shipmentResults"]/div['+i+']/div[1]/div/dl[4]/dd[3]')); //trasit time //*[@id="shipmentResults"]/div[1]/div[1]/div/dl[4]/dd[3]
        console.log("trasitt:", await trasitt.getText());
        console.log("-------------------------------------------------------------------------------------");
        var result = {
            "departDate":await dtime.getText(),
            "departPlace":await dname.getText(),
            "arrivalDate":await atime.getText(),
            "arrivalPlace":await aname.getText(),
            "VesselName":await vname.getText(),
            "W":await vwatt.getText(),
            "TransitTime":await trasitt.getText()
        };
        json.push(result);
        resultsJSON = JSON.stringify(json);
        fs.writeFileSync('resultsJson.json',resultsJSON);
        
    }
    
    console.log(json);
})();    
// const fsJson = fs.readFileSync('resultsJson.json');
// const resultsJSON = fsJson.toString(); 
// const readResults = JSON.parse(resultsJSON);