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
    
    const attacker_king = await Battle.aggregate([
        {
            $group: {
                _id: '$attacker.king',
                sum:{ $sum: "$battle_number" }
            }
        },
        {$sort:{sum:-1}},
        {$limit:1}
    ]);
    
    const defender_king = await Battle.aggregate([
        {
            $group: {
                _id: '$defender.king',
                sum:{ $sum: "$battle_number" }
            }
        },
        {$sort:{sum:-1}},
        {$limit:1}
    ]);
    
    const region = await Battle.aggregate([
        {
            $group: {
                _id: '$region',
                sum:{ $sum: "$battle_number" }
            }
        },
        {$sort:{sum:-1}},
        {$limit:1}
    ]);
    
    const name = await Battle.aggregate([
        {
            $group: {
                _id: '$name',
                sum:{ $sum: "$battle_number" }
            }
        },
        {$sort:{sum:-1}},
        {$limit:1}
    ]);
    
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
            'attacker_king': attacker_king[0]._id,
            'defender_king': defender_king[0]._id,
            'region': region[0]._id,
            'name': name[0]._id
        },
        'attacker_outcome': {
            'win': attacker_outcome.filter(o => o._id === 'win')[0].count,
            'loss': attacker_outcome.filter(o => o._id === 'loss')[0].count
        },
        'battle_type': battle_type,
        'defender_size': {
            'average': defender_size[0].average,
            'min': defender_size[0].min,
            'max': defender_size[0].max
        }
    }
    
    try {
        res.send(result)
    }
    catch(e) {
        res.send(`Failed while getting battles statistics: ${e}`)
    }
}