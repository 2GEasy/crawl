const {webdriver,until,Builder, By, Key} = require('selenium-webdriver');
const fs = require('fs');
var chrome = require('selenium-webdriver/chrome');

const maersk_templete=[
    {
        "url":"https://www.maersk.com/schedules/",
        "by":null,
        "key":null,
        "type":null,
        "send_text":null,
        "time":null,
        "loop":null
    },
    {
        "url":null,
        "by":"xpath",
        "key":'//*[@id="coiPage-1"]/div[2]/button[2]',
        "type":"click",
        "send_text":null,
        "time":null,
        "loop":null
    },
    {
        "url":null,
        "by":"xpath",
        "key":'//*[@id="originLocation"]',
        "type":"sendkey",
        "send_text":"Busan, Korea, South",//fr
        "time":null,
        "loop":null
    },
    {
        "url":null,
        "by":"xpath",
        "key":'//*[@id="originLocationContainer"]/div/span/div/div/a',
        "type":"click",
        "send_text":null,
        "time":null,
        "loop":null
    },
    {
        "url":null,
        "by":"xpath",
        "key":'//*[@id="destinationLocation"]',
        "type":"sendkey",
        "send_text":"Ushuaia, Argentina",//to
        "time":null,
        "loop":null
    },
    {
        "url":null,
        "by":"xpath",
        "key":'//*[@id="destinationLocationContainer"]/div/span/div/div/a',
        "type":"click",
        "send_text":null,
        "time":300,
        "loop":null
    },
    {
        "url":null,
        "by":"xpath",
        "key":'//*[@id="searchSchedulesByPoint2Point"]',
        "type":"click",
        "send_text":null,
        "time":null,
        "loop":null
    },
    {
        "url":null,
        "by":"xpath",
        "key":'//*[@id="shipmentResults"]/div',
        "type":null,
        "send_text":null,
        "time":3000,
        "loop":[
            {
                "url":null,
                "by":"xpath",
                "key":'div[1]/div/dl[1]/dd[3]',
                "type":"getText",
                "send_text":null,
                "time":null,
                "loop":null
            },
            {
                "url":null,
                "by":"xpath",
                "key":'div[1]/div/dl[1]/dd[4]/a',
                "type":"getText",
                "send_text":null,
                "time":null,
                "loop":null
            },
            {
                "url":null,
                "by":"xpath",
                "key":'div[1]/div/dl[2]/dd[3]',
                "type":"getText",
                "send_text":null,
                "time":null,
                "loop":null
            },
            {
                "url":null,
                "by":"xpath",
                "key":'div[1]/div/dl[2]/dd[4]/a',
                "type":"getText",
                "send_text":null,
                "time":null,
                "loop":null
            },
            {
                "url":null,
                "by":"xpath",
                "key":'div[1]/div/dl[3]/dd[3]/a',
                "type":"getText",
                "send_text":null,
                "time":null,
                "loop":null
            },
            {
                "url":null,
                "by":"xpath",
                "key":'div[1]/div/dl[3]/dd[4]',
                "type":"getText",
                "send_text":null,
                "time":null,
                "loop":null
            },
            {
                "url":null,
                "by":"xpath",
                "key":'div[1]/div/dl[4]/dd[3]',
                "type":"getText",
                "send_text":null,
                "time":null,
                "loop":null
            }
        ]
    }
];
const cosco_templete=[
    {
        "url":"https://elines.coscoshipping.com/ebusiness/sailingSchedule/searchByCity",
        "by":null,
        "key":null,
        "type":null,
        "send_text":null,
        "time":null,
        "loop":null
    },
    {
        "url":null,
        "by":"xpath",
        "key":'/html/body/div[3]/div[2]/div/div/div[3]/div/button',
        "type":"click",
        "send_text":null,
        "time":null,
        "loop":null
    },
    {
        "url":null,
        "by":"xpath",
        "key":'/html/body/div[1]/div[4]/div[1]/div/div/div/div/div/form/div[1]/div[1]/div/div/div/div[2]/div/div[1]/input',
        "type":"sendkey",
        "send_text":"Busan",//fr
        "time":null,
        "loop":null
    },
    {
        "url":null,
        "by":"xpath",
        "key":'/html/body/div[1]/div[4]/div[1]/div/div/div/div/div/form/div[1]/div[1]/div/div/div/div[2]/div/div[2]/ul[2]/div/li[1]',
        "type":"click",
        "send_text":null,
        "time":null,
        "loop":null
    },
    {
        "url":null,
        "by":"xpath",
        "key":'/html/body/div[1]/div[4]/div[1]/div/div/div/div/div/form/div[2]/div[1]/div/div/div/div[2]/div/div[1]/input',
        "type":"sendkey",
        "send_text":"Qingdao",//to
        "time":null,
        "loop":null
    },
    {
        "url":null,
        "by":"xpath",
        "key":'/html/body/div[1]/div[4]/div[1]/div/div/div/div/div/form/div[2]/div[1]/div/div/div/div[2]/div/div[2]/ul[2]/div/li[1]',
        "type":"click",
        "send_text":null,
        "time":null,
        "loop":null
    },
    {
        "url":null,
        "by":"xpath",
        "key":'/html/body/div[1]/div[4]/div[1]/div/div/div/div/div/form/div[6]/div/div',
        "type":"click",
        "send_text":null,
        "time":null,
        "loop":null
    },
    {
        "url":null,
        "by":"xpath",
        "key":'//*[@id="capture"]/div/div/div[2]/table/tbody/tr',
        "type":null,
        "send_text":null,
        "time":null,
        "loop":[
            {//src_at
                "url":null,
                "by":"xpath",
                "key":'td[3]/div/div[1]',
                "type":"getText",
                "send_text":null,
                "time":null,
                "loop":null
            },
            {//src_terminal
                "url":null,
                "by":null,
                "key":null,
                "type":null,
                "send_text":null,
                "time":null,
                "loop":null
            },
            {//dst_at
                "url":null,
                "by":"xpath",
                "key":'td[6]/div/span',
                "type":"getText",
                "send_text":null,
                "time":null,
                "loop":null
            },
            {//dst_terminal
                "url":null,
                "by":null,
                "key":null,
                "type":null,
                "send_text":null,
                "time":null,
                "loop":null
            },
            {//vessel_name
                "url":null,
                "by":"xpath",
                "key":'td[5]/div/ul/li[1]/div[3]/div/p[1]',
                "type":"getText",
                "send_text":null,
                "time":null,
                "loop":null
            },
            {
                "url":null,
                "by":"xpath",
                "key":'td[5]/div/ul/li[1]/div[3]/div/p[2]',
                "type":"getText",
                "send_text":null,
                "time":null,
                "loop":null
            },
            {
                "url":null,
                "by":null,
                "key":null,
                "type":null,
                "send_text":null,
                "time":null,
                "loop":null
            }
        ]
    }
];

