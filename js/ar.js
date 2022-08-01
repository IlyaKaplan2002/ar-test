const assetsIds = [
  '#SM_Turtle_PinkShirt',
  '#SM_Turtle_GoldenShell',
  '#SM_Turtle_EthGlasses',
  '#SM_Turtle_ChildEgg',
];

// const scene = document.querySelector('#scene');
const entityModel = document.querySelector('#entityModel');
const dino = document.querySelector('#dino');

let isMarkerVisible = false;

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
    scale: randomInt === 0 || randomInt === 2 ? '0.3 0.3 0.3' : '0.025 0.025 0.025',
  };
};

// const handleRotation = event => {
//   if (isMarkerVisible) {
//     el.object3D.rotation.y += event.detail.positionChange.x * rotationFactor;

//     el.object3D.rotation.x += event.detail.positionChange.y * rotationFactor;
//   }
// };

// const handleScale = event => {
//   if (isMarkerVisible) {
//     this.scaleFactor *= 1 + event.detail.spreadChange / event.detail.startSpread;

//     this.scaleFactor = Math.min(Math.max(this.scaleFactor, this.data.minScale), this.data.maxScale);

//     el.object3D.scale.x = scaleFactor * initialScale.x;
//     el.object3D.scale.y = scaleFactor * initialScale.y;
//     el.object3D.scale.z = scaleFactor * initialScale.z;
//   }
// };

const randomAssetIdAndScale = getRandomAssetIdAndScale();

entityModel.setAttribute('gltf-model', randomAssetIdAndScale.id);
dino.setAttribute('scale', randomAssetIdAndScale.scale);

// scene.addEventListener('markerFound', e => {
//   isMarkerVisible = true;
// });
// scene.addEventListener('markerLost', e => {
//   isMarkerVisible = false;
// });
// scene.addEventListener('onefingermove', handleRotation);
// scene.addEventListener('twofingermove', handleScale);
