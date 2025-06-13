
class weather{
    constructor()
    {
        this.name=document.querySelector("h2");
        this.temp=document.querySelector(".deg");
        this.input=document.querySelector("input");
        this.one=document.querySelector(".one");
        this.days=document.querySelectorAll(".day");
        this.expands=document.querySelectorAll
        this.activate_listeners();
       this.getWeather("riyadh");
    }
    async getWeather(location)
    {
        try{
        location=location.toLowerCase();
        let deg=document.querySelector(".deg");
        let weekdays=document.querySelectorAll(".weekday");
        let temps=document.querySelectorAll(".temp");
        let images=document.querySelectorAll(".day>img");
        let response=await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=F69B2UKQ3F6SESFE49UKXFJM4&contentType=json`);
       let data=await response.json();
       deg.innerHTML=`${((data.currentConditions.temp-30)/1.8).toFixed(2)}&degC`;
       data.days.forEach((day,index) =>
    {
        if(index<7)
        {
        let date=day.datetime;
        date=new Date(date);
        weekdays[index].textContent=days(date.getDay());
        temps[index].innerHTML=`${((day.temp-30)/1.8).toFixed(2)}&degC`;
        images[index].src=icons(day.icon);
        }
    })
       console.log(data);
       this.name.textContent=data.resolvedAddress;
       this.input.value=location; 
        }
    catch(error)
    {
        console.log("whyyyy");
        this.input.classList.add("invalid");
    }}
    activate_listeners()
    {
    this.days.forEach(day =>
    {
        let img=day.querySelector("img");
        day.addEventListener("click",()=>
        {
            img.classList.toggle("image_animate");
        })
    }
    )
    this.input.addEventListener("keydown",(event)=>
    {
        if(event.key==="Enter")
        {
            if(this.input.value)
            {
                this.getWeather(this.input.value);
            }
            else{
                alert("enter a valid location");
            }
        }
    })
    this.input.addEventListener("input",()=>
    {
        this.input.classList.remove("invalid");
    })

}
}
let cast=new weather();

function days(num)
{
    let weekday=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    return weekday[num];
}
function icons(icon)
{
     const iconMap = {
       "clear-day": "Sunny.svg",
        "clear-night": "night.svg",
        "rain": "rainy.svg",
        "snow": "snow.svg",
        "sleet": "sleet.svg",
        "wind": "wind.svg",
        "fog": "fog.svg",
        "cloudy": "cloudy.svg",
        "partly-cloudy-day": "partly-cloudy.svg",
        "partly-cloudy-night": "partly-cloudy-night.svg",
        "thunder-rain": "thunderstorm.svg",
        "thunder-showers": "thunder.svg",
        "hail": "hail.svg",
        "showers-day": "showers-day.svg",
        "showers-night": "showers-night.svg"
    };
    return iconMap[icon];
}
