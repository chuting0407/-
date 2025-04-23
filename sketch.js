let bubbles = [];
let hearts = [];

function setup() {
  createCanvas(windowWidth, windowHeight); // 全螢幕畫布
  for (let i = 0; i < 100; i++) {
    let heart = new Heart(
      random(width), // 隨機 x 座標
      random(height), // 隨機 y 座標
      random(10, 50) // 隨機大小
    );
    hearts.push(heart);
  }
}

function draw() {
  background(255); // 每次重繪背景白色

  // 更新並顯示所有泡泡
  for (let bubble of bubbles) {
    bubble.update();
    bubble.display();
  }

  // 更新並顯示所有心型
  for (let heart of hearts) {
    heart.update();
    heart.display();
  }

  // 繪製名片
  drawCard();
}

// 繪製名片的函式
function drawCard() {
  // 名片背景
  fill('#b2f7ef'); // 設定名片背景顏色為 b2f7ef
  noStroke();
  rect(width / 2 - 200, height / 2 - 100, 400, 200, 10); // 名片大小與位置（縮小）

  // 名片邊框
  stroke(0);
  noFill();
  rect(width / 2 - 200, height / 2 - 100, 400, 200, 10); // 圓角矩形

  // 名片標題
  noStroke();
  fill(0);
  textSize(24); // 放大標題文字
  textAlign(CENTER, CENTER);
  text("自我介紹", width / 2, height / 2 - 60);

  // 名片內容
  textSize(18); // 放大內容文字
  textAlign(LEFT, TOP);
  text("姓名: 楊筑婷", width / 2 - 180, height / 2 - 40);
  text("生日: 95/04/07", width / 2 - 180, height / 2 - 10);
  text("就讀學校: 淡江大學", width / 2 - 180, height / 2 + 20);

  // 名片裝飾
  fill(100, 150, 255, 150);
  noStroke();
  ellipse(width / 2 + 120, height / 2 + 50, 50, 50); // 縮小圓形裝飾
}

// 泡泡類別
class Bubble {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.baseColor = color(random(255), random(255), random(255)); // 隨機基礎顏色
    this.alpha = random(50, 200); // 初始透明度
    this.xSpeed = random(-2, 2); // 隨機水平速度
    this.ySpeed = random(-2, 2); // 隨機垂直速度
  }

  update() {
    // 泡泡隨機飄動
    this.x += this.xSpeed;
    this.y += this.ySpeed;

    // 碰到邊界反彈
    if (this.x - this.r < 0 || this.x + this.r > width) {
      this.xSpeed *= -1;
    }
    if (this.y - this.r < 0 || this.y + this.r > height) {
      this.ySpeed *= -1;
    }

    // 根據滑鼠位置改變大小
    let distanceToMouse = dist(mouseX, mouseY, this.x, this.y);
    this.r = map(distanceToMouse, 0, width, 50, 10); // 距離越近泡泡越大，越遠越小
  }

  display() {
    fill(red(this.baseColor), green(this.baseColor), blue(this.baseColor), this.alpha);
    noStroke();
    ellipse(this.x, this.y, this.r * 2);
  }
}

// 心型類別
class Heart {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.baseColor = color(random(255), random(255), random(255)); // 隨機基礎顏色
    this.alpha = random(50, 200); // 初始透明度
    this.xSpeed = random(-2, 2); // 隨機水平速度
    this.ySpeed = random(-2, 2); // 隨機垂直速度
  }

  update() {
    // 心型隨機飄動
    this.x += this.xSpeed;
    this.y += this.ySpeed;

    // 碰到邊界反彈
    if (this.x - this.size < 0 || this.x + this.size > width) {
      this.xSpeed *= -1;
    }
    if (this.y - this.size < 0 || this.y + this.size > height) {
      this.ySpeed *= -1;
    }
  }

  display() {
    fill(red(this.baseColor), green(this.baseColor), blue(this.baseColor), this.alpha);
    noStroke();
    drawHeart(this.x, this.y, this.size);
  }
}

// 自訂函式繪製心型
function drawHeart(x, y, size) {
  beginShape();
  vertex(x, y);
  bezierVertex(x - size / 2, y - size / 2, x - size, y + size / 3, x, y + size);
  bezierVertex(x + size, y + size / 3, x + size / 2, y - size / 2, x, y);
  endShape(CLOSE);
}
