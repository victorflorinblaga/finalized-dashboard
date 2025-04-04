
  export const query = `
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX co2: <http://example.com/>

SELECT ?country ?year ?gdp ?population
WHERE {
    ?record a co2:EmissionRecord;
            co2:country ?country;
            co2:year ?year;
            co2:gdp ?gdp;
            co2:population ?population.
    FILTER (?year >= "1990"^^xsd:gYear && ?year <= "2010"^^xsd:gYear).
}
`;