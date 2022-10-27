// Array of objects to represent each hour of the day to iterate through
import * as chooseName from './myDayArray.js';
var myDay = chooseName.myDay;
// gets the current date to append to the top of the page
function getCurrentDate() {
    var currentDate = moment().format('dddd, MMMM Do');
    $("#currentDay").text(currentDate);
}

//Calls function to display date to the page
getCurrentDate();

// saves data to localStorage
function saveReminders() {
    localStorage.setItem("myDay", JSON.stringify(myDay));
}

// appends data in localStorage to the page
function displayReminders() {
    myDay.forEach(function (selectedHour) {
        $(`#${selectedHour.id}`).val(selectedHour.reminder);
    })
}

//function to call saveReminders() and displayReminders(), and check that 'myDay' stored locally correctly with information
function runReminders() {
    var desiredDay = JSON.parse(localStorage.getItem('myDay'));
    //checks that desiredDay populated with information
    if (desiredDay){
        myDay = desiredDay;
    }
    saveReminders();
    displayReminders();
}

//function to create and append rows and information to the page
myDay.forEach(function(selectedHour) {
    // creates rows to append the information to
    var hourRow = $("<form>").attr({
        "class": "row"
    });
    $(".container").append(hourRow);

    // creates space for each hour and timestamp in the grid
    var hourField = $("<div>")
        .text(`${selectedHour.hour}${selectedHour.am_pm}`)
        .attr({
            "class": "col-md-2 hour"
    });
    // creates field to append text to populate the page
    var hourReminder = $("<div>")
        .attr({
            "class": "col-md-9 description p-0"
        });
    // sets reminderData to whatever the user inputed for the reminder
    var reminderData = $("<textarea>");
    // appends the text to the actual container to be manipulated by styling
    hourReminder.append(reminderData);
    // sets the ID of each hour to the given ID in the myDay array
    reminderData.attr("id", selectedHour.id);
    // checks for the current time to update background color
    if (selectedHour.time < moment().format("HH")) {
        reminderData.attr ({
            "class": "past", 
        })
    } else if (selectedHour.time === moment().format("HH")) {
        reminderData.attr({
            "class": "present"
        })
    } else if (selectedHour.time > moment().format("HH")) {
        reminderData.attr({
            "class": "future"
        })
    }
    // creates save button for each element of the grid
    var saveButton = $("<i class='far fa-save fa-lg'></i>")
    var saveReminder = $("<button>")
        .attr({
            "class": "col-md-1 saveBtn"
    });
    //Adds the save button to the container
    saveReminder.append(saveButton);
    //Adds the specific information for each grid spot to the page
    hourRow.append(hourField, hourReminder, saveReminder);
})

runReminders();

// saves data with a button click
$(".saveBtn").addEventListener("click", function(event) {
    event.preventDefault();
    //Accesses the ID of each hour to save the reminder to
    var saveIndex = $(this).siblings(".description").children(".future").attr("id");
    //Uses the specific ID from the line prior, to save the text to the specific object corresponding with that ID
    myDay[saveIndex].reminder = $(this).siblings(".description").children(".future").val();
    //Logs the ID
    console.log(saveIndex);
    saveReminders();
    displayReminders();
})