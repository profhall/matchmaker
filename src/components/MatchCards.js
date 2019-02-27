import React from 'react';



let randNum = 0
let randNumList =[]
// props.numberOfCards
var shuffle = function (array) {

    var currentIndex = array.length;
    var temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;

};

const MatchCard = (props) =>  {
    let chosenCards = []
    for(let i = 0 ; i<12 ; i++){
        randNum = Math.floor(Math.random() * Math.floor(props.pairs.length))
        randNumList.push(randNum)
        chosenCards.push(props.pairs[randNum])
    }

    console.log(chosenCards)
    const cards = chosenCards.map((card,i) => <div className={'card '} title={i}>{card.flavor}</div>)
    cards.push( chosenCards.map((card,i) => <div className={'card '} title={i}>{card.a_pair}</div>))
    const shuf_cards=shuffle(cards)
    return (
        shuf_cards
    )
}


const MatchCards = (props) =>  {

    // pair.a_pair != null ? console.log(pair) : console.log("skip")
    return(
        <MatchCard  title={""} pairs={props.pairs} />
        )


    }

export default MatchCards;