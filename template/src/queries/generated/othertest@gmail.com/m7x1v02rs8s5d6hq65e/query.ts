
  export const query = `
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX ex: <http://example.com/>

SELECT ?rfq ?rfq_volume ?rfq_creation_date ?rfq_id
WHERE {
    ?rfq a ex:rfq;
          ex:rfq_volume ?rfq_volume;
          ex:rfq_creation_date ?rfq_creation_date;
          ex:rfq_id ?rfq_id.
    FILTER (YEAR(?rfq_creation_date) = 2024)
}
`;