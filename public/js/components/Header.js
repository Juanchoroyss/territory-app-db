const App = document.querySelector('.App')
const $ = etiqueta => document.createElement(etiqueta)

function createHeader(territory) {
  const header = $('header')
  header.classList.add('header')
  const headerTitle = $('a')
  headerTitle.href = "/"
  headerTitle.classList.add('header__a')
  if(territory) {
    headerTitle.innerHTML = `Territorio <span>${territory}<span/>`  
  } else {
    headerTitle.textContent = `Territorios Sibaté` 
  }

  header.appendChild(headerTitle)
  App.appendChild(header)
}