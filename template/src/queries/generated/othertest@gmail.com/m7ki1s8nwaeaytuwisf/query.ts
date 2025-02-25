
  export const query = `
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX ex: <http://example.com/>

SELECT ?contract ?contract_summary ?contract_validity_start ?contract_validity_end ?contract_supplier ?contract_name ?contract_type
WHERE {
    ?contract a ex:contract;
              ex:contract_summary ?contract_summary;
              ex:contract_validity_start ?contract_validity_start;
              ex:contract_validity_end ?contract_validity_end;
              ex:contract_supplier ?contract_supplier;
              ex:contract_name ?contract_name;
              ex:contract_type ?contract_type.
    FILTER(?contract_validity_start >= "2020-01-01"^^xsd:date && ?contract_validity_start <= "2023-12-31"^^xsd:date)
}
`;