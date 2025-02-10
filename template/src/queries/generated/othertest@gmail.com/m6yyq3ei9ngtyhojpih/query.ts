
  export const query = `
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX ex: <http://example.com/>

SELECT ?email ?username ?company_role ?id ?mentor
WHERE {
    ?employee a ex:employee;
              ex:email ?email;
              ex:username ?username;
              ex:company_role ?company_role;
              ex:id ?id;
              ex:mentor ?mentor.
}
`;