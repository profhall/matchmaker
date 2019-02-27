import PairingList from "./PairingList";
import React, { Component } from 'react';



// One item component
// selected prop will be passed
const MenuItem = ({ text, selected }) => {
    // console.log(text + "  " + selected)
    return (
        <div className="menu-item">
            {text}
            {/*{selected}*/}
        </div>
    );
};

// All items component
// Important! add unique key
const Menu = (list) => list.map((flavor,i) => {


    return (
        <MenuItem
            text={flavor}
            key={i}
        />
    );
});

export default Menu;
