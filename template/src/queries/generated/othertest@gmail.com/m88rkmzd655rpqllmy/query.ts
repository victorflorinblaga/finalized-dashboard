
  export const query = `
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX co2: <http://example.com/>

SELECT ?country ?year ?population ?co2 ?co2_per_capita
WHERE {
    ?record a co2:EmissionRecord;
            co2:country ?country;
            co2:year ?year;
            co2:population ?population;
            co2:co2 ?co2;
            co2:co2_per_capita ?co2_per_capita.
    FILTER (?country IN ("Japa", "China", "Russia", "India")).
    FILTER (?year >= "2000"^^xsd:gYear && ?year <= "2020"^^xsd:gYear).
}
`;