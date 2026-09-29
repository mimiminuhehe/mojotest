const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const launchButton =
  document.getElementById("launchButton");

const version =
  document.getElementById("version");

const loading =
  document.getElementById("loading");

const loadingTitle =
  document.getElementById("loadingTitle");

const loadingText =
  document.getElementById("loadingText");

const progressBar =
  document.getElementById("progressBar");

const status =
  document.getElementById("status");

const gameUI =
  document.getElementById("gameUI");


function resizeCanvas() {

  const dpr = Math.min(
    window.devicePixelRatio || 1,
    2
  );

  canvas.width =
    window.innerWidth * dpr;

  canvas.height =
    (window.innerHeight - 135) * dpr;

  canvas.style.width =
    window.innerWidth + "px";

  canvas.style.height =
    (window.innerHeight - 135) + "px";

  ctx.setTransform(
    dpr,
    0,
    0,
    dpr,
    0,
    0
  );
}


window.addEventListener(
  "resize",
  resizeCanvas
);


function drawPrototypeWorld() {

  const width =
    window.innerWidth;

  const height =
    window.innerHeight - 135;

  ctx.clearRect(
    0,
    0,
    width,
    height
  );


  // Sky

  const sky =
    ctx.createLinearGradient(
      0,
      0,
      0,
      height
    );

  sky.addColorStop(
    0,
    "#6db5e4"
  );

  sky.addColorStop(
    1,
    "#c4e7ff"
  );

  ctx.fillStyle = sky;

  ctx.fillRect(
    0,
    0,
    width,
    height
  );


  // Ground

  const groundY =
    height * 0.65;

  ctx.fillStyle =
    "#4c963c";

  ctx.fillRect(
    0,
    groundY,
    width,
    height - groundY
  );


  // Blocks

  const blockSize = 40;

  for (
    let x = 0;
    x < width;
    x += blockSize
  ) {

    ctx.fillStyle =
      (x / blockSize) % 2 === 0
        ? "#438533"
        : "#4c963c";

    ctx.fillRect(
      x,
      groundY,
      blockSize,
      blockSize
    );
  }


  // Simple tree

  const treeX =
    width * 0.25;

  const treeY =
    groundY - 120;

  ctx.fillStyle =
    "#70462c";

  ctx.fillRect(
    treeX,
    treeY + 60,
    35,
    100
  );

  ctx.fillStyle =
    "#286b2e";

  ctx.beginPath();

  ctx.arc(
    treeX + 17,
    treeY + 55,
    65,
    0,
    Math.PI * 2
  );

  ctx.fill();


  // Sun

  ctx.fillStyle =
    "#fff2a3";

  ctx.beginPath();

  ctx.arc(
    width * 0.8,
    height * 0.2,
    45,
    0,
    Math.PI * 2
  );

  ctx.fill();
}


function updateLoading(
  progress,
  title,
  text
) {

  progressBar.style.width =
    `${progress}%`;

  loadingTitle.textContent =
    title;

  loadingText.textContent =
    text;
}


async function bootGame() {

  launchButton.disabled = true;

  status.textContent =
    "게임 초기화 중";

  loading.classList.remove(
    "hidden"
  );

  gameUI.classList.add(
    "hidden"
  );


  const selectedVersion =
    version.value;


  const steps = [
    [
      10,
      "브라우저 확인",
      "WebAssembly 환경 확인 중..."
    ],

    [
      25,
      "그래픽 초기화",
      "WebGL 렌더러 준비 중..."
    ],

    [
      45,
      "파일 시스템",
      "브라우저 저장 공간 준비 중..."
    ],

    [
      65,
      "Java Runtime",
      "브라우저용 Java Runtime 준비 중..."
    ],

    [
      80,
      "Minecraft",
      `Minecraft ${selectedVersion} 준비 중...`
    ],

    [
      100,
      "완료",
      "게임 환경이 준비되었습니다."
    ]
  ];


  for (const step of steps) {

    updateLoading(
      step[0],
      step[1],
      step[2]
    );

    await sleep(500);
  }


  loading.classList.add(
    "hidden"
  );

  gameUI.classList.remove(
    "hidden"
  );

  status.textContent =
    `실행 중 · ${selectedVersion}`;

  drawPrototypeWorld();

  launchButton.disabled = false;
}


function sleep(ms) {

  return new Promise(
    resolve => setTimeout(
      resolve,
      ms
    )
  );
}


launchButton.addEventListener(
  "click",
  bootGame
);


resizeCanvas();

drawPrototypeWorld();
