const pokemonCardsArea = document.querySelector(".areaPrincipal__pokemonCards");
const typeList = document.querySelector("#typePokemon")
const sortFilter = document.getElementById("sortFilter")
const nameFilter = document.getElementById("nameFilter")
const pokeSearch = document.getElementById("nameFilter__searchList")

const nomesPokemon = [
  "bulbasaur",
  "ivysaur",
  "venusaur",
  "charmander",
  "charmeleon",
  "charizard",
  "squirtle",
  "wartortle",
  "blastoise",
  "caterpie",
  "metapod",
  "butterfree",
  "weedle",
  "kakuna",
  "beedrill",
  "pidgey",
  "pidgeotto",
  "pidgeot",
  "rattata",
  "raticate",
  "spearow",
  "fearow",
  "ekans",
  "arbok",
  "pikachu",
  "raichu",
  "sandshrew",
  "sandslash",
  "nidoran♀",
  "nidorina",
  "nidoqueen",
  "nidoran♂",
  "nidorino",
  "nidoking",
  "clefairy",
  "clefable",
  "vulpix",
  "ninetales",
  "jigglypuff",
  "wigglytuff",
  "zubat",
  "golbat",
  "oddish",
  "gloom",
  "vileplume",
  "paras",
  "parasect",
  "venonat",
  "venomoth",
  "diglett",
  "dugtrio",
  "meowth",
  "persian",
  "psyduck",
  "golduck",
  "mankey",
  "primeape",
  "growlithe",
  "arcanine",
  "poliwag",
  "poliwhirl",
  "poliwrath",
  "abra",
  "kadabra",
  "alakazam",
  "machop",
  "machoke",
  "machamp",
  "bellsprout",
  "weepinbell",
  "victreebel",
  "tentacool",
  "tentacruel",
  "geodude",
  "graveler",
  "golem",
  "ponyta",
  "rapidash",
  "slowpoke",
  "slowbro",
  "magnemite",
  "magneton",
  "farfetch'd",
  "doduo",
  "dodrio",
  "seel",
  "dewgong",
  "grimer",
  "muk",
  "shellder",
  "cloyster",
  "gastly",
  "haunter",
  "gengar",
  "onix",
  "drowzee",
  "hypno",
  "krabby",
  "kingler",
  "voltorb"
]


const url = 'https://pokeapi.co/api/v2/pokemon';
const pokeLine = []
let pokeOrder = []

createSearchList()

let carregarPokeCards = new Promise(function(resolve, reject){
  pokemonCardContainer()

  resolve("cards carregados")
  reject("cards não carregados")

})

function pokemonCardContainer() {

  nomesPokemon.map(async (pokemon, indice, array)=>{
    const response = await fetch(`${url}/${pokemon}`)

    const data = await response.json()

    //console.log(data)

    const pokeCardContainer = document.createElement("article")
    pokeCardContainer.setAttribute("class", "pokemonCards__card")

    const spritePokemon = data.sprites.front_default

    const pokeImg = document.createElement("img")
    pokeImg.setAttribute("src", `${spritePokemon}`)
    pokeImg.setAttribute("draggable", "false")

    const pokeImgArea = document.createElement("picture")
    pokeImgArea.setAttribute("class", "pokemonImg")

    pokeImgArea.appendChild(pokeImg)

    const pokeData = document.createElement("div")
    pokeData.setAttribute("class", "pokemonData")

    const numPokedex = document.createElement("p")
    numPokedex.setAttribute("class", "numberPokedex")
    numPokedex.textContent = "#" + data.id

    const pokeName = document.createElement("h3")
    pokeName.setAttribute("class", "namePokemon")
    pokeName.textContent = data.name

    const pokeTypes = document.createElement("div")
    pokeTypes.setAttribute("class", "pokemonTypes")

    if (data.types.length === 2){
      const type1 = document.createElement("p")
      const type2 = document.createElement("p")

      type1.textContent = data.types[0].type.name
      type2.textContent = data.types[1].type.name

      pokeTypes.append(type1, type2)
    }

    else {
      const type1 = document.createElement("p")
      type1.textContent = data.types[0].type.name

      pokeTypes.appendChild(type1)
    }

    pokeData.append(numPokedex, pokeName, pokeTypes)

    pokeCardContainer.append(pokeImgArea, pokeData)

    pokemonCardsArea.appendChild(pokeCardContainer)

  })
}

carregarPokeCards.then(
  function(){
    typeList.addEventListener("change", filters)
    sortFilter.addEventListener("change", filters)
    nameFilter.addEventListener("keypress", filters)
  }
)

