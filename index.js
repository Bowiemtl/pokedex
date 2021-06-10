$(document).ready(function () {
    let params = (new URL(window.location.href)).searchParams;
    let offsetParam = params.get('offset');
    let offset = typeof offsetParam !== undefined && !isNaN(offsetParam) ? offsetParam : 0;


    function loadPokemon() {
        $('.pokemon-wrapper').empty();

        let url = `https://pokeapi.co/api/v2/pokemon?offset=${offset * amount}&limit=${amount}`;
        $.ajax({
            url: url,
            success: function (data) {
                console.log(data);
                $('.pokemon-wrapper').empty();
                $.each(data.results, function (i) {
                    let pokemonID = offset * amount + i + 1;
                    $('.pokemon-wrapper').append(`<div class="pokemon-container" id="${pokemonID}"></div>`);
                    $(`#${pokemonID}`).append(`<p>${pokemonID}. ${capitalizeFirstLetter(data.results[i].name)}</p>`);
                    $(`#${pokemonID}`).append(`<img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonID}.png">`);
                });
            }
        });
    }

    loadPokemon();

    $('#button-next').on('click', function () {
        if (offset * amount + amount < 1118) {
            offset++;
            loadPokemon();
        }
    });

    $('#button-prev').on('click', function () {
        if (offset > 0) {
            offset--;
            loadPokemon();
        }
    });

    $(document).on('click', '.pokemon-container', function () {
        let id = $(this)[0].id;
        window.location.href = 'detail.html?id=' + id;

    });
});