const {webdriver,until,Builder, By, Key} = require('selenium-webdriver');
var chrome = require('selenium-webdriver/chrome');
(async ()=> {
    try{
        var driver = await new Builder().forBrowser('chrome').setChromeOptions(new chrome.Options().addArguments('disable-gpu').addArguments('user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36').addArguments('headless')).build();
    }catch(error) {
        console.error("getDriver ERR",error);
    }
    
    var fr = "Busan, Korea, South";
    var to_ = "Ushuaia, Argentina";
    var url = ("https://www.maersk.com/schedules/");//webdriver URL 호출
    await driver.executeScript("Object.defineProperty(navigator, 'plugins', {get: function() {return[1, 2, 3, 4, 5];},});");
    try{
        await driver.get(url);
        
    }catch(error) {
        console.error("getUrl ERR",error);
    }
    
    try{
        await driver.wait(until.elementLocated(By.xpath('//*[@id="coiPage-1"]/div[2]/button[2]')));
        var allowcookie = await driver.findElement(By.xpath('//*[@id="coiPage-1"]/div[2]/button[2]'));
        //*[@id="coiPage-1"]/div[2]/button[2]
    }catch(error) {
        console.error("getAllowCookie ERR",error);
    }
    allowcookie.click();

   
    (()=>{
        setTimeout(async()=>{
            try{
                await driver.wait(until.elementLocated(By.xpath('//*[@id="originLocation"]')));
                await driver.wait(until.elementIsEnabled(driver.findElement(By.xpath('//*[@id="originLocation"]'))));
                var ol = await driver.findElement(By.xpath('//*[@id="originLocation"]'));
                
                await ol.sendKeys(fr);
                await driver.wait(until.elementLocated(By.xpath('//*[@id="originLocationContainer"]/div/span/div/div/a'))).click();
                
            }catch(error) {
                console.error("getOl ERR",error);
            }
    
        },4000);//origin

    })();
    (()=>{
    setTimeout(async()=>{
        try{
            await driver.wait(until.elementLocated(By.xpath('//*[@id="destinationLocation"]')));
            await driver.wait(until.elementIsEnabled(driver.findElement(By.xpath('//*[@id="destinationLocation"]'))));
            var dl = await driver.findElement(By.xpath('//*[@id="destinationLocation"]'));
            
            await dl.sendKeys(to_);
            await driver.wait(until.elementLocated(By.xpath('//*[@id="destinationLocationContainer"]/div/span/div/div/a'))).click();
            // console.log(await dl.getText());
        }catch(error) {
            console.error("getDl ERR",error);
        }

    },7000);//destination
})();

(()=>{
    setTimeout(async()=>{
    try{
        var searchButton = await driver.findElement(By.xpath('//*[@id="searchSchedulesByPoint2Point"]'));
        await searchButton.click().catch(err=>{console.log("search ERR",err)});
    }catch(error) {
        console.error("getSearchButton ERR",error);
    }

},12000);//search
})();
    
    
    var results = await driver.wait(until.elementsLocated(By.xpath('//*[@id="shipmentResults"]/div')));

    console.log("results.length:",await results.length);
    
    
        setTimeout(async()=>{
            var dptext = await driver.wait(until.elementLocated(By.xpath('//*[@id="shipmentResults"]/div[1]/div[1]/div/dl[1]/dd[2]')));
            
            for(var i=1; i<results.length+1; i++) {
                console.log(i,"라인");
                var dtime = await driver.findElement(By.xpath('//*[@id="shipmentResults"]/div['+i+']/div[1]/div/dl[1]/dd[3]')); //depart time

                console.log("dtime:",await dtime.getText());
                var dname = await driver.findElement(By.xpath('//*[@id="shipmentResults"]/div['+i+']/div[1]/div/dl[1]/dd[4]/a')); //depart name
                console.log("dname:", await dname.getText());
                var atime = await driver.findElement(By.xpath('//*[@id="shipmentResults"]/div['+i+']/div[1]/div/dl[2]/dd[3]')); //arrival time
                console.log("atime:", await atime.getText());
                var aname = await driver.findElement(By.xpath('//*[@id="shipmentResults"]/div['+i+']/div[1]/div/dl[2]/dd[4]/a')); //arrival name
                console.log("aname:", await aname.getText());
                var vname = await driver.findElement(By.xpath('//*[@id="shipmentResults"]/div['+i+']/div[1]/div/dl[3]/dd[3]/a')); //vessel name //*[@id="shipmentResults"]/div[1]/div[1]/div/dl[3]/dd[3]/a
                console.log("vname:", await vname.getText());
                var vwatt = await driver.findElement(By.xpath('//*[@id="shipmentResults"]/div['+i+']/div[1]/div/dl[3]/dd[4]')); //vessel watt
                console.log("vwatt:", await vwatt.getText());
                var trasitt = await driver.findElement(By.xpath('//*[@id="shipmentResults"]/div['+i+']/div[1]/div/dl[4]/dd[3]')); //trasit time //*[@id="shipmentResults"]/div[1]/div[1]/div/dl[4]/dd[3]
                console.log("trasitt:", await trasitt.getText());
                console.log("-------------------------------------------------------------------------------------");
            }

        },15000);
    
})();