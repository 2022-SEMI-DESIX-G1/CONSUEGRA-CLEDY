(() => {
    const Poke = {
      settings: {
        backendBaseUrl: "https://pokeapi.co/api/v2",
        
      },
      getFormattedBackendUrl: ({ query, searchType }) => {
        return `${Poke.settings.backendBaseUrl}/${searchType}/${query}`;
      },
      getPokemon: ({ query, searchType = "pokemon" }) => {
        return Poke.fetch({
          url: Poke.getFormattedBackendUrl({ query, searchType }),
          searchType,
        });
      },
      getEvolution: (url) => {
        return Poke.fetch({url, searchType: ''});
      },
      fetch: async ({ url, searchType }) => {
        try {
          const rawResponse = await fetch(url);
          if (rawResponse.status !== 200) {
            throw new Error(`${searchType} not found`);
          }
          return rawResponse.json();
        } catch (error) {
          throw error;
        }
      },
    };
    document.Poke = Poke;
  })();