import React, {useState } from "react";
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import '../CSS/TodaysCard.css'
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Time from "./Time";
import WbSunnyOutlinedIcon from '@material-ui/icons/WbSunnyOutlined';
import AcUnitOutlinedIcon from '@material-ui/icons/AcUnitOutlined';
import ArrowDownwardOutlinedIcon from '@material-ui/icons/ArrowDownwardOutlined';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button';

 

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(10),
            width: theme.spacing(140),
            height: theme.spacing(30),
        },
    },
}));





const TodaysCard = (props) => {
    const classes = useStyles();
   // const [val, setVal] = useState(false);
   const[cityName,setcityName]=useState();
   const[rern,setRern]=useState(0);

    const [temp, setTemp] = useState(0);
    const [tempMin, setTempMin] = useState(0);
    const [tempMax, setTempMax] = useState(0);
    const [img, setImg] = useState('')
    const [pressure, setPressure] = useState(0)
    const [humidity, setHumidity] = useState(0)
    const [weather, setWeather] = useState('');
    const [contry, setContry] = useState('');
    const [name, setName] = useState('');
    const [region, setREgion] = useState('');
    const [lat, setLat] = useState(0);
    const [lon, setLon] = useState(0);
    
    const fetchAPI = async () => {
        const url1 = `http://api.weatherstack.com/current?access_key=ad933f25e5dd4891e030b77ff5b0424d&query=${cityName}`;
        const response = await fetch(url1);
        const JSON = await response.json();
        console.log(JSON);
        setContry(JSON.location.country);
        setName(JSON.location.name);
        setREgion(JSON.location.region);
        setLat(JSON.location.lat);
        setLon(JSON.location.lon);
        //giveData(contry,name,region,lat,lon)
        const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&&exclude=hourly,minutely&appid=9d46faea8fc499b6e66aefd0a5663786&units=metric`
        const resposne = await fetch(url);
        const Json = await resposne.json();
        // console.log(Json);
        setTemp(Json.main.temp);
        setTempMin(Json.main.temp_min);
        setTempMax(Json.main.temp_max);
        setPressure(Json.main.pressure);
        setHumidity(Json.main.humidity);
        setWeather(Json.weather[0].main);
        setImg(Json.weather[0].icon);
    }

    const reRender=()=>{
        setRern(rern+1)
        console.log(rern);
        fetchAPI();
    }



    return (<>
        <h1 style={{ textAlign: "center", fontFamily: "cursive" }}>Todays Weather</h1>
        <div style={{display:"flex",alignItems:'center',justifyContent:'center',marginTop:'2rem'}}>
        <TextField id="standard-basic" label="Enter City Name" value={cityName} onChange={(event)=>{setcityName(event.target.value)}} />
        <Button variant="contained" color="primary" href="#contained-buttons" onClick={reRender} style={{marginLeft:"2rem"}}>
        Search
      </Button>
        </div>
        <div className={classes.root}>

            <Paper elevation={3} abhi={rern} >

                <div className="main">

                    <div className="time_el">
                        <h1><LocationOnIcon />{name}</h1>
                        <p>{region} ,{contry}</p>
                        <Time />
                    </div>
                    <div className="loc_data1">
                        <p>
                            <h3><WbSunnyOutlinedIcon style={{ paddingRight: "1rem" }} />Temp : {temp} C</h3>
                            <h3><WbSunnyOutlinedIcon style={{ paddingRight: "1rem" }} />Maximum Temp : {tempMax} C</h3>
                            <h3><WbSunnyOutlinedIcon style={{ paddingRight: "1rem" }} />Minimum Temp : {tempMin} C</h3>
                        </p>
                    </div>
                    <div className="loc_data">
                        <h1><img src={`http://openweathermap.org/img/wn/${img}@2x.png`} alt="" style={{}} />{weather}</h1>
                        <p>
                            <h3><AcUnitOutlinedIcon style={{ paddingRight: "1rem" }} />Humidity : {humidity} </h3>
                            <h3><ArrowDownwardOutlinedIcon style={{ paddingRight: "2rem" }} />Pressure : {pressure} </h3>
                        </p>
                    </div>

                </div>
            </Paper>
        </div>
    </>);
}
export default TodaysCard;








