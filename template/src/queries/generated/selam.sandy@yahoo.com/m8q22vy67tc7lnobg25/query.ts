
  export const query = `
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX ex: <http://example.com/>

SELECT ?rfq ?rfq_title ?rfq_volume
WHERE {
    ?rfq a ex:rfq;
         ex:rfq_title ?rfq_title;
         ex:rfq_volume ?rfq_volume.
}
`;