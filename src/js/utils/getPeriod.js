import moment from 'moment'

export function getPeriod(data, min) {
	let dates = []

	data.map((item, index) => {
		let momentStart = moment(item.startDate, 'DD/MM/YYYY')
		let momentEnd = moment(item.endDate, 'DD/MM/YYYY')
		return dates.push(momentStart, momentEnd)
	})		

	return min ? 
		moment.min(dates).format('DD/MM/YYYY') :
		moment.max(dates).format('DD/MM/YYYY')
}