const bodyParser = require('body-parser')
const request = require('request') // TO call other api
const express = require('express') //

const app = express()
const port = process.env.PORT || 4000
const hostname = '127.0.0.1'
const HEADERS = {
	'Content-Type': 'application/json',
	'Authorization': 'Bearer 7F8GFQHpHD+xtUERna/UeWphEiFCJM/TStByW0ViC5vgqkOIflVUSUx2hhWnIsoQPXSn/Rcxo1TjRUWYmFZJTjIoisE2uL+vWnqqarXoXfVFfxahaFhqQnobYVBn2R9Rws5uaYJmSQYGi6jdbH91WAdB04t89/1O/w1cDnyilFU='
	// 7F8GFQHpHD+xtUERna/UeWphEiFCJM/TStByW0ViC5vgqkOIflVUSUx2hhWnIsoQPXSn/Rcxo1TjRUWYmFZJTjIoisE2uL+vWnqqarXoXfVFfxahaFhqQnobYVBn2R9Rws5uaYJmSQYGi6jdbH91WAdB04t89/1O/w1cDnyilFU=
}

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static('public'))

// Push
app.get('/webhook', (req, res) => {
	// push block
	let msg  = 'Hello World!'

	push(msg)
	res.send(msg)
})

// Reply
app.post('/webhook', (req, res) => {
	// reply block
	let reply_token = req.body.event[0].replyToken
	let msg = req.body.event[0].messages.text
	reply(reply_token,msg)
})

function push(msg) {
	let body = JSON.stringify({
		to: 'Ud12dc52c65e15944f87b8670b0e8546d',
		messages: [
			{
				"type": "flex",
				"altText": "pon",
				"contents": {
					
						"type": "bubble",
						"styles": {
						  "body": {
						   
							"backgroundColor": "#3a84f7"
						  }
						},
						"body": {
						  "type": "box",
						  "layout": "horizontal",
						  "contents": [
							{
							  "type": "image",
							  "url": "https://iconsplace.com/wp-content/uploads/_icons/ffffff/256/png/airplane-mode-on-icon-256.png",
							  "size": "xxs",
							   "flex": 2
							},
							{
							  "type": "box",
							  "layout": "vertical",
							  "flex": 1,
							  "contents":[
								{
								  "type": "text",
								  "text": "Terminal",
								  "color": "#cccccc"
								},
								{
								   "type": "text",
								  "text": "1",
								  "color": "#ffffff"
								}
								]
							},
							{
							  "type": "box",
							  "layout": "vertical",
							  "flex": 1,
							  "contents":[
								{
								  "type": "text",
								  "text": "Gate",
								  "color": "#cccccc"
								},
								{
								   "type": "text",
								  "text": "C24",
								  "color": "#ffffff"
								}
								]
							}
						  ]
						
					  }
				}
			}
		]
		// push body
	})
	curl('push', body)
}

function reply(reply_token, msg) {
	let body = JSON.stringify({
		// reply body
		replyToken: reply_token,
		messages: [
			{
				"type": "flex",
				"altText": "pon",
				"contents": {
					
						"type": "bubble",
						"styles": {
						  "body": {
						   
							"backgroundColor": "#3a84f7"
						  }
						},
						"body": {
						  "type": "box",
						  "layout": "horizontal",
						  "contents": [
							{
							  "type": "image",
							  "url": "https://iconsplace.com/wp-content/uploads/_icons/ffffff/256/png/airplane-mode-on-icon-256.png",
							  "size": "xxs",
							   "flex": 2
							},
							{
							  "type": "box",
							  "layout": "vertical",
							  "flex": 1,
							  "contents":[
								{
								  "type": "text",
								  "text": "Terminal",
								  "color": "#cccccc"
								},
								{
								   "type": "text",
								  "text": "1",
								  "color": "#ffffff"
								}
								]
							},
							{
							  "type": "box",
							  "layout": "vertical",
							  "flex": 1,
							  "contents":[
								{
								  "type": "text",
								  "text": "Gate",
								  "color": "#cccccc"
								},
								{
								   "type": "text",
								  "text": "C24",
								  "color": "#ffffff"
								}
								]
							}
						  ]
						
					  }
				}
			}
		]
	})
	curl('reply', body);
}

function curl(method, body) {
	//post to outside //KEY
	request.post({
		url: 'https://api.line.me/v2/bot/message/' + method,
		headers: HEADERS,
		body: body
	}, (err, res, body) => {
		console.log('status = ' + res.statusCode)
	})
}

app.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`)
})