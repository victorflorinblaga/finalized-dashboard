
  export const query = `
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX co2: <http://example.com/>

SELECT ?record
WHERE {
    ?record a co2:EmissionRecord.
}
`;