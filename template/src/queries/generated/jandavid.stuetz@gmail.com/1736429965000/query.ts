
  export const query = `
PREFIX co2: <http://example.com/>

SELECT ?country ?year ?gdp
WHERE {
  ?record a co2:EmissionRecord;
          co2:country ?country;
          co2:year ?year;
          co2:gdp ?gdp.
}
`;