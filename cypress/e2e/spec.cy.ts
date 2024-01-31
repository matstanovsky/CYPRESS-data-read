import * as XLSX from 'xlsx';

describe('template spec', () => {
  const API_KEY = Cypress.env('API_KEY', process.env.API_KEY || Cypress.env('API_KEY'));
  interface TownData {
    latitude: number;
    longitude: number;
}
  it('Bratislava', () => {
  cy.readFile('cypress/support/data/towns.xlsx', 'binary').then((excelData) => {
  
  const spreadsheet = XLSX.read(excelData, { type: 'binary' });
  
  const sheet = spreadsheet.Sheets['Bratislava'];
  const townData = XLSX.utils.sheet_to_json(sheet) as TownData[];

  const bratislavaLatitude = townData[0].latitude;
  const bratislavaLongitude = townData[0].longitude;
  cy.request({
    method: 'GET',
    url: `https://api.openweathermap.org/data/2.5/weather?lat=${bratislavaLatitude}&lon=${bratislavaLongitude}&appid=${API_KEY}`,
  }).then((response) => {
    expect(response.status).to.equal(200);
    expect(response.body.name).to.equal('Bratislava');
    expect(response.body.sys.country).to.equal('SK');
  });

  
});
  })
})