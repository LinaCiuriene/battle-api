import Battle from '../models/BattleModel'

exports.getPlacesList = async (req,res) => {
    try {
        const places = await Battle.find().distinct('location');
        res.send(places.filter(p => p.trim()))
    }
    catch(e) {
        res.send(`Failed while getting places: ${e}`)
    }
}