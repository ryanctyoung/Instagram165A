const Express = require('express')
const multer = require('multer')
const bodyParser = require('body-parser')

var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database ( 'UserData.db', (err) => console.log(err) );

const app = Express()
app.use(bodyParser.json())
db.all('select * from table_user', (err, results) => {
  console.log(results);
} )
/*
db.serialize(function () {
  db.run('CREATE TABLE IF NOT EXISTS table_user(post_id INTEGER PRIMARY KEY AUTOINCREMENT, time INT (10), user_id INT (10), picture VARCHAR(100)')
  var stmt = db.prepare('INSERT INTO lorem VALUES (?)')

  for (var i = 0; i < 10; i++) {
    stmt.run('Ipsum ' + i)
  }

  stmt.finalize()

  db.each('SELECT rowid AS id, info FROM lorem', function (err, row) {
    console.log(row.id + ': ' + row.info)
  })
})
*/

const Storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, process.env.NODE_ENV === 'production' ? '/tmp' : './images')
  },
  filename(req, file, callback) {
    callback(null, `${file.fieldname}_${Date.now()}_${file.originalname}`) // name of image here
  },
})

app.get('/', (req, res) => {
  res.status(200).send('You can post to /api/upload.')
})

const upload = multer({ storage: Storage })

app.post('/api/upload', upload.array('photo', 3), (req, res) => {
  console.log('file', req.files)
  console.log('body', req.body)
  res.status(200).json({
    message: 'success!',
  })
})
app.use('/static', Express.static('./'))

app.listen(3000, () => {
  console.log('App running on http://localhost:3000')
})

db.close()

