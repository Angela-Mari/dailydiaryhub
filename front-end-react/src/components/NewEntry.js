import React from 'react';

const button = {
    borderColor : "transparent",
    backgroundColor : "white",
    borderRadius : 20,
    margin : 5,
    paddingRight: 10,
    paddingLeft: 10
}

class NewEntry extends React.Component {
    constructor (props) {
        super()
        this.state = {
            title : props.title,
            date : props.date,
            text : props.text
        }
        this.handelChange = this.handelChange.bind(this)
        this.submiter = this.submiter.bind(this)
    }

    handelChange(event) {
        const {name, value} = event.target
        this.props.updateValue({[name] : value})
    }

    
    submiter(event){
        event.preventDefault()
        var myObject = {_id: "", title: "", date: "", text: ""}
            myObject._id = this.props.id
            myObject.title = this.props.title
            myObject.date = this.props.date
            myObject.text = this.props.text
        this.props.submitHandler(myObject)      
    }

    
    render () {

        const NewEntryContainer = {
            display: "flex",
            flexDirection: "column",
            paddingTop : 20,
            paddingLeft : 20,
            paddingRight : 20
        }

        return (
            <form style = {NewEntryContainer}>
                <h2>Write Entry</h2>
                
                <p>
                    <label for = "newTitle">Title:  </label>
                    <input style = {{borderColor : "transparent", borderRadius : 10}}type="text" name= "title" value = {this.props.title} onChange = {this.handelChange} />
                </p>
                
                <p>
                    <label for = "newDate">Date: </label>
                    <input style = {{borderColor : "transparent", borderRadius : 10}}type="date" name= "date" id="newDate" value = {this.props.date} onChange = {this.handelChange}/>
                </p>
                
                <p> 
                    <textarea style = {{borderColor : "transparent", borderRadius : 10}}name="text" rows="7" value = {this.props.text} onChange = {this.handelChange}/>
                    <button style = {button}onClick = {this.submiter}>Done</button>
                </p>
                
            </form>

        )
    }
}

export default NewEntry