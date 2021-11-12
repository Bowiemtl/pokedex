$(document).ready(function () {
    //get 'id' parameter from URL
    let params = (new URL(window.location.href)).searchParams;
    let id = parseInt(params.get('id'));
    console.log(id);
    id = typeof id == undefined || !isNaN(id) ? Math.abs(id) : window.location.href = "detail.html?id=1";

    if (id >= 998 || id < 1) {
        window.location.href = "detail.html?id=1";
    }
    function loadPokemonDetails(id) {
        console.clear()
        let url = `https://pokeapi.co/api/v2/pokemon/${id}`;
        $.ajax({
            url: url,
            success: function (data) {
                stats = data.stats;

                $.each(data.types, function (i, type) {
                    color[i] = getColorForType(type.type.name);
                });

                $('.name-header .fas').css('color', invertedColor);

                $('.pokemon-detail-wrapper .pokemon-image').append(`<img class="pokemon-sprite" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png">`);
                //https://assets.pokemon.com/assets/cms2/img/pokedex/full/${i}.png
                $('.pokemon-name').html(firstLetterUppercase(data.name));
                $('.pokemon-number').html("#" + id);

                //apply images to page
                $('#prev-sprite').attr('src', `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id - 1}.png`);
                $('#current-sprite').attr('src', `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`);
                $('#next-sprite').attr('src', `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id + 1}.png`);


                // $.each(data.abilities, function (i) {
                //     $('.pokemon-ability-list').append(`<tr><td>${data.abilities[i].ability.name}</td></tr>`);
                // });

                $('.pokemon-ability-list').empty();
                $('.pokemon-ability-list').append("<tr><td><p>abilities</p></td></tr>");

                $.each(data.abilities, function (i, pokemon) {
                    if (pokemon.is_hidden) {
                        $('.pokemon-ability-list').append(`<tr><td>${firstLetterUppercase(pokemon.ability.name)} (Hidden Ability)</td></tr>`);
                    } else {
                        $('.pokemon-ability-list').append(`<tr><td>${firstLetterUppercase(pokemon.ability.name)}</td></tr>`);
                    }
                })

                $('.pokemon-types').empty();
                $('.pokemon-types').append("<h1>Types:</h1>");
                $.each(data.types, function (i, pokemon) {
                    $('.pokemon-types').append(`<div style="background-color:${color[i]}80"><p>${pokemon.type.name}</p></div>`);
                });

                loadDescription(id);
                drawStats();
                $('#current-sprite').css({ "filter": `drop-shadow(4px 4px 0 ${color[0]}) drop-shadow(-4px -4px 0 ${color})` });
                console.log(data);
            }
        });
    }

    //TODO: beschrijving ophalen en naar pagina laden
    function loadDescription(id) {
        let url = `https://pokeapi.co/api/v2/pokemon-species/${id}`;
        $.ajax({
            url: url,
            success: function (data) {
                console.log("desc");
                console.log(data);
                console.log(data.evolution_chain.url);
                
                $('.description-wrapper').empty();
                $('.description-wrapper').append(data.flavor_text_entries[1].flavor_text + " ");
                $('.description-wrapper').append(data.flavor_text_entries[3].flavor_text + " ");
                $('.description-wrapper').append(data.flavor_text_entries[4].flavor_text + " ");
                loadEvolutionTree(data.evolution_chain.url);

            }
        });

    }
    //TODO: evolution tree op pagina laten zien
    function loadEvolutionTree(url) {
        $.ajax({
            url: url,
            success: function (data) {
                console.log(data);

                $('.evolution-chain').empty();

                let evoData = data.chain;
                let evoArray = [];
                
                while (evoArray.hasOwnProperty('evolves_to')) {
                    //let evolutionDetails = evolutionChain[i].evolves_to[0];
                    //let id = (evolutionDetails.url).replace("https://pokeapi.co/api/v2/pokemon-species/", "").replace("/", "");
                    //$('.evolution-chain').append(`<td><a href="detail.html?id=${id}">${evolutionDetails.name}</a><img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png"></td>`)

                    evolutionData = evoultionData.evolves_to[0];

                    evoArray.push({
                        "name": evolutionData.species.name,
                        "url": evolutionData.species.url
                    });
                } 

            }
        });
    }


    loadPokemonDetails(id);

    $('#button-prev,#prev-sprite').each(function () {
        $(this).on('click', function () {
            if (id > 1) {
                id--;
                loadPokemonDetails(id);
            }
        });
    });

    $('#button-next,#next-sprite').each(function () {
        $(this).on('click', function () {
            if (id < 898) {
                id++;
                loadPokemonDetails(id);
            }
        });
    });


    $('#button-back').on('click', function () {
        if (id > 0) {
            window.location.href = 'index.html?offset=' + Math.floor(id % amount == 0 ? (id / amount) - 1 : id / amount);
        }
    });

    $(document).on('keydown', function (e) {
        if (e.keyCode == 37 || e.keyCode == 65 && id > 1) {
            if (id > 1) {
                id--;
                loadPokemonDetails(id);
            }
        } else if (e.keyCode == 39 || e.keyCode == 68) {
            if (id < 898) {
                id++;
                loadPokemonDetails(id);
            }
        }
    });
});









                //console.log(data);
                //let pokemon1 = data.chain.species;
                //let pokemon2 = data.chain.evolves_to[0].species;
                //let pokemon3 = data.chain.evolves_to[0].evolves_to[0].species;
                //let link1 = (pokemon1.url).replace("https://pokeapi.co/api/v2/pokemon-species/", "").replace("/", "");
                //let link2 = (pokemon2.url).replace("https://pokeapi.co/api/v2/pokemon-species/", "").replace("/", "");
                //let link3 = (pokemon3.url).replace("https://pokeapi.co/api/v2/pokemon-species/", "").replace("/", "");
                //$('.evolution-chain').empty();
                //$('.evolution-chain').append(`<td><a href="detail.html?id=${link1}">${pokemon1.name}</a><img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${link1}.png"> </td>`)
                //$('.evolution-chain').append(`<td><a href="detail.html?id=${link2}">${pokemon2.name}</a><img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${link2}.png"> </td>`)
                //$('.evolution-chain').append(`<td><a href="detail.html?id=${link3}">${pokemon3.name}</a><img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${link3}.png"> </td>`)
                
                
                // console.log(data);

                // $('.evolution-chain').empty();

                // let evolutionChain = [];
                // let evolutionData = data.chain;
                // let i = 1;
                // do {
                //     let evolutionDetails = evolutionChain[i].evolves_to[0];
                //     let id = (evolutionDetails.url).replace("https://pokeapi.co/api/v2/pokemon-species/", "").replace("/", "");
                //     $('.evolution-chain').append(`<td><a href="detail.html?id=${id}">${evolutionDetails.name}</a><img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png"></td>`)

                //     evolutionData = evoultionData.evolves_to[0];

                //     evolutionChain.push({
                //         "name": evolutionData.species.name,
                //         "url": evolutionData.species.url
                //     });
                //     i++
                // } while (!!evoData && evoData.hasOwnProperty('evolves_to'));


                



                // console.log(data.chain.evolves_to[0] !== undefined);

                // let pokemon = data.chain;
                // if (data.chain.evolves_to[0] !== undefined) {


                //     while(pokemon.evolves_to[0] !== undefined || data.chain.evolves_to[0].species.evolves_to[0].species === defined) {

                //         console.log(pokemon);


                //         if (typeof pokemon.evolves_to[0] !== undefined) {
                //             pokemon = pokemon.evolves_to[0];
                //         }
                //     }
                // }