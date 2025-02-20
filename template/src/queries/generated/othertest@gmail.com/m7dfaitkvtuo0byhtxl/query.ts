
  export const query = `
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX ex: <http://example.com/>

SELECT ?project ?project_title ?project_status ?project_start_date ?project_category ?project_owner ?project_supplier ?project_id ?rfq_project
WHERE {
    ?project a ex:project;
              ex:project_title ?project_title;
              ex:project_status ?project_status;
              ex:project_start_date ?project_start_date;
              ex:project_category ?project_category;
              ex:project_owner ?project_owner;
              ex:project_supplier ?project_supplier;
              ex:project_id ?project_id.
    
    OPTIONAL {
        ?rfq a ex:rfq;
              ex:rfq_project ?project;
              ex:rfq_project ?rfq_project.
    }
    
    BIND(IF(?project_status = "In Progress", "yellow", "white") AS ?rowHighlight)
}
ORDER BY ?project

`;