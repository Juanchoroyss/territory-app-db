const express = require("express");
const data = require("./territories/territories.json")[0]
const crypto = require('node:crypto');
const cors = require('cors')
const territories = data.territories
const { validateSchema } = require("./schema/territories");
const app = express()

app.disable('x-powered-by')

app.use(express.json())
app.use(cors())
app.use(express.static('./public'))

app.get('/', (req, res) => {
  res.sendFile(`${process.cwd}/public/index.html`)
})

app.get('/territories', (req, res) => {
  const { territory } = req.query
  if(territory) {
    const findTerritory = territories.find(e => 
        e.territoryName.toLowerCase() === territory.toLowerCase()
      )
    return res.json(findTerritory)
  }
  res.json(territories)
  res.end
})

app.get('/territories/:id', (req, res) => {
  const { id } = req.params
  const territory = territories.find(territorie => territorie.id === id)
  if(territory) return res.json(territory)
  res.status(404).json({message: "Territory not found"})
res.end
})

app.get('/territories/:id/history', (req, res) => {
  const { id } = req.params
  const history = territories.find(territory => territory.id === id)
  if(history.capitains) {
    return res.json(history.historyPredicate)
  }
  res.send({error: "No tiene historial"})
})

app.get('/capitains', (req, res) => {
  res.json(data.capitains)
  res.end
})

app.post('/territories', (req, res) => {
  const result = validateSchema("territory", req.body)

  if(result.error) {
    return res.status(400).json({ Error: JSON.parse(result.error.message) })
  }

  const newTerritory = {
    id: crypto.randomUUID(),
    ...result.data
  }
  territories.push(newTerritory)
  res.status(201).json(newTerritory)
})

app.post('/territories/:id/history', (req, res) => {
  const { id } = req.params
  const result = validateSchema("history", req.body)

  if(result.error) {
    res.status(400).json({ Error: JSON.parse(result.error.message)})
  }
  const territory = territories.find(territory => territory.id === id)
  territory.historyPredicate.push(result.data)
  res.status(200).json(result.data)
})

const port = process.env.PORT ?? 3000
app.listen(port, () => {
  console.log('Server running on port ' + port)
})