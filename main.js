"nodejs";

const { showToast } = require('toast');

console.log(process.versions);

showToast('Hello, Auto.js Pro with Node.js!');

const {readImage, findImage} = require("image");
const {requestScreenCapture} = require('media_projection');
const {click, home} = require('accessibility');

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function findclick(capturer,template) {
    while (true)
    {
        const capture = await capturer.nextImage();
        const result = await findImage(capture, template);
        if (result)
        {
            await click(result.x, result.y)
            break;
        }
        await sleep(2000);
    };
    
}
async function shilianta(capturer,cishu) {
    const tiaozhan = await readImage("./img/shilianta/tiaozhan.jpg");    
    for (var i=0;i<cishu;i++) {
        await findclick(capturer,tiaozhan);
        console.log(i)
    }
    tiaozhan.recycle();
}

// 主函数，用async标记以便使用await来等待结果
async function main() {
    const capturer = await requestScreenCapture();

    await shilianta(capturer,60);

    capturer.stop();
    home();
}
// 执行主函数
main();