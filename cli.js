#!/usr/bin/env node

import moment from 'moment-timezone';
import minimist from 'minimist';
import fetch from 'node-fetch';

const args = minimist(process.argv.slice(2));

if(args.h) {
    console.log('Usage: galosh.js [options] -[n|s] LATITUDE -[e|w] LONGITUDE -z TIME_ZONE');
    console.log('-h            Show this help message and exit.');
    console.log('-n, -s        Latitude: N positive; S negative.');
    console.log('-e, -w        Longitude: E positive; W negative.');
    console.log('-z            Time zone: uses tz.guess() from moment-timezone by default.');
    console.log('-d 0-6        Day to retrieve weather: 0 is today; defaults to 1.');
    console.log('-j            Echo pretty JSON from open-meteo API and exit.');
    process.exit(0);
}

let timezone = moment.tz.guess();
let latitude = args.n || args.s * -1;
let longitude = args.e || args.w * -1;

// Make a request
const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=' + latitude + '&longitude=' + longitude + '&daily=precipitation_hours&timezone=' + timezone);

// Get the data from the request
const data = await response.json();

if (args.j) {   
    console.log(data);
    process.exit(0);
}
    
console.log(data.precipitation);

const days = args.d
if (days == 0) {
    console.log("today.")
} else if (days > 1) {
    console.log("in " + days + " days.")
} else {
    console.log("tomorrow.")
}