import React,{useState, useLayoutEffect} from 'react'
import {Button, Segment, Form,Popup,Grid,Radio,Input,Label,Image,Rail} from 'semantic-ui-react'
import {Redirect} from 'react-router-dom'
import { useEffect } from 'react'
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import i1 from '../components/i1.jpg'
import i2 from '../components/i2.jpg'
import i3 from '../components/i3.jpg'
import Farm from '../containers/farm'

const Home = (props) =>{

const [fl,setFl]=useState(0);
const [fl1,setFl1]=useState(0)
const [sfc,setSfc]=useState("");
const [lsend,setLsend]=useState(0);
const [loguser,setLU]=useState("");
const [logpass,setLP]=useState("")
const [user,setUser]=useState("")
const [password,setPass]=useState("")
const [msg,setMsg]=useState(0)
const [mode,setMode]=useState("")
const [lmsg,setLmsg]=useState(0)
const [users,setUse]=useState({});
const [phone,setPhone]=useState();
const [mail,setMail]=useState("");

const [dat1,setd1]=useState()
const [dat2,setd2]=useState()

useEffect(()=>{
    fetch('/users').then(response => response.json().then(
        data=>{
            setUse(data)
        }
    ))
},[])

const log = () =>{
    setFl1(0)
    setFl(1);
}
const log1 = () =>{
    setFl(0);
    setFl1(1);
}

const login = () =>{
    console.log(loguser)
    sessionStorage.setItem('mine',loguser);
    console.log(logpass)
    loguser=="venkat"?setLsend(1):setLsend(0)
}

return (
    <div>
    {
        lsend==1?<Redirect to='/farm' /> : lsend==2?<Redirect to='/customer' /> :""
    }
    <center>
    {
        msg==1?<div>Successfully signed in... Login to continue</div>:msg==2?<div>Something went wrong...Please try again with alternative username</div>:''
    }
    {
        lmsg==1?<div>Login failed...Try again</div>:''
    }
    <Segment compact style={{fontSize:'20px',fontFamily:'monospace'}}>FARMERS GUIDE</Segment>
    <Segment raised color='teal'>
        <center>
        <Button onClick={log}> LOGIN</Button>
        <Button onClick={log1}>REGISTER</Button>
        </center>
    {fl==1?
        <center>
            <Segment color='pink' container raised compact justify='center'>
            <label>LOGIN</label>
            <Form>
                <Form.Field>
                <label>Username</label>
                <input value={loguser} placeholder='UserName' onChange={e => setLU(e.target.value)} />
                </Form.Field>
                <Form.Field>
                <label>Password</label>
                <input type='password' value={logpass} placeholder='Password' onChange={e => setLP(e.target.value)}/>
                </Form.Field>  
                <Button type='submit' 
                onClick={
                    async()=>{
                        const use={loguser,logpass};
                        const response = await fetch("/login",{
                            method:"POST",
                            headers:{
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(use)
                        });
                        if(response.ok){
                            console.log(users)
                            sessionStorage.setItem('mine',loguser);
                            if(users[loguser]=='farmer'){
                                setLsend(1)
                            }
                                 else
                                setLsend(2)
                            
                        }
                        else{
                           setLmsg(1);
                           setLU("");
                           setLP("");
                           var var1=loguser
                           var user1={...users,[var1] : logpass }
                           console.log(user1)
                        }
                    }
                }
                >Go</Button>
            </Form>
        </Segment></center>:
        fl1==1?
        <center>
        <Segment raised compact>
            <Grid divided columns='equal'>
                <Grid.Column>
                <Popup
                    trigger={<Button color='blue' content='Farmer' fluid />}
                    position='top center'
                    size='tiny'
                    on='click'
                >
                 <center><br/><br/><Segment container raised compact justify='center'>
                        <Form>
                        <Form.Field>
                        <label>Username</label>
                        <Input placeholder='UserName' value={user} onChange={e =>setUser(e.target.value)}/>
                        </Form.Field>
                        <Form.Field>
                        <label>Password</label>
                        <Input type='password' placeholder='Password' value={password} onChange={e => setPass(e.target.value)}/>
                        </Form.Field>
                        <Form.Field>
                        <label>Phone Number</label>
                        <Input placeholder='Phone number' value={phone} onChange={e => setPhone(e.target.value)}/>
                        </Form.Field>
                        <Form.Field>
                        <label>E-mail</label>
                        <Input placeholder='E-mail' type="mail" value={mail} onChange={e => setMail(e.target.value)}/>
                        </Form.Field>
                        <Button
                            onClick={
                                async()=>{
                                    var mode="farmer"
                                    const use={user,password,mode,phone,mail};
                                    const response = await fetch("/add_user",{
                                        method:"POST",
                                        headers:{
                                            "Content-Type": "application/json"
                                        },
                                        body: JSON.stringify(use)
                                    });
                                    if(response.ok){
                                        var user1={...users,[user]:mode}
                                        setMsg(1);
                                        setUser('')
                                        setPass('')
                                        setUse(user1)
                                        setPhone(0);
                                        setMail('');
                                        console.log(users)
                                    }
                                    else{
                                        setMsg(2);
                                        setUser('')
                                        setPass('')
                                        setPhone(0);
                                        setMail('');
                                    }
                                }
                            }
                        >Go</Button>
                    </Form>
                </Segment></center>
                </Popup>
                </Grid.Column>
                <Grid.Column>
                <Popup
                    trigger={<Button color='red' content='Customer' fluid />}
                    position='top center'
                    size='tiny'
                    on='click'
                >
                 <center><br/><br/><Segment container raised compact justify='center'>
                        <Form>
                        <Form.Field>
                        <label>Username</label>
                        <Input placeholder='UserName' value={user} onChange={e =>setUser(e.target.value)}/>
                        </Form.Field>
                        <Form.Field>
                        <label>Password</label>
                        <Input type='password' placeholder='Password' value={password} onChange={e => setPass(e.target.value)}/>
                        </Form.Field>
                        <Form.Field>
                        <label>Phone Number</label>
                        <Input placeholder='Phone number' value={phone} onChange={e => setPhone(e.target.value)}/>
                        </Form.Field>
                        <Form.Field>
                        <label>E-mail</label>
                        <Input placeholder='E-mail' type="mail" value={mail} onChange={e => setMail(e.target.value)}/>
                        </Form.Field>
                        <Button
                            onClick={
                                async()=>{
                                    var mode="customer"
                                    const use={user,password,mode,phone,mail};
                                    const response = await fetch("/add_user",{
                                        method:"POST",
                                        headers:{
                                            "Content-Type": "application/json"
                                        },
                                        body: JSON.stringify(use)
                                    });

                                    if(response.ok){
                                        var user1={...users,[user]:mode}
                                        setMsg(1);
                                        setUser('')
                                        setPass('')
                                        setPhone(0);
                                        setMail('');
                                        setUse(user1)
                                    }
                                    else{
                                        setMsg(2);
                                        setUser('')
                                        setPass('')
                                        setPhone(0);
                                        setMail('');
                                    }
                                }
                            }
                       >Go</Button>
                    </Form>
                </Segment></center>
                </Popup>
                </Grid.Column>
            </Grid>
            </Segment></center> 
        :''
    }
    </Segment>
    <br />
    <Grid>
    <AliceCarousel autoPlay infinite autoPlayInterval='2000'>
    <Image width='50px' src={i1} size='big' className="sliderimg"/>
    <Image src={i2} size='big' className="sliderimg"/>
    <Image src={i3} size='big' className="sliderimg"/>
    </AliceCarousel>
    </Grid>        
    <Segment>
        <p>Agricuture is the backbone of India. But recently, crop production in India has very much declined. The major problem in agriculture is the overall decrease in the varieties of crops and livestock produced. In the early years of agriculture, farmers grew a wide variety of crops and raised many different types of livestock. Since the development of industrialized agriculture the number of different types of crops and livestock has decreased.
        In order to help the farmers to identify the most suitable crop for them to have most profit and have wide varieties of crops to be produced, we provide interface to do exactly that. </p>
    </Segment>
    </center>
    </div>
)

}
export default Home;
