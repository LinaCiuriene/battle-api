import ImportCtrl from '../controllers/ImportController'
import BattleCtrl from '../controllers/BattleController'

module.exports = (app) => {

	app.get('/', (req, res) => {
	  res.send('Start')
	})
	
	app.get('/list', BattleCtrl.getPlacesList)
	
	app.get('/count', (req, res)=> {
	  res.send('count')
	})
	
	app.get('/stats', (req, res) => {
	  res.send('count')
	})
	
	app.get('/search', (req, res) => {
	  res.send('count')
	})
	
	app.get('/import', ImportCtrl.importToDatabase)
	
	app.get('/remove', ImportCtrl.removeFromDatabase)
}