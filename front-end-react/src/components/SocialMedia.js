import React from 'react';
import {FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon} from "react-share";

function SocialMedia(){
    const shareBttns = {
        display : "flex",
        felxDirection: "row",
        //backgroundColor: "yellow",
        //0padding : 20
    }
    return(
        <div style = {shareBttns}>
            <FacebookShareButton 
                url={"https://angelageorge.me"}
                quote={"This is a temporary URL until the site is hosted outside of local host"}
                hashtag="#writeeveryday">
                 <FacebookIcon size={36} />
              </FacebookShareButton>
            <TwitterShareButton
                url={"https://angelageorge.me"}
                title={"This is a temporary URL until the site is hosted outside of local host"}
                hashtags = {["writeeveryday"]}>
                <TwitterIcon size= {36} />
            </TwitterShareButton>
        </div>
    )
}
export default SocialMedia