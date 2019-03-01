const removeJunk = (string) => {
    let fname = string
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
        // console.log(fname.split(","))

        fname = fname.split(",")[1] + " " +fname.split(",")[0]
        // console.log(fname)
    }
    return(fname)
};

export default removeJunk;


export const removeEmpties = (pairs) =>{

    //remove all the empty values
    for( var i = pairs.length-1; i--;){
        // console.log(this.state.pairs[i])
        if( pairs[i] === 'empty') pairs.splice(i, 1);//removes the element from the array
    }
    return pairs

};

