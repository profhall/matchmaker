import {removeJunk} from "./removeJunk";

export const getPairsforLevel = (howMany, fromThisList) =>{
    let chosenPairs = [];

    for(let i = 0 ; i<howMany ; i++){
        let randNum = Math.floor(Math.random() * Math.floor(fromThisList.length))
        chosenPairs.push(fromThisList[randNum])
    }
    return chosenPairs
};

export const getPairsforSession = (someList) =>{
    let already_used_pairing_ing = [];
    return (
        someList.map( (flav)=>
        {
            let flavor_pair ={};
            if (flav.Ingredients != null){
                let randNum = Math.floor(Math.random() * Math.floor(flav.Ingredients.length-1));
                flavor_pair =
                    {
                        'pairer': removeJunk(flav.name),
                        'thePair': already_used_pairing_ing.includes(flav.Ingredients[randNum]) ? flav.Ingredients[randNum+1].toUpperCase() : flav.Ingredients[randNum].toUpperCase()
                    };
                already_used_pairing_ing.push(flavor_pair.thePair);
                return (flavor_pair)
            }
            else {
                return "empty"
            }

        })
    )

};