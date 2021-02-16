import React from 'react'


const quotesInner = {
    display: 'flex',
    flexDirection: 'column',
    //backgroundColor: 'yellow',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
}

const style = {
    borderRadius : 50,
    borderColor : "transparent",
    margin : 5,
    padding : 5
}

const button = {
    borderColor : "transparent",
    backgroundColor : "white",
    borderRadius : 20,
    margin : 5,
    paddingRight: 10,
    paddingLeft: 10
}

class QuoteForm extends React.Component{
    constructor(props){
        super()
        this.state = {
            quote: "",
            author: ""
        }
        this.submitHandler = this.submitHandler.bind(this)
        this.changeHandler = this.changeHandler.bind(this)
    }

    changeHandler(event){
        const {name, value} = event.target 
        this.setState({[name] : value}    
        )
    }

    submitHandler(){
        this.props.submitQuote(this.state)
    }

    render () {
        return (
            <div style = {quotesInner}>
                <input style = {style} name= "quote" onChange = {this.changeHandler} placeholder = "type new quote" />
                <input style = {style} name= "author" onChange = {this.changeHandler} placeholder = "type author" />
                <button style = {button} onClick = {this.submitHandler}> done </button>
            </div>
        )}

    

    
}

export default QuoteForm


