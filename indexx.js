var webdriver = require('selenium-webdriver');
var chrome = require('selenium-webdriver/chrome');
var By = require('selenium-webdriver').By;
var driver = new webdriver.Builder()
    .withCapabilities(webdriver.Capabilities.chrome()).setChromeOptions(new chrome.Options().headless())
.build();

var url = "https://www.myprotein.co.kr/your-goals/muscle--strength-range.list";//webdriver URL 호출
driver.get(url);

// const getUrl=async()=>{
//     await driver.get(url);;
// }
// (async function myFunction() {
// 	let driver = await new Builder().forBrowser('chrome').build();  //가상 브라우저 빌드
// 		try { 
//             await driver.get(url);    //get(url) 인거 보면 뭔지 알것같이 생겼다
//             let img = await driver.wait(until.elementLocated(By.css('#imgs > img')), 1000); //기다리기
//             imgs = await img.getAttribute('src'); //imgs에 바로 위 코드에서 가져온 element의 src속성값을 가져온다

// 		}
//         finally {
// 			await driver.quit(); //가상 브라우저를 종료시킨다
//         }
// })();
var hrefList = new Array();// 데이터 수집 배열
var srcList = new Array();// 데이터 수집 배열

var maxPage=driver.findElement(By.xpath(
'//*[@id="mainContent"]/div/nav/ul/li[5]/a'));
maxPage.then(function(value){
    value.getText().then(function(maxPage){
console.log('해당 페이지의 게시판 마지막번호 :',maxPage )
return maxPage;
}).then(function(maxPage){
console.log('가져온 마지막 페이지 번호 : ',maxPage)
driver.findElements(By.xpath('//*[@id="mainContent"]/div/ul/li[1]/div/div/a')).then(function(product){
hrefList=[];
srcList=[];
for (var i = 0; i < product.length; i++) {
product[i].getAttribute('href').then(function (href) {
console.log('제품 주소 :', href);
hrefList.push(href);
})//제품 주소

product[i].findElement(By.css('.athenaProductBlock_linkImage>.athenaProductBlock_image')).then(function (product) {
product.getAttribute('src').then(function (src) {
console.log('이미지 주소 :', src);
srcList.push(src);
})
})// 제품 이미지 주소


}
});
});
});