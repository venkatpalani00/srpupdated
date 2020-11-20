import React from 'react';
import {useState,useEffect} from 'react'
import {Form,Input,Button, Segment, Label, Grid, Icon,Image} from 'semantic-ui-react';
import {Redirect} from 'react-router-dom'
import logo from '../components/logo.png'
import _ from 'lodash'

const Farm = () =>{
    const [lsend,setL]=useState(0)

    const [crop,setCrop]=useState("");
    const [cost,setCost]=useState(0);
    const [quantity,setQuan]=useState(0);

    const [count,setC]=useState(0)
    const [flag,setF]=useState(0)

    const [dat,setData]=useState([])
    const [far,setFar]=useState([]) 
    const [ph,setPh]=useState(0)
    
    const [phone,setP]=useState(0)
    const [mail,setMail]=useState('')

    const [State_name,setStatename]=useState(0);
    const [District,setDistrict]=useState(0);
    const [Crop_sown,setCropsown]=useState(0);
    const [Season,setSeason]=useState(0)
    const [Area,setArea]=useState(0)

    const [predict,setPredict]=useState(0)
    const [fl1,setFl1]=useState(0)

    useEffect(()=>{
        fetch('/order').then(response => response.json().then(
            data=>{
                setData(data)
                for(let i=0;i<data.length;i++){
                    console.log(data[i]['fname'])
                    if(data[i]['fname']==sessionStorage.getItem('mine')){
                        console.log(data[i])
                        setC(1);
                        break;
                    }
                }
                console.log(data)
            }
        ))
    },[])
    useEffect(()=>{
        fetch('/farmer').then(response => response.json().then(
            data=>{
                setFar(data)
                for(let i=0;i<data.length;i++){
                    console.log(data[i]['farm'])
                    if(data[i]['farm']==sessionStorage.getItem('mine')){
                        console.log(data[i])
                        setF(1);
                        break;
                    }
                }
                console.log(data)
            }
        ))
    },[])    

    useEffect(()=>{
        fetch('/phone').then(response => response.json().then(
            data=>{
                setPh(data)
                console.log(data)
            }
        ))
    },[])    

    const fun = () =>{
        sessionStorage.removeItem('mine')
        setL(1);
    }

    return(
        <div>
            {
               lsend==1?<Redirect to='' />:'' 
            }
    hi {sessionStorage.getItem('mine')}
    <center>
    <Image src={logo} size='small'/>
    <Segment  style={{fontSize:'30px',fontFamily:'impact',color:'#0000A0'}}>FARMERS GUIDE</Segment>
    <Button style={{float:'right'}} onClick={fun} color="inverted red">LOGOUT</Button><br /><br />
    <Label raised rectangle container color='deep pink' justify='center' style={{fontSize:'20px'}}>SELL YOUR CROPS</Label><br /><br />
    <Form>
        <Form.Field width={6} >
            <Input label='Crop Name' size='small' placeholder="Crop name" value={crop} onChange={e=>setCrop(e.target.value)}/>
        </Form.Field>
        <Form.Field  width={6} >
            <Input placeholder="Cost" label="cost" value={cost} onChange={e=>setCost(e.target.value)}/>
        </Form.Field>
        <Form.Field  width={6} >
            <Input label="Quantity" placeholder="Quantity" value={quantity} onChange={e=>setQuan(e.target.value)}/>
        </Form.Field>
        <Form.Field>
    
        <Button
            onClick={
                async()=>{
                    const farm=sessionStorage.getItem('mine');
                    const use={crop,cost,quantity,farm};
                    const response = await fetch("/add_farmer",{
                        method:"POST",
                        headers:{
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(use)
                    });

                    if(response.ok){
                        console.log(far)
                        var temp=far;
                        temp.push({'cost':cost,'crop':crop,'farm':farm,'quantity':quantity})
                        setCrop('')
                        setCost(0)
                        setQuan(0)
                        setFar(temp)
                    }
                }
            }
            style={{fontSize:'15px'}}
    >Go<Icon name='arrow alternate circle right outline' /></Button>
        </Form.Field>
    </Form>
    </center><br />


    <Grid columns='equal'>
    <Grid.Row>
    <Grid.Column>
    <center><Label color='violet' style={{fontSize:'15px'}}>SEE ORDERS FOR YOU</Label></center>
    {
    <Segment color='teal' inverted raised style={{overflow: 'auto', maxHeight: 250 }}>
        {   count==1?
            dat.map((dat,ind)=>
            <div>
            {
            dat['fname']== sessionStorage.getItem('mine') && ph!=0?
            <center>
                <Segment raised circular container color='orange' justify='center'>
                    <Grid columns='equal'>
                        <Grid.Row>
                    <Grid.Column ><div>CROP NAME : <b>{_.capitalize(dat['cname'])}</b></div></Grid.Column>
                    <Grid.Column >COST : {dat['cost']} </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                    <Grid.Column>Quantity wanted : {dat['quantity']}</Grid.Column>
                   <Grid.Column> Customer name: {_.capitalize(dat['cus_name'])}</Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                    <Grid.Column>Customer Contact Number : {ph[dat['cus_name']]['phone']}</Grid.Column>
                   <Grid.Column> Customer Mail ID : {ph[dat['cus_name']]['mail']}</Grid.Column>
                    </Grid.Row>
                    </Grid>
                </Segment>
            </center>:''
            }
            </div>
            )
            :<div style={{fontSize:'30px'}}><center><b>No Orders for you yet</b></center></div>
         }
    </Segment>
}

    </Grid.Column>

    <Grid.Column>
    <center><Label color='purple' style={{fontSize:'15px'}}>SEE YOUR CROPS</Label></center>
    <Segment color='yellow' inverted raised style={{overflow: 'auto', maxHeight: 250 }}>
        {    flag==1?  
            far.map((dat,ind)=>
            <div>
            {dat['farm']== sessionStorage.getItem('mine')?
            <center>
                <Segment raised circular container color='orange' justify='center'>
                    <Grid columns='equal'>
                        <Grid.Row>
                    <Grid.Column ><div>CROP NAME : <b>{_.capitalize(dat['crop'])}</b></div></Grid.Column>
                    <Grid.Column >ID : {dat['id']} </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                     <Grid.Column >COST : {dat['cost']} </Grid.Column>
                    <Grid.Column>Quantity wanted : {dat['quantity']}</Grid.Column>
                    </Grid.Row>
                    </Grid>
                </Segment>
            </center>:''
            }
            </div>
            ):<div style={{fontSize:'30px'}}><center><b>No Crops added yet</b></center></div>
         }
    </Segment>
    </Grid.Column>
    </Grid.Row>
    </Grid>
    {/*hrithik*/}
    <center>
        <br /><br />
    <Label style={{fontSize:'15px'}}>Enter data</Label><br /><br />
    <Form>
        <Form.Field width={6} >
            <Input label='State_name' size='small' placeholder="Enter state name" value={State_name} onChange={e=>setStatename(e.target.value)}/>
        </Form.Field>
        <Form.Field  width={6} >
            <Input placeholder="District" label="District" value={District} onChange={e=>setDistrict(e.target.value)}/>
        </Form.Field>
        <Form.Field  width={6} >
            <Input label="Crop_sown" placeholder="Enter Crop sown" value={Crop_sown} onChange={e=>setCropsown(e.target.value)}/>
        </Form.Field>
        <Form.Field width={6} >
            <Input label='Season' placeholder="Enter Season" value={Season} onChange={e=>setSeason(e.target.value)}/>
        </Form.Field>
        <Form.Field  width={6} >
            <Input placeholder="area" label="Area(in acres)" value={Area} onChange={e=>setArea(e.target.value)}/>
        </Form.Field>
    <Form.Field>
        <Button
            onClick={
                async()=>{
                    setFl1(2)
                    const farm=sessionStorage.getItem('mine');
                    const use={State_name,District,Crop_sown,Season,Area};
                    const response = await fetch("/ml",{
                        method:"POST",
                        headers:{
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(use)
                    });
                    if(response.ok){
                       response.json().then(
                           data=>{
                               console.log(data);
                               setPredict(data)
                               setFl1(1)
                           }
                       )
                    }
                }
            }
            style={{fontSize:'15px'}}
    >Go<Icon name='arrow alternate circle right outline' /></Button>
        </Form.Field>
    </Form>
    {
        fl1==1?
        <h1>
        <Segment raised container compact color='violet' justify='center'>
        <Label as='a' color='red' >YOUR RESULTS</Label>
        <h1>Production is expected to be {predict["production"]} tons</h1>
        </Segment>
    <Segment raised container compact color='violet' justify='center'>{predict["IsGood"]==0?<h3>Your crop is not good.<br />Suggested crop is <h2 style={{fontFamily:'Georgia',color:'violet'}}>{predict["BestCrop"]}</h2></h3> :<h3>Your crop is a better crop.</h3>}</Segment>
        </h1>
        :fl1==2?<h1>This will take some time...PLEASE WAIT</h1>:''
    }
    </center>
    </div>

    )
}

export default Farm