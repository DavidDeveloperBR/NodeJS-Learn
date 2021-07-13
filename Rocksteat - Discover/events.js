//const {EventEmitter} = require('events')

//const ev = new EventEmitter()

//ev.on('saySomething', (message) => {
//    console.log('Eu ouvi você ', message)
//})


//ev.once('saySomething', (message) => {
//    console.log('Eu ouvi você ', message)
//})
//ev.emit('saySomething', "David")
//ev.emit('saySomething', "Luke")
//ev.emit('saySomething', "Goku")

const { inherits } = require('util')
const {EventEmitter} = require('events')

function Character(name){

    this.name = name

}

inherits(Character, EventEmitter);

const elric = new Character('Edward Elric')

elric.on('hey', () => console.log(`Quem você chamou de pintor de roda pé!! `))

console.log(`Achei que ${elric.name} fosse mais alto.`)

elric.emit('hey')