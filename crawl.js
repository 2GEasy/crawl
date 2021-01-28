const {until,Builder, By} = require('selenium-webdriver');
var chrome = require('selenium-webdriver/chrome');

const typeAction=async(template,element)=>{
    if(template.type=='sendkeys') {
        await element.sendKeys(template.send_text);
        return null;
    }
    if(template.type=='click') {
        await element.click();
        return null;
    }
    if(template.type=='getText'){
        return await element.getText();
    }
}
const getUrl=async(driver,template, t)=>{
    try{
        await driver.get(template.url);
        await driver.sleep(t);
        
    }catch(error) {
        console.error("getUrl ERR",error);
    }
}

// try{
//     await elements[i].findElement(By.xpath(template.loop[0].key));
// }catch(err){
//     continue;
// }
const findEl=async(dr, temp)=>{
    let element = null;
    if(temp.by=="xpath") {
            element = await dr.findElement(By.xpath(temp.key));
    }else if(temp.by=='selector') {
            element = await dr.findElement(By.css(temp.key));
    }
    return element;
}
const findEls=async(dr, temp)=>{
    let elements;
    if(temp.by=='xpath') {
        await dr.wait(until.elementsLocated(By.xpath(temp.key)));
        elements = await dr.findElements(By.xpath(temp.key));
    }else if(temp.by=='selector') {
        await dr.wait(until.elementsLocated(By.css(temp.key)));
        elements = await dr.findElements(By.css(temp.key));
    }
    return elements;
}
const loopDo=async(driver, template)=>{
        var lp = [];
        // let elements = null;
        // if(template.by=='xpath') {
        //     await driver.wait(until.elementsLocated(By.xpath(template.key)));
        //     elements = await driver.findElements(By.xpath(template.key));
        // }else if(template.by=='selector') {
        //     await driver.wait(until.elementsLocated(By.css(template.key)));
        //     elements = await driver.findElements(By.css(template.key));
        // }
        let elements = await findEls(driver,template);
        console.log(elements.length);
            for(var l=0; l<template.loop.length; l++) {
                var start = template.loop[l].start;
                var end = template.loop[l].end=='-1'?elements.length:template.loop[l].end;
                for(var s=start; s<end; s++) {
                    var temp = {};
                    for(var j=0; j<template.loop[l].data.length; j++) {
                        var blsReturn = await element2JSON(elements[s],template.loop[l].data[j]);
                        if(blsReturn != null) {
                            var keyy = template.loop[l].data[j].rtnkey;
                            temp[keyy]=blsReturn;
                        }
                    }
                    lp.push(temp);
                }
            }
           
            if(template.time) {
                await driver.sleep(template.time);
            }
            if(lp.length!=0){
                return lp;
            }else{
                return null;
            }
}
const element2JSON=async(element,template)=>{ //loop element
    if(Array.isArray(template.loop)&&template.loop.length>0) {
        loopDo(element, template);
    }else{
        // let temp = null;
        // if(template.by=="xpath") {
        //     temp = await element.findElement(By.xpath(template.key));
        // }else if(template.by=='selector') {
        //     temp = await element.findElement(By.css(template.key));
        // }
        let temp = await findEl(element, template);
        return await typeAction(template, temp);
    }
}
const bls=async(driver,template)=>{
    if(template.url) {
        await getUrl(driver, template, 1000);
        return null;
    }
    if(Array.isArray(template.loop)&&template.loop.length>0) {
        return await loopDo(driver, template);
    }else{
        var son = {};
        let element;
        if(template.by=='xpath') {
            try{
                await driver.wait(until.elementLocated(By.xpath(template.key)));
                element = await driver.findElement(By.xpath(template.key));
            }catch(e){
                return e;
            }
        }else if(template.by=='selector') { // By.css = by selector
            try{
                await driver.wait(until.elementLocated(By.css(template.key)));
                element = await driver.findElement(By.css(template.key));
            }catch(e){
                return e;
            }
        }
        var actionReturn = await typeAction(template, element);
            if(actionReturn!=null){
                son[template.rtnkey]=actionReturn;
                return son;
            }
            if(template.time) {
                await driver.sleep(template.time);
            }
    }
}
const crawl = async(temp)=> {
    var template = temp;
    var driver = await new Builder().forBrowser('chrome')
    .setChromeOptions(new chrome.Options()
    
    // .addArguments('--headless')
    .addArguments('--no-sandbox')
    .addArguments("--disable-gpu")
    .addArguments('--disable-dev-shm-usage')
    .addArguments('--disable-notifications')
    .addArguments('--disable-popup-blocking')
    )
    .build();//headless, 가속화 disabled 및 selenium 필터링 방지를 위한 user-agent 설정
    
    await driver.executeScript("Object.defineProperty(navigator, 'plugins', {get: function() {return[1, 2, 3, 4, 5];},});");//selenium 필터링 방지
    

    var result = [];
    for(var i=0; i<template.length; i++) {
        var retrn = await bls(driver,template[i]);
        if(retrn){
            result.push(retrn);
        }
    }
    console.log("result?\n",result);
    await driver.quit();
    return result;
};

