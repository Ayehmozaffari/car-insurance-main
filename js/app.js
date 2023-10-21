// Variables
const form = document.querySelector('#request-quote')
//use config for prices

const config = {
    base : 2000000,
    price :0,
    pride: 1.15,
    optima:1.30,
    porsche : 1.80,
    basic : 1.3,
    complete : 1.5

}
// addEventListner
document.addEventListener('DOMContentLoaded', afterLoad)
document.addEventListener('submit', submitForm)


// Functions
//  this function will load after you reload the page👩🏻
function afterLoad() {
    displayYears()
}
// submit form
function submitForm(e) {
    e.preventDefault();
    
    // validation form function
    
    const make = document.querySelector('#make').value
    const year = document.querySelector('#year').value
    const level = document.querySelector('input[name="level"]:checked').value

    const newInfo={
        make: make,
        year: year,
        level: level    }
    // validationForm(make, year, level)
     return newInfo   
   
}
// function for validation : when you click on submit button it will be red if the inputs wouldn't empty
function validationForm(make, year, level){
     // read value from the form
 
     // check the value of fields are correct
     if (make === '' || year === ''|| level === '' ) {
         displayMsg('لطفا مقادیر فرم را با دقت وارد نمایید')
     } else {
       
        insuranceCase(make , year , level)
     }
}

// getINformation : This function will give information 
function insuranceCase(make , year , level){
       // STEP1: get info
       
       let info = {
        make: make,
        year: year,
        level: level
    }

    // STEP2: calculate
    calculatePrice(info)
    showResults()
   
}
// calculatePrice : calculate the insurance price whenever you choose the year and insurance type
function calculatePrice(info) {
    let price = config.price, base = config.base

    // + Calculate Make 
    /* 
    make:1      =>      1.15
    make:2      =>      1.30
    make:3      =>      1.80
    */
    const make = info.make
    switch (make) {
        case "1":
            price = base * config.pride
            break;
        case "2":
            price = base * config.optima
            break;
        case "3":
            price = base * config.porsche
            break;
    }
    
    const year = info.year


    // + Calculate Year
    // get the year

    // 3% cheaper for each year
    price = price - ((findYear(year) * 3) / 100) * price
    console.log(price);


    // + get the level
    const level = info.level
    price = calculateLevel(level , price)
}
// findYear : it will find the now year in this function  
function findYear(year){
    

    // get max year
    const now = new Date().toLocaleDateString('fa-IR')
    // slice the date to just year example : 2006 / 1402
    let nowYear = now.slice(0, 4)
    let max = fixNumbers(nowYear)
    year = max - year
    return year
}
// calculateLevel : it will calculate the level of the insurance by choosing the right one
function calculateLevel(level , price){
    /*
        basic   =>  increase 30%
        complete=>  increase 50%
    */

    if (level == 'basic'){
        price = price * config.base
    }else{
        price = price * config.complete
    }

    return price
}


// User Interface (UI) Functions


// Display message box
// displayMsg : it will show the error text when you put the input empty 
function displayMsg(msg) {
    // create message box
    const messageBox = document.createElement('div');
    messageBox.classList = 'error'
    messageBox.innerText = msg

    // show message
    form.insertBefore(messageBox, document.querySelector('.form-group'))

    // remove message box
    setTimeout(() => {
        document.querySelector('.error').remove()
    }, 5000)
}

// Show Years
function displayYears() {
    // Convert to number
    fixNumbers();


    //  show the default text to the form 
    defaultText()
    // create for loop for making option tag
    makeOption()
}
//make the persian number to english with this function
function fixNumbers(str){
    let
    persianNumbers = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g],
    arabicNumbers = [/٠/g, /١/g, /٢/g, /٣/g, /٤/g, /٥/g, /٦/g, /٧/g, /٨/g, /٩/g]

        if (typeof str === 'string') {
            for (var i = 0; i < 10; i++) {
                str = str.replace(persianNumbers[i], i).replace(arabicNumbers[i], i);
            }
        }
        return parseInt(str);
    }
//makeOption : it will make the option tag for you to choose your car year 
function makeOption(){
    // get now years
    let curentYear = new Date().toLocaleDateString('fa-IR')

    // Slice date
    curentYear = curentYear.slice(0, 4)
    
    // get max year
    let maxYear = fixNumbers(curentYear)
    
    // get min year
    let minYear = maxYear - 20  
    // create for loop for making option tag
    for (let i = maxYear; i >= minYear; i--) {
        // create option tag
        const optionTag = document.createElement('option')
        optionTag.value = i;
        optionTag.innerText = `سال ${i}`;
        const selectYear = document.querySelector('#year')
        // append option to the selectYear
        selectYear.appendChild(optionTag)
    }
}


// it will show you the default text for year form input 
function defaultText(){
        // access to the select tag
        const selectYear = document.querySelector('#year')
        // create first option tag for title
        // create option tag
        const optionTag = document.createElement('option')
        optionTag.innerText = `- انتخاب -`;
        optionTag.value = ''
    // enter option to the selectYear
    selectYear.appendChild(optionTag)
}
function showResults(price,info) {
    //acsess to the div  result
    const result=document.querySelector("#result")
    //creating div for results
    const div= document.createElement('div')
    //template for show result
    let make=make.info
    switch(make){
        case'1':
        make="پراید"
        break;
        case'2':
        make='اپتیما'
        break;
        case'3':
        make='پورشه'
       break;
    }
    let level=info.level
    
    if(level=='basic'){
        level='ساده'
       
    }else{
        level='کامل'
    }

    let make2=document.querySelector('#make').textContent()
    div.innerHTML=`<div>
    <p class="header">خلاصه فاکتور</p>
    <p>مدل ماشین: ${make}</p>
    <p>سال ساخت:${year}</p>
    <p>نوع بیمه: ${level}</p>
    <p>قیمت:${price}</p>
  </div>
</div>`
const spinner=document.querySelector('#loading img')
spinner.style.display='block'
setTimeout(()=>{
  spinner.style.display='none';
  result.appendChild(div)

}
,3000);
}


