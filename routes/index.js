module.exports = (app) => {

	app.use('/*', (req, res, next) => {
		console.log('middleware')
		next()
	});

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
	
	app.get('/import', (req, res) => {
	  res.send('import')
	})
	
}