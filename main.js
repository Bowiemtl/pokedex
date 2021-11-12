let amount = 30;
let scale = 1;
let stats;
let color = [];
let invertedColor = [];

function firstLetterUppercase(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

//return a color based on a pokemon's type
function getColorForType(type) {
    let color;
    switch (type) {
        case "normal":
            color = '#A9A878';
            break;
        case "fighting":
            color = '#C13129';
            break;
        case "flying":
            color = '#98A4E0';
            break;
        case "poison":
            color = '#BD5CA1';
            break;
        case "ground":
            color = '#E7D4A9';
            break;
        case "rock":
            color = '#BEA563';
            break;
        case "bug":
            color = '#A9BD42';
            break;
        case "ghost":
            color = '#6762B2';
            break;
        case "steel":
            color = '#B2ACBD';
            break;
        case "fire":
            color = '#FE4833';
            break;
        case "water":
            color = '#1F93F6';
            break;
        case "grass":
            color = '#74D76A';
            break;
        case "electric":
            color = '#FDC745';
            break;
        case "psychic":
            color = '#FE71A3';
            break;
        case "ice":
            color = '#47CEE4';
            break;
        case "dragon":
            color = '#8567ED';
            break;
        case "dark":
            color = '#765B4A';
            break;
        case "fairy":
            color = '#FDB6F2';
            break;
        default:
            color = '#356abc';
    }
    return color;
}