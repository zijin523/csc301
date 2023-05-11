//物品菜单
var items = [];

var item;
item = {
    id: 'item'+ 0,
    detail: 'apple',
    money: '10'
}
items.push(item);

item = {
    id: 'item'+ 1,
    detail: 'banana',
    money: '7'
}
items.push(item);

var item_id = 2;
function addItems(items, item_text, item_amount, item_id){
  for(var i = 0; i < items.length; i++){
    if(item_text.value === "" || items[i].detail == item_text.value){
      itemErrorAlert();
      return;
    }
  }
  var reg = /^(\d+|\d+\.\d{1,2})$/;
  if (reg.test(item_amount.value) === false) {
    moneyErrorAlert();
    return;
  }

  item = {
    id: 'item'+ item_id,
    detail: item_text.value,
    money: item_amount.value
  }

  items.push(item);
  return 1;
}

function addItemFront(){
  var success = addItems(items, item_text, item_amount, item_id);
  if (!success){
    return;
  }
  var ul = document.getElementById('details');
  var li = document.createElement('p');
  li.setAttribute("id",item.id);
  item_id++;
  var str = `<p><span class="item">${item.detail}</span>
            <span class="price">${item.money}</span></p>`
  li.innerHTML = str;
  ul.appendChild(li);

  item_text.value = '';
  item_amount.value = '';
}

function deleteItem(){

  var ul = document.getElementById('details');
  for(var i = 0; i < items.length; i++){
    if(items[i].detail == item_text.value){
      ul.removeChild(document.getElementById(items[i].id));
      items.splice(i,1);
      item_text.value = '';
      item_amount.value = '';
      return
    }
  }
  itemErrorAlert();
}


//物品账单
var records = []; //data{id,detail,type,money}
var deletes = ""; //id
var tid = 0;
var count = 0;

function cancellItem(){
  deletes_list= deletes.split(",");
  var ul = document.querySelector('#list');
  for(var i = 0; i < records.length;){
    var index = deletes_list.indexOf(records[i].id)
    if(index != -1){             
      setMoney(records[i], 0); //
      records.splice(i,1);
      ul.removeChild(document.getElementById(deletes_list[index]));
      deletes_list.splice(index,1);
    } else {
        i++
    }
  }

  successAlert();
}

function purchaseItem() {
    var text = document.querySelector('#text');
    var amount = document.querySelector('#amount');
    var reg = /^(\d+|\d+\.\d{1,2})$/;
    if (reg.test(number.value) === false || reg.test(amount.value) === false) {
        moneyErrorAlert()
        return;
    }
    var data;
    var flag = 0;
    for(var i = 0; i < items.length; i++){
        if(items[i].detail == text.value){
        data = {
            id: 'li'+ tid,
            detail: text.value,
            number: number.value,
            money: items[i].money,
            discount: amount.value
        }
        flag = 1;
        }
    }
    if(text.value === "" || flag == 0){
        itemErrorAlert()
        return;
    }

    records.push(data);
    var li = addList(data);
        //增加点击事件
        li.addEventListener('click', function(){
            if(document.getElementById(this.id).style.backgroundColor == 'white' || document.getElementById(this.id).style.backgroundColor == ''){
              document.getElementById(this.id).style.backgroundColor = 'grey';
              deletes = deletes + this.id + ",";
              count ++;
            } else {
              document.getElementById(this.id).style.backgroundColor = 'white';
              deletes.pop(this.id);
            }
          })
    setMoney(data, 1);

    text.value = '';
    number.value = '';
    amount.value = '0';
    successAlert();
    }

  function addList(data) {
    var ul = document.querySelector('#list');
    var li = document.createElement('li');
    li.setAttribute("id",data.id);

    var str = `<span class="detail">${data.detail}</span>
               <span class="number">${data.number}</span>
               <span class="money">${data.number * data.money}</span>
               <span class="discount">${data.discount}</span>`
    li.innerHTML = str;
    ul.appendChild(li);
    tid ++;
    
    return li
  }

  function setMoney(data, flag) { //flag == 1: add flag == 0: delete
   
    // 总价
    var price = document.getElementById("price");
    // 优惠
    var discount = document.getElementById("discount");
    // 税后
    var total = document.getElementById("total");

    if(flag == 1){
      price.innerHTML = `<p id="price" class="price">${parseFloat(price.innerText) + parseFloat(data.number)*parseFloat(data.money)}</p>`;
      discount.innerHTML = `<p id="discount" class="discount">${parseFloat(discount.innerText) + parseFloat(data.discount)}</p>`;
    } else {
      price.innerHTML = `<p id="price" class="price">${parseFloat(price.innerText) - parseFloat(data.number)*parseFloat(data.money)}</p>`;
      discount.innerHTML = `<p id="discount" class="discount">${parseFloat(discount.innerText) - parseFloat(data.discount)}</p>`;
    }
    total.innerHTML = `<h1><span id="total">${((parseFloat(price.innerText) - parseFloat(discount.innerText))*1.3).toFixed(2)}</span></h1>`;
  }

  function itemErrorAlert() {
    var error = document.querySelector('#itemError');
    error.style.height = '30px';
    setTimeout(function() {
      error.style.height = '0'
    }, 800);
  }

  function moneyErrorAlert() {
    var error = document.querySelector('#moneyError');
    error.style.height = '30px';
    setTimeout(function() {
      error.style.height = '0'
    }, 800);
  }

  function successAlert() {
    var success = document.querySelector('#success');
    success.style.height = '30px';
    setTimeout(function() {
      success.style.height = '0'
    }, 800);
  }
