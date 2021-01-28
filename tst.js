const {until,Builder, By} = require('selenium-webdriver');
var chrome = require('selenium-webdriver/chrome');

const typeAction=async(templete,element)=>{
    if(templete.type=='sendkeys') {
        await element.sendKeys(templete.send_text);
        return null;
    }
    if(templete.type=='click') {
        await element.click();
        return null;
    }
    if(templete.type=='getText'){
        return await element.getText();
    }
}
const getUrl=async(driver,templete, t)=>{
    try{
        await driver.get(templete.url);
        await driver.sleep(t);
        
    }catch(error) {
        console.error("getUrl ERR",error);
    }
}
const element2JSON=async(element,templete)=>{ //loop element
    if(templete.by=="xpath") {
        
        let temp = await element.findElement(By.xpath(templete.key));
        // console.log("e2j?",temp);
        
        return await typeAction(templete, temp);

        
    }
}
const bls=async(driver,templete)=>{
    
    if(templete.url) {
        await getUrl(driver, templete, 1000);
        return null;
    }

    if(templete.by=='xpath') {
        if(templete.loop) {
            var lp = [];
            await driver.wait(until.elementsLocated(By.xpath(templete.key)));
            let elements = await driver.findElements(By.xpath(templete.key));
            console.log(elements.length);
            // console.log(await elements[0].findElement(By.xpath(templete.loop[0].key)).isDisplayed());
            
            
            for(var i=0; i<elements.length; i++) {
                var temp = {};
                try{
                    await elements[i].findElement(By.xpath(templete.loop[0].key));
                }catch(err){
                    test = false;
                    console.log("getElement ERR");
                    continue;
                }
               
                for(var j=0; j<templete.loop.length; j++) {
                        var blsReturn = await element2JSON(elements[i],templete.loop[j]);
                        if(blsReturn != null) {
                            var keyy = templete.loop[j].rtnkey;
                            temp[keyy]=blsReturn;
                        }
                    
                }
                
                lp.push(temp);

            }
            if(templete.time) {
                await driver.sleep(templete.time);
            }
            if(lp.length!=0){
                return lp;
            }else{
                return null;
            }
        }else{
            var son = {};
            await driver.wait(until.elementLocated(By.xpath(templete.key)));
            let element = await driver.findElement(By.xpath(templete.key));
            var actionReturn = await typeAction(templete, element);
            if(actionReturn!=null){
                son[templete.rtnkey]=actionReturn;
                return son;
            }
            if(templete.time) {
                await driver.sleep(templete.time);
            }
        }
    }
}
const crawl =async(temp)=> {
    var templete = temp;
    
    var driver = await new Builder().forBrowser('chrome').setChromeOptions(new chrome.Options().addArguments('disable-gpu').addArguments('user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36')).build();
    // var driver = await new Builder().forBrowser('chrome').setChromeOptions(new chrome.Options().addArguments('disable-gpu').addArguments('user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36').addArguments('headless')).build();
    //headless, 가속화 disabled 및 selenium 필터링 방지를 위한 user-agent 설정
    
    await driver.executeScript("Object.defineProperty(navigator, 'plugins', {get: function() {return[1, 2, 3, 4, 5];},});");//selenium 필터링 방지
    

    var result = [];
    for(var i=0; i<templete.length; i++) {
        var retrn = await bls(driver,templete[i]);
        if(retrn){
            result.push(retrn);
        }
    }
    console.log("result?\n",result);
    // await driver.quit();
    // return result;
};    
(async ()=>{
    var tem = [
        {
            "url":"http://ecomm.one-line.com/ecom/CUP_HOM_3001.do?sessLocale=en",
            "by":null,
            "key":null,
            "type":null,
            "send_text":null,
            "time":null,
            "loop":null,
            "rtnkey":null
        },
        {
            "url":null,
            "by":"xpath",
            "key":"//*[@id='oriLocNm_0']",
            "type":"sendkeys",
            "send_text":"PUSAN",
            "time":null,
            "loop":null,
            "rtnkey":null
        },
        {
            "url":null,
            "by":"xpath",
            "key":"/html/body/ul[1]/li[1]/a",
            "type":"click",
            "send_text":null,
            "time":null,
            "loop":null,
            "rtnkey":null
        },
        {
            "url":null,
            "by":"xpath",
            "key":"//*[@id='destLocNm_0']",
            "type":"sendkeys",
            "send_text":"SHANGHAI",
            "time":null,
            "loop":null,
            
            "rtnkey":null
        },
        {
            "url":null,
            "by":"xpath",
            "key":"/html/body/ul[2]/li/a",
            "type":"click",
            "send_text":null,
            "time":300,
            "loop":null,
            
            "rtnkey":null
        },
        {
            "url":null,
            "by":"xpath",
            "key":"//*[@id='btnSearch']",
            "type":"click",
            "send_text":null,
            "time":5000,
            "loop":null,
            
            "rtnkey":null
        },
        {
            "url":null,
            "by":"xpath",
            "key":"//*[@id='main-grid']/tbody/tr",
            "type":null,
            "send_text":null,
            "time":3000,
            "loop":[
                {
                    "url":null,
                    "by":"xpath",
                    "key":"td[8]/small",
                    "type":"getText",
                    "send_text":null,
                    "time":null,
                    "loop":null,
                    
                    "rtnkey":"origin_at"
                },
                {
                    "url":null,
                    "by":"xpath",
                    "key":"td[8]/b/a",
                    "type":"getText",
                    "send_text":null,
                    "time":null,
                    "loop":null,
                    
                    "rtnkey":"origin"
                },
                {
                    "url":null,
                    "by":"xpath",
                    "key":"td[11]/small",
                    "type":"getText",
                    "send_text":null,
                    "time":null,
                    "loop":null,
                    
                    "rtnkey":"destination_at"
                },
                {
                    "url":null,
                    "by":"xpath",
                    "key":"td[11]/b/a",
                    "type":"getText",
                    "send_text":null,
                    "time":null,
                    "loop":null,
                    
                    "rtnkey":"destination"
                },
                {
                    "url":null,
                    "by":"xpath",
                    "key":"td[22]/a",
                    "type":"getText",
                    "send_text":null,
                    "time":null,
                    "loop":null,
                    
                    "rtnkey":"vessel_name"
                }
               
            ],
            
            "rtnkey":null
        }
    ];
    crawl(tem);
})();

module.exports={
    crawl
}