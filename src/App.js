import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import PairingList from "./components/PairingList";
import Menu from "./components/Menu";
import Flavors from "./data/veg_flavorbible";
import MatchCards from "./components/MatchCards/MatchCards";
import {removeJunk, removeEmpties} from "./workers/removeJunk";
import {getPairsforLevel, getPairsforSession}  from "./workers/getters";

// list of items

class App extends Component {
    constructor(props) {
        super(props);
        //this line makes sure that 'this.Onclick' is always gonna be bound and trigger 'onClick' method
        this.onClick = this.onClick.bind(this);

        this.state = {
            selected: '',
            ingredients_list: [],
            pairs: [],
            timer: 0,
            chosenCards: [],
            cardNodes:[],
            menu:null,
            game:
                {
                    pairing_card: "",
                    pairing_card_name:"",
                    paired_card: "",
                    pairing_card_pulled: false,
                    paired_card_pulled: false,
                    paired_card_name:"",
                    correctMatches: 0,
                    wrongMatches:0
                }
        };
        console.log("state set")
    }


    async componentDidMount() {
        // const res = await axios.get('/artists.json');
        const FlavorsList = Object.values(Flavors);
        const simpleList = FlavorsList.map((flavor,i) => {
            var name = removeJunk(flavor.name);
            return(name)
        });

        // const { selected } = this.state;
        // Create menu from items
        // const menu = Menu(simpleList, selected);
        const menu = Menu(simpleList);
        const ingredientPairsList = <PairingList data={menu}/>
        const pairs = getPairsforSession(FlavorsList);
        const chosenPairs = getPairsforLevel(12,removeEmpties(pairs));
        const divCards = <MatchCards chosenCards={chosenPairs} onClick={this.onClick} pairs={pairs}/>;

        this.setState({
            ingredients_list: simpleList,
            pairs: pairs,
            chosenCards: chosenPairs,
            cardNodes: divCards,
            ingredientPairsList: ingredientPairsList
        });



        this.timerID = setInterval(
            () => this.tick(),
            1000
        );

        console.log("component did mount")
    }





        onClick =  (chosenKey, state ) => {
            let divs =  Array(document.getElementsByClassName('card'));
             divs =  Array.from(divs[0])
            console.log(divs);

            console.log(divs.indexOf(chosenKey.target)); //returns a number
            const thisCardIndex = divs.indexOf(chosenKey.target);


            chosenKey.preventDefault();



            const card = chosenKey.target;
            let game=this.state.game;
            console.log(card.classList);


            //handles if the MAIN CARD to compare hasn't been set
            if (game.pairing_card_pulled === false && game.pairing_card_pulled === false)  {

                card.classList.add('picked');

                this.setState(
                        ({...this.state, game: {...this.state.game, pairing_card_pulled: true, pairing_card_name: card.innerText, pairing_card: card.classList[1]}}),
                        () => {console.log("Pairing card just flipped: " + this.state.game.pairing_card_name)}
                    );
            }
            //handles if we already have a card to compare to :: The MAIN CARD
            else if (game.pairing_card_pulled === true) {

                if(!Array.from(card.classList).includes('picked')){
                    card.classList.add('picked');

                }

                this.setState(({
                    ...this.state, game: {
                        ...this.state.game,
                        paired_card_name: card.innerText,
                        paired_card: card.classList[1],
                        paired_card_pulled: true,
                    }


                }), () =>
                    {
                        console.log("Paired card just flipped: " + this.state.game.paired_card_name);
                        if((this.state.game.paired_card_name !==  this.state.game.pairing_card_name)  ){

                            if(this.state.game.pairing_card === this.state.game.paired_card) {
                                console.log("Match case >> " + this.state.game.pairing_card+ "::" +this.state.game.paired_card)
                                // console.log(this.state.game.pairing_card+" is not " +  this.state.game.paired_card)

                                this.setState((prevState)=>({
                                    ...this.state, game: {
                                        ...this.state.game,
                                        correctMatches: Number(prevState.game.correctMatches) + 1,
                                        pairing_card_pulled: false,
                                        paired_card_pulled: false,
                                        pairing_card: "",
                                        pairing_card_name:"",
                                        paired_card: "",
                                        paired_card_name:""
                                    }

                                }), () => {

                                    console.log("Great! " + game.pairing_card_name + " pairs with " +  game.paired_card_name)
                                })

                            }
                            else if(this.state.game.pairing_card !== this.state.game.paired_card) {


                                this.setState((prevState)=>({
                                    ...this.state, game: {
                                        ...this.state.game,
                                        wrongMatches: Number(prevState.game.wrongMatches) + 1,
                                    }


                                }), () => {

                                    console.log("Wrong Pick! " + game.pairing_card_name + " does not pair with " +  game.paired_card_name)

                                });





                            }
                            else{
                                console.log("This else should never get reached")
                            }



                        }

                        else{

                            //SAME CARD WAS PICKED BEFORE FINDING MATCH. THIS WILL RESET YOUR CHOSEN CARD !!!
                            console.log("You picked the same main card, this should reset main card");

                            divs.map( (div)=>{
                                // console.log(div.childNodes[0], this.state.game.pairing_card_name);
                                const divText = div.childNodes[0].innerText;
                                if (divText === this.state.game.pairing_card_name) {
                                    div.classList.remove('picked')
                                }
                            });

                            this.setState(()=>({
                                ...this.state, game: {
                                    ...this.state.game,
                                    pairing_card_pulled: false,
                                    pairing_card: "",
                                    pairing_card_name:"",
                                    paired_card: "",
                                    paired_card_name:""
                                }
                            }), () => {

                                console.log("Card Reset")
                            })

                        }


                    }
                )
            }





        };




    async  componentDidUpdate(nextProps, nextState, nextContext) {

       if((this.state.game.pairing_card_name !== nextState.game.paired_card_name) && this.state.game.pairing_card !== "" && (nextState.game.paired_card === this.state.game.pairing_card) ){

       }
   }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({
            timer: this.state.timer +1
        });
    }
    render() {

    return (
      <div className="App">
          <header>
              {this.state.ingredientPairsList}

          </header>
        <main className="card_container">
            {this.state.cardNodes}
        </main>
          <footer className='pairing_list'>
              <p>Pairing name: {this.state.game.pairing_card_name} </p>
              <p>Paired name: {this.state.game.paired_card_name} </p>
              <p>correct matches: {this.state.game.correctMatches}</p>
              <p>wrong matches: {this.state.game.wrongMatches}</p>
              <p>Time: {this.state.timer}</p>
          </footer>
      </div>
    );
  }
}

export default App;
