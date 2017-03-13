import { Router } from 'express'
import moment from 'moment'
import { getFee } from '../utilities'

const router = Router({mergeParams: true})
let entryTime

let checkFormatTime = (time) => moment(time, moment.ISO_8601).isValid()

router.get('/checkprice', (req, res, next) => {
	if(!checkFormatTime(req.query.currentTime)){
		res.status(400).send('Error: Current Time is not ISO_8601 format.')
	} else  if(entryTime == undefined){
		res.status(400).send('Error: Please set entry time')
	}
	else{
		next()		
	}
},(req, res) => {
	entryTime = moment(entryTime)
	let currentTime = moment(req.query.currentTime)
	let timeDiff = moment.duration(currentTime-entryTime)
	let id = req.params.id
	if(timeDiff.asHours() > 24){
		res.status(400).send('Error: Total time is greater than 24 hours')
	} else {
		res.send(`Total fee = ${getFee(id, timeDiff)} Bath`)
	}
})

router.post('/checkin', (req, res, next) => {
	if(!checkFormatTime(req.body.entryTime)){
		res.status(400).send('Error: Entry Time is not ISO_8601 format.')
	} else{
		next()
	}
}, (req, res) => {
	entryTime = req.body.entryTime
	res.send("Checkin completed")
})

export default router