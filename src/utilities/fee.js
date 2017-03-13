import moment from 'moment'
import config from 'config'
import _ from 'lodash'

let data = config.Fee

let getFee = (id, time) => {
	let fee = 0
	time = moment.duration(time, 'minutes')
	if(time.asMinutes() <= data[id].free_time){
		return 0
	}
	let timeRound = Math.floor(time.asHours()) + ((time.asMinutes()%60 > data[id].round_time) ? 1:0)
	while( timeRound > data[id].free_time/60){
		_.map(data[id].fee_range, (value, key) => {
			let part = key.split('-')
			if(timeRound >= part[0] && timeRound <= (part[1] || part[0])){
				if(part[1] == undefined){
					timeRound -= part[0]
					fee += value
				} else {
					let countHour = timeRound - part[0] + 1
					timeRound -= countHour
					fee += countHour*value
				}
			}
		})
	}
	return fee
}

export {
	getFee
}