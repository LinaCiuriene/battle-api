import Battle from '../models/BattleModel'

/**
 * return array of battle places
 */
exports.getPlacesList = async (req, res) => {
    try {
        res.send(await Battle.find().distinct('location', {'location': {$ne: null}}))
    }
    catch(e) {
        res.send(`Failed while getting places: ${e}`)
    }
}

/**
 * return total battles count
 */
exports.getTotalBattlesCount = async (req, res) => {
    try {
        const totalBattles = await Battle.aggregate([{ 
            $group: {
                _id: null,
                total: {$sum: "$battle_number"}
            }
        }])

        res.send((totalBattles[0].total).toString())
    }
    catch(e) {
        res.send(`Failed while getting total battles count: ${e}`)
    }
}

/**
 * return battles statistics
 */
exports.getStatistics = async (req, res) => {
    
    // get battles sum by given parameter
    const stats = {
        getBattleSum: async function() {
            return await Battle.aggregate([
                {
                    $group: {
                        _id: this.sumBy,
                        sum:{ $sum: "$battle_number" }
                    }
                },
                {$sort:{sum:-1}},
                {$limit:1}
            ])
        }
    }
    
    const byAttackerKing = stats.getBattleSum.bind({sumBy: '$attacker.king'})
    const byDefenderKing = stats.getBattleSum.bind({sumBy: '$defender.king'})
    const byLocation = stats.getBattleSum.bind({sumBy: '$region'})
    const byName = stats.getBattleSum.bind({sumBy: '$name'})
    
    const attacker_king = await byAttackerKing()
    const defender_king = await byDefenderKing()
    const region = await byLocation()
    const name = await byName()
    
    // get total number of wins and losses
    const attacker_outcome = await Battle.aggregate([{
        $group: {
            _id: "$attacker_outcome",
            count: {$sum: 1}
        }
    }])
    
    // get battle types list
    const battle_type = await Battle.find().distinct('battle_type', {'battle_type': {$ne: null}})
    
    // get min, max and average defender size
    const defender_size = await Battle.aggregate([{
        $group: {
            _id: null,
            average: { $avg: "$defender.size" },
            max: {$max: "$defender.size"},
            min: {$min: "$defender.size"}
        }
    }])
    
    // format response
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

/**
 * return documents by given parameters
 */
exports.getFilteredDocuments = async (req, res) => {
    
    Object.keys(req.query).forEach(p => {
        
        // if parameter is for any attacker or defender value,
        // alter it's name to be able  to search in embedded document
        if(p.indexOf('attacker') > -1 || p.indexOf('defender') > -1) {
            
            // alteration when searching by an attacker/defender in 'attacker'/'defender' array
            if(!p.split('_')[1] || !isNaN(p.split('_')[1]))
                req.query[`${p.split('_')[0]}.${p.split('_')[0]}s`] = req.query[p]
            
            // else replace underscore with dot to be able to
            // search by parameters values in embedded document
            else
                req.query[p.replace('_','.')] = req.query[p]
            
            delete req.query[p]
        }
    })
    
    res.send(await Battle.find(req.query));
}