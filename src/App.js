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

// list of items

const FlavorsList = Object.values(Flavors);

console.log(FlavorsList);

const removeJunk = (string) => {
    let fname = string
    console.log(fname)

    if (fname.includes('(')) {
        fname = fname.slice(0, fname.indexOf("(") - 1)
    }

    if (fname.includes('and/or')) {
        fname = fname.slice(0, fname.indexOf("and/or") - 1)
    }

    if (fname.includes('or')) {
        fname = fname.slice(0, fname.indexOf("or") - 1)
    }

    if (fname.includes(',') && fname.split(",").length === 2 ) {
        console.log(fname.split(","))

        fname = fname.split(",")[1] + " " +fname.split(",")[0]
        console.log(fname)
    }
    return(fname)
};

const simpleList = FlavorsList.map((flavor,i) => {
    const letter = flavor;
    var name = removeJunk(flavor.name);
    return(name)
});



class App extends Component {
    constructor(props) {
        let already_used_pairing_ing =[]
        super(props);
        //this line makes sure that 'this.Onclick' is always gonna be bound and trigger 'onClick' method
        this.onSelect = this.onSelect.bind(this);

        this.state = {
            selected: '',
            ingredients_list: simpleList,
            pairs: [],
            chosenCards: [],
            pairing_card: null,
            paired_card: null
        };


        this.state.pairs = FlavorsList.map( (flav)=> {
            // console.log(flav.Ingredients != null)
                let flavor_pair ={}
                if (flav.Ingredients != null){
                    let randNum = Math.floor(Math.random() * Math.floor(flav.Ingredients.length-1));
                    flavor_pair =
                        {
                            'flavor': removeJunk(flav.name),
                            'a_pair': already_used_pairing_ing.includes(flav.Ingredients[randNum]) ? flav.Ingredients[randNum+1] : flav.Ingredients[randNum]



                        };

                    already_used_pairing_ing.push(flavor_pair.a_pair)
                    return (
                        flavor_pair
                    )
                }
                else{
                    return "empty"
                }
        }
        );

        for( var i = this.state.pairs.length-1; i--;){
            if ( this.state.pairs[i] === 'empty') this.state.pairs.splice(i, 1);
        }
        let randNum =0
        for(let i = 0 ; i<12 ; i++){
            randNum = Math.floor(Math.random() * Math.floor(this.state.pairs.length))
            this.state.chosenCards.push(this.state.pairs[randNum])
        }
        console.log(this.state.pairs)
    }


    onSelect = (chosenKey) => {
        // this.setState({ selected: chosenKey });
        console.log( chosenKey.target.classList)
    };

  render() {

       const { selected } = this.state;
      // Create menu from items
      const menu = Menu(simpleList, selected);

    return (
      <div className="App">
          <header>
              <PairingList
                  data={menu}
                  // onSelect={this.onSelect}
                  // selected={this.state.selected}
              />
          </header>
        <main className="card_container">
            <MatchCards chosenCards={this.state.chosenCards} onClick={this.onSelect} pairs={this.state.pairs}/>
        </main>
          <footer className='pairing_list'>
              <p>matches</p>
              <p>Score</p>
              <p>level</p>
          </footer>
      </div>
    );
  }
}

export default App;
