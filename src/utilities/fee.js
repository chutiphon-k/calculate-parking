import moment from 'moment'
import config from 'config'
import _ from 'lodash'
import fs from 'fs'
import path from 'path'

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

let getFeeFromFeeTable = (id, time) => {
	try{
		let fee = 0
		time = moment.duration(time, 'minutes')
		let feeTable = JSON.parse(fs.readFileSync(path.join(__dirname, 'fee_table.json'), 'utf8'))
		if(time.asMinutes() > feeTable[id].free_time){
			let timeRound = Math.floor(time.asHours()) + ((time.asMinutes()%60 > feeTable[id].round_time) ? 1:0)
			fee = feeTable[id].fee_time[timeRound]
		}
		return fee
	}
	catch(err) {
	  console.log(`Please run command 'npm run build' for generate file fee_table.json`)
	}
}

export {
	getFee,
	getFeeFromFeeTable
}