const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const { promisify } = require('util');
const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);

// 批量生成.gz文件,压缩指定目录下的所有文件（包含子目录）
async function handle_gzip(rootpath, backups) {
  const files = await readdir(rootpath);
  for (const file of files) {
    const fullPath = path.join(rootpath, file);
    const statInfo = await stat(fullPath);
    if (statInfo.isFile() && path.extname(fullPath) !== '.gz') {
      fs.createReadStream(fullPath)
        .pipe(zlib.createGzip())
        .pipe(fs.createWriteStream(`${fullPath}.gz`))
        .on('finish', () => console.log(`${fullPath} was compressed to ${fullPath}.gz`));
    } else if (statInfo.isDirectory()) {
      await handle_gzip(fullPath, backups);
    }
  }
}

exports.handle_gzip = handle_gzip;
