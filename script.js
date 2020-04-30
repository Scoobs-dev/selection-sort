var columns_array;

function columns_input() {
  //  remove old columns
  // hide first page and show input page
  document.getElementById('container_div').style.display = 'none';
  document.getElementById('container_generate_info').style.display = 'none';
  document.getElementById('container_generate_input').style.display = 'block';
}

/*
``````````````
`` Generate ``
``````````````
*/

function generate_columns() {
  // first off, have to get input and check if its valid
  var columns_input = document.getElementById('columns_input').value;
  console.log(columns_input)
  // if columns_input is negative return and log error in console
  if (columns_input < 0) {
    window.location.reload(false); 
    return console.error('Cannot use numbers below 0.');
  }

  // show sort nav option
  document.getElementById('nav_sort').style.display = 'block';
  document.getElementById('nav_generate').style.display = 'none';

  // hide input screen show display screen
  document.getElementById('container_generate_input').style.display = 'none';
  document.getElementById('container_div').style.display = 'flex';

  // deterine value of columns_space_divider
  if (columns_input < 100) {
    var columns_space_divider = 100
  } else {
    var columns_space_divider = 1000
  }

  // create dictionary/array to avoid running through all elements again
  columns_array = [];

  // generate x amount of columns with rand height
  var i;
  for (i = 0; i < columns_input; i++) {
    var column_element = document.createElement('div');
    var column_element_height = Math.floor((Math.random() * 400) + 100);
    // add element attribs
    column_element.className = 'container_div_item';
    // yes
    column_element.style.height = `${column_element_height}`;
    column_element.style.marginLeft = `${columns_space_divider / columns_input}px`;
    column_element.style.order = `${i}`;
    column_element.id = `${i}`;
    // create/append element
    document.getElementById('container_div').appendChild(column_element); 
    // add to array
    columns_array.push({
      id:    `${i}`,
      height:`${column_element_height}`
    });
  }
}

/*
``````````
`` sort ``
``````````
*/

function selection_sort() {
  // repeat until all columns are sorted
  while (columns_array.length > 0) {
    var i;
    var largest_height = 0;
    var largest_height_obj;
    // loop through array
    for (i = 0; i < columns_array.length; i++) {
      // check if largest so far
      if (columns_array[i].height > largest_height) {
        // if so set some variables
        largest_height = columns_array[i].height;
        largest_height_obj = i;
      }
    }
    // change order of highest column to - the amount of columns left in the array
    document.getElementById(`${columns_array[largest_height_obj].id}`).style.order = `-${columns_array.length}`;
    // remove column from array
    columns_array.splice(largest_height_obj, 1);
  }
}
