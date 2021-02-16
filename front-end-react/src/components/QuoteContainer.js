import React from 'react';
import QuoteForm from './QuoteForm';
import axios from 'axios';

const displayQuotes = {
    display: 'flex',
    flexDirection: 'row',
    padding: 20
}

const quotesInner = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
}

const buttonP = {
    border: 2,
    borderStyle: "solid",
    borderLeftColor : "white",
    borderTopColor : "white",
    borderRightColor: "white",
    borderBottomColor: "white",
    backgroundColor : "transparent",
    borderRadius : "0px 20px 20px 0px",
    marginRight : 5,
    paddingRight: 10,
    paddingLeft: 10
}

const buttonM = {
    borderColor : "transparent",
    backgroundColor : "white",
    borderRadius : "20px 0px 00px 20px",
    marginLeft : 5,
    paddingRight: 10,
    paddingLeft: 10
}
  const button = {
    borderColor : "transparent",
    backgroundColor : "white",
    borderRadius : 20,
    margin : 5,
    paddingRight: 10,
    paddingLeft: 10
}

const moveButton = {
    borderColor : "transparent",
    height : 30,
    backgroundColor : "white",
    borderRadius : 20,
    marginTop : 30,
    paddingRight: 10,
    paddingLeft: 10
}

class QuoteContainer extends React.Component{
    constructor () {
        super()
        this.state = {
            
            index: 0,
            length: 0,
            quotes: [],
            didMount: false,
            showMyComponent : true
        }
        this.backupIndex = this.backupIndex.bind(this)
        this.forwardIndex = this.forwardIndex.bind(this)
        this.addQuote = this.addQuote.bind(this)
        this.submitQuote = this.submitQuote.bind(this)
        this.minusQuote = this.minusQuote.bind(this)
        this.loadQuotes = this.loadQuotes.bind(this)
    }

    componentDidMount() {
        this.loadQuotes()
    }

    loadQuotes(){
        let id = this.props.id
        axios.get('http://localhost:5000/quotes')
            .then(response=> {
                if (response.data.length > 0){
                    var temp = 0
                    this.setState({
                        quotes: response.data.filter( function(obj) {
                             if (obj.username === id){
                                 temp++;
                                return obj
                             }
                             else return   
                        }),
                        length: temp,
                        didMount: true,
                        index: 0
                    })
                }
            })
    }

    backupIndex(){
        if (this.state.length === 1){
            return;
        }
        this.setState(prevState => {
            
            if (prevState.index -1 < 0){
                return {
                    index : prevState.length-1
                }
            }
            else {
                return {
                    index : prevState.index - 1
                }
            } 
        })
    }

    forwardIndex(){

        if (this.state.length === 1){
            return;
        }
        
        this.setState(prevState => {
            
            if (prevState.index + 1 === prevState.length){
                return {
                    index : 0,
                }
            }
            else {
                return {
                    index : prevState.index + 1,
                }
            } 
        })
    }

    addQuote(){
        this.setState(prevState => {
            return {
                showMyComponent : !prevState.showMyComponent
            }
        })
    }

    minusQuote(){

        if (this.state.length === 0){
            return
        }
        let id = this.state.quotes[this.state.index]._id;
        axios.delete('http://localhost:5000/quotes/' + id)
            .then(res => {
            console.log(res.data)
            this.setState({didMount: false})
            this.loadQuotes()
        });
    }

    submitQuote(newQuote){
        const dbQuote = {
            username: this.props.id, //pass down username from auth0
            text: newQuote.quote,
            author: newQuote.author
        }

        //temp url!
        axios.post('http://localhost:5000/quotes/add', dbQuote)
            .then((response) => {
                console.log(response.data)

                this.setState(prevState => {
                    return {
                        showMyComponent : !prevState.showMyComponent
                    } 
                })

                this.loadQuotes();  
            })
            .catch(error => {
                alert("you must type a valid quote and author")
            })

        
    }

    render() {
        
        return(
            <div style = {displayQuotes}>
                <button style = {moveButton }onClick = {this.backupIndex}>&lt;</button>
                <div>
                    { this.state.showMyComponent && 
                    <div style = {quotesInner}>
                        <h3>{(this.state.didMount && this.state.length > 0) && this.state.quotes[this.state.index].text} {this.state.length === 0 && "add new quote"}</h3>
                        <h4>- {(this.state.didMount && this.state.length >0) && this.state.quotes[this.state.index].author} {this.state.length === 0 && "by author"}</h4>
                        <p>
                        <button style = {buttonM} onClick = {this.minusQuote}>-</button>
                        <button style = {buttonP} onClick = {this.addQuote}>+</button>
                        </p>
                        
                    </div>
                    }
                    {!this.state.showMyComponent && <QuoteForm submitQuote = {this.submitQuote}/>}
                    
                </div>
                <button style = {moveButton} onClick = {this.forwardIndex}>&gt;</button>
            </div>
        )
    }  
}

export default QuoteContainer