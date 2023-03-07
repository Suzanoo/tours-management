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

  console.log(html);

  // Return the formatted HTML string
  return <div className="text-gray-700 text-sm">{html}</div>;
}

export function formatDescription(description) {
  const regex =
    /Day (\d+):\s(.+?)\.\sBudget:\sApprox.\s\$(\d+)\.\sAgency:\s(.+?)\s\((.+?)\)\.\sAccommodation:\s(.+?)\s\((.+?)\)\./g;

  let match;
  const days = [];

  while ((match = regex.exec(description)) !== null) {
    const day = match[1];
    const activity = match[2];
    const budget = match[3];
    const agencyName = match[4];
    const agencyUrl = match[5];
    const accommodationName = match[6];
    const accommodationUrl = match[7];

    days.push({
      day,
      activity,
      budget,
      agencyName,
      agencyUrl,
      accommodationName,
      accommodationUrl,
    });
  }

  return <div className="text-gray-700 text-sm">{days}</div>;
}
