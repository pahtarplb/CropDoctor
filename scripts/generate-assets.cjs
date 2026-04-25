const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Source logo
const logoPath = path.join(__dirname, '../public/cropDoctorLogo.png');

// Icon sizes for Android
const iconSizes = [
  { name: 'mipmap-mdpi', size: 48 },
  { name: 'mipmap-hdpi', size: 72 },
  { name: 'mipmap-xhdpi', size: 96 },
  { name: 'mipmap-xxhdpi', size: 144 },
  { name: 'mipmap-xxxhdpi', size: 192 },
];

// Foreground icon sizes (with padding for adaptive icons)
const foregroundSizes = [
  { name: 'mipmap-mdpi', size: 108 },
  { name: 'mipmap-hdpi', size: 162 },
  { name: 'mipmap-xhdpi', size: 216 },
  { name: 'mipmap-xxhdpi', size: 324 },
  { name: 'mipmap-xxxhdpi', size: 432 },
];

// Splash screen sizes
const splashSizes = [
  { name: 'drawable', width: 480, height: 800 },
  { name: 'drawable-land-hdpi', width: 800, height: 480 },
  { name: 'drawable-land-mdpi', width: 480, height: 320 },
  { name: 'drawable-land-xhdpi', width: 1280, height: 720 },
  { name: 'drawable-land-xxhdpi', width: 1600, height: 960 },
  { name: 'drawable-land-xxxhdpi', width: 1920, height: 1280 },
  { name: 'drawable-port-hdpi', width: 480, height: 800 },
  { name: 'drawable-port-mdpi', width: 320, height: 480 },
  { name: 'drawable-port-xhdpi', width: 720, height: 1280 },
  { name: 'drawable-port-xxhdpi', width: 960, height: 1600 },
  { name: 'drawable-port-xxxhdpi', width: 1280, height: 1920 },
];

const androidResPath = path.join(__dirname, '../android/app/src/main/res');

async function generateIcons() {
  console.log('Generating app icons from cropDoctorLogo.png...');

  // Read and process the logo
  const logoBuffer = await sharp(logoPath)
    .trim() // Remove whitespace
    .toBuffer();

  // Get logo dimensions
  const logoMeta = await sharp(logoBuffer).metadata();
  console.log(`  Logo size: ${logoMeta.width}x${logoMeta.height}`);

  for (const { name, size } of iconSizes) {
    const dirPath = path.join(androidResPath, name);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    // Create icon with green background and centered logo
    const padding = Math.floor(size * 0.15);
    const logoSize = size - (padding * 2);

    // Create green background
    const background = await sharp({
      create: {
        width: size,
        height: size,
        channels: 4,
        background: { r: 22, g: 163, b: 74, alpha: 1 } // #16a34a
      }
    }).png().toBuffer();

    // Resize logo to fit
    const resizedLogo = await sharp(logoBuffer)
      .resize(logoSize, logoSize, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
      .toBuffer();

    // Composite logo on background
    const outputPath = path.join(dirPath, 'ic_launcher.png');
    await sharp(background)
      .composite([{
        input: resizedLogo,
        top: padding,
        left: padding
      }])
      .png()
      .toFile(outputPath);

    // Create round icon
    const roundMask = Buffer.from(
      `<svg width="${size}" height="${size}">
        <circle cx="${size/2}" cy="${size/2}" r="${size/2}" fill="white"/>
      </svg>`
    );

    const roundPath = path.join(dirPath, 'ic_launcher_round.png');
    await sharp(background)
      .composite([{
        input: resizedLogo,
        top: padding,
        left: padding
      }])
      .composite([{
        input: roundMask,
        blend: 'dest-in'
      }])
      .png()
      .toFile(roundPath);

    console.log(`  Created ${name}/ic_launcher.png (${size}x${size})`);
  }

  // Generate foreground icons for adaptive icons
  console.log('Generating adaptive icon foregrounds...');
  for (const { name, size } of foregroundSizes) {
    const dirPath = path.join(androidResPath, name);

    // For adaptive icons, logo should be ~66% of the foreground size
    const logoSize = Math.floor(size * 0.66);
    const offset = Math.floor((size - logoSize) / 2);

    // Resize logo
    const resizedLogo = await sharp(logoBuffer)
      .resize(logoSize, logoSize, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
      .toBuffer();

    // Create transparent background
    const transparent = await sharp({
      create: {
        width: size,
        height: size,
        channels: 4,
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      }
    }).png().toBuffer();

    const outputPath = path.join(dirPath, 'ic_launcher_foreground.png');
    await sharp(transparent)
      .composite([{
        input: resizedLogo,
        top: offset,
        left: offset
      }])
      .png()
      .toFile(outputPath);

    console.log(`  Created ${name}/ic_launcher_foreground.png (${size}x${size})`);
  }
}

async function generateSplashScreens() {
  console.log('Generating splash screens with white background...');

  // Read and process the logo
  const logoBuffer = await sharp(logoPath)
    .trim()
    .toBuffer();

  for (const { name, width, height } of splashSizes) {
    const dirPath = path.join(androidResPath, name);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    // Logo should be about 40% of the smaller dimension
    const logoSize = Math.floor(Math.min(width, height) * 0.4);
    const logoX = Math.floor((width - logoSize) / 2);
    const logoY = Math.floor((height - logoSize) / 2);

    // Create WHITE background
    const background = await sharp({
      create: {
        width: width,
        height: height,
        channels: 4,
        background: { r: 255, g: 255, b: 255, alpha: 1 }
      }
    }).png().toBuffer();

    // Resize logo with transparent background
    const resizedLogo = await sharp(logoBuffer)
      .resize(logoSize, logoSize, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
      .toBuffer();

    const outputPath = path.join(dirPath, 'splash.png');
    await sharp(background)
      .composite([{
        input: resizedLogo,
        top: logoY,
        left: logoX
      }])
      .png()
      .toFile(outputPath);

    console.log(`  Created ${name}/splash.png (${width}x${height})`);
  }
}

async function main() {
  try {
    // Check if logo exists
    if (!fs.existsSync(logoPath)) {
      console.error('Error: cropDoctorLogo.png not found in public folder');
      process.exit(1);
    }

    await generateIcons();
    await generateSplashScreens();
    console.log('\nAll assets generated successfully from cropDoctorLogo.png!');
  } catch (error) {
    console.error('Error generating assets:', error);
    process.exit(1);
  }
}

main();