// Ordernar pokeCards
function filters(e) {
  const allPokeCards = document.querySelectorAll(".pokemonCards__card")
  const filtroSelecionado = e.target.id
  
  if (filtroSelecionado === "typePokemon") {

    allPokeCards.forEach((card)=>{
        const pokeTypes = card.children[1].children[2]
  
        if (pokeTypes.children.length > 1 ){
          const pokeType1 = pokeTypes.children[0].textContent
          const pokeType2 = pokeTypes.children[1].textContent
  
          //console.log(`pokemon com 2 tipos: ${pokeType1}, ${pokeType2}`)
  
          if (pokeType1 === typeList.value || pokeType2 === typeList.value){
            card.removeAttribute("style")
            //console.log(`pokemon com 2 tipos: ${pokeType1}, ${pokeType2}\n`)
          }
  
          else {
            card.style.display = "none"
          }
        }
  
        else {
          const pokeType1 = pokeTypes.children[0].textContent
          
          if (pokeType1 === typeList.value){
            
            card.removeAttribute("style")
          }
  
          else {
            card.style.display = "none"
          }
        }
  
        if (typeList.value === "All"){
          card.removeAttribute("style")
        }
    })
  }

  else if (filtroSelecionado === "sortFilter") {

    pokeOrder = Array.from(allPokeCards)

    for (let i = 0; i < pokemonCardsArea.length; i++) {
      pokemonCardsArea.removeChild(pokemonCardsArea.lastChild)
    }

    if (filtroSelecionado === "sortFilter" && sortFilter.value === "numerical_order") {
      pokeOrder.sort((x, y)=>{
        let poke1 = Number((x.children[1].children[0].textContent).slice(1))
        let poke2 = Number((y.children[1].children[0].textContent).slice(1))
  
        return poke1 - poke2
      })

      pokeOrder.forEach((card)=>{
        pokemonCardsArea.appendChild(card)
      })
    }

    else {
      
      pokeOrder.sort((x, y)=>{
        const poke1 = x.children[1].children[1].textContent
        const poke2 = y.children[1].children[1].textContent
  
        return poke1.localeCompare(poke2)
      })
  
      pokeOrder.forEach((card)=>{
        pokemonCardsArea.appendChild(card)
      })
    }
  }

  else {

    if (e.key === "Enter"){
      pokeNameFilter(nameFilter.value)
    }

    function pokeNameFilter(pokeNameValue) {
      allPokeCards.forEach((card)=>{
        const pokeName = (card.children[1].children[1].textContent).slice(0, nameFilter.value.length)
        const nameValue = pokeNameValue.toLowerCase()
        
        if (nameValue === pokeName){
          card.removeAttribute("style")
        }

        else if (nameValue === ""){
          card.removeAttribute("style")
        }

        else {
          card.style.display = "none"
        }
      })
    }

    nameFilter.addEventListener("keyup", (e)=>{
      pokeSearch.removeAttribute("style")
      const nameValue = nameFilter.value.toLowerCase()

      nomesPokemon.forEach((card, indice)=>{
        const pokeName__searchList = pokeSearch.children[indice].children[0].textContent.slice(0, nameFilter.value.length)

        if (nameValue === pokeName__searchList && nameValue !== ""){
          destacarPokeName(indice)
          const selectedPokeName = pokeSearch.children[indice]
          selectedPokeName.removeAttribute("style")

          
          selectedPokeName.addEventListener("click", (e)=>{
            const pokeName = e.target.value
            nameFilter.value = pokeName
            pokeNameFilter(nameFilter.value)
            pokeSearch.style.display = "none"
          })
          
        }

        else {
          pokeSearch.children[indice].style.display = "none"
        }
      })

      function destacarPokeName(indice) {
        const pokeName__searchList = pokeSearch.children[indice].children[0].textContent.slice(0, nameFilter.value.length)

        let pokeNameDestacado = pokeSearch.children[indice].children[0].children[0]
        let pokeNameNaoDestacado = pokeSearch.children[indice].children[0]
        
        if (nameValue === pokeName__searchList && nameValue !== ""){
          pokeNameNaoDestacado.innerHTML = `<mark>${nameValue}</mark>${pokeNameNaoDestacado.textContent.slice(nameFilter.value.length,)}`
        }

        else {
          pokeNameDestacado.innerText = pokeSearch.children[indice].children[1].getAttribute("data-pokemon")
        }

      }

      if (e.key === "Enter"){
        pokeSearch.style.display = "none"
      }
    })

    
    
    /*
    nameFilter.addEventListener("focusout", ()=>{
      pokeSearch.style.display = "none"
    })
    */


  }
}

function createSearchList(){
  nomesPokemon.forEach((pokemon)=>{
    const item = document.createElement("li")
    item.setAttribute("id", "searchList__item")
  
    const selectedItemLabel = document.createElement("label")

    selectedItemLabel.setAttribute("for", "searchList__itemSelected")
    selectedItemLabel.innerHTML = `${pokemon}`
  
    const selectedItem = document.createElement("input")
    selectedItem.setAttribute("id", "searchList__itemSelected")
    selectedItem.setAttribute("type", "radio")
    selectedItem.setAttribute("value", `${pokemon}`)
    selectedItem.setAttribute("data-pokemon", `${pokemon}`)

  
    item.append(selectedItemLabel, selectedItem)
  
    pokeSearch.appendChild(item)
  })
}