
  export const query = `
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX co2: <http://example.com/>

SELECT ?country ?cumulative_luc_co2 ?year
WHERE {
    ?record a co2:EmissionRecord;
            co2:country ?country;
            co2:year ?year;
            co2:cumulative_luc_co2 ?cumulative_luc_co2.
    FILTER (?year >= "1990"^^xsd:gYear && ?year <= "2020"^^xsd:gYear).
}
`;