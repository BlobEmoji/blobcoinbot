const { existsSync, writeFile, readFile } = require('fs')

if (!existsSync('./data.json')) writeFile('data.json', '{}', 'utf8')

module.exports = (client) => {
  client.dataPush = (obj) => new Promise((resolve, reject) => {
    let json = JSON.stringify(obj)
    writeFile('data.json', json, (err) => {
      if (err) reject(err)
      else resolve(json)
    })
  })

  client.dataPull = () => new Promise((resolve, reject) => {
    readFile('data.json', (err, data) => {
      if (err) reject(err)
      else {
        try {
          let obj = JSON.parse(data)
        } catch (e) {
          reject(e)
        }
        resolve(obj)
      }
    })
  })
}
