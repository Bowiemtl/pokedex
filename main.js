let amount = 20;
let scale = 2;
let stats;
let color;
let invertedColor;
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function remap(input, input_start, input_end, output_start, output_end) {
    return output_start + ((output_end - output_start) / (input_end - input_start)) * (input - input_start);
}

const invertColor = (bg) => {
    bg = parseInt(Number(bg.replace('#', '0x')), 10)
    bg = ~bg
    bg = bg >>> 0
    bg = bg & 0x00ffffff
    bg = '#' + bg.toString(16).padStart(6, "0")

    return bg
}

function getColorFromType(type)
{
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