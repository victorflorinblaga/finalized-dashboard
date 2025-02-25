
  export const query = `
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX ex: <http://example.com/>

SELECT ?rfq ?rfq_id ?rfq_volume ?rfq_creation_date ?rfq_close_date
WHERE {
    ?rfq a ex:rfq;
         ex:rfq_id ?rfq_id;
         ex:rfq_volume ?rfq_volume;
         ex:rfq_creation_date ?rfq_creation_date;
         ex:rfq_close_date ?rfq_close_date.
    FILTER (YEAR(?rfq_creation_date) = 2024)
}
`;