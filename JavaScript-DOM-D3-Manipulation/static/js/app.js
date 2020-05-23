
// from data.js
 var ufoData = data;

//////////////////////////////////////////////
// Populating filter search table ALL options

function filteredTableOptions(htmlId, ufoDataKey) {

  // Select the date element and get the raw HTML node
  var filterOption = d3.select(htmlId);
  
  // Source Link to get unique values from UFO data for dropdown https://appdividend.com/2019/04/11/how-to-get-distinct-values-from-array-in-javascript/
  // Make a new array with only unique dates and populate dropdown options with those dates
  var populatedOptions = Array.from(new Set(ufoData.map(ufoDataKey)));
  populatedOptions.forEach(option => filterOption.append('option').attr('value', option).text(option));
  }
  
filteredTableOptions('#filterDate', (item => item.datetime))
filteredTableOptions('#filterCity', (item => item.city))
filteredTableOptions('#filterState', (item => item.state))
filteredTableOptions('#filterCountry', (item => item.country))
filteredTableOptions('#filterShape', (item => item.shape)) 


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
// Submit button for filtering for date with submit action

// Select the submit button
var dateButton = d3.select("#submitButton");

// Complete the click handler for the form
dateButton.on("click", function() {

  // prevents the page from refreshing
  d3.event.preventDefault();

  // Select the date element and get the raw HTML node
  var selectElement = d3.select("#filterDate");

  // Get the value property of the select element
  var selectValue = selectElement.property("value");

  // Use the form input to filter the data by date
  var filterdDate = ufoData.filter(item => item.datetime === selectValue);

  // Reset table data for everytime a new date is selected
  var tbody = d3.select("tbody").text(" ")

  // Loop through data list
  filterdDate.forEach((filterdDate)=>{

      // use d3 to append one table row for each object
      var row = tbody.append("tr");

      // use Object.entries for each key and value
      Object.entries(filterdDate).forEach(function([key,value]) {

          // use d3 to append and update each cell with text and prints out text on html
          var cell = tbody.append("td").text(value);
      });
  });
});

///////////////////////////////////////////////////////////
// Submit button for filtering for CITY with submit action

// Select the submit button
var cityButton = d3.select("#submitButton");

// Complete the click handler for the form
cityButton.on("click", function() {

  // prevents the page from refreshing
  d3.event.preventDefault();

  // Select the date element and get the raw HTML node
  var selectElement = d3.select("#filterCity");

  // Get the value property of the select element
  var selectValue = selectElement.property("value");

  // Use the form input to filter the data by date
  var filterdDate = ufoData.filter(item => item.city === selectValue);

  // Reset table data for everytime a new date is selected
  var tbody = d3.select("tbody").text(" ")

  // Loop through data list
  filterdDate.forEach((filterdDate)=>{

      // use d3 to append one table row for each object
      var row = tbody.append("tr");

      // use Object.entries for each key and value
      Object.entries(filterdDate).forEach(function([key,value]) {

          // use d3 to append and update each cell with text and prints out text on html
          var cell = tbody.append("td").text(value);
      });
  });
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
// Reset button for clearing all data for DATES

// Select the reset button
var dateResetButton = d3.select("#resetButton");

// Complete the click handler for the form
dateResetButton.on("click", function() {

  // prevents the page from refreshing
  d3.event.preventDefault();

  //reset table data
  var tbody = d3.select("tbody").text(" ");

  //go back to disabled selection
  d3.select("#filterDate").property("value", "Select Date");
});

/////////////////////////////////////////////////////////
// Reset button for clearing all data for CITIES

// Select the reset button
var cityResetButton = d3.select("#resetButton");

// Complete the click handler for the form
cityResetButton.on("click", function() {

  // prevents the page from refreshing
  d3.event.preventDefault();

  //reset table data
  var tbody = d3.select("tbody").text(" ");

  //go back to disabled selection
  d3.select("#filterCity").property("value", "Select City");
});