const crawl =async (templete)=> {
    try{
        var driver = await new Builder().forBrowser('chrome').setChromeOptions(new chrome.Options().addArguments('disable-gpu').addArguments('user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36')).build();
        // var driver = await new Builder().forBrowser('chrome').setChromeOptions(new chrome.Options().addArguments('disable-gpu').addArguments('user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36').addArguments('headless')).build();
        //headless, 가속화 disabled 및 selenium 필터링 방지를 위한 user-agent 설정
    }catch(error) {
        console.error("getDriver ERR",error);
    }
    await driver.executeScript("Object.defineProperty(navigator, 'plugins', {get: function() {return[1, 2, 3, 4, 5];},});");//selenium 필터링 방지
    
    
    
    


    const element2JSON=async(element,templete)=>{ //loop element
        if(templete.by=="xpath") {
                
            let temp = await element.findElement(By.xpath(templete.key));
            if(templete.type=='sendkey') {
                await temp.sendKeys(templete.send_text);
                if(templete.time) {
                    await driver.sleep(templete.time);
                }
            }
            if(templete.type=='click') {
                await temp.click();
                if(templete.time) {
                    await driver.sleep(templete.time);
                }
            }
            if(templete.type=='getText'){
                content = await temp.getText();
                console.log("content:",content);
                if(templete.time) {
                    await driver.sleep(templete.time);
                }
                return content;
            }
        }
    }
    const bls=async(templete)=>{
        if(templete.url) {
            try{
                await driver.get(templete.url);
                await driver.sleep(1000);
                
            }catch(error) {
                console.error("getUrl ERR",error);
            }

        }

        if(templete.by=='xpath') {
            if(templete.loop) {
                await driver.wait(until.elementsLocated(By.xpath(templete.key)));
                let elements = await driver.findElements(By.xpath(templete.key));
                console.log("elements:",await elements.length);
                var result =[];
                for(var i=0; i<elements.length; i++) {
                    console.log("----------------------------------------");
                    console.log(i+1,"라인");
                    // for(var j=0; j<templete.loop.length; j++) {
                        // temp.push(await element2JSON(elements[i],templete.loop[j]));
                    // }
                    var temp = {
                        "src_at":await element2JSON(elements[i],templete.loop[0]),
                        "src_terminal": await element2JSON(elements[i],templete.loop[1]),
                        "dst_at":await element2JSON(elements[i],templete.loop[2]),
                        "dst_terminal":await element2JSON(elements[i],templete.loop[3]),
                        "vessel_name": await element2JSON(elements[i],templete.loop[4])+"("+await element2JSON(elements[i],templete.loop[5])+")"
                    }
                    result.push(temp);
                }
                var results = JSON.stringify(result);
               
                fs.writeFileSync('resultsJson.json',results);
                console.log(results);

                if(templete.time) {
                    await driver.sleep(templete.time);
                }
            }else{
                await driver.wait(until.elementLocated(By.xpath(templete.key)));
                let element = await driver.findElement(By.xpath(templete.key));
                if(templete.type=='sendkey') {
                    await element.sendKeys(templete.send_text);
                    if(templete.time) {
                        await driver.sleep(templete.time);
                    }
                }
                if(templete.type=='click') {
                    await element.click();
                    if(templete.time) {
                        await driver.sleep(templete.time);
                    }
                }
                if(templete.type=='getText'){
                    content = await element.getText();
                    console.log("content:",content);
                    if(templete.time) {
                        await driver.sleep(templete.time);
                    }
                    return content;
                }
                
            }
        }
        
    }
    for(var i=0; i<templete.length; i++) {
        await bls(templete[i]);
    }
};    
