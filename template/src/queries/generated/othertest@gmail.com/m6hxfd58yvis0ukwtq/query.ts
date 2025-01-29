
  export const query = `
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX co2: <http://example.com/>

SELECT ?country ?year ?population ?co2 ?gdp
WHERE {
    ?record a co2:EmissionRecord;
            co2:country ?country;
            co2:year ?year;
            co2:population ?population;
            co2:co2 ?co2;
            co2:gdp ?gdp.
    FILTER (?country IN ("Germany", "France")).
    FILTER (?year >= "2010"^^xsd:gYear && ?year <= "2020"^^xsd:gYear).
}
`;