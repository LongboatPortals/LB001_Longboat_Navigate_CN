/* eslint-disable no-undef */
const fs = require('fs');
const path = require('path');
const yaml = require('yaml');

test('should match the snapshot', () => {
  const yamlFilePath = path.resolve(__dirname, '../../src/locales/en.yml');
  const yamlFileContent = fs.readFileSync(yamlFilePath, 'utf8');
  const parsedYaml = yaml.parse(yamlFileContent);
  expect(parsedYaml).toMatchSnapshot();
});

/*
test('should match the snapshot', () => {
  const yamlFilePath = path.resolve(__dirname, '../../src/locales/es.yml');
  const yamlFileContent = fs.readFileSync(yamlFilePath, 'utf8');
  const parsedYaml = yaml.parse(yamlFileContent);
  expect(parsedYaml).toMatchSnapshot();
});
*/
