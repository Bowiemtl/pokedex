$(document).ready(function () {
    let amount = 20;
    let params = (new URL(window.location.href)).searchParams;
    let id = parseInt(params.get('id'));

    function loadPokemonDetails(id) {
        let url = `https://pokeapi.co/api/v2/pokemon/${id}`;
        $.ajax({
            url: url,
            success: function (data) {
                stats = data.stats;
                color = getColorFromType(data.types[0].type.name);
                invertedColor = invertColor(color);

                $('.name-header .fas').css('color', invertedColor);
                //$(document.body).css('background', `linear-gradient(180deg, ${color} 0%, ${invertedColor} 100%)`);
                $(document.body).css('background',  color);

                $('.pokemon-detail-wrapper .name-header .pokemon-general').append(`<img class="pokemon-sprite" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png">`);
                $('.pokemon-number').html("#" + id);
                $('.pokemon-name').html(capitalizeFirstLetter(data.name));
                drawStats();
                console.log(data);
            }
        });
    }

    loadPokemonDetails(id);

    $('#button-next').on('click', function () {
        if (id < 1118) {
            window.location.href = 'detail.html?id=' + (id + 1);
        }
    });

    $('#button-prev').on('click', function () {
        if (id > 1) {
            window.location.href = 'detail.html?id=' + (id - 1);

        }
    });

    $('#button-back').on('click', function () {
        if (id > 0) {
            window.location.href = 'index.html?offset=' + Math.floor(id % amount == 0 ? (id / amount) - 1 : id / amount);
        }
    });
});