
  export const query = `
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX ex: <http://example.com/>

SELECT ?supplier ?supplier_name ?supplier_pyramid_rank ?supplier_is_top_parent ?supplier_address
WHERE {
    ?supplier a ex:supplier;
               ex:supplier_name ?supplier_name;
               ex:supplier_pyramid_rank ?supplier_pyramid_rank;
               ex:supplier_is_top_parent ?supplier_is_top_parent;
               ex:supplier_address ?supplier_address.
}
`;