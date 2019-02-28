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
        this.onSelect = this.onSelect.bind(this);

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
                    pairing_card: null,
                    paired_card: null,
                    pairing_card_pulled: false,
                    pairing_card_name:null,
                    paired_card_name:null,
                    correctMatches: 0,
                    wrongMatches:0
                }

        };
        // console.log(this.state.pairs)
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
                        'thePair': already_used_pairing_ing.includes(flav.Ingredients[randNum]) ? flav.Ingredients[randNum+1] : flav.Ingredients[randNum]
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
        const divCards = <MatchCards chosenCards={chosenPairs} onClick={this.onSelect} pairs={pairs}/>;

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





    async onSelect (chosenKey, state )  {
            // const game ={...this.state.game}
            console.log(chosenKey.target.classList);
            if (this.state.game.pairing_card_pulled === false) {
                // this.setState({ pairing_card_pulled: true });

                const matchKey = chosenKey.target.classList[1];
                const matchName = chosenKey.target.innerText;
                this.setState(()=>({
                    ...state,
                    game:{
                        pairing_card_pulled: true,
                        pairing_card: matchKey,
                        pairing_card_name: matchName
                    }
                }));
                console.log("pairing card selected :"+ this.state.game.pairing_card);

            }
            else{

                const matchKey = chosenKey.target.classList[1];
                const matchName = chosenKey.target.innerText;

                this.setState(()=>({
                    ...state,
                    game:{
                        paired_card: matchKey,
                        paired_card_name: matchName
                    }
                }));

                console.log("paired card pulled :"+ this.state.game.paired_card);

            }


            if ((this.state.game.paired_card === this.state.game.pairing_card) && this.state.game.pairing_card_name !== this.state.game.paired_card_name){
                console.log("PAIR!");
                this.state.game.pairing_card_pulled=false;
                this.state.game.correctMatches+=1;
                // this.setState(checkMatch(true))
            }
            else{
                this.state.game.wrongMatches+=1;
                // this.setState(checkMatch(false))
            }
        };




    //
   // async componentDidUpdate(nextProps, nextState, nextContext) {
   //
   //     if(nextState.game.paired_card === this.state.game.pairing_card ){
   //         console.log(
   //             "next State of pairing card " + nextState.game.pairing_card_name +
   //             " \ncurrent State of pairing card "  +  this.state.game.pairing_card_name +
   //
   //             "\n\nnext State of paired card " + nextState.game.paired_card_name +
   //             " \ncurrent State of paired card "  +  this.state.game.paired_card_name
   //         );
   //
   //     }
   // }

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
              <p>Pairing key: {this.state.game.pairing_card} </p>
              <p>Paired name: {this.state.game.paired_card_name} </p>
              <p>Paired key: {this.state.game.paired_card} </p>
              <p>correct matches: {this.state.game.correctMatches}</p>
              <p>wrong matches: {this.state.game.wrongMatches}</p>
              <p>Time: {this.state.timer}</p>
              <p>level</p>
          </footer>
      </div>
    );
  }
}

export default App;
