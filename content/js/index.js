((Poke) => {
  const App = {
    htmlElements: {
      pokemonFinderForm: document.querySelector("#form-pokemon"),
      pokemonFinderSearchType: document.querySelector("#pokemo-search-type"),
      pokemonFinderInput: document.querySelector("#name-Pokemon"),
      pokemonFinderOutput: document.querySelector("#pokemon-finder-response"),
      boton: document.getElementById("btnClean"),
    },
    init: () => {
      App.htmlElements.pokemonFinderForm.addEventListener(
        "submit",
        App.handlers.pokemonFinderFormOnSubmit
      );
      App.htmlElements.boton.onclick = Clean;

      /* FUNCION LIMPIAR*/
      function Clean() {
        App.htmlElements.pokemonFinderOutput.setAttribute = "hidden";
        location.reload();
      }
    },
    handlers: {
      pokemonFinderFormOnSubmit: async (e) => {
        e.preventDefault();

        const query = App.htmlElements.pokemonFinderInput.value.toLowerCase();
        const searchType = App.htmlElements.pokemonFinderSearchType.value;
        console.log({ searchType });
        try {
          const response = await Poke.getPokemon({
            query,
            searchType,
          });

          console.log(response.species.url);
          const x = await Poke.getEvolution(response.species.url);

          console.log(x);
          const y = await Poke.getEvolution(x.evolution_chain.url);
          console.log("aqui " + y);
          const renderedTemplate = App.templates.render({
            searchType,
            response,
          });
          App.htmlElements.pokemonFinderOutput.innerHTML = renderedTemplate;
        } catch (error) {
          App.htmlElements.pokemonFinderOutput.innerHTML = `<h1>${error}</h1>`;
        }
      },
    },
    templates: {
      render: ({ searchType, response }) => {
        const renderMap = {
          ability: App.templates.abilityCard,
          pokemon: App.templates.pokemonCard,
        };
        return renderMap[searchType]
          ? renderMap[searchType](response)
          : App.templates.errorCard();
      },
      errorCard: () => `<h1>aA ocurido un error</h1>`,

      pokemonCard: ({
        id,
        name,
        weight,
        height,
        sprites,
        abilities,
        evolution,
      }) => {
        const abilietieList = abilities.map(
          (element) => `<li>${element.ability.name}</li>`
        );

        return `<div id ='stnCaracteristicas'><div id ='dif'><h1>${name} (${id})</h1>
          <div id=label1>
                 <h4>Sprites</h4>
                 <h4>Weight/Height</h4>
          </div>
          <div id=imagenes>
                <div id ='imgs'>
                 <p><img src="${
                   sprites.back_default
                 }" alt="" width="60px" height="60px"></p>
                 <p><img src="${
                   sprites.front_default
                 }" alt="" width="60px" height="60px"></p>
                 </div>
                 <p>${weight}/${height}</p>
          </div>
          <div id=label2>
                 <h4>Evolution Chain</h4>
                 <h4>Abilities</h4>
          </div>
          <div id=habilidades>
                     <div>***</div>
                     <div id='abilities'><p>${abilietieList.join("")}</p></div>
          </div></div>`;
      },
      abilityCard: ({ id, name, pokemon }) => {
        const pokemonList = pokemon.map(
          ({ pokemon, is_hidden }) =>
            `<li><a target="_blank" href="${pokemon.url}">${pokemon.name}${
              is_hidden ? " (Hidden)" : ""
            }</a></li>`
        );

        return `<h1>${name} (${id})</h1><p>${pokemonList.join("")}</p>`;
      },
    },
  };
  App.init();
})(document.Poke);
