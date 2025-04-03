
  export const query = `
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX ex: <http://example.com/>

SELECT ?rfq ?rfq_volume ?rfq_title
WHERE {
    ?rfq a ex:rfq;
         ex:rfq_volume ?rfq_volume;
         ex:rfq_title ?rfq_title;
         ex:rfq_creation_date ?rfq_creation_date.
    FILTER (YEAR(?rfq_creation_date) = 2024)
}
`;