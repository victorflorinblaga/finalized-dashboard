
  export const query = `
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX ex: <http://example.com/>

SELECT ?supplier ?supplier_name ?contract_status ?rfq_project
WHERE {
    ?supplier ex:supplier_name ?supplier_name;
              ex:supplier_id ?supplier_id.
    
    ?contract ex:contract_status ?contract_status;
              ex:contract_supplier ?supplier.
    
    ?rfq ex:rfq_project ?rfq_project;
         ex:rfq_owner ?rfq_owner.
}
`;