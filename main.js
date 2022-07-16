"nodejs";

//const mode='shilianta';
//const mode='guanqia';
const mode='damaoxian';
const cishu=60;

const { showToast } = require('toast');
console.log(process.versions);
showToast('Hello, Auto.js Pro with Node.js!');

const {readImage, findImage} = require("image");
const {requestScreenCapture} = require('media_projection');
const {click, home} = require('accessibility');

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function findclick(capturer, template, clickxy=undefined) {
    let capture;
    let result;
    while (true)
    {
        capture = await capturer.nextImage();
        result = await findImage(capture, template);
        if (result)
        {
            if ( clickxy == undefined ) {
                clickxy = [result.x, result.y]
            };
            await click(clickxy[0], clickxy[1]);
            await sleep(2000)
            break;
        }
        await sleep(2000);
    };
    
}
async function shilianta(capturer, cishu) {
    const tiaozhan = await readImage("./img/shilianta/tiaozhan.jpg");    
    for (var i=0;i<cishu;i++) {
        await findclick(capturer,tiaozhan);
    }
    tiaozhan.recycle();
}
async function guanqia(capturer, cishu) {
    const tiaozhan1 = await readImage("./img/guanqia/tiaozhan1.jpg");
    const zhanmen = await readImage("./img/guanqia/zhanmen.jpg");
    for (var i=0;i<cishu;i++) {
        await findclick(capturer,zhanmen,[541,2127]);
        await findclick(capturer,tiaozhan1);
    }
    tiaozhan1.recycle();
    zhanmen.recycle();
}
async function damaoxian(capturer, cishu) {
    const tiaozhan1 = await readImage("./img/guanqia/tiaozhan1.jpg");
    const tiaozhan = await readImage("./img/damaoxian/tiaozhan.jpg");
    for (var i=0;i<cishu;i++) {
        await findclick(capturer,tiaozhan);
        await findclick(capturer,tiaozhan1);
    }
    tiaozhan.recycle();
    tiaozhan1.recycle();
}

// 主函数，用async标记以便使用await来等待结果
async function main() {
    const capturer = await requestScreenCapture();

    if (mode == 'shilianta') {
        await shilianta(capturer,cishu);
    } else if (mode == 'guanqia') {
        await guanqia(capturer,cishu);
    } else if (mode == 'damaoxian') {
        await damaoxian(capturer,cishu);
    }
    capturer.stop();
    home();
}

main();