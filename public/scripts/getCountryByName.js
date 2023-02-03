async function getCountryByName(countryName) {
  const url = "https://restcountries.com/v3.1/name/" + countryName;
  let response = await fetch(url);
  return await response.json();
}

module.exports = getCountryByName;