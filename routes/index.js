import ImportCtrl from '../controllers/ImportController'

module.exports = (app) => {

	app.get('/', (req, res) => {
	  res.send('Start')
	})
	
	app.get('/list', (req, res) => {
	  res.send('list')
	})
	
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