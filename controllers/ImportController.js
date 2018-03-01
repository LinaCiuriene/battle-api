import Battle from '../models/BattleModel'
import csv from 'csv-parser'
import fs from 'fs'

exports.importToDatabase = async (req,res) => {
    
    await fs.createReadStream('./battles.csv')
    .pipe(csv())
    .on('data', async (data) => {
        
        const {
            name,
            year,
            battle_number,
            attacker_outcome,
            battle_type,
            major_death,
            major_capture,
            summer,
            location,
            region,
            note
        } = data;
        
        const attackers = Object.keys(data).reduce((arr, key) => {
            if(Number.isInteger(parseInt(key.replace('attacker_', ''))) && data[key].trim())
                arr.push(data[key])
            return arr
        }, [])
        
        const defenders = Object.keys(data).reduce((arr, key) => {
            if(Number.isInteger(parseInt(key.replace('defender_', ''))) && data[key].trim())
                arr.push(data[key])
            return arr
        }, [])
        
        const attacker = {
            king: data.attacker_king,
            attackers,
            size: data.attacker_size || 0,
            commander: data.attacker_commander
        }
        
        const defender = {
            king: data.attacker_king,
            defenders,
            size: data.attacker_size || 0,
            commander: data.attacker_commander
        }
        
        const bat = new Battle({
            name,
            year,
            battle_number,
            attacker,
            defender,
            attacker_outcome: attacker_outcome || null,
            battle_type: battle_type || null,
            major_death: major_death || false,
            major_capture: major_capture || false,
            summer: summer || false,
            location,
            region,
            note
        })
        
        try {
            await bat.save()
        }
        catch(e) {
            console.log(e)
        }
    })
    
    res.send(`Data imported to database '${process.env.DB_NAME}'`)
}

exports.removeFromDatabase = async (req,res) => {
    try {
        await Battle.remove()
    }
    catch(e) {
        console.log(e)
    }
    
    res.send(`Data removed from database '${process.env.DB_NAME}'`)
}