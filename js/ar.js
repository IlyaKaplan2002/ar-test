const assetsIds = [
  "#SM_Turtle_PinkShirt",
  "#SM_Turtle_GoldenShell",
  "#SM_Turtle_EthGlasses",
  "#SM_Turtle_ChildEgg",
];

const scene = document.querySelector("#scene");
const entityModel = document.querySelector("#entityModel");
const dino = document.querySelector("#dino");
const screenBtn = document.querySelector("#screen");
const screenCapture = document.querySelector("#screenCapture");
const preview = document.querySelector("#preview");
const previewImage = document.querySelector("#previewImage");
const tweet = document.querySelector("#tweet");
const back = document.querySelector("#back");

function captureVideoFrame(video, format, width, height) {
  if (typeof video === "string") {
    video = document.querySelector(video);
  }

  format = format || "jpeg";

  if (!video || (format !== "png" && format !== "jpeg")) {
    return false;
  }

  var canvas = document.createElement("CANVAS");

  canvas.width = width || video.videoWidth;
  canvas.height = height || video.videoHeight;
  canvas.getContext("2d").drawImage(video, 0, 0);
  var dataUri = canvas.toDataURL("image/" + format);
  var data = dataUri.split(",")[1];
  var mimeType = dataUri.split(";")[0].slice(5);

  var bytes = window.atob(data);
  var buf = new ArrayBuffer(bytes.length);
  var arr = new Uint8Array(buf);

  for (var i = 0; i < bytes.length; i++) {
    arr[i] = bytes.charCodeAt(i);
  }

  var blob = new Blob([arr], { type: mimeType });
  return {
    blob: blob,
    dataUri: dataUri,
    format: format,
    width: canvas.width,
    height: canvas.height,
  };
}

// function resizeCanvas(origCanvas, width, height) {
//   let resizedCanvas = document.createElement("canvas");
//   let resizedContext = resizedCanvas.getContext("2d");

//   resizedCanvas.height = height;
//   resizedCanvas.width = width;

//   resizedContext.drawImage(origCanvas, 0, 0, width, height);
//   return resizedCanvas.toDataURL();
// }

function resizeCanvas(origCanvas, width, height) {
  let resizedCanvas = document.createElement("canvas");
  let resizedContext = resizedCanvas.getContext("2d");

  resizedCanvas.height = height;
  resizedCanvas.width = width;

  if (width > height) {
    // Landscape
    resizedContext.drawImage(origCanvas, 0, 0, width, height);
  } else {
    // Portrait
    var scale = height / width;
    var scaledHeight = origCanvas.width * scale;
    var scaledWidth = origCanvas.height * scale;
    var marginLeft = (origCanvas.width - scaledWidth) / 2;
    resizedContext.drawImage(
      origCanvas,
      marginLeft,
      0,
      scaledWidth,
      scaledHeight
    );
  }

  return resizedCanvas.toDataURL();
}

async function takeScreen() {
  let aScene = scene.components.screenshot.getCanvas("perspective");
  let frame = captureVideoFrame("video", "png");
  aScene = resizeCanvas(aScene, frame.width, frame.height);
  frame = frame.dataUri;
  const image = await mergeImages([frame, aScene]).then((b64) => {
    return b64;
  });

  return image;
}

const setLoading = () => {
  screenBtn.disabled = true;
  screenBtn.innerHTML =
    '<div class="lds-ring"><div></div><div></div><div></div><div></div></div>';
};

const removeLoading = () => {
  screenBtn.disabled = false;
  screenBtn.innerHTML = `
  <svg id="icon-camera" fill="black" width="32" height="32" viewBox="0 0 32 32">
        <path
          d="M9.5 19c0 3.59 2.91 6.5 6.5 6.5s6.5-2.91 6.5-6.5-2.91-6.5-6.5-6.5-6.5 2.91-6.5 6.5zM30 8h-7c-0.5-2-1-4-3-4h-8c-2 0-2.5 2-3 4h-7c-1.1 0-2 0.9-2 2v18c0 1.1 0.9 2 2 2h28c1.1 0 2-0.9 2-2v-18c0-1.1-0.9-2-2-2zM16 27.875c-4.902 0-8.875-3.973-8.875-8.875s3.973-8.875 8.875-8.875c4.902 0 8.875 3.973 8.875 8.875s-3.973 8.875-8.875 8.875zM30 14h-4v-2h4v2z"
        ></path>
      </svg>`;
};

const onScreen = async () => {
  console.log("screen");
  setLoading();
  const image = await takeScreen();
  console.log(image);
  removeLoading();
  preview.className = "preview open";
  previewImage.setAttribute("src", image);
  tweet.setAttribute(
    "href",
    "https://twitter.com/intent/tweet?text=Hello%20world&url=https://google.com"
  );
};

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomAssetIdAndScale = () => {
  const randomInt = getRandomInt(0, 3);
  console.log(randomInt);
  return {
    id: assetsIds[randomInt],
    scale:
      randomInt === 0 || randomInt === 2 ? "0.3 0.3 0.3" : "0.025 0.025 0.025",
  };
};

const onBack = () => {
  preview.className = "preview";
};

const randomAssetIdAndScale = getRandomAssetIdAndScale();

document.addEventListener("gesturestart", function (e) {
  e.preventDefault();
});

entityModel.setAttribute("gltf-model", randomAssetIdAndScale.id);
dino.setAttribute("scale", randomAssetIdAndScale.scale);
screenBtn.addEventListener("click", onScreen);
back.addEventListener("click", onBack);
