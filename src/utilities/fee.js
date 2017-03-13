import moment from 'moment'
import _ from 'lodash'

let data = {
	1: {
		name: 'Siam Paragon',
		free_time: 120,
		round_time: 30,
		fee_time: {
			"3-6": 30,
			"7-24": 60
		}
	},
	2: {
		name: 'Central World',
		free_time: 30,
		round_time: 0,
		fee_time: {
			"1-5": 20,
			"6-24": 50
		}
	},
	3: {
		name: 'Central Ladprao',
		free_time: 60,
		round_time: 30,
		fee_time: {
			"2": 20,
			"3": 20,
			"4": 40,
			"5-24": 50
		}
	}
}


let getFee = (id, time) => {
	let fee = 0
	if(time.asMinutes() <= data[id].free_time){
		return 0
	}
	let timeRound = time.hours() + ((time.asMinutes()%60 > data[id].round_time) ? 1:0)
	while( timeRound > data[id].free_time/60){
		_.map(data[id].fee_time, (value, key) => {
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