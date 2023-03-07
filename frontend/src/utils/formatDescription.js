// function to convert plain text to HTML:
export function formatTextToHTML(str) {
  // Split the string into an array of individual lines
  const lines = str.split('\n');

  // Initialize an empty HTML string
  let html = '';

  // Loop through each line and format it as needed
  for (let i = 0; i < lines.length; i++) {
    // Skip empty lines
    if (lines[i].trim() === '') {
      continue;
    }

    // Add a <p> tag to the first line of each day
    if (lines[i].startsWith('Day')) {
      html += '<p><strong>' + lines[i] + '</strong></p>';
    } else {
      // Add a <li> tag for each activity
      html += '<li>' + lines[i] + '</li>';
    }
  }

  // Wrap the <li> tags in an <ul> tag
  html = '<ul>' + html + '</ul>';

  // console.log(html);

  // Return the formatted HTML string
  return { html };
}
