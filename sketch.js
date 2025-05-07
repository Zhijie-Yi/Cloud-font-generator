let textConfig, bgConfig, sizeConfig;
let textGrap, bubblesGrap;
let gui;
let logo;
let saveFormat = 'png';  // 默认保存格式
const logoURL = 'https://www.xiaohongshu.com/user/profile/5ebe4828000000000101d273';  // 替换为你的网站链接
const logoTransparency = 255;  // 设置图片的透明度值（0-255）

function preload() {
    logo = loadImage('1.png');  // 替换为你的logo图片路径
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    // 创建配置实例
    textConfig = new TextConfig();
    bgConfig = new BGConfig();
    sizeConfig = new SizeConfig();

    // 创建 GUI
    gui = new dat.GUI();
    let guiText = gui.addFolder('Text Settings');
    let guiBG = gui.addFolder('Background Settings');
    let guiSize = gui.addFolder('Size Settings');

    // 添加控件
    guiText.add(textConfig, 'text').onChange(drawTextAndBubbles);
    guiBG.addColor(bgConfig, 'color');
    guiSize.add(sizeConfig, 'fontSize', 16, 250).onChange(drawTextAndBubbles);
    guiSize.add(sizeConfig, 'bubbleSizeMin', 1, 30).onChange(drawTextAndBubbles);
    guiSize.add(sizeConfig, 'bubbleSizeMax', sizeConfig.bubbleSizeMin, 30).onChange(drawTextAndBubbles);

    // 创建保存图像文件夹并添加保存按钮和格式选择
    let guiSave = gui.addFolder('Save Image');
    guiSave.add({ format: saveFormat }, 'format', ['png', 'jpg']).name('Format').onChange(value => saveFormat = value);
      guiSave.add({ saveImage }, 'saveImage').name('Save');

    // 初始化图形
    textGrap = createGraphics(width, height);
    bubblesGrap = createGraphics(width, height);
    textGrap.textFont("Helvetica");
    textGrap.textAlign(CENTER, CENTER);
    drawTextAndBubbles();
}

function draw() {
    background(bgConfig.color);
    image(bubblesGrap, 0, 0);
    
    // 设置透明度并绘制logo
    tint(255, logoTransparency);
    const logoSize = 35;
    const logoX = 15;
    const logoY = height - logoSize - 10;  // 调整这个值以确定logo的位置
    image(logo, logoX, logoY, logoSize, logoSize);
    
    // 取消透明度影响
    noTint();
    
    // 设置文字样式
    fill(255); // 白色文字
    noStroke();
    textSize(12); // 文字大小
    textAlign(RIGHT, BOTTOM); // 右对齐，底部对齐
    
    // 在右下角绘制版权信息
    text("Created by @Zhijie-Yi @LuANyxxx\n ©️All my products are available for personal and commercial projects", width - 10, height - 10);
    
    // 检查鼠标是否在logo区域
    if (mouseX > logoX && mouseX < logoX + logoSize && mouseY > logoY && mouseY < logoY + logoSize) {
        cursor(HAND);
    } else {
        cursor(ARROW);
    }
}

function drawTextAndBubbles() {
    textGrap.background(255);
    textGrap.fill(0);
    textGrap.stroke(100);
    textGrap.strokeWeight(0.5);
    textGrap.textSize(sizeConfig.fontSize);
    textGrap.textLeading(sizeConfig.fontSize * 1.4);
    let textW = width * 0.8;
    let textH = height * 0.8;
    let textX = width / 2 - textW / 2;
    let textY = height / 2 - textH / 2;
    textGrap.text(textConfig.text, textX, textY, textW, textH);

    bubblesGrap.clear();
    for (let y = 0; y < height; y += 5) {
        for (let x = 0; x < width; x += 5) {
            if (textGrap.get(x, y)[0] == 0) {
                const size = random(sizeConfig.bubbleSizeMin, sizeConfig.bubbleSizeMax);
                const col = color(random(240, 255));
                bubblesGrap.fill(col);
                bubblesGrap.noStroke();
                bubblesGrap.ellipse(x, y, size, size);
            }
        }
    }
}

function mousePressed() {
    const logoSize = 35;
    const logoX = 15;
    const logoY = height - logoSize - 10; 
    if (mouseX > logoX && mouseX < logoX + logoSize && mouseY > logoY && mouseY < logoY + logoSize) {
        window.open(logoURL, '_blank');
    }
}

function TextConfig() {
    this.text = "ENTER TEXT";
}

function BGConfig() {
    this.color = [0,136,255];
}

function SizeConfig() {
    this.fontSize = 100;
    this.bubbleSizeMin = 5;
    this.bubbleSizeMax = 30;
}

// 保存图像的函数
function saveImage() {
    // 临时隐藏 logo 和版权信息
    noLoop(); // 停止 draw() 循环
    redrawWithoutLogoAndText(); // 绘制没有 logo 和版权信息的画面
    saveCanvas('CloudFont', saveFormat); // 保存画布为指定格式的图片
    loop(); // 恢复 draw() 循环
}

function redrawWithoutLogoAndText() {
    background(bgConfig.color);
    image(bubblesGrap, 0, 0);
}


