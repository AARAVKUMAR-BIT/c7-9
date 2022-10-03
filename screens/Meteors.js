import React, { Component } from 'react';
import { Text,
     View,
      Alert,
      StyleSheet,
      Platform,
      StatusBar,
      Flatlist,
      Image, 
      Imagebackground,
      Dimensions
    } from 'react-native';
import axios from "axios";

export default class MeteorScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            meteors: {},
        };
    }

    componentDidMount() {
        this.getMeteors()
    }

    getMeteors = () => {
        axios
            .get("https://api.nasa.gov/neo/rest/v1/feed?api_key=nAkq24DJ2dHxzqXyzfdreTvczCVOnwJuFLFq4bDZ")
            .then(response => {
                this.setState({ meteors: response.data.near_earth_objects })
            })
            .catch(error => {
                Alert.alert(error.message)
            })
    }

renderitem = ({item}) =>{
let meteors =item
let bg_img,speed,size;

if( meteors.threat_score <= 30) {
   bg_img = require("../assets/meteor_bg1.png") 
   speed = requie("../assets/meteros_speed3.gif")
   size = 100
   
}
else if (meteors.threat_score <= 75){
    bg_img = require("../assets/meteor_bg2.png") 
    speed = requie("../assets/meteros_speed3.gif")
    size = 150
}
else{bg_img = require("../assets/meteor_bg3.png") 
speed = requie("../assets/meteros_speed3.gif")
size = 200
}
}
    
    render() {
        if (Object.keys(this.state.meteors).length === 0) {
            return (
                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                    <Text>Loading</Text>
                </View>
            )
        } else {
            let meteor_arr = Object.keys(this.state.meteors).map(meteor_date => {
                return this.state.meteors[meteor_date]
            })
            let meteors = [].concat.apply([], meteor_arr);

            meteors.forEach(function (element) {
                let diameter = (element.estimated_diameter.kilometers.estimated_diameter_min + element.estimated_diameter.kilometers.estimated_diameter_max) / 2
                let threatScore = (diameter / element.close_approach_data[0].miss_distance.kilometers) * 1000000000
                element.threat_score = threatScore;
            });

            return (
                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                    <Text>Meteor Screen!</Text>
                </View>
            )
        }
    }
}
