"nodejs";

//const mode='shilianta';
const mode='guanqia';
//const mode='damaoxian';
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

async function findclick(capturer, template, clickxy=undefined, ganrao=undefined) {
    let capture;
    let result;
    const time_start = new Date();
    let time_now;
    while (true)
    {
        capture = await capturer.nextImage();
        result = await findImage(capture, template);
        if (result) {
            await sleep(1000);
            capture = await capturer.nextImage();
            result = await findImage(capture, template);
            if (result) {
                if ( clickxy == undefined ) {
                    clickxy = [result.x, result.y];
                };
                await click(clickxy[0], clickxy[1]);
                await sleep(2000);
                break;
            }
        } else if (ganrao != undefined) {
            for (var j=0; j<ganrao.length; j++) {
                result = await findImage(capture, ganrao[j].img);
                if (result) {
                    await click(ganrao[j].xy[0], ganrao[j].xy[1]);
                    console.log('ganrao',j)
                    await sleep(1000)
                }
            }
        }
        await sleep(2000);
        time_now = new Date();
        if ( time_now-time_start > 120000 ) {
            await timeout();
        }
    };
}
async function loopclick(capturer, templates) {
    let capture;
    let result;
    const time_start = new Date();
    let time_now;
    let img;
    let xy;
    loop_0:
    while (true)
    {
        capture = await capturer.nextImage();
        for (var j=0; j<templates.length; j++) {
            img = templates[j].img
            xy = templates[j].xy
            result = await findImage(capture, img);
            if (result) {
                await sleep(1000);
                capture = await capturer.nextImage();
                result = await findImage(capture, img);
                if (result) {
                    if (xy == null) {
                        xy = [result.x, result.y]
                    };
                    console.log('find',j);
                    await click(xy[0], xy[1]);
                    await sleep(1000);
                    break loop_0;
                }
            }
        };
        await sleep(2000);
        time_now = new Date();
        if ( time_now-time_start > 120000 ) {
            await timeout();
        }
    };
}

async function timeout() {
    home();
    throw 'timeout';
}

async function shilianta(capturer, cishu) {
    const tiaozhan = await readImage("./img/shilianta/tiaozhan.jpg");    
    for (var i=0;i<cishu;i++) {
        await findclick(capturer,tiaozhan);
        console.log(i);
    }
    tiaozhan.recycle();
}
async function guanqia(capturer, cishu) {
    const tiaozhan1 = await readImage("./img/guanqia/tiaozhan1.jpg");
    const shengshu = await readImage("./img/guanqia/shengshu.jpg");
    const guanqia = await readImage("./img/guanqia/guanqia.jpg");
    const tejialibao = await readImage("./img/guanqia/tejialibao.jpg");
    const levelup = await readImage("./img/guanqia/levelup.jpg");
    for (var i=0;i<cishu;i++) {
        console.log('loop',i)
        await loopclick(
            capturer,
            templates = [
                {
                    img: shengshu,
                    xy: [541,2127]
                },
                {
                    img: tiaozhan1,
                },
                {
                    img: guanqia, 
                    xy: [499, 1457]
                },
                {
                    img: tejialibao, 
                    xy: [956, 585]
                },
                {
                    img: levelup, 
                    xy: [499, 1457]
                }
            ]
        );
    }
}
async function damaoxian(capturer, cishu) {
    const tiaozhan1 = await readImage("./img/guanqia/tiaozhan1.jpg");
    const tiaozhan = await readImage("./img/damaoxian/tiaozhan.jpg");
    for (var i=0;i<cishu;i++) {
        await findclick(capturer,tiaozhan);
        await findclick(capturer,tiaozhan1);
        console.log(i);
    }
    tiaozhan.recycle();
    tiaozhan1.recycle();
}

// 主函数，用async标记以便使用await来等待结果
async function main() {
    const capturer = await requestScreenCapture();

    if (mode == 'shilianta') {
        await shilianta(capturer, cishu);
    } else if (mode == 'guanqia') {
        await guanqia(capturer, cishu);
    } else if (mode == 'damaoxian') {
        await damaoxian(capturer, cishu);
    }
    capturer.stop();
    home();
}
async function test() {
    await sleep(2000)
    const capturer = await requestScreenCapture();

    const guanqia = await readImage("./img/guanqia/guanqia.jpg");
    capture = await capturer.nextImage();
    result = await findImage(capture, guanqia);
    console.log(result)
    
}
//test();
main();