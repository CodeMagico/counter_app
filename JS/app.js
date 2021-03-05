//COUNTER APP
//STAR2IMPACT PROJECTS

//COUNTER VAR
let display = document.querySelectorAll('.display');
let label = document.querySelectorAll('.label');
let result = document.querySelectorAll('.result');
label[0].value = 'My COUNT';
result[0].value = '0';
//COUNTER BUTTON VAR
let plus = document.querySelectorAll('.btnPlus');
let minus = document.querySelectorAll('.btnMinus');
let input = document.querySelectorAll('.input');
let del = document.querySelectorAll('.del');
let save = document.querySelectorAll('.save');
const btnAdd = document.querySelector('.btnAdd');
//MENU VAR
const menu = document.querySelector('.menu');
const cardBox = document.querySelector('.cardBox');
const menuBtn = document.querySelector('#menuBtn');
//CARD VAR
let card = document.querySelectorAll('.card');
let labelCount = document.querySelectorAll('.labelCount');
let numberCount = document.querySelectorAll('.numberCount');
let cardDate = document.querySelectorAll('.date');
//CARD BTN
let editBtn = document.querySelectorAll('.cardEdit');
let delBtn = document.querySelectorAll('.cardDel');
//SETTING BTN
let minValue = document.querySelector('.minValue');
let maxValue = document.querySelector('.maxValue');
let minusMin = document.querySelector('.minusMin');
let plusMin = document.querySelector('.plusMin');
let minusMax = document.querySelector('.minusMax');
let plusMax = document.querySelector('.plusMax');
//THEME BUTTON VAR
const btnTheme = document.querySelector('#btnTheme');
//COUNTER
let index = 0;//NUMBER OF NEW COUNTER
let picker = 0;//COUNTER COLOR 
let menuPicker = 0;//SAME FOR MENU
//COLOR PALETTE
const bg0 = 'rgba(0, 140, 255, 0.3)';
const bg1 = 'rgba(255, 1, 64, 0.3)';
const bg2 = 'rgba(187, 255, 0, 0.3)';
const bg3 = 'rgba(255, 0, 0, 0.3)';
const bg4 = 'rgba(0, 255, 157, 0.3)';
const bg5 = 'rgba(140, 0, 255, 0.3)';
//DARK MODE
btnTheme.onclick = () => {
    let active = document.querySelector('.active');
    btnTheme.classList.toggle('active');
    if(active){
        document.body.classList.add('light')
        document.body.classList.remove('dark')
        localStorage.setItem('user_theme','light')
    }else{
        document.body.classList.remove('light')
        document.body.classList.add('dark')
        localStorage.setItem('user_theme','dark')
    }
    
}
//USER THEME
let user_theme = localStorage.getItem('user_theme');
if(user_theme == 'light'){
    document.body.classList.add('light')
    document.body.classList.remove('dark')
    btnTheme.classList.remove('active');
}
//MENU
menuBtn.onclick = () =>{
    let close = document.querySelector('.close');
    let container = document.querySelector('.container');
    //OPEN
    if(close){
        close.remove();
        menuBtn.classList.toggle('active');
        return menu.classList.toggle('open');
    //CLOSE
    }else{
        menuBtn.classList.toggle('active');
        menu.classList.toggle('open');
        let close = document.createElement('div');
        close.classList.add('close');
        container.appendChild(close);

        close.onclick = () => {
        menuBtn.classList.toggle('active');
        menu.classList.toggle('open');
        return close.remove()
        }
    } 
}



//LOAD COUNTER FROM LOCAL STORAGE
let loadKeys = Object.keys(localStorage)

//FILTER KEYS
let keys = loadKeys.filter(function(str) {
    
    return !isNaN(str);
})

if(keys.length == 0){
    //update button
    menuButton();
}else{
    for(let i = 0; i < keys.length; i++){
        let card = localStorage.getItem(keys[i]);
        let div = document.createElement('div');
        div.classList.add('card');
        div.id = keys[i];
        
        //ADD AWESOME COLOR
        div.style.background = eval('bg' + menuPicker);
        if(menuPicker == 5){
            menuPicker = 0;
        }else{
            menuPicker++;
        }

        div.innerHTML = card;
        cardBox.appendChild(div)

        //CHECK NUM OVERFLOW
        let num = document.querySelectorAll('.numberCount');
        overflowNum(num[i].textContent, num[i].parentNode);
    }
    menuButton();
}

