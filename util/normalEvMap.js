const evmap = new Map();


for(let i=0;i<16;i++){
  const id = ('00' + i).slice(-2);
  const binary = i.toString(2);
  const fixbinary = ('0000' + binary).slice(-4);
  const array = fixbinary.split('');
  const reverse = array.reverse();



  const mapdata = [id,reverse]
  console.log(mapdata);
}