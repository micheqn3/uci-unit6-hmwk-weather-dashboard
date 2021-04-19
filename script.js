var searchBtn = $(".searchBtn"); // Targets the search button 
var inputForm = $(".inputForm"); // Targets the input box 
var citySpan = $(".citySpan"); // Targets the location for city
var dateSpan = $(".dateSpan"); // Targets the location for current date 
var tempSpan = $(".tempSpan"); // Targets the location for temperature
var humiditySpan = $(".humiditySpan"); // Targets the location for temperature
var windSpan = $(".windSpan"); // Targets the location for temperature
var uvSpan = $(".uvSpan"); // Targets the location for temperature
var day1 = $(".day1"); // Targets day 1 card
var day1Icon = $(".day1Icon");
var day1Temp = $(".day1Temp");
var day1Humidity = $(".day1Humidity"); 
var day2 = $(".day2"); // Targets day 2 card
var day2Icon = $(".day2Icon");
var day2Temp = $(".day2Temp");
var day2Humidity = $(".day2Humidity");
var day3 = $(".day3"); // Targets day 3 card
var day3Icon = $(".day3Icon");
var day3Temp = $(".day3Temp");
var day3Humidity = $(".day3Humidity");
var day4 = $(".day4"); // Targets day 4 card
var day4Icon = $(".day4Icon");
var day4Temp = $(".day4Temp");
var day4Humidity = $(".day4Humidity");
var day5 = $(".day5"); // Targets day 5 card
var day5Icon = $(".day5Icon");
var day5Temp = $(".day5Temp");
var day5Humidity = $(".day5Humidity");
var welcomeText = $(".welcomeText"); // Targets the welcome title
var containerBlock = $(".containerBlock"); // Targets the container holding the 5 day forecast
var card = $(".card") // Targets the main card holding the city/date info
var historyList = $(".history-list") // Targets the search history

$( document ).ready(function() {
    containerBlock.hide(); // Hide the forecast container on page load
    card.hide(); // Hide the city name/date on page load
    
});

function getUserInput(event) { // This function retrieves user input and creates a url endpoint with that info
    event.preventDefault();
    console.log("Button clicked works"); // Checking if button was clicked
    var userInput = inputForm.val().trim(); // Saves the user's input and removes whitespace
    inputForm.val(""); // Clears the input form 

    if (userInput) { // Checking if the user entered something
        console.log(userInput); // Checking if user's input was saved 
        var cityUrl = "http://api.openweathermap.org/data/2.5/forecast?q=" + userInput + "&units=imperial&appid=bcb03c4915d5966190a74c259d6834d8";
        appendItems(cityUrl);   // Start the appendItems function with the user input. API parameter = imperial for fahrenheit
    } else {
        alert("Please enter in a city.");  // Validation for if the user doesn't enter in anything 
    };
};

