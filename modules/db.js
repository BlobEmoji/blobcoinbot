const fs = require('fs')

if (!fs.existsSync('./data.json')) fs.writeFile('data.json', '{}', 'utf8')

module.exports = (client) => {
  client.dataPush = (obj) => new Promise((resolve, reject) => {
    var json = JSON.stringify(obj)
    fs.writeFile('data.json', json, (err) => {
      if (err) reject(err)
      else resolve(json)
    })
  })

  client.dataPull = () => new Promise((resolve, reject) => {
    fs.readFile('data.json', (err, data) => {
      if (err) reject(err)
      else {
        try {
          var obj = JSON.parse(data)
        } catch (e) {
          reject(e)
        }
        resolve(obj)
      }
    })
  })
}
