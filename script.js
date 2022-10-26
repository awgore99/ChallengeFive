// Array of objects to represent each hour of the day to iterate through
var myDay = [
    {
        id: "0",
        hour: "06",
        time: "06",
        am_pm: "am",
        reminder: ""
    },
    {
        id: "1",
        hour: "07",
        time: "07",
        am_pm: "am",
        reminder: ""
    },
    {
        id: "2",
        hour: "08",
        time: "08",
        am_pm: "am",
        reminder: ""
    },
    {
        id: "3",
        hour: "09",
        time: "09",
        am_pm: "am",
        reminder: ""
    },
    {
        id: "4",
        hour: "10",
        time: "10",
        am_pm: "am",
        reminder: ""
    },
    {
        id: "5",
        hour: "11",
        time: "11",
        am_pm: "am",
        reminder: ""
    },
    {
        id: "6",
        hour: "12",
        time: "12",
        am_pm: "pm",
        reminder: ""
    },
    {
        id: "7",
        hour: "01",
        time: "13",
        am_pm: "pm",
        reminder: ""
    },
    {
        id: "8",
        hour: "02",
        time: "14",
        am_pm: "pm",
        reminder: ""
    },
    {
        id: "9",
        hour: "03",
        time: "15",
        am_pm: "pm",
        reminder: ""
    },
    {
        id: "10",
        hour: "04",
        time: "16",
        am_pm: "pm",
        reminder: ""
    },
    {
        id: "11",
        hour: "05",
        time: "17",
        am_pm: "pm",
        reminder: ""
    },
    {
        id: "12",
        hour: "06",
        time: "18",
        am_pm: "pm",
        reminder: ""
    },
    {
        id: "13",
        hour: "07",
        time: "19",
        am_pm: "pm",
        reminder: ""
    },
    {
        id: "14",
        hour: "08",
        time: "20",
        am_pm: "pm",
        reminder: ""
    },
    {
        id: "15",
        hour: "09",
        time: "21",
        am_pm: "pm",
        reminder: ""
    },
    
]

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