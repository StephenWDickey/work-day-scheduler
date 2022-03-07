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

var savedTasks = [];

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


    





////////////////////////////////////////////////////////////


createDiv();


//////////////////////////////////////////////////////////
// event listeners!


////////////////////////////////////////////////////////////


$("input").focusout(function() {
    $(this).textContent = $("input").text().trim();
});
    

var buttonHandler = function(event) {
    event.preventDefault();
    var input = $("input").val();
    localStorage.setItem("savedTasks", input);
};
///////////////////////////////////////////

// add event listener to taskContainer element, the icon part
// this will save our task in an array when we hit save button
// have to add this after we call createDiv function because elements
// dont exist before that
$(".saveBtn").on("click", buttonHandler);

//////////////////////////////////////////////////////

// this function will store saved tasks to localStorage


