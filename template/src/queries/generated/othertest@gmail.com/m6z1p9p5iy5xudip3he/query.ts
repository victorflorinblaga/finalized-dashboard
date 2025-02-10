
  export const query = `
PREFIX ex: <http://example.com/>

SELECT ?employee_role (COUNT(?employee_role) AS ?role_count)
WHERE {
    ?employee a ex:employee;
              ex:employee_role ?employee_role.
}
GROUP BY ?employee_role
`;