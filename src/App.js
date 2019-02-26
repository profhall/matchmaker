import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import PairingList from "./components/PairingList";
import Menu from "./components/Menu";
import list from "./data/playData";
import Flavors from "./data/veg_flavorbible";

// list of items

const FlavorsList = Object.values(Flavors);

console.log(FlavorsList);

const simpleList = FlavorsList.map((flavor,i) => {
    const letter = flavor;
    var fname = flavor.name;
    // console.log(letr)
    if (flavor.name.includes('(')) {
        fname = fname.slice(0, flavor.name.indexOf("(") - 1)
    }
    if (flavor.name.includes('and/or')) {
        fname = fname.slice(0, flavor.name.indexOf("and/or") - 1)
    }

    if (flavor.name.includes('or')) {
        fname = fname.slice(0, flavor.name.indexOf("or") - 1)
    }

    return(fname)

});
// console.log(simpleList)

class App extends Component {
    constructor(props) {
        super(props);
        //this line makes sure that 'this.Onclick' is always gonna be bound and trigger 'onClick' method
        this.onSelect = this.onSelect.bind(this);

        this.state = {
            selected: '',
            ingredients_list: simpleList,
            pairs: []
        };

        this.state.pairs = FlavorsList.map( (flav)=> {
            // console.log(flav.Ingredients != null)
            let flavor_pair =
                {
                    'flavor': flav.name,
                    'a_pair': flav.Ingredients != null ?
                        flav.Ingredients[Math.floor(Math.random() * Math.floor(flav.Ingredients.length))]
                    :
                        null
                };
            return (
                flavor_pair
            )
        }
        );
        console.log(this.state.pairs)
    }


    onSelect = (chosenKey) => {
        this.setState({ selected: chosenKey });
        console.log("state is set " + chosenKey)
        console.log( simpleList[chosenKey])
    };

  render() {

      const { selected } = this.state;
      // Create menu from items
      const menu = Menu(simpleList, selected);

    return (
      <div className="App">
          <header>
              <PairingList
                  data={menu} onSelect={this.onSelect} selected={this.state.selected}/>
          </header>
        <main className="card_container">
            <div className="card"></div>
            <div className="card"></div>
            <div className="card"></div>
            <div className="card"></div>
            <div className="card"></div>
            <div className="card"></div>
            <div className="card"></div>
            <div className="card"></div>
            <div className="card"></div>
            <div className="card"></div>
            <div className="card"></div>
            <div className="card"></div>
            <div className="card"></div>
            <div className="card"></div>
            <div className="card"></div>
            <div className="card"></div>
            <div className="card"></div>
            <div className="card"></div>
            <div className="card"></div>
            <div className="card"></div>
            <div className="card"></div>
            <div className="card"></div>
            <div className="card"></div>
            <div className="card"></div>
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
