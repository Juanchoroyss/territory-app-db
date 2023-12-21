const $ = etiqueta => document.createElement(etiqueta)
const App = document.querySelector('.App')
const URL = "http://localhost:3000/territories"

const mainContainer = $('main')
mainContainer.classList.add('main')

const getElements = async url => {
  const response = await fetch(url)
  return await response.json()
}


async function main() {
  createHeader()
  const territories = await getElements(URL)
  territories.map(territory => {
    const { territoryName, territoryImg } = territory

    const card = $('div')
    card.classList.add('card')
    const cardImg = $('img')
    cardImg.classList.add('card__img')
    cardImg.src = territoryImg
    // cardImg.alt = `Imagen del territorio de ${territoryName}`
    const cardContainer = $('div')
    cardContainer.classList.add('card__container')
    const cardText = $('p')
    cardText.classList.add('card__text')
    cardText.textContent = territoryName
    const btn = $('button')
    btn.classList.add('card__btn')
    btn.innerHTML = '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAoElEQVR4nO3Vuw3CMBRA0UA6OkZgBpYAsQctE8AwWQHmgA4aKj4dA6RBB6VIRSKEEicg+fTWlZ6e7SSJoqgCBkiTruGAM6Zdh0s5ln2ESxlGfYQLe0z6CBcemH06vMBd+55YF5tfF74Ja4vxN+Nq0/HtvncUPlWFr4Gju7pRz3EJtFwbDJO2NbpOTfzSA5J1/WTmWAUP/sK3mAbZ2ij6Ky9pt0V6AW42DwAAAABJRU5ErkJggg==">'

    mainContainer.appendChild(card)
    card.appendChild(cardImg)
    card.appendChild(cardContainer)
    cardContainer.appendChild(cardText)
    cardContainer.appendChild(btn)
  })
  App.appendChild(mainContainer)
} main()