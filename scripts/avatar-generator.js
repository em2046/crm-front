const fsPromises = require('fs').promises;
const path = require('path');
const formatPath = '../.prettierrc';
const emojiPath = './emoji.txt';
const avatarsDistPath = '../src/app/login/avatars/avatars.ts';
const endOfLine = /(?:\n|\r|\r\n)/;
const fileOption = {
  encoding: 'utf8',
};

const prettier = require('prettier');

async function main() {
  let formatText = await fsPromises.readFile(
    path.resolve(__dirname, formatPath),
    fileOption,
  );
  let format = JSON.parse(formatText);
  format.parser = 'typescript';

  let emojiText = await fsPromises.readFile(
    path.resolve(__dirname, emojiPath),
    fileOption,
  );

  let emojiLines = emojiText.split(endOfLine);
  let emojiList = emojiLines.filter(emojiLine => {
    return emojiLine !== '';
  });
  let emojiSet = emojiList.map(emojiLine => {
    let [code, name] = emojiLine.split(':');
    return {
      code: code.codePointAt(0),
      name,
    };
  });

  let avatarsJSON = JSON.stringify(emojiSet);
  let content = `/**
 * 此文件由脚本自动生成，请勿直接修改
 */
export const AVATARS = ${avatarsJSON}
`;

  await fsPromises.writeFile(
    path.resolve(__dirname, avatarsDistPath),
    prettier.format(content, format),
    fileOption,
  );
}

main().then(() => 0);
