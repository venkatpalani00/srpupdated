import React from 'react';
import {Redirect} from 'react-router-dom'
import _ from 'lodash'
import {useState,useEffect} from 'react';
import { List,Segment, Grid ,Input,Form,Button,Icon,Image } from 'semantic-ui-react';
import logo from '../components/logo.png'

const Farm = () =>{


    const [farm,setFarm]=useState([])
    const [fname,setFname]=useState('')
    const [id,setID]=useState(0)
    const [cname,setCname]=useState('')
    const [cost,setCost]=useState(0)
    const [quant,setQuan]=useState(1)
    const [quant1,setQuan1]=useState(0)
    const [cost1,setCost1]=useState(0)

    const [ph,setPh]=useState(0);

    const [l,setL]=useState(0)
   // const []

    const setValues = (index) =>{
        console.log(farm[index]['cost'])
        setFname(farm[index]['farm'])
        setID(farm[index]['id'])
        setCname(farm[index]['crop'])
        setCost(farm[index]['cost'])
        setCost1(farm[index]['cost'])
        setQuan(farm[index]['quantity'])
        setQuan1(farm[index]['quantity'])
    }

    const upCost = (e) =>{
        var a=e.target.value*cost1
        console.log(a)
        var b=a/quant1
        console.log(b)
        setCost(b)
        setQuan(e.target.value)
        setCost(b)
    }

    const fun = () =>{
        sessionStorage.removeItem('mine')
        setL(1);
    }

    useEffect(()=>{
        fetch('/farmer').then(response => response.json().then(
            data=>{
                setFarm(data)
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

    return(
    <div>
        <center>
    <Image src={logo} size='small'/>
    <Segment  style={{fontSize:'30px',fontFamily:'impact',color:'#0000A0'}}>FARMERS GUIDE</Segment>
    </center>
        {
            l==1?<Redirect to='' />:'' 
        }
        hi {sessionStorage.getItem('mine')}
        {
        <center>
        <Button style={{float:'right'}} onClick={fun} color="inverted red">LOGOUT</Button><br/><br/>
        <Segment raised>
        <Form style={{fontSize:'20px',fontFamily:'Arial',color:'black'}} >
            <Form.Field>
                <h1>PLACE AN ORDER</h1>
            </Form.Field>
            <Form.Group widths='equal'>
            <Form.Field width={3} >
                <label>Customer Name</label>
                <Form.Input error value={sessionStorage.getItem('mine')} placeholder='Customer Name' readOnly/>
            </Form.Field>
            <Form.Field width={3} >
                <label>Farmer Name</label>
                <Form.Input error value={fname} placeholder='Farmer Name' readOnly/>
            </Form.Field>
            </Form.Group>
            <Form.Group widths='equal'>
            <Form.Field width={3} >
                <label>Cost per Unit</label>
                <Form.Input error value={cost/quant} placeholder='Cost per unit' readOnly/>
            </Form.Field>
            <Form.Field width={3} >
                <label>Crop Name</label>
                <Form.Input error value={cname} placeholder='Crop Name' readOnly/>
            </Form.Field>
            </Form.Group>
            <Form.Group widths='equal'>
            <Form.Field width={3} >
                <label>Quantity in kgs</label>
                <Input value={quant} placeholder='Quantity' onChange={(e)=>upCost(e)}/>
            </Form.Field>
            <Form.Field width={3} >
                <label>Cost</label>
                <Form.Input error value={cost} placeholder='Cost' readOnly/>
            </Form.Field>   
            </Form.Group>   
            <Form.Field>
            <Button
            onClick={
                async()=>{
                    var cus_name=sessionStorage.getItem('mine');
                    const use={cname,fname,cost,quant,id,cus_name};
                    const response = await fetch("/add_order",{
                        method:"POST",
                        headers:{
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(use)
                    });
                    if(response.ok){
                        console.log("inserted")
                        setFname('')
                        setID(0)
                        setCname('')
                        setCost(0)
                        setQuan(0)
                    }
                    else{
                    }
                }
            }
            >Go<Icon name='arrow right' /></Button>    
            </Form.Field>      
       </Form>
       </Segment>
       </center>
       }
       <center><br /> <h1>PURCHASE CROPS</h1>
        {console.log(farm[0])}
        <Grid columns={3} padded>
        {
            farm.map((far,ind)=>
            ph!=0?
            <center>
                <Grid.Column>
                
                <Segment onClick={()=>setValues(ind)} circular compact raised container color='orange' justify='center'>
                    <center>CROP NAME : <b>{_.capitalize(far['crop'])}</b></center>
                    COST : {far['cost']} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    Quantity available : {far['quantity']}<br /><br />
                    <center>Farmer name: {_.capitalize(far['farm'])}<br />
                    Farmer Mail ID : {ph[far['farm']]['mail']}<br />
                    Farmer Contact Number : {ph[far['farm']]['phone']}</center>
                </Segment><br />
                </Grid.Column>
            </center>:''
            )
        }
        </Grid>
        </center>   
    </div>
    )
}

export default Farm