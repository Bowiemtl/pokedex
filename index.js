$(document).ready(function () {
    //get 'offset' parameter from URL
    let params = (new URL(window.location.href)).searchParams;
    let offset = params.get('offset');
    offset = Math.abs(typeof offset !== undefined && !isNaN(offset) ? offset : 0);

    function loadPokemon() {
        //let url = `https://pokeapi.co/api/v2/pokemon?offset=${offset * amount}&limit=${amount}`;
        let url = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=998";

        if (localStorage.length !== 0) {
            let data = JSON.parse(localStorage.getItem('pokemonArray'));
            $('.pokemon-list').empty();

            $.each(data.results, function (i) {
                let pokemonID = offset * amount + i + 1;
                if (i > amount - 1) {
                    return false;
                }
                $('.pokemon-list').append(`<div class="pokemon-container" id="${pokemonID}"></div>`);
                $(`#${pokemonID}`).append(`<p>${pokemonID}. ${firstLetterUppercase(data.results[pokemonID].name)}</p>`);
                $(`#${pokemonID}`).append(`<img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonID}.png">`);
                
            });
        } else {
            $.ajax({
                url: url,
                success: function (data) {
                    localStorage.setItem('pokemonArray', JSON.stringify(data));

                    console.log(data);
                    displayPokemon(data);

                    $('.pokemon-general-wrapper').html(`<p>pagina#${offset}`);
                }
            });
        }
        loadRegions();
    }

    loadPokemon();

    //laad alle pokemon op het scherm van het json object  
    function displayPokemon(data) {
        $('.pokemon-list').empty();
        $.each(data.results, function (i) {
            let pokemonID = offset * amount + i + 1;
            $('.pokemon-list').append(`<div class="pokemon-container" id="${pokemonID}"></div>`);
            $(`#${pokemonID}`).append(`<p>${pokemonID}. ${firstLetterUppercase(data.results[i].name)}</p>`);
            $(`#${pokemonID}`).append(`<img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonID}.png">`);
        });
    }

    //laad alle pokemon van de regio waar op geklikt is
    function displayPokemonFromRegion(data) {
        $('.pokemon-list').empty();
        $.each(data, function (i, pokemon) {
            pokemonName = pokemon.name;
            pokemonID = pokemon.url.replace("https://pokeapi.co/api/v2/pokemon-species/", "").replace("/", "");

            $('.pokemon-list').append(`<div class="pokemon-container" id="${pokemonID}"></div>`);
            $(`#${pokemonID}`).append(`<p>${pokemonID}. ${firstLetterUppercase(pokemonName)}</p>`);
            $(`#${pokemonID}`).append(`<img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonID}.png">`);
        });
    }

    //laad alle regios en zet ze in de balk op de pagina
    function loadRegions() {
        let url = "https://pokeapi.co/api/v2/region";
        $.ajax({
            url: url,
            success: function (data) {
                console.log(data)
                $('.filter-bar').empty();
                $.each(data.results, function (i, region) {
                    $('.filter-bar').append(`<div class="filter" id="${region.name}"><p>${region.name}</p></div>`);
                });
            }
        });
    }

    $('#button-next').on('click', function () {
        if (offset * amount + amount < 1118) {
            offset++;
            loadPokemon();
            //window.location.href = "index.html?offset=" + offset;
        }
    });

    $('#button-prev').on('click', function () {
        if (offset > 0) {
            offset--;
            loadPokemon();
            //window.location.href = "index.html?offset=" + offset;
        }
    });

    $(document).on('keydown', function (e) {
        if (e.keyCode == 37 || e.keyCode == 65) {
            if (offset > 0) {
                offset--;
                loadPokemon();
            }
        } else if (e.keyCode == 39 || e.keyCode == 68) {
            if ((offset * amount) + amount < 898) {
                offset++;
                loadPokemon();
            }
        }
    });

    $(document).on('click', '.pokemon-container', function () {
        let id = $(this)[0].id;
        window.location.href = "detail.html?id=" + id;
    });

    $(document).on('click', '.filter', function () {
        let region = $(this)[0].id;
        let url = `https://pokeapi.co/api/v2/region/${region}`;
        $.ajax({
            url: url,
            success: function (data) {

                console.log(data);
                displayPokemon(data);

                let url = `https://pokeapi.co/api/v2/generation/${data.id}`;
                $.ajax({
                    url: url,
                    success: function (data) {

                        console.log(data.pokemon_species);

                        displayPokemonFromRegion(data.pokemon_species);
                    }
                });
            }
        });
    });
});