module.exports={
    crawl
};

    

(()=>{
    var tem = [
        {
            "index": "3fa1b21e-e7e0-42fb-89e6-ab7ee84bed6a",
            "title": "url",
            "url": "http://ecomm.one-line.com/ecom/CUP_HOM_3001.do?sessLocale=en",
            "by": "null",
            "key": "",
            "type": "null",
            "send_text": "",
            "time": "",
            "rtnkey": "",
            "loop": []
        },
        {
            "index": "e3ea5bc7-d680-445d-969f-dba9c5dc6d82",
            "title": "sendOriginKey",
            "url": "",
            "by": "xpath",
            "key": "//*[@id='oriLocNm_0']",
            "type": "sendkeys",
            "send_text": "PUSAN",
            "time": "",
            "rtnkey": "",
            "loop": []
        },
        {
            "index": "01411c0c-9554-4e23-a079-413532d87672",
            "title": "OriginClick",
            "url": "",
            "by": "xpath",
            "key": "/html/body/ul[1]/li[1]/a",
            "type": "click",
            "send_text": "",
            "time": "",
            "rtnkey": "",
            "loop": []
        },
        {
            "index": "561b05e2-cdf7-4ba6-84fa-88c35c22e119",
            "title": "sendDestKey",
            "url": "",
            "by": "xpath",
            "key": "//*[@id='destLocNm_0']",
            "type": "sendkeys",
            "send_text": "SHANGHAI",
            "time": "",
            "rtnkey": "",
            "loop": []
        },
        {
            "index": "5abdd6a2-3389-4c43-b5f2-9897478b03f0",
            "title": "DeskClick",
            "url": "",
            "by": "xpath",
            "key": "/html/body/ul[2]/li/a",
            "type": "click",
            "send_text": "",
            "time": "300",
            "rtnkey": "",
            "loop": []
        },
        {
            "index": "defce959-1374-4b0c-a3ce-ccccbc82bbd4",
            "title": "SearchClicki",
            "url": "",
            "by": "xpath",
            "key": "//*[@id='btnSearch']",
            "type": "click",
            "send_text": "",
            "time": "5000",
            "rtnkey": "",
            "loop": []
        },
        {
            "index": "4149a1e3-e910-404b-902a-3eb4164b7fe2",
            "title": "ResultsGet",
            "url": "",
            "by": "xpath",
            "key": "//*[@id='main-grid']/tbody/tr",
            "type": "null",
            "send_text": "",
            "time": "3000",
            "rtnkey": "",
            "loop": [
                {
                    "start": 2,
                    "end": -1,
                    "data": [
                        {
                            "index": "f3a88e52-67fa-4998-8d39-067eb80fa250",
                            "title": "OriginAt",
                            "url": null,
                            "by": "xpath",
                            "key": "td[8]/small",
                            "type": "getText",
                            "send_text": null,
                            "time": null,
                            "rtnkey": "origin_at",
                            "loop": []
                        },
                        {
                            "index": "10bc1bc0-5bfc-4ce2-b8ce-b24bfa214967",
                            "title": "Origin",
                            "url": null,
                            "by": "xpath",
                            "key": "td[8]/b/a",
                            "type": "getText",
                            "send_text": null,
                            "time": null,
                            "rtnkey": "origin",
                            "loop": []
                        },
                        {
                            "index": "5f8420c1-1e10-4576-9dcf-a8eda455bcae",
                            "title": "DestAt",
                            "url": null,
                            "by": "xpath",
                            "key": "td[11]/small",
                            "type": "getText",
                            "send_text": null,
                            "time": null,
                            "rtnkey": "destination_at",
                            "loop": []
                        },
                        {
                            "index": "9fc054f8-0cbc-4a79-aa3e-faed05cd9e8e",
                            "title": "Dest",
                            "url": null,
                            "by": "xpath",
                            "key": "td[11]/b/a",
                            "type": "getText",
                            "send_text": null,
                            "time": null,
                            "rtnkey": "destination",
                            "loop": []
                        },
                        {
                            "index": "d44021e8-eeec-42aa-bdee-7a83f212d787",
                            "title": "VesselName",
                            "url": null,
                            "by": "xpath",
                            "key": "td[22]/a",
                            "type": "getText",
                            "send_text": null,
                            "time": null,
                            "rtnkey": "vessel_name",
                            "loop": []
                        }
                    ]
                }
            ]
        }
    ];
    crawl(tem);
})();