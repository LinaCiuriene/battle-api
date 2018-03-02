import Battle from '../models/BattleModel'

exports.getPlacesList = async (req, res) => {
    try {
        const places = await Battle.find().distinct('location');
        res.send(places.filter(p => p && p.trim()))
    }
    catch(e) {
        res.send(`Failed while getting places: ${e}`)
    }
}

exports.getTotalBattlesCount = async (req, res) => {
    try {
        const totalBattles = await Battle.aggregate([{ 
            $group: {
                _id: null,
                total: {$sum: "$battle_number"}
            }
        }]);

        res.send((totalBattles[0].total).toString())
    }
    catch(e) {
        res.send(`Failed while getting total battles count: ${e}`)
    }
}

exports.getStatistics = async (req, res) => {
    
    /*const most_active = await Battle.aggregate([
        
    ]);*/
    
    const attacker_outcome = await Battle.aggregate([{
        $group: {
            _id: "$attacker_outcome",
            count: { $sum: 1 }
        }
    }])
    
    const type = await Battle.find().distinct('battle_type')
    const battle_type = type.filter(p => p && p.trim())
    
    const defender_size = await Battle.aggregate([
        {
            $group: {
                _id: null,
                average: { $avg: "$defender.size" },
                max: {$max: "$defender.size"},
                min: {$min: "$defender.size"}
            }
        }
    ])
        
    const result = {
        'most_active': {
            'attacker_king': '',
            'defender_king': '',
            'region': '',
            'name': ''
        },
        'attacker_outcome': {
            'win': '',// total win
            'loss': ''// total loss
        },
        'battle_type':[],// unique battle types
        'defender_size': {
            'average': '',
            'min': '',
            'max': ''
        }
    }
    
    try {
        res.send([attacker_outcome, battle_type, defender_size])
    }
    catch(e) {
        res.send(`Failed while getting battles statistics: ${e}`)
    }
}

/*
{
    battle_number: 37,
    major_capture: true,
    _id: 5a98921dfcfd215bda6ce2dc,
    name: 'Siege of Raventree',
    year: 300,
    attacker: 
     { attackers: [Array],
       size: 1500,
       commander: [Array],
       _id: 5a98921dfcfd215bda6ce2da,
       king: 'Joffrey/Tommen Baratheon' },
    defender: 
     { defenders: [Array],
       commander: [Array],
       _id: 5a98921dfcfd215bda6ce2db,
       king: 'Joffrey/Tommen Baratheon',
       size: 1500 },
    attacker_outcome: 'win',
    battle_type: 'siege',
    major_death: false,
    summer: false,
    location: 'Raventree',
    region: 'The Riverlands',
    note: '',
    __v: 0
}
*/