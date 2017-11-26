'use strict';

const itemInfo = require("./items.js");
const onsaleInfo = require("./promotions.js");


function bestCharge(selectedItems) {
  let toArrayInfo=calItem(selectedItems);

  let m=saleMethod(toArrayInfo)[0];
  let str="============= 订餐明细 =============";
  for(let i=0;i<toArrayInfo.length;i++){
    str+="\n"+toArrayInfo[i].name+" x "+toArrayInfo[i].cnt+" = "+toArrayInfo[i].price*toArrayInfo[i].cnt+"元";
  }

  if(m.d1-m.d2>0){
    str+="\n-----------------------------------\n使用优惠:";
    str+="\n"+onsaleInfo()[0].type+"，省"+m.d1+"元";
    str+="\n-----------------------------------\n总计"+(parseInt(m.orip)-parseInt(m.d1))+"元\n===================================";
  }else if(m.d2>m.d1){
    str+="\n-----------------------------------\n使用优惠:";
    str+="\n"+onsaleInfo()[1].type+"(";
    for(let i=0;i<m.items.length-1;i++){
      str+=m.items[i]+"，";
    }
    str+=m.items[m.items.length-1]+")，省"+m.d2+"元";
    str+="\n-----------------------------------\n总计"+(parseInt(m.orip)-parseInt(m.d2))+"元\n===============================";
  }else{
    str+="\n-----------------------------------\n总计"+m.orip+"元\n===============================";
  }

  return str;
}


function calItem(arr){
  let re=[];
  let k=0;
  for(let i=0;i<arr.length;i++)
  {
    for(let j=0;j<itemInfo().length;j++)
    if(arr[i].slice(0,8)==itemInfo()[j].id){
      re[k]={id:arr[i].slice(0,8),name:itemInfo()[j].name,cnt:arr[i].slice(11),price:itemInfo()[j].price};
      k++;
    }
  }
  return re;
};
let inputs1 = ["ITEM0013 x 4", "ITEM0022 x 1"];
let inputs2 =["ITEM0013 x 4"];
function saleMethod(list){
  let re=[];
  let sumPrice=0;//原价
  let sp1=0;//打折一
  let sp2=0;//打折二
  let discount;
  let ditem=[];
  for(let i=0;i<list.length;i++){
    for(let j=0;j<onsaleInfo()[1].items.length;j++){
      if(list[i].id==onsaleInfo()[1].items[j]){
        sp2+=list[i].cnt*list[i].price*0.5;
        ditem.push(list[i].name);
      }
    }
    sumPrice+=list[i].cnt*list[i].price;
  }

  if(sumPrice>=30){
    sp1=Math.floor(sumPrice/30)*6;
  }

  re.push({orip:sumPrice,d1:sp1,d2:sp2,items:ditem});
  return re;
}

module.exports=bestCharge;
/*
let inputs = ["ITEM0013 x 4", "ITEM0022 x 1"];
let re=bestCharge(inputs);
console.log(re);
let f1=calItem(inputs);
console.log(f1);
let f2=saleMethod(f1);
console.log(f2);
*/
