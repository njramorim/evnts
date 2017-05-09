const config = {
	method: 'GET'
}
const prefix = 'http://eng.evnts.rocks/'
const suffix = ''

export function getData(name) {
	let url = prefix + name + suffix
  return fetch(url, config).then(response => response.json())
}