//COUNTER SETTING
let max = 1;
let min = 1;

//BUTTON FUNCTION
function updateButtonCounter(){
    
    //UPDATE VAR
    display = document.querySelectorAll('.display');
    label = document.querySelectorAll('.label');
    result = document.querySelectorAll('.result');
    plus = document.querySelectorAll('.btnPlus');
    minus = document.querySelectorAll('.btnMinus');
    input = document.querySelectorAll('.input');
    del = document.querySelectorAll('.del');
    save = document.querySelectorAll('.save');

    for(let i = 0;i < display.length; i++){

        plus[i].onclick = () => {
            result[i].value = Number(result[i].value) + max;
            return overflowNum(result[i].value, result[i]);
        }
           
        minus[i].onclick = () => {
            result[i].value -= min;
            return overflowNum(result[i].value, result[i]);
        }
    
        result[i].onclick = () => input[i].select();

        result[i].oninput = () => overflowNum(result[i].value, result[i]);
            
        label[i].onclick = () => label[i].select();
            
        del[i].onclick = () => {

            if(index == 0){
            //RESET
            result[i].value = 0;
            label[i].value = 'MY COUNT';
            }else{
            
            del[i].parentNode.parentNode.remove();
            index--;
            return check();
            }
        };
    
        save[i].addEventListener('click', (event) => {
            event.preventDefault();
            event.stopImmediatePropagation();
            let labelValue = label[i].value;
            let numberValue = result[i].value;
            saveCount(labelValue, numberValue);
        });
    }
}
//START BUTTON FUN
updateButtonCounter();

//CHECK IF NUM LENGHT > 5
function overflowNum(num, ele) {
    if(num.length > 5){
        if(ele.classList.contains('overFive')){
            //NOTHING
        }else{
            ele.classList.add('overFive')
            //LESS FONT SIZE
        }
        
    }else if(num.length <= 5){
        ele.classList.remove('overFive')
    }
}

//ADD NEW COUNTER
btnAdd.onclick = () =>{

//clone counter
let display = document.querySelectorAll('.display');
let addCount = display[index].cloneNode(true);
display[index].insertAdjacentElement('afterend',addCount);
//UPDATE
display = document.querySelectorAll('.display');
updateButtonCounter()
index++;
check();
//ADD BG COLOR
if(picker == 5){
    picker = 0;
}else{
    picker++;
}
display[index].style.background = eval('bg' + picker);
display[index].classList.add('new');//ADD ANIMATION
//NEW COUNTER SET
result[index].value = '0';
label[index].value = 'my count ' + display.length;
if(label[index].value == label[index - 1].value){
    console.log('yaaaaa')
    label[index].value = label[index - 1].value + '(1)';
}


}
//CHECK IF ONE COUNTER
function check() {

    if(index == 0){
        for(let i = 0; i < display.length; i++){
            del[i].classList.add('refresh')
            del[i].innerHTML = `<span class="iconify" data-icon="mdi:refresh" data-inline="true"></span>`;
        }
    }
    if(index == 1) {
        let refresh = document.querySelector('.refresh');
        if(!refresh){
            //nothing
        }else{
            for(let i = 0; i < display.length; i++){
            
            del[i].classList.remove('refresh')
            del[i].innerHTML = `<span class="iconify" data-icon="mdi:close" data-inline="true"></span>`;
        }
        }
        
    }
}
check();
//SAVE
function saveCount(x,y) {
    let lValue =  x;
    let nValue = y;
    //HTML TO STRING
    let loadCard = `<span class='date'>${today()}</span>
    <div class="countBox">
    <span class='labelCount'>${lValue}</span>
    <span class='colon'>:</span>
    <span class='numberCount'>${nValue}</span>
    </div>
    <div class="cardBtnBox">
        <div class="cardBtn cardEdit"><span class="iconify" data-icon="feather:edit-2" data-inline="true"></span></div>
        <div class="cardBtn cardDel"><span class="iconify" data-icon="mdi:trash-can-outline" data-inline="true"></span></div>
    </div>`;
    
    localStorage.setItem(id(), loadCard);
    return addCount(id());
}
//PUT SAVED COUNT INTO MENU
function addCount(key){

    let card = localStorage.getItem(key);
    let div = document.createElement('div');
    div.classList.add('card');
    div.id = key;

    //ADD BG COLOR
    div.style.background = eval('bg' + menuPicker);

    if(menuPicker == 5){
        menuPicker = 0;

    }else{
        menuPicker++;
    }

    div.innerHTML = card;
    cardBox.appendChild(div);

    //UPDATE BUTTON
    return menuButton();
}
//MENU BUTTON FUNCTION
function menuButton(){
    //UPDATE VAR
    card = document.querySelectorAll('.card');
    editBtn = document.querySelectorAll('.cardEdit');
    delBtn = document.querySelectorAll('.cardDel');
    //CARD BUTTON
    for(let i = 0; i < card.length; i++){
        
        let _card = editBtn[i].parentNode.parentNode;
        let labelValue = editBtn[i].parentNode.parentNode.querySelector('.labelCount').textContent;
        let numberValue = editBtn[i].parentNode.parentNode.querySelector('.numberCount').textContent;
        
        editBtn[i].onclick = () => editCount(labelValue,numberValue);
            
        delBtn[i].onclick = () => {
            _card.remove();
            return localStorage.removeItem(_card.id);
        }
        //CHECK NUM OVERFLOW
        let num = document.querySelectorAll('.numberCount');
        overflowNum(num[i].textContent, num[i].parentNode);
    }
};

