const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// 定义iOS图标尺寸
const iosIconSizes = [
  { size: 20, scales: [2, 3] },
  { size: 29, scales: [2, 3] },
  { size: 40, scales: [2, 3] },
  { size: 60, scales: [2, 3] },
  { size: 1024, scales: [1] } // App Store
];

// 定义Android图标尺寸
const androidIconSizes = [
  { name: 'mdpi', size: 48 },
  { name: 'hdpi', size: 72 },
  { name: 'xhdpi', size: 96 },
  { name: 'xxhdpi', size: 144 },
  { name: 'xxxhdpi', size: 192 }
];

// 源SVG文件路径
const svgPath = path.join(__dirname, '../src/assets/app-icon-2.svg');

// 生成iOS图标
async function generateIosIcons() {
  const iosAssetsPath = path.join(__dirname, '../ios/todo/Images.xcassets/AppIcon.appiconset');
  if (!fs.existsSync(iosAssetsPath)) {
    fs.mkdirSync(iosAssetsPath, { recursive: true });
  }

  for (const icon of iosIconSizes) {
    for (const scale of icon.scales) {
      const size = icon.size * scale;
      const fileName = `icon_${icon.size}@${scale}x.png`;
      await sharp(svgPath)
        .resize(size, size)
        .png()
        .toFile(path.join(iosAssetsPath, fileName));
    }
  }

  // 更新Contents.json
  const contents = {
    images: [],
    info: { version: 1, author: 'xcode' }
  };

  for (const icon of iosIconSizes) {
    for (const scale of icon.scales) {
      contents.images.push({
        size: `${icon.size}x${icon.size}`,
        idiom: icon.size === 1024 ? 'ios-marketing' : 'iphone',
        filename: `icon_${icon.size}@${scale}x.png`,
        scale: `${scale}x`
      });
    }
  }

  fs.writeFileSync(
    path.join(iosAssetsPath, 'Contents.json'),
    JSON.stringify(contents, null, 2)
  );
}

// 生成Android图标
async function generateAndroidIcons() {
  for (const icon of androidIconSizes) {
    const androidPath = path.join(
      __dirname,
      `../android/app/src/main/res/mipmap-${icon.name}`
    );
    if (!fs.existsSync(androidPath)) {
      fs.mkdirSync(androidPath, { recursive: true });
    }

    await sharp(svgPath)
      .resize(icon.size, icon.size)
      .png()
      .toFile(path.join(androidPath, 'ic_launcher.png'));

    // 同时生成圆角版本作为前景图标
    await sharp(svgPath)
      .resize(icon.size, icon.size)
      .png()
      .toFile(path.join(androidPath, 'ic_launcher_round.png'));
  }
}

// 执行生成
async function generate() {
  try {
    await generateIosIcons();
    await generateAndroidIcons();
    console.log('应用图标生成完成！');
  } catch (error) {
    console.error('生成图标时发生错误:', error);
  }
}

generate();