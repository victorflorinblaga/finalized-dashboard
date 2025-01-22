
  export const query = `
PREFIX co2: <http://example.com/>

SELECT ?year ?co2
WHERE {
  ?record a co2:EmissionRecord ;
          co2:country "Germany" ;
          co2:year ?year ;
          co2:co2 ?co2 .

  FILTER (?year >= "2010"^^xsd:gYear && ?year <= "2020"^^xsd:gYear)
}

`;