import mongoose from 'mongoose'
import dotenv from 'dotenv'

const { Schema } = mongoose
dotenv.load()

mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`)

const AttackerSchema = new Schema({
    king: {
        type: String,
        maxLength: 40
    },
    attackers: [String],
    size: {
        type: Number,
        default: null,
        validate : {
            validator : Number.isInteger,
            message   : '{VALUE} is not an integer'
        }
    },
    commander: {
        type: [String],
        maxLength: 50
    }
})

const DefenderSchema = new Schema({
    king: {
        type: String,
        maxLength: 40
    },
    defenders: [String],
    size: {
        type: Number,
        validate : {
            validator : Number.isInteger,
            message   : '{VALUE} is not an integer'
        }
    },
    commander: {
        type: [String],
        maxLength: 50
    }
})

const BattleSchema = new Schema({
    name: {
        type: String,
        maxLength: 70
    },
    year:{
        type: Number,
        required: true,
        validate : {
            validator : Number.isInteger,
            message   : '{VALUE} is not an integer'
        }
    },
    battle_number: {
        type: Number,
        default: 0,
        validate : {
            validator : Number.isInteger,
            message   : '{VALUE} is not an integer'
        }
    },
    attacker: {
        type: AttackerSchema
    },
    defender: {
        type: DefenderSchema
    },
    attacker_outcome: {
        type: String,
        enum: ['win', 'loss', null]
    },
    battle_type: {
        type: String,
        enum: ['pitched battle', 'ambush', 'siege', 'razing', null]
    },
    major_death: {
        type: Boolean
    },
    major_capture: {
        type: Boolean,
        default: false
    },
    summer: {
        type: Boolean
    },
    location: {
        type: String,
        maxLength: 70
    },
    region: {
        type: String,
        maxLength: 70
    },
    note: {
        type: String,
        maxLength: 300
    }
})

module.exports = mongoose.model('Battle', BattleSchema);