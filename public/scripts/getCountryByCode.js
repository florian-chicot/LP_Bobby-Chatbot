async function getCountryByCode(countryCode) {
  const url = "https://restcountries.com/v3.1/alpha/" + countryCode;
  let response = await fetch(url);
  return await response.json();
}

module.exports = getCountryByCode;