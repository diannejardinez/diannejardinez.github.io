
// Submit button for filtering for date with submit action

 // Assign the data from `data.js` to a descriptive variable
var ufoData = data;

// Select the submit button
var button = d3.select("#submitButton");

// Complete the click handler for the form
button.on("click", function() {

  // prevents the page from refreshing
  d3.event.preventDefault();

    // Select the date element and get the raw HTML node
  var selectElement = d3.select("#filterDate");

  // Get the value property of the select element
  var selectValue = selectElement.property("value");

  // Use the form input to filter the data by date
  var filterdDate = ufoData.filter(item => item.datetime === selectValue);

  // Get a reference to the table body
  var tbody = d3.select("tbody");

 //reset table data for everytime a new date is selected
  tbody.text(" ")

  // Loop through data list
  filterdDate.forEach((filterdDate)=>{

      // use d3 to append one table row for each object
      var row = tbody.append("tr");

      // use Object.entries for each key and value
      Object.entries(filterdDate).forEach(function([key,value]) {

          // use d3 to append 1 cell per value
          var cell = tbody.append("td");
          
          // use d3 to update each cell with text and prints out text on html
          cell.text(value);
      });
  });
});
/////////////////////////////////////////////////////////
// Reset button for clearing all data

// Select the reset button
var resetButton = d3.select("#resetButton");

// Complete the click handler for the form
resetButton.on("click", function() {

  // prevents the page from refreshing
  d3.event.preventDefault();

  //reset table data
  var tbody = d3.select("tbody");
  tbody.text(" ");

  //go back to disabled selection
  d3.select("#filterDate").property("value", "Select Date");
});



