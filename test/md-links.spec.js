/* eslint-disable no-undef */
const mockObject = require('./helpers');
const MDLinks = require('../');
const validate = require('../helpers/validate.js');
const showLinks = require('../helpers/get_links');


describe('mdLinks', () => {

  it('should return every link with path, hrf and text', () => {
    expect(MDLinks("C:\\Users\\eirab\\Documents\\Laboratoria\\CDMX010-md-links\\mock_files")).toBe(
      'C:\\Users\\eirab\\Documents\\Laboratoria\\CDMX010-md-links\\mock_files\test.md https://www.youtube.com/watch?v=5AtvXdmPe3A&ab_channel=JohnnyCash-Topic You are my sunshine'
    )
  })

  it('should return an array of objects containing the hrf, tile, text from each link', () => {
    showLinks('../mock_files\test_carpet\\another_test.md')
    .then((data) => {
      expect(data).toEqual(expect.arrayContaining([
        expect.objectContaining({
          "href" : "https://jestjs.io/docs/es-ES/getting-started"
        })
      ]))
    }).catch((error) => {
      expect(error).toBe('error')
    })
  });

  it('should return every link in the file with the corresponding status', () => {
    validate(mockObject)
    .then((data) => {
      expect(data).toEqual(expect.objectContaining(
          { "status" : "OK" }
      )
      )})
      .catch((error) => {
        expect(error).toBe('error')
      })
  });

});
