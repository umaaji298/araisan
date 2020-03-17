
const dataStr = '{"a":100,"b":200,"c":300,"c":301}';

const obj  = JSON.parse(dataStr);














// const obj = JSON.parse('{"p": 5}', (key, value) =>
//   typeof value === 'number'
//     ? value * 2 // 数値ならば値の2倍を返す
//     : value     // それ以外ならば変更しない
// );

console.log(obj);
