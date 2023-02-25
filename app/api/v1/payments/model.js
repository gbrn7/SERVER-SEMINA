const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    type: {
        type: String,
        required: [true, 'Tipe Pembayaran harus diisi'],
        minlength: 3,
        maxlength: 50,
    },
    image: {
        type: mongoose.Types.ObjectId,
        ref: 'Image',
        required: true,
    },
    status: {
        type: String,
        enum: [true, false],
        default: true,
    },
    organizer: {
        type: mongoose.Types.ObjectId,
        ref: 'Organizer',
        required: true,
    }
}, { timestamps: true })

module.exports = mongoose.model('Payment', paymentSchema);