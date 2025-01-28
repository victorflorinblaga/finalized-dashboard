
  export const query = `
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX co2: <http://example.com/>

SELECT ?country ?year ?population ?co2
WHERE {
    ?record a co2:EmissionRecord;
            co2:country ?country;
            co2:year ?year;
            co2:population ?population;
            co2:co2 ?co2.
    FILTER (?country IN ("China", "India", "France", "Germany", "Russia")).
    FILTER (?year >= "2015"^^xsd:gYear && ?year <= "2022"^^xsd:gYear).
}
`;