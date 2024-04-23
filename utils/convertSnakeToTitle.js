export const convertSnakeToTitle = (snakeCase, capitaliseEveryFirstLetter=true) => {
    //split up snake case string into array
    let words = snakeCase.split('_');

    //iterate through words and capitalize first letter
    if (capitaliseEveryFirstLetter){
        for (let i = 0; i < words.length; i++) {
            words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
        }
    }

    //join words back together with space
    return words.join(' ');
}