const selectOptionL= document.getElementById("selectFrom")
const selectOptionR = document.getElementById("selectTO")
const inputArea = document.querySelector(".inputTag")
const updateRate = document.querySelector("#updateRate")
const imgL = document.querySelector(".imgFrom")
const imgR = document.querySelector(".imgTo")

const addCountries = ()=>{
    for(let country in countryList){                 // using for in loop to iterate the object countryList
        let countryCode=country                      // assign country code like USD , INR  i.e provides key 

        let newOptionL = document.createElement("option")      // have to update the each dropDown seperately 
        let newOptionR= document.createElement("option") 

        newOptionL.value=newOptionR.value=countryCode
        newOptionL.innerText=newOptionR.innerText=countryCode

        selectOptionL.append(newOptionL)
        selectOptionR.append(newOptionR)
    }
    
    // ByDefault sets the both the dropdowns
    selectOptionL.value="USD";       
    selectOptionR.value="INR";
}

const exchangeRate = async ()=>{

        // parseFloat is used to convert string into floating number 
        const userAmt = parseFloat(inputArea.value) // Amount entered by the user 
    
        const leftOption = selectOptionL.value     // left currency 
        const rightOption = selectOptionR.value    // right currency 
        
        var response = await fetch(`https://api.exchangerate-api.com/v4/latest/${leftOption}`)    
        let data = await response.json()            // converting json into actual js object
            
        // in data object there is a rates object which include exchange rates for all currencies , so to access the exchange rate which is value we have to access it by object key 
        const conversionRate = data.rates[rightOption]
        console.log(conversionRate)
        
        // toFixed considers only 2 numbers after the decimal point
        const convertedAmt = (userAmt*conversionRate).toFixed(2) 
        updateRate.innerHTML=`1 ${leftOption}=${conversionRate} ${rightOption} <br> Converted Rate = ${convertedAmt}`
    
}

const updateFlagLeft =(countryCode)=>{
    let newSrc = `https://flagsapi.com/${countryList[countryCode]}/flat/64.png`;
    imgL.src=newSrc
}
const updateFlagRight =(countryCode)=>{
    let newSrc = `https://flagsapi.com/${countryList[countryCode]}/flat/64.png`;
    imgR.src=newSrc
}

addCountries()                                               

inputArea.addEventListener("input",exchangeRate)              // it calculates for individual input 

window.addEventListener("load",exchangeRate)                 // when window loads shows defualt US TO INR

selectOptionL.addEventListener("change",(event)=>{          // when change left currency 
    updateFlagLeft(event.target.value)
    exchangeRate();
})     

selectOptionR.addEventListener("change",(event)=>{          // when change right currency 
    updateFlagRight(event.target.value)
    exchangeRate();
})       