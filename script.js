 
showDate()

const chk = document.getElementById('check')

chk.addEventListener('change', ()=>{
    document.body.classList.toggle('light')

    let rightArea = document.querySelector('.container .rigthArea')
    let card = document.querySelector('.card')
    rightArea.classList.toggle('light')
    card.classList.toggle('light')

})
 
 
 document.querySelector('.container .leftArea .search').addEventListener('submit', async (event)=>{
    event.preventDefault();


    let input = document.querySelector('#searchInput').value 

    if(input !== ''){

        clearInfo()
        showWarning('Carregando...')

        
        let results = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=
        ${encodeURI(input)}&units=metric&lang=pt_br&appid=8cf7c23adba79fe569db73ddd3e857c1`)

        let json = await results.json()
        console.log(json)

        if(json.cod === 200){
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                humidity: json.main.humidity,
                tempMax: json.main.temp_max,
                tempMin: json.main.temp_min,
                tempIcon: json.weather[0].icon,
                vent: json.wind.speed,
                windAngle: json.wind.angle,
                climate: json.weather[0].description,


            })
        } else {

            clearInfo()
            showWarning('Não encontramos esta localização')

        }
        
    } else {
        clearInfo()
    }
})

function showInfo(json){
    showWarning('')
    document.querySelector('.result').style.display = 'block'
    document.querySelector('.rigthArea h1').style.display = 'none'

    document.querySelector('.title').innerHTML = `${json.name} , ${json.country} `
    document.querySelector('.tempInfo').innerHTML = `${json.temp}<sup>ºC</sup>`
    document.querySelector('.windInfo').innerHTML = `${json.vent}<span>km/h</span>`
    document.querySelector('.humidity').innerHTML = `${json.humidity}`
    document.querySelector('.tempMax').innerHTML = `${json.tempMax}`
    document.querySelector('.tempMin').innerHTML = `${json.tempMin}`
    document.querySelector('.climate').innerHTML = `${json.climate}`
    
    showTime()

    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`)

    document.querySelector('.result').style.display = 'block'

    
    
    

}

 function showWarning(msg){
    document.querySelector('.warning').innerHTML = msg
} 

function clearInfo(){
    showWarning('')
    document.querySelector('.result').style.display = 'none'

}


function showTime(){
    let day = new Date()
    let h = day.getHours()
    
    
    if(h > 6 && h < 18) {

        document.querySelector('.hourDay').innerHTML = 'Tenha um bom dia!'
        
    } else {
        document.querySelector('.hourDay').innerHTML = 'Tenha uma boa noite!'
    }

} 




function showDate() {
    let day = new Date();
    let d = day.getDate();
    let m = day.getMonth();
    let y = day.getFullYear();
    let txt = `${d} / ${m} / ${y}`
 
    document.querySelector('.leftArea .date').innerHTML = txt
}


