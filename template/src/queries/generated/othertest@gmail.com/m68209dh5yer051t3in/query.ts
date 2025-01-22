
  export const query = `
PREFIX co2: <http://example.com/>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>

SELECT ?country ?year ?population ?co2
WHERE {
  ?record a co2:EmissionRecord;
          co2:country ?country;
          co2:year ?year;
          co2:population ?population;
          co2:co2 ?co2.
  
  FILTER (?year = "2020"^^xsd:gYear)
}

`;