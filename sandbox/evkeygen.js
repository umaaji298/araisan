let arrow1 = 0;
let arrow2 = 0;

let gauge = 0;

// let a_total = arrow1 * 10 + arrow2

// let a_int10 = parseInt(a_total,8);

// let basenum = a_int10 + gauge; // max 

// console.log(basenum);

// let reverse = 80 - basenum;

// // todo 乱数表で 00 ~ 80 のマッピング？
// let code = reverse.toString(3);

// console.log(code);

const floorRand = getFloorRand(arrow1,arrow2,gauge);

console.log(floorRand);

const select = floorRand.split('');

console.log(select);



function getFloorRand(arrow1,arrow2,gauge){
  //max 80 - 0 : min 80 - 78 = 2
  const base = parseInt((arrow1 * 10 + arrow2),8) + gauge;
  const reverse = 80 - base;
  return ('0000' + reverse.toString(3)).slice(-4);
}
