import config from 'config'
import fs from 'fs'
import path from 'path'
import { getFee } from './fee'


new Promise((resolve, reject) => {
	let fee_table = {...config.Fee}
	Object.keys(fee_table).map((value) => {
		fee_table[value].fee_time = {}
		for(let hour = 1; hour<=24; hour++){
			fee_table[value].fee_time[hour] = getFee(value, hour*60)
		}
	})
	resolve(fee_table)
}).then((fee_table) => {
	let indexFilePath = path.join(__dirname, 'fee_table.json')
	try {
	  if(fs.existsSync(indexFilePath)){
	    fs.unlinkSync(indexFilePath)   
	  }
	  fs.writeFileSync(indexFilePath, JSON.stringify(fee_table), 'utf8')
	  console.log('>>> Create fee_table.json done <<<\n')
	}
	catch(err) {
	  console.log('Write fee_table.json error!!!\n')
	}
})


