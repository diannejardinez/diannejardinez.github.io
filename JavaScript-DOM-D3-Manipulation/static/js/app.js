
// from data.js
 var ufoData = data;

//////////////////////////////////////////////
// Populating filter search table DATE options

// Select the date element and get the raw HTML node
var filterOptionDate = d3.select('#filterDate');

// Source Link to get unique values from UFO data for dropdown https://appdividend.com/2019/04/11/how-to-get-distinct-values-from-array-in-javascript/
// Make a new array with only unique dates and populate dropdown options with those dates
var datePopulatedOptions = Array.from(new Set(ufoData.map(item => item.datetime)));
datePopulatedOptions.forEach(option => filterOptionDate.append('option').attr('value', option).text(option));

//////////////////////////////////////////////
// from data.js
 var ufoData = data;
// Populating filter search table CITY options

// Select the date element and get the raw HTML node
var filterOptionCity = d3.select('#filterCity');

// Source Link to get unique values from UFO data for dropdown https://appdividend.com/2019/04/11/how-to-get-distinct-values-from-array-in-javascript/
// Make a new array with only unique dates and populate dropdown options with those dates
var cityPopulatedOptions = Array.from(new Set(ufoData.map(item => item.city)));
cityPopulatedOptions.forEach(option => filterOptionCity.append('option').attr('value', option).text(option));

//////////////////////////////////////////////
// from data.js
 var ufoData = data;
// Populating filter search table STATE options

// Select the date element and get the raw HTML node
var filterOptionState = d3.select('#filterState');

// Source Link to get unique values from UFO data for dropdown https://appdividend.com/2019/04/11/how-to-get-distinct-values-from-array-in-javascript/
// Make a new array with only unique dates and populate dropdown options with those dates
var statePopulatedOptions = Array.from(new Set(ufoData.map(item => item.state)));
statePopulatedOptions.forEach(option => filterOptionState.append('option').attr('value', option).text(option));

//////////////////////////////////////////////
// from data.js
 var ufoData = data;
// Populating filter search table COUNTRY options

// Select the date element and get the raw HTML node
var filterOptionCountry = d3.select('#filterCountry');

// Source Link to get unique values from UFO data for dropdown https://appdividend.com/2019/04/11/how-to-get-distinct-values-from-array-in-javascript/
// Make a new array with only unique dates and populate dropdown options with those dates
var countryPopulatedOptions = Array.from(new Set(ufoData.map(item => item.country)));
countryPopulatedOptions.forEach(option => filterOptionCountry.append('option').attr('value', option).text(option));


//////////////////////////////////////////////
// from data.js
 var ufoData = data;
// Populating filter search table SHAPE options

// Select the date element and get the raw HTML node
var filterOptionShape = d3.select('#filterShape');

// Source Link to get unique values from UFO data for dropdown https://appdividend.com/2019/04/11/how-to-get-distinct-values-from-array-in-javascript/
// Make a new array with only unique dates and populate dropdown options with those dates
var shapePopulatedOptions = Array.from(new Set(ufoData.map(item => item.shape)));
shapePopulatedOptions.forEach(option => filterOptionShape.append('option').attr('value', option).text(option));


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


