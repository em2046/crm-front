const fsPromises = require('fs').promises;
const path = require('path');

const emojiPath = './emoji.txt';
const avatarsDistPath = '../src/assets/avatars.json';
const endOfLine = /(?:\n|\r|\r\n)/;
const fileOption = {
  encoding: 'utf8',
};

const prettier = require('prettier');
const prettierConfig = {
  parser: 'json',
  endOfLine: 'lf',
};

async function main() {
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
  await fsPromises.writeFile(
    path.resolve(__dirname, avatarsDistPath),
    prettier.format(avatarsJSON, prettierConfig),
    fileOption,
  );
}

main().then(() => 0);
