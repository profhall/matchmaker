import React from 'react';
import './MatchCards.css';



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
    let chosenCards=props.chosenCards;

    console.log(chosenCards)
    const cards = chosenCards.map((card,i) =>
        <div onClick={props.onClick} key={i+100} className={'card c'+i}>
            <span className={'cardText'} >{card.pairer}</span>
        </div>
    )
    cards.push( chosenCards.map((card,i) =>
        <div onClick={props.onClick} key={i+200}  className={'card c' +i} >
            <span className={'cardText'} >{card.thePair}</span>
        </div>)
    )
    const shuf_cards=shuffle(cards)
    return (
        shuf_cards
    )
};


const MatchCards = (props) =>  {

    // pair.a_pair != null ? console.log(pair) : console.log("skip")
    return(
        <MatchCard chosenCards={props.chosenCards} onClick={props.onClick} title={""} pairs={props.pairs} />
        )


    }

export default MatchCards;