# Calculate Packing

> A RESTful API for calulate parking with ExpressJS

## Package
- ExpressJS
- Babel

## Using API
  - Run command
  
```bash
git clone https://github.com/chutiphon-k/calculate-parking.git
npm install
npm run build # Genarate file fee_table.json
npm run dev # For run development
npm run prod # For run production
```

## RESTful API

| HTTP METHOD | GET            | POST       | PUT         | PATCH | DELETE |
| ----------- | --------------- | --------- | ----------- | ------ | ------ |
| /mall/:id/checkprice       | Get Fee | |  | | |
| /mall/:id/checkin       | | Checkin Time |  |  |  |

## Request & Response Examples

### API Resources

  - [GET /mall/:id/checkprice](#get-mallidcheckprice)
  - [POST /mall/:id/checkin](#post-mallidcheckin)

### GET /mall/:id/checkprice

Example: http://localhost:9090/mall/:id/checkprice?currentTime=2017-03-12T18:39:56.081Z

Response body:

	Total fee = 40 Bath

### POST /mall/:id/checkin

Example: Create – POST  http://localhost:9090/mall/:id/checkin

Request body:

    {
		"entryTime": "2017-03-12T14:39:56.081Z"
    }
