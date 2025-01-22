
export const query = `
PREFIX co2: <http://example.com/>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>

SELECT ?country ?year ?population
WHERE {
  ?record a co2:EmissionRecord;
          co2:country ?country;
          co2:year ?year;
          co2:population ?population.
  FILTER(?country IN ("Germany", "France", "Japan"))
  FILTER(?year >= "2015"^^xsd:gYear && ?year <= "2020"^^xsd:gYear)
}
`;