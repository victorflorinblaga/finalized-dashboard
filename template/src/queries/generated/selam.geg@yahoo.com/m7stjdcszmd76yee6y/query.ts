
  export const query = `
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX ex: <http://example.com/>

SELECT ?employee ?employee_username ?employee_email ?employee_role ?employee_id ?employee_owner ?employee_mentor ?employee_phone
WHERE {
    ?employee ex:employee_username ?employee_username;
              ex:employee_email ?employee_email;
              ex:employee_role ?employee_role;
              ex:employee_id ?employee_id;
              ex:employee_owner ?employee_owner;
              ex:employee_mentor ?employee_mentor;
              ex:employee_phone ?employee_phone.
}
`;