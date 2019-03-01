import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import PairingList from "./components/PairingList";
import Menu from "./components/Menu";
import list from "./data/playData";
import Flavors from "./data/veg_flavorbible";
import MatchCards from "./components/MatchCards/MatchCards";
import removeJunk from "./workers/removeJunk";

// list of items

class App extends Component {
    constructor(props) {
        super(props);
        //this line makes sure that 'this.Onclick' is always gonna be bound and trigger 'onClick' method
        this.onClick = this.onClick.bind(this);

        console.log("state about to set")
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
        const chosenPairs = [];
        const already_used_pairing_ing =[];
        let randNum =0;
        const simpleList = FlavorsList.map((flavor,i) => {
            const letter = flavor;
            var name = removeJunk(flavor.name);
            return(name)
        });

        // const { selected } = this.state;
        // Create menu from items
        // const menu = Menu(simpleList, selected);
        const menu = Menu(simpleList);
        const ingredientPairsList = <PairingList data={menu}/>

        const pairs = FlavorsList.map( (flav)=> {
            // console.log(flav.Ingredients != null)
            let flavor_pair ={}
            if (flav.Ingredients != null){
                let randNum = Math.floor(Math.random() * Math.floor(flav.Ingredients.length-1));
                flavor_pair =
                    {
                        'pairer': removeJunk(flav.name),
                        'thePair': already_used_pairing_ing.includes(flav.Ingredients[randNum]) ? flav.Ingredients[randNum+1].toUpperCase() : flav.Ingredients[randNum].toUpperCase()
                    };

                already_used_pairing_ing.push(flavor_pair.thePair);
                return (
                    flavor_pair
                )
            }
            else{
                return "empty"
            }
        });

        //remove all the empty values
        for( var i = pairs.length-1; i--;){
            // console.log(this.state.pairs[i])
            if( pairs[i] === 'empty') pairs.splice(i, 1);//removes the element from the array
        }

        for(let i = 0 ; i<12 ; i++){
            randNum = Math.floor(Math.random() * Math.floor(pairs.length))
            chosenPairs.push(pairs[randNum])
        }
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

        this.update = this.update.bind(this);
        console.log("component did mount")
    }





        onClick =  (chosenKey, state ) => {
            chosenKey.preventDefault()
            // const game ={...this.state.game}
            console.log(chosenKey.target.classList);
            const card = chosenKey.target;
            let game=this.state.game;
            //handles if the MAIN CARD to compare hasn't been set
            if (game.pairing_card_pulled === false)  {
                this.setState(({
                    ...this.state, game: {
                        ...this.state.game,
                        pairing_card_pulled: true,
                        pairing_card_name: card.innerText,
                        pairing_card: card.classList[1],
                    }

                }), () => {
                    console.log("Pairing card just flipped: " + this.state.game.pairing_card_name)
                })
            }

            //handles if we already have a card to compare to :: The MAIN CARD
            else if (game.pairing_card_pulled === true) {

                this.setState(({
                    ...this.state, game: {
                        ...this.state.game,
                        paired_card_name: card.innerText,
                        paired_card: card.classList[1],
                    }

                }), () =>
                    {
                        console.log("Paired card just flipped: " + this.state.game.paired_card_name);
                        if((this.state.game.paired_card_name !==  this.state.game.pairing_card_name)  ){

                            if(this.state.game.pairing_card === this.state.game.paired_card) {
                                console.log("Match case >> " + this.state.game.pairing_card+ "::" +this.state.game.paired_card)
                                // console.log(this.state.game.pairing_card+" is not " +  this.state.game.paired_card)

                                game=this.state.game;

                                this.setState((prevState)=>({
                                    ...this.state, game: {
                                        ...this.state.game,
                                        correctMatches: Number(prevState.game.correctMatches) + 1,
                                        pairing_card_pulled: false,
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
                                console.log("wrong pick ")

                                this.setState((prevState)=>({
                                    ...this.state, game: {
                                        ...this.state.game,
                                        wrongMatches: Number(prevState.game.wrongMatches) + 1,
                                    }

                                }), () => {
                                    console.log(game.pairing_card_name + " does not pair with " +  game.paired_card_name)
                                })
                            }
                            else{
                                console.log("This else should never get reached")
                            }
                        }
                        else{
                            console.log("You picked the same main card, this should do nothing");

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
