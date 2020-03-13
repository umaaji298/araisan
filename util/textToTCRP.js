const fs = require('fs').promises;

const convertMap = new Map([["А", "20"], ["Б", "21"], ["В", "22"], ["Г", "23"], ["Д", "24"], ["Е", "25"], ["Ж", "26"], ["з", "27"], ["и", "28"], ["И", "28"], ["↑", "0"], ["↗", "1"], ["→", "2"], ["↘", "3"], ["↓", "4"], ["↙", "5"], ["←", "6"], ["↖", "7"], ["|", "00"], ["||", "01"], ["|||", "02"], ["||||", "03"], ["|||||", "04"], ["||||||", "05"], ["|||||||", "06"], ["||||||||", "07"], ["|||||||||", "08"], ["||||||||||", "09"], ["|||||||||||", "10"], ["||||||||||||", "11"], ["|||||||||||||", "12"], ["||||||||||||||", "13"], ["|||||||||||||||", "14"]]);

const events = {}

async function main() {

  const fileList = await getFiles();
  //console.log(fileList);

  for (let i = 0; i < fileList.length; i++) {
    const file = fileList[i];
    const data = await fs.readFile(`app/events/raw/${file}`, 'utf-8');
    scriptsToEvents(data);
  }

  //console.log(events);
  await fs.writeFile('docs/events/events.json', JSON.stringify(events));

  console.log('done');
}

main();

async function getFiles() {
  let fileList = [];

  const files = await fs.readdir('app/events/raw/')
  files.forEach((file) => {
    fileList.push(file);
  })

  return fileList;
}

function scriptsToEvents(data) {
  const array = data.split('\n');
  const floor = array[0];
  const strings = array.slice(1);

  const id = floorToId(floor);

  const baseX = 40;
  const baseY = 117;
  const fixY = (10 - strings.length) * 20 + baseY;

  const commands = new Array();
  commands.push([0, 'preText', 'エレベータを降りた\nとしあきは見た…']);

  let wait = 3000; // 次の文章表示時間 : 

  for (let i = 0; i < strings.length; i++) {

    const lineWord = strings[i];
    const waittimeClass = Math.floor(lineWord.length / 12);
    const oneScript = [wait, 'text', strings[i], baseX, fixY + (40 * i)];

    wait = 2000; // eye forcus time

    switch (waittimeClass) {
      case 0: {
        wait += 1000;
        break;
      }
      case 1: {
        wait += 3000;
        break;
      }
      case 2: {
        wait += 4000;
      }
    }

    commands.push(oneScript);
  }
  if (id === '14141414') {
    events[id] = commands.concat([[5000, "poneSE"], [1000, [["dooropenSE"], ["fadeOut", 6000]]], [6000, "toGameOver"]]);
  }else if(id === '999999990000'){
    commands.push([wait, 'next'])
    events[id] = commands.slice(1);
  }
else if(id === '999999990001'){
  commands.push([wait, 'next'])
  events[id] = commands.slice(1);
}
  else {
    commands.push([wait, 'next']) // 次へボタン表示
    events[id] = commands;
  }
}

function floorToId(floor) {
  const array = floor.split(',');
  let id = ""

  for (let i = 0; i < array.length; i++) {
    if (convertMap.has(array[i])) {
      // console.log('hit of',array[i]);
      id += convertMap.get(array[i]);
    } else {
      id += ('00' + array[i]).slice(-2); // 2桁揃え
    }
  }
  //console.log(floorno[0],':', result);
  console.log(id);

  return id;
}