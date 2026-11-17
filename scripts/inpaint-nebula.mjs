import sharp from 'sharp';

async function inpaint() {
  const { data, info } = await sharp('public/blackhole-nebula.jpg')
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  const outData = Buffer.from(data);

  const cx = 450;
  const cy = 282;
  const targetR = 92; // covers the black hole and white ring completely

  // Generate deterministic stars and nebula blend in the masked hole
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const dx = x - cx;
      const dy = y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < targetR + 15) {
        // Blend factor: 1 at center, 0 outside targetR + 15
        const blend = dist >= targetR ? (targetR + 15 - dist) / 15 : 1.0;

        // Sample from left nebula and right nebula symmetrically or offset
        const sampleX1 = Math.round(cx - (targetR + 35) + (dx * 0.4));
        const sampleY1 = Math.round(cy + dy * 0.8);

        const sampleX2 = Math.round(cx + (targetR + 35) + (dx * 0.4));
        const sampleY2 = Math.round(cy + dy * 0.8);

        const sX1 = Math.max(0, Math.min(width - 1, sampleX1));
        const sY1 = Math.max(0, Math.min(height - 1, sampleY1));
        const sX2 = Math.max(0, Math.min(width - 1, sampleX2));
        const sY2 = Math.max(0, Math.min(height - 1, sampleY2));

        const idx1 = (sY1 * width + sX1) * channels;
        const idx2 = (sY2 * width + sX2) * channels;
        const outIdx = (y * width + x) * channels;

        // Interpolate between left and right sample based on X position
        const t = (dx + targetR) / (2 * targetR);
        const rVal = (1 - t) * data[idx1] + t * data[idx2];
        const gVal = (1 - t) * data[idx1 + 1] + t * data[idx2 + 1];
        const bVal = (1 - t) * data[idx1 + 2] + t * data[idx2 + 2];

        // Add subtle cosmic noise & small stars
        const noise = (Math.sin(x * 12.9898 + y * 78.233) * 43758.5453) % 1;
        const isStar = noise > 0.985 && dist < targetR - 5;
        const starBoost = isStar ? 180 + Math.random() * 75 : 0;

        const finalR = Math.min(255, Math.max(0, rVal + starBoost));
        const finalG = Math.min(255, Math.max(0, gVal + starBoost));
        const finalB = Math.min(255, Math.max(0, bVal + starBoost));

        outData[outIdx] = Math.round((1 - blend) * data[outIdx] + blend * finalR);
        outData[outIdx + 1] = Math.round((1 - blend) * data[outIdx + 1] + blend * finalG);
        outData[outIdx + 2] = Math.round((1 - blend) * data[outIdx + 2] + blend * finalB);
      }
    }
  }

  // Save the cleaned nebula to new files
  await sharp(outData, { raw: { width, height, channels } })
    .jpeg({ quality: 95 })
    .toFile('public/nebula-clean.jpg');

  await sharp(outData, { raw: { width, height, channels } })
    .jpeg({ quality: 95 })
    .toFile('src/assets/nebula-clean.jpg');

  console.log('Successfully inpainted and saved clean nebula without static black hole!');
}

inpaint().catch(console.error);