//oop
class Interface{
    constructor(){

    }
    //methods
     displayMsg(msg) {
        // create message box
        const messageBox = document.createElement('div');
        messageBox.classList = 'error'
        messageBox.innerText = msg
    
        // show message
        form.insertBefore(messageBox, document.querySelector('.form-group'))
    
        // remove message box
        setTimeout(() => {
            document.querySelector('.error').remove()
        }, 5000)
    }
    
    // Show Years
     displayYears() {
        // Convert to number
        fixNumbers();
    
    
        //  show the default text to the form 
        defaultText()
        // create for loop for making option tag
        makeOption()
    }
    //make the persian number to english with this function
    fixNumbers(str){
        let
        persianNumbers = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g],
        arabicNumbers = [/٠/g, /١/g, /٢/g, /٣/g, /٤/g, /٥/g, /٦/g, /٧/g, /٨/g, /٩/g]
    
            if (typeof str === 'string') {
                for (var i = 0; i < 10; i++) {
                    str = str.replace(persianNumbers[i], i).replace(arabicNumbers[i], i);
                }
            }
            return parseInt(str);
        }
    //makeOption : it will make the option tag for you to choose your car year 
     makeOption(){
        // get now years
        let curentYear = new Date().toLocaleDateString('fa-IR')
    
        // Slice date
        curentYear = curentYear.slice(0, 4)
        
        // get max year
        let maxYear = fixNumbers(curentYear)
        
        // get min year
        let minYear = maxYear - 20  
        // create for loop for making option tag
        for (let i = maxYear; i >= minYear; i--) {
            // create option tag
            const optionTag = document.createElement('option')
            optionTag.value = i;
            optionTag.innerText = `سال ${i}`;
            const selectYear = document.querySelector('#year')
            // append option to the selectYear
            selectYear.appendChild(optionTag)
        }
    }
    
    
    // it will show you the default text for year form input 
    defaultText(){
            // access to the select tag
            const selectYear = document.querySelector('#year')
            // create first option tag for title
            // create option tag
            const optionTag = document.createElement('option')
            optionTag.innerText = `- انتخاب -`;
            optionTag.value = ''
        // enter option to the selectYear
        selectYear.appendChild(optionTag)
    }
   showResults(price,info) {
        //acsess to the div  result
        const result=document.querySelector("#result")
        //creating div for results
        const div= document.createElement('div')
        //template for show result
        let make=make.info
        switch(make){
            case'1':
            make="پراید"
            break;
            case'2':
            make='اپتیما'
            break;
            case'3':
            make='پورشه'
           break;
        }
        let level=info.level
        
        if(level=='basic'){
            level='ساده'
           
        }else{
            level='کامل'
        }
    
        let make2=document.querySelector('#make').textContent()
        div.innerHTML=`<div>
        <p class="header">خلاصه فاکتور</p>
        <p>مدل ماشین: ${make}</p>
        <p>سال ساخت:${year}</p>
        <p>نوع بیمه: ${level}</p>
        <p>قیمت:${price}</p>
      </div>
    </div>`
    const spinner=document.querySelector('#loading img')
    spinner.style.display='block'
    setTimeout(()=>{
      spinner.style.display='none';
      result.appendChild(div)
    
    }
    ,3000);
    }
    
}
//process-oop
class Process{
    constructor(newInfo){
        this.newInfo=newInfo
      }
    
     validationForm(make, year, level){
        // read value from the form
    
        // check the value of fields are correct
        if (make === '' || year === ''|| level === '' ) {
            displayMsg('لطفا مقادیر فرم را با دقت وارد نمایید')
        } else {
          
           insuranceCase(make , year , level)
        }
   }
   
   // getINformation : This function will give information 
   insuranceCase(make , year , level){
          // STEP1: get info
          
          let info = {
           make: make,
           year: year,
           level: level
       }
   
       // STEP2: calculate
       calculatePrice(info)
       showResults()
      
   }
   // calculatePrice : calculate the insurance price whenever you choose the year and insurance type
   calculatePrice(info) {
       let price = config.price, base = config.base
   
       // + Calculate Make 
       /* 
       make:1      =>      1.15
       make:2      =>      1.30
       make:3      =>      1.80
       */
       const make = info.make
       switch (make) {
           case "1":
               price = base * config.pride
               break;
           case "2":
               price = base * config.optima
               break;
           case "3":
               price = base * config.porsche
               break;
       }
       
       const year = info.year
   
   
       // + Calculate Year
       // get the year
   
       // 3% cheaper for each year
       price = price - ((findYear(year) * 3) / 100) * price
       console.log(price);
   
   
       // + get the level
       const level = info.level
       price = calculateLevel(level , price)
   }
   // findYear : it will find the now year in this function  
    findYear(year){
       
   
       // get max year
       const now = new Date().toLocaleDateString('fa-IR')
       // slice the date to just year example : 2006 / 1402
       let nowYear = now.slice(0, 4)
       let max = fixNumbers(nowYear)
       year = max - year
       return year
   }
   // calculateLevel : it will calculate the level of the insurance by choosing the right one
    calculateLevel(level , price){
       /*
           basic   =>  increase 30%
           complete=>  increase 50%
       */
   
       if (level == 'basic'){
           price = price * config.base
       }else{
           price = price * config.complete
       }
   
       return price
   }
   
   
   // User Interface (UI) Functions
   
   

}
let firstUser= new Process(submitForm())
console.log(submitForm());