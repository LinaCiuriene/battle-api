import ImportCtrl from '../controllers/ImportController'
import BattleCtrl from '../controllers/BattleController'

module.exports = (app) => {

	app.get('/', (req, res) => {
	  res.send('To test call route \'list\',\'count\', \'stats\' or \'search\'')
	})
	
	app.get('/list', BattleCtrl.getPlacesList)
	
	app.get('/count', BattleCtrl.getTotalBattlesCount)
	
	app.get('/stats', BattleCtrl.getStatistics)
	
	app.get('/search', (req, res) => {
	  res.send('count')
	})
	
	app.get('/import', ImportCtrl.importToDatabase)
	
	app.get('/remove', ImportCtrl.removeFromDatabase)
}