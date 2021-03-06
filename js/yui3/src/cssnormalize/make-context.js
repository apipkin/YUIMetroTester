#!/usr/bin/env node

/*
* This short script reads in the normalize.css file
* and writes a normalize-context.css file by parsing
* the CSS.
*
* Author: Tilo Mitra
*/

var fs = require('fs'),
    parserlib =  require('parserlib'),
    parser = new parserlib.css.Parser(),

    //This string holds all the CSS that will be written to file.
    CSS = '/* THIS FILE WAS CREATED BY A BUILD SCRIPT \n DO NOT EDIT THIS FILE */ \n \n',
    
    LICENSE = '/*! Copyright (c) Nicolas Gallagher and Jonathan Neal \n normalize.css v1.1.0 | MIT License | git.io/normalize */ \n\n\n',

    //This is the file path where normalize-context.css will get written relative to this script's location.
    FILE_PATH = 'css/normalize-context.css',

    //This is the class prefix that will be prepended to all selectors, except the html selector.
    PREFIX = '.yui3-normalized';

/* ----------------
Event Subscriptions 
----------------- */

parser.addListener('startstylesheet', function(){
    console.log('Starting to parse style sheet...');
});


parser.addListener('endstylesheet', function(){
    console.log('Finished parsing style sheet...');
    fs.writeFile(FILE_PATH, LICENSE + CSS, function(err) {
        if(err) {
            console.log(err);
        } else {
            console.log('The file was saved at ' + FILE_PATH);
        }
    }); 
});

/* 
Fired right before CSS properties are parsed for a certain rule.
Go through and add all the selectors to the `css` string.
*/
parser.addListener('startrule', function (event) {
    var s, 
        text;
    for (var i = 0, len = event.selectors.length; i < len; i++){
        s = event.selectors;

        /*
        If the selector does not contain the html selector,
        we can go ahead and prepend .yui3-normalized in front of it
        */
        if (s[i].text.indexOf('html') === -1) {
            CSS += PREFIX + ' ' + s[i].text;
        }

        /*
        If it contains html, replace the html with .yui3-normalized
        */
        else if (s[i].text.indexOf('html') !== -1) {
            //Replace multiple spaces with a single space. This is for the case where
            //html input[type='button'] comes through as html    input[type='button']
            CSS += s[i].text.replace('html', '.yui3-normalized').replace(/ +/g, " ");
        }

        //If theres a following property, add a comma. 
        if (s[i+1]) {
            CSS += ',\n';
        }

        //Otherwise, add an opening bracket for properties
        else {
            CSS += ' {\n';
        }
    }
});

/* 
Fired right after CSS properties are parsed for a certain rule.
Add the closing bracket to end the CSS Rule.
*/
parser.addListener('endrule', function (event) {
    CSS += '}\n';
});

/* 
Fired for each property that the parser encounters. Add these
properties to the `css` string with 4 spaces.
*/
parser.addListener('property', function(event){
    //Add 4 spaces tab
    CSS += '    ' + event.property + ': ' + event.value + '; \n';
});



/* -------------------------
Start your engines and parse
---------------------------- */


fs.readFile('css/normalize.css', function read(err, cssText) {
    if (err) {
        throw err;
    }
    parser.parse(cssText);
});

