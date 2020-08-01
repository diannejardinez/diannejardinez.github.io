
///////////////////////////////////////////////////////////////////////////////////
// Autofill Filter table options
///////////////////////////////////////////////////////////////////////////////////

//Setting  data to ufoData
var ufoData = data;
 
function filteredTableOptions(htmlId, ufoDataKey) {

  // Select the date element and get the raw HTML node
  var filterOption = d3.select(htmlId);

  // Source Link to get unique values from UFO data for dropdown https://appdividend.com/2019/04/11/how-to-get-distinct-values-from-array-in-javascript/
  // Make a new array with only unique dates and populate dropdown options with those dates
  var populatedOptions = Array.from(new Set(ufoData.map(ufoDataKey)));
  populatedOptions.forEach(option => filterOption.append('option').attr('value', option).text(option));
};

// Calling function to auto populate dropdown options
filteredTableOptions('#datetime', (item => item.datetime));
filteredTableOptions('#city', (item => item.city));
filteredTableOptions('#state', (item => item.state));
filteredTableOptions('#country', (item => item.country));
filteredTableOptions('#shape', (item => item.shape));

///////////////////////////////////////////////////////////////////////////////////
// Submit button for filtering all data in Main table
///////////////////////////////////////////////////////////////////////////////////

// Keeping track of all filters
var filterUfoData = {};

// Select the date element and get the raw HTML node for the dropdown option
var dropdownMenu = d3.select("select");

 // Get the value property of the select element for the dropdown menu option value
var dataset = dropdownMenu.property("value");

// Select the submit button
var submitButton = d3.select("#submitButton");


// Complete the click handler for the form
submitButton.on("click", function() {

  // prevents the page from refreshing
  d3.event.preventDefault();

  // Updating the maintable function
  updateMainTable(ufoData);
});


// Function to update the main table
function updateMainTable(ufoData) {

  // Reset table data for everytime a new date is selected
  var tbody = d3.select("tbody").text(" ");

  // Loop through data list
  ufoData.forEach(dataRow => { 

    // use d3 to append one table row for each object
    var row = tbody.append('tr');

    // use Object.entries for each key and value
    Object.entries(dataRow).forEach( ([key, value]) => {

      // use d3 to append and update each cell with text and prints out text on html
      row.append('td').text(value);
    });
  });
};


// Function to use the dropdown menu to filter the data by all options
function updateFilteredUfoData(filterOption, tableValue) {

  //Reset the data to ufoData
  ufoData = data;

  //Adding to the filter tracker filterUfoData for each option value
  filterUfoData[filterOption] = tableValue;

    // Loop through each filter option and keep any data that matches the filter value
    Object.entries(filterUfoData).forEach(([key, value]) => {
    ufoData = ufoData.filter(filterDataRow => filterDataRow[key] === value);
    });
};

///////////////////////////////////////////////////////////////////////////////////
// Reset button for clearing all data in Main table and Filter table
///////////////////////////////////////////////////////////////////////////////////

// Select the reset button
var resetButton = d3.select("#resetButton");

// Complete the click handler for the form
resetButton.on("click", function() {

  // prevents the page from refreshing
  d3.event.preventDefault();

  //reset table data
  var tbody = d3.select("tbody").text(" ");

  // go back to disabled selection
  var refresh = d3.selectAll("select").property("value", "Select Option");

  //Reset the data to ufoData
  ufoData = data;

  //Reset the filtered data of filterUfoData
  filterUfoData = {};
});



