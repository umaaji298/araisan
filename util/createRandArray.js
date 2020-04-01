const fs = require('fs').promises;

async function main() {

  const shuffle = ([...array]) => {
    for (let i = array.length - 1; i >= 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const array = new Array();

  for (let i = 0; i < 256; i++) {
    array.push(i);
  }

  const shuffled = shuffle(array);

  //console.log();

  await fs.writeFile(__dirname + '/data/randArray.txt',JSON.stringify(shuffled));
}

main().then(()=>{
  console.log('done');
})