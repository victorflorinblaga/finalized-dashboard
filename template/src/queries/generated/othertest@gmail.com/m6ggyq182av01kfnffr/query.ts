
  export const query = `
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX co2: <http://example.com/>

SELECT ?country ?year ?co2_per_capita
WHERE {
    ?record a co2:EmissionRecord;
            co2:country ?country;
            co2:year ?year;
            co2:co2_per_capita ?co2_per_capita.
    FILTER (?country IN ("France", "Germany", "India", "China", "Russia")).
    FILTER (?year >= "2015"^^xsd:gYear && ?year <= "2022"^^xsd:gYear).
}
`;