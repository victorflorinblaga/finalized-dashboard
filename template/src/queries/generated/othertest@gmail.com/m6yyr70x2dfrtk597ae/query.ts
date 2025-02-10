
  export const query = `
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX ex: <http://example.com/>

SELECT ?supplier ?pyramid_rank ?name
WHERE {
    ?supplier a ex:supplier;
              ex:name ?name;
              ex:pyramid_rank ?pyramid_rank.
}
`;