const confHeaders = new Headers({
  'Content-Type': 'text/html; charset=utf-8',
  'X-Custom-Header': "ProcessThisImmediately",
  'Access-Control-Allow-Origin': '*'
})
const config = {
	method: 'GET',
 	headers: confHeaders,
  cache: 'default',
  mode: 'cors'
}
const prefix = './data/'
const suffix = '.json'

export function getData(name) {
	let url = prefix + name + suffix
  return fetch(url, config).then(response => response.json())
}
