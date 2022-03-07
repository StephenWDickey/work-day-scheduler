// script file for work day scheduler
//////////////////////////////////////////////////////////////////

/* per the mock up our header should display current date */

/* per the mock up we have a series of container elements that are
color-coded based on the time */

/* these containers will range from 0900 to 1700 */

/* per the mockup when we click on one of these containers we should
be able to edit the text within */

/* we should be able to store the altered tasks via a save btn */



//////////////////////////////////////////////////////////////////
// let's start by defining some variables

// targets the div element that will hold data
var taskContainer = $(".container");

// we will add current date into header section
$("#currentDay").text(moment().format('dddd, MMMM Do'));

var savedTasks = new Array();

//////////////////////////////////////////////////////////////

var createDiv = function() {

    // for any index that is less than 9, we want to add 9
    for (var i=0; i<9; i++) {
        // create div element
        var newDiv = document.createElement("div");
        // give new division class name row
        newDiv.className = "row";
        // index will start at 9 not 0
        newDiv.id = i+9;
        taskContainer.append(newDiv);
    }

    // for any index that is between 9 and 5pm 
    for (var i=9; i<18; i++) {
        // displays hour
        currentHour = moment().format('HH')
        // creates input element
        var input = document.createElement("input");
        // id has 9 added to it
        var innerDiv = $("#" + i);
        // creates division
        var timeDiv = document.createElement("div");
        // assigns className, bootstrap sizing
        timeDiv.className = "col-1 hour";
        // assigns index a value of 9 or more
        timeDiv.id += i;
        // adds text content to time div, displays hour and month
        timeDiv.textContent = moment(i, ["HH.mm"]).format("h A");
        // applies data-* attributes to input element
        input.setAttribute("data-input-time-id", (i-9).toString());

        // if the current hour is greater than the index
        if (currentHour > i) {
            // label it as in the past
            input.className = "col-10 past";
        }
        // if the current index is equal to current hour then
        else if (currentHour == i) {
            // label it as present
            input.className = "col-10 present";
        }
        // if the current time index is not in the present or past
        else {
            input.className = "col-10 future";

        }

        // we will further specify className of input element
        // this will designate tasks as past, present or future tasks
        input.className = input.className + " task";

        // creates a division for saving task
        var saveDiv = document.createElement("div");
        // sets class name for division
        saveDiv.className = "col-1 saveBtn";
        // sets index for saveBtn
        saveDiv.id = i;

        // creates icon element
        var icon = document.createElement("i");
        // sets icon class name
        icon.className = "fa fa-save my-4 mx-1";
        // gives icon a data-* attribute
        icon.setAttribute("data-time-id", (i-9).toString());


        try {
            input.innerText = savedTasks.find( ({ timeID }) => timeID === (i-9).toString()).task;
        }
        catch {
            input.innerText = "";
        }



        // we must append these elements to their respective containers
        // attaches icon to save division
        saveDiv.append(icon);
        // attaches time division to container
        innerDiv.append(timeDiv);
        // attaches input element to container
        innerDiv.append(input);
        // attaches the save button to container
        innerDiv.append(saveDiv);


    }
};

//////////////////////////////////////////////////////////

// add event listener to taskContainer element, the icon part
// this will save our task in an array when we hit save button
$(".fa-save").on("click", "i", function() {
    // retrieves value of attribute
    var timeID = $(this).attr("data-time-id");
    var text = $("[data-input-time-id=${timeID}]").text();
    // we pass the timeID and text through the savedTasks array
    savedTasks(timeID, text);
});

////////////////////////////////////////////////////////////

// event listener for taskContainer element
// this will allow us to change input element text
$(taskContainer).on("click", "input", function() {

    
    // make sure we trim any spaces from text entry
    var text = $(this).text().trim();
    // sets attribute of data-input-time-id to timeID
    var timeID = $(this).attr("data-input-time-id", timeID)
    // adds class to text area
    var textInput = $("<textarea>").addClass($(this).attr("class")).val(text);
    textInput.attr("data-input-time-id", timeID);

    
});

/////////////////////////////////////////////////////////////////

// when we 'unfocus'/'blur' the textarea then we replace content
$(".container").on("blur", "textarea", function() {
    // gets value of text area
    var text = $(this).val();
    // retrieves value of attribute data-input-time-id
    var timeID = $(this).attr('data-input-time-id');

    // recreates input element
    var taskinput = $("<input>").addClass($(this).attr("class")).text(text);
    
    // changes attribute of taskInput element
    taskInput.attr("data-input-time-id", timeID)

    // replace text with new content
    $(this).replaceWith(taskInput);
});

//////////////////////////////////////////////////////

// this function will store saved tasks to localStorage
function saveTasks(timeID, task) {
    // try function will run expressions stated, catch will be for else
    try {
        var tempObj = savedTasks.find(x=> x.timeID === timeID);
        tempObj.task = task;
    }
    catch {
        var oTask = {};
        oTask.timeID = timeID;
        oTask.task = task;
        // pushes data to array
        savedTasks.push(oTask);
    }
    try {
        localStorage.setItem("dailyTasks", JSON.stringify(savedTasks));
    }
    catch {
        alert("Error, please try again.");
    }
    alert("task saved successfully");
};

////////////////////////////////////////////////////////////

// this will load our saved tasks
function loadTasks() {
    if (localStorage.dailyTasks) {
        savedTasks = JSON.parse(localStorage.getItem('dailyTasks'));
    }
};

loadTasks();

createDiv();
