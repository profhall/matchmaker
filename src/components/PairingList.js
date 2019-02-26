import React from 'react';

import ScrollMenu from "react-horizontal-scrolling-menu";

const PairingList = (props) => {
    // const { selected } = props.selected;
    // Create menu from items
    // const menu = Menu(list, selected);
    console.log(props.data)
    return (
        <div className="scrollmenu">
            <ScrollMenu
                data={props.data}
                // arrowLeft={ArrowLeft}
                // arrowRight={ArrowRight}
                selected={props.selected}
                onSelect={props.onSelect}
            />
        </div>
    );
};

export default PairingList;
