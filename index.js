const threshold = 10;



const WebSocket = require('ws')
const fs = require('fs')



const urls = {
	socket: 'wss://stream.binance.com/stream',
	rest: 'https://api.binance.com/api/v3/depth?symbol=BTCUSDT&limit=5000'
}

const ws = new WebSocket(urls.socket)

ws.onopen = function() {
	ws.send(JSON.stringify({ method: 'SUBSCRIBE', params: ['btcusdt@depth'], id: 1 }))
};
// ws.on('open', function open() {
// 	ws.send(JSON.stringify({ method: 'SUBSCRIBE', params: ['btcusdt@depth'], id: 1 }))
// })

function processMessageData(book) {
	return book.filter(([price, volume]) => volume >= threshold)
}

// ws.on('message', function incoming(message) {
// 	const parsed = JSON.parse(message)
// 	if (!parsed?.data) return
// 	const {
// 		data: { E: eventTime, U: FirstUpdateID, u: FinalUpdateID, a: asks, b: bids }
// 	} = parsed

// 	// if (!message?.data) return;
// 	// const { data: { E: eventTime, U: FirstUpdateID, u: FinalUpdateID, a: asks, b: bids } } = message

// 	console.log({
// 		eventTime,
// 		FirstUpdateID,
// 		FinalUpdateID,
// 		bids: processMessageData(bids),
// 		asks: processMessageData(asks)
// 		// bids,
// 		// asks
// 	})
// })
ws.onmessage = function incoming(message) {
	const parsed = JSON.parse(message)
	if (!parsed?.data) return
	const {
		data: { E: eventTime, U: FirstUpdateID, u: FinalUpdateID, a: asks, b: bids }
	} = parsed

	// if (!message?.data) return;
	// const { data: { E: eventTime, U: FirstUpdateID, u: FinalUpdateID, a: asks, b: bids } } = message

	console.log({
		eventTime,
		FirstUpdateID,
		FinalUpdateID,
		bids: processMessageData(bids),
		asks: processMessageData(asks)
		// bids,
		// asks
	})
}


// console.log(new Date(1625187809335))