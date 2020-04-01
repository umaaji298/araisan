const fs = require('fs').promises;

async function main() {

  const data = await fs.readFile(__dirname + '/data/ev.txt', 'utf-8');

  // console.log(data);

  let dataArray = data.split('\n');
  const fixData = new Array();

  fixData.push('[')

  for (let i = 0; i < dataArray.length; i++) {
    if(dataArray[i] === ""){
      continue
    }

    let fixStr = "";
    if (i != 0) {
      fixStr += ", ";
    }
    fixStr += `"${dataArray[i]}"`;
    fixData.push(fixStr);
  }

  fixData.push('],');

  const result = fixData.join('');

  console.log(result);

  await fs.writeFile(__dirname + '/data/out.txt',result);
};

main().then(() => {
  console.log('done');
})