function editCount(name,num){

    let addCount = display[index].cloneNode(true);
    display[index].insertAdjacentElement('afterend',addCount);
    //update variables
    display = document.querySelectorAll('.display');

    //UPDATE BUTTON
    updateButtonCounter();
    index++;
    check();

    //COUNTER BG COLOR
    if(picker == 5){
        picker = 0;
    }else{
        picker++;
    }
    display[index].style.background = eval('bg' + picker)
    //NEW COUNTER SET
    result[index].value = num;
    //CHECK IF NUM OVERFLOW
    overflowNum(num, result[index]);
    
    return label[index].value = name;
    
}

//SETTING COUNTER
function lowerButton(){

minusMin.onclick = () => {
    if(min == 1){
        //nothing here
    }else{
        min--;
        return minValue.value = min;
    }
}
plusMin.onclick = () => {
    if(min == 9999){
        //nothing here
    }else{
        min++;
        return minValue.value = min;
    }
}
minusMax.onclick = () => {
    if(max == 1){
        //nothing here
    }else{
        max--;
        return maxValue.value = Number(max);
    }
}
plusMax.onclick = () => {
    if(max == 9999){
        //nothing here
    }else{
        max++;
        return maxValue.value = Number(max);
    }
}
minValue.onclick = () => minValue.select();

maxValue.onclick = () =>  maxValue.select();

}

lowerButton()


//IF TRY TO SET VALUE < 1
minValue.oninput = () => {
    if(minValue.value < 1){
       return minValue.value = 1;
    }else{
        return min = Number(minValue.value);
    }
}

maxValue.oninput = () => {
    if(maxValue.value < 1){
        return maxValue.value = 1;
    }else{ 
        return max = Number(maxValue.value);
    }
}

//TIME
function today() {
let today = new Date();
let dd = today.getDate();
let mm = today.getMonth()+1; 
const yyyy = today.getFullYear();
if(dd<10) 
{
    dd=`0${dd}`;
} 

if(mm<10) 
{
    mm=`0${mm}`;
} 
return today = `${dd}/${mm}/${yyyy}`;    
}
//ID FOR LOCAL STORAGE
function id() {
let today = new Date();
let dd = today.getDate();
let mm = today.getMonth()+1;
let h = today.getHours();
let m = today.getMinutes();
let s = today.getSeconds();
const yyyy = today.getFullYear();
    if(dd<10) 
    {
        dd=`0${dd}`;
    } 
    
    if(mm<10) 
    {
        mm=`0${mm}`;
    }
    if(h<10) 
    {
        h=`0${h}`;
    }
    if(m<10) 
    {
        m=`0${m}`;
    }
    if(s<10) 
    {
        s=`0${s}`;
    }  
return today = `${dd}${mm}${yyyy}${h}${m}${s}`;    
}
