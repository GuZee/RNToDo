const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// 定义启动屏幕尺寸
const splashScreenSizes = [
  { width: 1242, height: 2688 }, // iPhone 11 Pro Max, XS Max
  { width: 1125, height: 2436 }, // iPhone 11 Pro, X, XS
  { width: 828, height: 1792 },  // iPhone 11, XR
  { width: 1080, height: 1920 }, // Android devices
];

// 生成不同主题的启动屏幕
async function generateSplashScreens() {
  const themes = [
    {
      name: 'stats',
      generate: async (width, height) => {
        const svg = `
        <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style="stop-color:#4A90E2;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#357ABD;stop-opacity:1" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#grad)"/>
          <g transform="translate(${width/2-200}, ${height/2-250})">
            <rect x="0" y="0" width="80" height="200" fill="white" opacity="0.9"/>
            <rect x="120" y="50" width="80" height="150" fill="white" opacity="0.7"/>
            <rect x="240" y="100" width="80" height="100" fill="white" opacity="0.5"/>
            <text x="160" y="280" fill="white" font-family="Arial" font-size="24" text-anchor="middle">任务统计</text>
          </g>
        </svg>`;
        return Buffer.from(svg);
      }
    },
    {
      name: 'tasks',
      generate: async (width, height) => {
        const svg = `
        <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style="stop-color:#4A90E2;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#357ABD;stop-opacity:1" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#grad)"/>
          <g transform="translate(${width/2-150}, ${height/2-200})">
            <rect x="0" y="0" width="300" height="60" rx="8" fill="white" opacity="0.9"/>
            <rect x="0" y="80" width="300" height="60" rx="8" fill="white" opacity="0.7"/>
            <rect x="0" y="160" width="300" height="60" rx="8" fill="white" opacity="0.5"/>
            <text x="150" y="280" fill="white" font-family="Arial" font-size="24" text-anchor="middle">任务列表</text>
          </g>
        </svg>`;
        return Buffer.from(svg);
      }
    },
    {
      name: 'completion',
      generate: async (width, height) => {
        const svg = `
        <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style="stop-color:#4A90E2;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#357ABD;stop-opacity:1" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#grad)"/>
          <g transform="translate(${width/2-100}, ${height/2-100})">
            <circle cx="100" cy="100" r="80" fill="none" stroke="white" stroke-width="8" opacity="0.9"/>
            <path d="M60,100 L90,130 L140,70" fill="none" stroke="white" stroke-width="8" opacity="0.9"/>
            <text x="100" y="220" fill="white" font-family="Arial" font-size="24" text-anchor="middle">任务完成</text>
          </g>
        </svg>`;
        return Buffer.from(svg);
      }
    }
  ];

  // 确保目录存在
  const iosPath = path.join(__dirname, '../ios/todo/Images.xcassets/SplashScreen.imageset');
  const androidPath = path.join(__dirname, '../android/app/src/main/res/drawable');
  
  fs.mkdirSync(iosPath, { recursive: true });
  fs.mkdirSync(androidPath, { recursive: true });

  // 生成所有主题的启动屏幕
  for (const theme of themes) {
    for (const size of splashScreenSizes) {
      const svgBuffer = await theme.generate(size.width, size.height);
      
      // 生成iOS图片
      await sharp(svgBuffer)
        .resize(size.width, size.height)
        .png()
        .toFile(path.join(iosPath, `splash_${theme.name}_${size.width}x${size.height}.png`));

      // 生成Android图片
      await sharp(svgBuffer)
        .resize(1080, 1920) // Android统一使用1080p分辨率
        .png()
        .toFile(path.join(androidPath, `splash_${theme.name}.png`));
    }
  }

  // 更新iOS的Contents.json
  const contents = {
    images: themes.map(theme => ({
      filename: `splash_${theme.name}_1125x2436.png`,
      idiom: 'universal',
      scale: '1x'
    })),
    info: {
      author: 'xcode',
      version: 1
    }
  };

  fs.writeFileSync(
    path.join(iosPath, 'Contents.json'),
    JSON.stringify(contents, null, 2)
  );
}

// 执行生成
async function generate() {
  try {
    await generateSplashScreens();
    console.log('启动屏幕图片生成完成！');
  } catch (error) {
    console.error('生成启动屏幕图片时发生错误:', error);
  }
}

generate();