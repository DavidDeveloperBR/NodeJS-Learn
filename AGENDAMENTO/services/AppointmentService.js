var Appointment = require('../model/Appointment');
var mongoose = require('mongoose');
const AppoitmentFactory = require('../factory/AppoitmentFactory');
var AppointmentFactory = require('../factory/AppoitmentFactory');

const Appo = mongoose.model('Appointment', Appointment);

class AppointmentService {
    async create(name, email, cpf,description, date, time, finished){
        var newAppo = new Appo({
            name,
            email,
            cpf,
            description,
            date,
            time,
            finished: false
        });

        try {
            await newAppo.save();
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
        
    }

    async getAll(showFinished){

        if(showFinished){
            return await Appo.find();
        }else{
            var appos = await Appo.find({'finished': false});
            var appointments = [];

            appos.forEach(appointment =>{
                if(appointment.date != null){
                    appointments.push(AppointmentFactory.build(appointment));
                }
            });

            return appointments;
        }

    }
}

module.exports = new AppointmentService();