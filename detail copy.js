$(document).ready(function () {
    //get 'id' parameter from URL
    let params = (new URL(window.location.href)).searchParams;
    let id = parseInt(params.get('id'));
    console.log(id);
    id = typeof id == undefined || !isNaN(id) ? Math.abs(id) : window.location.href = "detail.html?id=1" ;

    if (id >= 998 || id < 1){ 
        window.location.href = "detail.html?id=1";
    }
    function loadPokemonDetails(id) {
        let url = `https://pokeapi.co/api/v2/pokemon/${id}`;
        $.ajax({
            url: url,
            success: function (data) {
                stats = data.stats;
                color = getColorForType(data.types[0].type.name);
                invertedColor = invertColor(color);

                $('.name-header .fas').css('color', invertedColor);

                $('.pokemon-detail-wrapper .pokemon-image').append(`<img class="pokemon-sprite" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png">`);
                //https://assets.pokemon.com/assets/cms2/img/pokedex/full/${i}.png
                $('.pokemon-name').html(capitalizeFirstLetter(data.name));
                $('.pokemon-number').html("#" + id);

                //apply images to page
                $('#prev-sprite').attr('src', `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id - 1}.png`);
                $('#current-sprite').attr('src', `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`);
                $('#next-sprite').attr('src', `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id + 1}.png`);


                // $.each(data.abilities, function (i) {
                //     $('.pokemon-ability-list').append(`<tr><td>${data.abilities[i].ability.name}</td></tr>`);
                // });


                $.each(data.abilities, function (i,pokemon) {
                    if (pokemon.is_hidden) {
                        $('.pokemon-ability-list').append(`<li>${capitalizeFirstLetter(pokemon.ability.name)} (Hidden Ability)</li>`);
                    } else {
                        $('.pokemon-ability-list').append(`<li>${capitalizeFirstLetter(pokemon.ability.name)}</li>`);
                    }
                })

                loadDescription(id);
                loadEvoltionTree(id);
                drawStats();
                $('#current-sprite').css({ "filter": `drop-shadow(4px 4px 0 ${color}) drop-shadow(-4px -4px 0 ${color})` });
                console.log(data);
            }
        });
    }

    function loadDescription(id) {
        let url = `https://pokeapi.co/api/v2/pokemon-species/${id}`;
        $.ajax({
            url: url,
            success: function (data) {
                console.log("desc");
                console.log(data);
                console.log(data.evolves_from_species);
            }
        });
    }

    function loadEvoltionTree(id) {
        let url = `https://pokeapi.co/api/v2/evolution-chain/${id}`;
        $.ajax({
            url: url,
            success: function (data) {
                console.log("tree");
                console.log(data);
                console.log(data.evolves_from_species);
            }
        });
    }



    loadPokemonDetails(id);

    $('#button-prev,#prev-sprite').each(function () {
        $(this).on('click', function () {
            if (id > 1) {
                window.location.href = 'detail.html?id=' + (id - 1);
            }
        });
    });

    $('#button-next,#next-sprite').each(function () {
        $(this).on('click', function () {
            if (id < 898) {
                window.location.href = 'detail.html?id=' + (id + 1);
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
            if (id > 1) { window.location.href = 'detail.html?id=' + (id - 1); }
        } else if (e.keyCode == 39 || e.keyCode == 68) {
            if (id < 898) { window.location.href = 'detail.html?id=' + (id + 1); }
        }
    })
});