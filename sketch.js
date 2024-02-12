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

        let textConfig, bgConfig, sizeConfig;
        let textGrap, bubblesGrap;
        let gui;

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
            guiSize.add(sizeConfig, 'fontSize', 16, 128).onChange(drawTextAndBubbles);
            guiSize.add(sizeConfig, 'bubbleSizeMin', 1, 30).onChange(drawTextAndBubbles);
            guiSize.add(sizeConfig, 'bubbleSizeMax', sizeConfig.bubbleSizeMin, 30).onChange(drawTextAndBubbles);

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

function TextConfig() {
  this.text = "ENTER TEXT";
}

function BGConfig() {
  this.color = [0,136,255];
}
