import sharp from 'sharp';

async function measure() {
  const { data, info } = await sharp('public/blackhole-nebula.jpg')
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  const centerY = Math.floor(height / 2); // 282
  console.log(`Sampling along Y = ${centerY}`);

  let leftEdge = -1;
  let rightEdge = -1;

  for (let x = 300; x <= 600; x++) {
    const idx = (centerY * width + x) * channels;
    const r = data[idx];
    const g = data[idx + 1];
    const b = data[idx + 2];
    const brightness = (r + g + b) / 3;

    if (brightness < 15 && leftEdge === -1) {
      leftEdge = x;
    }
    if (brightness > 200 && leftEdge !== -1 && rightEdge === -1 && x > 400) {
      rightEdge = x;
    }
  }

  console.log(`Black hole center X approx 450. Left inner edge: ${leftEdge}, Right outer edge: ${rightEdge}`);
  console.log(`Radius is approx: ${(rightEdge - leftEdge) / 2} pixels`);
}

measure().catch(console.error);