function appendItems(cityUrl) {
    console.log(cityUrl); // Checking
    fetch(cityUrl)
        .then(function(response) {
            if(response.ok) {
                console.log("Fetch response worked"); // Checking if response was okay
                return response.json(); // Return response as JSON
            } else {
                alert("Please enter a valid city name."); // If user did not enter a valid city, an alert will pop up 
            }
        })
        .then(function(data) { // Do this to the data
            console.log(data);
            /*  ********* UV Index  */
            welcomeText.hide(1000); // Hide the welcome text
            containerBlock.show(2000); // Show the forecast container
            card.show(); // Show the city name/date
            var cityName = data.city.name; // Accesses the city's name 
            var country = data.city.country; // Accesses the country 
            var date = moment.unix(data.list[0].dt).format("MMMM YY"); // Converts to current date in city
            var temp = data.list[0].main.temp; // Temperature in fah. Can use this again for day 1 temp below.
            var humidity = data.list[0].main.humidity; // Humidity in %
            var wind = data.list[0].wind.speed; // Wind speed in m/hour
            citySpan.text(`${cityName}, ${country}`); // Filling the spans with the data
            dateSpan.text(date);
            tempSpan.text(temp);
            humiditySpan.text(humidity);
            windSpan.text(wind);

            /* Goes through 0, 8, 16, 24, 32 for next day's data */ 
            var icon1 = data.list[0].weather[0].icon; // Day 1 Forecast
            var iconUrl1 = "http://openweathermap.org/img/w/" + icon1 + ".png";
            day1.text("TODAY"); // Same as the main card
            day1Icon.attr("src", iconUrl1);
            day1Temp.text(temp); // Same as the main card

            var icon2 = data.list[8].weather[0].icon; // Day 2 Forecast
            var iconUrl2 = "http://openweathermap.org/img/w/" + icon2 + ".png";
            var date2 = moment.unix(data.list[8].dt).format("dddd");
            day2.text(date2);
            day2Icon.attr("src", iconUrl2);
            var date2Temp = data.list[8].main.temp; 
            day2Temp.text(date2Temp);

            var icon3 = data.list[16].weather[0].icon; // Day 3 Forecast
            var iconUrl3 = "http://openweathermap.org/img/w/" + icon3 + ".png";
            var date3 = moment.unix(data.list[16].dt).format("dddd");
            day3.text(date3);
            day3Icon.attr("src", iconUrl3);
            var date3Temp = data.list[16].main.temp; 
            day3Temp.text(date3Temp);

            var icon4 = data.list[24].weather[0].icon; // Day 4 Forecast
            var iconUrl4 = "http://openweathermap.org/img/w/" + icon4 + ".png";
            var date4 = moment.unix(data.list[24].dt).format("dddd");
            day4.text(date4);
            day4Icon.attr("src", iconUrl4);
            var date4Temp = data.list[24].main.temp; 
            day4Temp.text(date4Temp);

            var icon5 = data.list[32].weather[0].icon; // Day 5 Forecast
            var iconUrl5 = "http://openweathermap.org/img/w/" + icon5 + ".png";
            var date5 = moment.unix(data.list[32].dt).format("dddd");
            day5.text(date5);
            day5Icon.attr("src", iconUrl5);
            var date5Temp = data.list[32].main.temp; 
            day5Temp.text(date5Temp);

            var storeObject = {
                "cityName": cityName,
                "country": country,
                "date": date, 
                "temp": temp,
                "humidity": humidity,
                "wind": wind, 
                "iconUrl1": iconUrl1,
                "iconUrl2": iconUrl2,
                "date2": date2,
                "date2Temp": date2Temp,
                "iconUrl3": iconUrl3,
                "date3": date3,
                "date3Temp": date3Temp,
                "iconUrl4": iconUrl4,
                "date4": date4,
                "date4Temp": date4Temp,
                "iconUrl5": iconUrl5,
                "date5": date5,
                "date5Temp": date5Temp,
            }
            var items = localStorage.getItem("items");
            if (items === null) {
                items = [];
            } else {
                items = JSON.parse(items);
            }
            items.push(storeObject); // Push the object into the array
            var allItems = JSON.stringify(items);
            localStorage.setItem("items", allItems); // Save allItems into local storage
        });            
};

function showHistoryBtn() {
    var items = localStorage.getItem("items");
    items = JSON.parse(items);

    if (items !== null) {
        var counter = items.length - 1; // This will count the actual number of items in the object

        for (var i = 0 ; i <= counter ; i++ ) {
            var button = $("<button>");
            button.addClass("list-group-item");
            button.text(items[i].cityName);
            button.attr("name", items[i].cityName);
            historyList.append(button);
        }
    } else {
        console.log("Empty local storage.");
    }
}

function showHistoryData(e) {
    e.preventDefault;
    welcomeText.show(1000); // Show the welcome text
    containerBlock.show(2000); // Show the forecast container
    card.show(1000); // Show the main city/date card
    var items = localStorage.getItem("items");
    items = JSON.parse(items);
    var nameOfCity = e.target.getAttribute("name");
    var obj =items.find(i => i.cityName === nameOfCity); //  Finds the array in the object that matches city name
    
    citySpan.text(obj.cityName); // Fills the screen with the data of the city clicked on 
    dateSpan.text(obj.date);
    tempSpan.text(obj.temp);
    humiditySpan.text(obj.humidity);
    windSpan.text(obj.wind);
    day1.text("TODAY");
    day1Icon.attr("src", obj.iconUrl1);
    day1Temp.text(obj.temp); 
    day2.text(obj.date2);
    day2Icon.attr("src", obj.iconUrl2);
    day2Temp.text(obj.date2Temp);
    day3.text(obj.date3);
    day3Icon.attr("src", obj.iconUrl3);
    day3Temp.text(obj.date3Temp);
    day4.text(obj.date4);
    day4Icon.attr("src", obj.iconUrl4);
    day4Temp.text(obj.date4Temp);
    day5.text(obj.date5);
    day5Icon.attr("src", obj.iconUrl5);
    day5Temp.text(obj.date5Temp);
}

showHistoryBtn(); // Show the recent searches on page load
historyList.on("click", showHistoryData) // When the user clicks the history button, show data on screen
searchBtn.on("click", getUserInput); // When the user clicks the search, this function will execute


