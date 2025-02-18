
  export const query = `
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX ex: <http://example.com/>

SELECT ?project ?project_title ?project_start_date ?project_status
WHERE {
    ?project a ex:project;
              ex:project_title ?project_title;
              ex:project_start_date ?project_start_date;
              ex:project_status ?project_status.
}
`;