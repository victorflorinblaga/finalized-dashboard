
  export const query = `
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX co2: <http://example.com/>

SELECT ?country ?year ?co2
WHERE {
    ?record a co2:EmissionRecord;
            co2:country ?country;
            co2:year ?year;
            co2:co2 ?co2.
    FILTER (?country = "Germany").
    FILTER (?year >= "2000"^^xsd:gYear && ?year <= "2003"^^xsd:gYear).
}
`;