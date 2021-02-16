import React from 'react';


function SearchBar(props){

    function changeHandler(event){
        props.searchHandler(event.target.value);
    }

    const style = {
        borderRadius : 50,
        borderColor : "transparent",
        backgroundColor : "powderBlue",
        margin : 20,
        padding : 5
    }
    return (
        <div>
            <input style = {style} type = "text" placeholder = "🔍 search entry..." onChange = {changeHandler} id = "search-bar"/>
        </div>
    )
}

export default SearchBar