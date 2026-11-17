import sharp from 'sharp';

async function check() {
  const metadata = await sharp('public/blackhole-nebula.jpg').metadata();
  console.log('Image dimensions:', metadata.width, 'x', metadata.height, 'channels:', metadata.channels);
}

check().catch(console.error);

