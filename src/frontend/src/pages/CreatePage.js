import React, {useState} from "react";
import {Button, InputLabel, Tab, Tabs, TextField} from "@mui/material";
import ReactMarkdown from "react-markdown";
import axios from "axios";
import {useNavigate} from "react-router";
import Lottie from "react-lottie-player";
import writerAnimation from '../assets/writer.json'

export const CreatePage = ()=>{
    let navigate = useNavigate()

    const [title,setTitle] = useState("")
    const [content,setContent] = useState("")
    const [value,setValue] = useState(0)

    const changeTitle = (event)=>{
        setTitle(event.target.value)
    }

    const changeContent = (event)=>{
        setContent(event.target.value)
    }

    const changeValue = (event,newValue)=>{
        setValue(newValue)
    }

    const handleCreate = ()=>{
        if(title==="" || content===""){
            alert("One or more fields are empty")
            return
        }
        axios({
            url : `${process.env.REACT_APP_API_BASE_URL}/user/${localStorage.getItem("username")}/blog`,
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${localStorage.getItem("jwtToken")}`
            },
            data : {
                "title" : title,
                "content" : content
            }
        })
            .then(response=>{
                navigate(`/blog/${response.data}`)
            })
            .catch(error=>{
                console.log(error)
                alert(error.response.data)
            })
    }

    return (
        <div>
            <div className="flex flex-row items-center justify-center">
                <div className="text-[45px] font-bold my-[20px]">
                    Pour your creativity into words
                </div>
                <Lottie
                    play
                    loop
                    animationData={writerAnimation}
                    className="h-[80px]"
                    />
            </div>
            <div className="mx-[20px] my-[10px]">
                <TextField
                    variant="outlined"
                    value={title}
                    placeholder="Title"
                    fullWidth
                    inputProps={{ style :{textAlign : "center", fontWeight : "bold", fontSize : "30px" , fontFamily : "serif", padding : "10px"}}}
                    onChange={changeTitle}
                />
            </div>
            <div className="mx-[20px] my-[10px] shadow-lg h-[450px] flex flex-col rounded-[10px]">
                <Tabs value={value} onChange={changeValue}>
                    <Tab label="Edit" />
                    <Tab label="Preview" />
                </Tabs>
                {
                    (value===0) ? (
                        <TextField
                            multiline
                            value={content}
                            rows={16}
                            fullWidth
                            onChange={changeContent}
                            placeholder="Your blog"
                        />

                    ) : (
                        <ReactMarkdown
                            className="text-left p-[15px] text-[17px] overflow-y-auto h-[100%] w-[100%]"
                        >
                            {content}
                        </ReactMarkdown>
                    )
                }
            </div>
            <center>
                <Button
                    onClick={handleCreate}
                    style={{fontSize : "22px", margin : "15px"}}
                    variant="outlined"
                >
                    Create
                </Button>
            </center>
        </div>
    )
}