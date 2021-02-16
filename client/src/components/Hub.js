import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import LogoutButton from './LogoutButton.js';
import DiaryCards from './DiaryCards.js';
import NewEntry from './NewEntry';
import QuoteContainer from './QuoteContainer'
import SocialMedia from './SocialMedia.js';
import SearchBar from './SearchBar'
import axios from 'axios';


function Hub() {
    const { user, isAuthenticated } = useAuth0();
    const mainContent = {
        display: "flex",
        flexDirection: "row",
        alignItems : "flex-start"
    }

    const sidebar = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    }

    const displayEntries = {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start"
    }

      const button = {
        borderColor : "transparent",
        backgroundColor : "white",
        borderRadius : 20,
        margin : 5,
        paddingRight: 10,
        paddingLeft: 10
    }

    const [displayArray, setArray] = React.useState([]);
    const [searchArray, setSearch] = React.useState([])
    const [newTitle, setTitle] = React.useState("");
    const [newDate, setDate] = React.useState("");
    const [newText, setText] = React.useState("");
    const [newId, setId] = React.useState("");

    function submitHandler(myNewEntry) { 
        const dbEntry = {
            username: user.sub, //pass down username from auth0
            title: myNewEntry.title,
            text: myNewEntry.text,
            date:  myNewEntry.date
        }

        if (newId !== "")
        {
            let id = newId;
            axios.post('https://' + document.location.hostname + '/entries/update/' + id, dbEntry)
            .then((response) => {
                console.log(response.data)
                setId("")
                setTitle("")
                setDate("")
                setText("")
                loadProfile()
            })
            .catch((error) => {console.log("could not update")})
            return
        }

        //temp url!
        axios.post('https://' + document.location.hostname + '/entries/add', dbEntry)
            .then((response) => {
                console.log(response.data)
                setArray([...displayArray, myNewEntry])
                setTitle("")
                setDate("")
                setText("")
                loadProfile()
            })
            .catch((error) => {
                alert("You must enter a title, date, and text before you can submit a new entry.")
            })
    }

    function changeHandler(editObject){
        if (editObject.change === "delete"){
            deleteEntry(editObject)
        }
        else {
            editEntry(editObject)
        } 
    }

    function deleteEntry(editObject) {
        let id = editObject.id;
        axios.delete('https://' + document.location.hostname + '/entries/' + id)
            .then(res => {
                console.log(res.data)
                loadProfile()    
            });
    }   

    function editEntry(editObject) {            
        setId(editObject.entry._id)
        setTitle(editObject.entry.title)
        setDate(editObject.entry.date.substring(0,10))
        setText(editObject.entry.text)
    }

    function updateValue(newValue){
        if ("title" in newValue){
            setTitle(newValue.title)
        }
        
        if ("date" in newValue){
            setDate(newValue.date)
        }

        if ("text" in newValue){
            setText(newValue.text)
        }
        
    }
    
    function searchHandler(keyword) {
        if (keyword !== ""){
            setSearch(displayArray.filter((item , i) => { 
                if (displayArray[i].text.includes(keyword) || displayArray[i].title.includes(keyword))
                {
                 return item 
                }
                else return
            }))
        }
        else {
            setSearch([])
        }
    }

    const [main, setHeader] = React.useState()
    const [accent, setSidebar] = React.useState()
    const [profile, setProfile] = React.useState([])
    const [isLoaded, loaded] = React.useState(false)
    const [toggle, toggleThis] = React.useState(false)

    let headerColors = ["pink", "CornflowerBlue", "DarkSeaGreen"]
    let sideColors = ["palevioletred", "aliceBlue", "SeaGreen"]

    function loadProfile() {
        axios.get('https://' + document.location.hostname + '/users')
            .then(response=> {
                console.log(response.data)
                if (response.data.length > 0){
                    let curUser = response.data.filter(function (obj){
                        return obj.username === user.sub;
                    });

                    setProfile(curUser[0])
                    setHeader({backgroundColor : headerColors[profile.theme]})
                    setSidebar({backgroundColor : sideColors[profile.theme]})
                    loaded(true)
                }
                else {
                    const dbUser = {
                        username: user.sub,
                        theme: 1
                    }
                    addUser(dbUser)
                }   
            });
        
        // get entires from db
        axios.get('https://' + document.location.hostname + 'entries')
            .then(response=> {
                console.log(response.data)
                if (response.data.length > 0){
                        let entries = response.data.filter( function(obj) {
                            if (obj.username === user.sub){
                                let entry = {
                                    id : obj._id,
                                    username : obj.username,
                                    title : obj.title,
                                    text: obj.text,
                                    date: obj.date
                                }
                                return entry;
                            }
                            else return
                    })
                    setArray([...entries])    
                }
                else {
                    setArray([...[]])
                }
            })

    }  
    
    function addUser(dbUser) {
        axios.post('https://' + document.location.hostname + '/users/add', dbUser)
        .then((response) => {
            console.log(response.data)
        });

        setProfile(dbUser)
        loaded(true)
    } 

    function cycleTheme(){
        var newIndex = profile.theme+1;
        if (newIndex > 2){
            newIndex = 0
        }

        setProfile({
            _id: profile._id,
            username: profile.username,
            theme: newIndex
          });
        setHeader({backgroundColor : headerColors[newIndex]})
        setSidebar({backgroundColor : sideColors[newIndex]})
        
        let updateDB = {
            username: profile.username,
            theme: newIndex
        }

        axios.post('https://' + document.location.hostname + '/users/update/' + profile._id, updateDB)
      .then(res => console.log(res.data));
    }

    useEffect(()=>{
        if (isAuthenticated){
        loadProfile()
        }
    }, [isAuthenticated, isLoaded]) 
    
    return (
        isAuthenticated && (
            <div>
                    
                <div className = "header" style = {main}>
                    <h1>Daily Diary Hub</h1>
                    <QuoteContainer id = {user.sub}/>
                    <div className = "navBttns">
                        <img src = {user.picture} alt = {user.name} className = "profilePic"/>
                        <LogoutButton />
                        <button style = {button} onClick = {cycleTheme}>
                            Change Theme
                        </button>
                    </div>
                </div>
                <div style = {mainContent}>
                    
                    <div style = {sidebar, accent} className = "side-bar">  
                        <NewEntry title = {newTitle} date = {newDate} text = {newText} id = {newId} submitHandler = {submitHandler} updateValue = {updateValue}/>
                        <SocialMedia />
                    </div >
                    <div style = {displayEntries}>
                        <SearchBar searchHandler = {searchHandler} value = ""/>
                        <DiaryCards entries = {searchArray.length > 0  ? searchArray : displayArray} changeHandler = {changeHandler} />
                    </div>
                    
                </div>
                
            </div>
        )
    )
}

export default Hub