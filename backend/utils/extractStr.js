const extractStr = (str) => {
  if (str.includes(',')) {
    // If the string contains commas, split it by comma
    const arr = str.split(',');
    // Use a Set to collect unique strings
    const set = new Set(arr);
    // Convert the Set back to an array and sort it
    let result = Array.from(set).sort();
    // Filter empty string and return the result
    return result.filter((str) => str !== '');
  } else {
    // If the string doesn't contain commas, split it by space
    const arr = str.split(' ');
    // Use a Set to collect unique strings
    const set = new Set(arr);
    // Convert the Set back to an array and sort it
    let result = Array.from(set).sort();
    // Filter empty string and return the result
    return result.filter((str) => str !== '');
  }
};

module.exports = extractStr;
