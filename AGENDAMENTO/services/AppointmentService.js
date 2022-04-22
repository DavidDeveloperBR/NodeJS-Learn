var Appointment = require('../model/Appointment');
var mongoose = require('mongoose');
const AppoitmentFactory = require('../factory/AppoitmentFactory');
var AppointmentFactory = require('../factory/AppoitmentFactory');
var Mailer = require('nodemailer');
const Mail = require('nodemailer/lib/mailer');
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
            finished: false,
            notified: false
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

    async getById(id){
        try {
            var event = Appo.findOne({'_id': id});
            return event;
        } catch (err) {
            console.log(err);
        }     
    }

    async finish(id){
        try{
            await Appo.findByIdAndUpdate(id,{finished: true});
            return true;
        }catch(err){
            console.log(err);
            return false;
        }
        
    }

    async search(query){
        try {
            var appos = await Appo.find().or([{email: query},{cpf: query}]);
            return appos;
        } catch (err) {
            console.log(err);
            return [];
        }

    }

    async sendNotification(){
        var appos = await this.getAll(false);

        var transporter = Mailer.createTransport({
            host: 'smtp.mailtrap.io',
            port: 2525,
            auth: {
                user:"d672086e8bb8ba",
                pass:"bc18cc495fc9ec",
            }
        });

        appos.forEach(async appo =>{
            var date = appo.start.getTime();
            var hour = 1000 * 60 * 60;
            var gap = date - Date.now();
            
            if(gap <= hour ){
                if(!appo.notified){

                    Appo.findByIdAndUpdate(appo.id, {notified: true});

                    transporter.sendMail({
                        from: "Teste <teste@mail.com>", 
                        to: appo.email,
                        subject: "Aviso de consulta",
                        text: "Sua consulta vai acontecer em 1 hora."
                    }).then(() => {
                        console.log("Email enviado!");
                    }).catch(err => {
                        console.log(err);
                    });
                }
            }

        });
    }
}

module.exports = new AppointmentService();