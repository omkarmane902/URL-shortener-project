const express = require('express')
const mongoose = require('mongoose')
const shortid = require('shortid')
const URL = require('../models/url.js')


const handelgenretedshorturl = async(req , res)=>{
    const body = req.body

    if (!body.url) return res.state(400).json({Message:"url is required..."});
    
    const shortID = shortid.generate();

    await URL.create({
        shortID:shortID,
        redirectURL:body.url,
        visityHistory:[]
    })
   return res.json({id:shortID})
}

const handelshortid = async(req ,res)=>{
const shortID = req.params.shortID

const entry = await URL.findOneAndUpdate(
    {
        shortID
    },
    {
        $push:{
            visityHistory:{
                timestamp:Date.now()
            },
        },
    }
);
res. redirect(entry.redirectURL);
}


const handelanalytics = async(req,res)=>{
  const shortID = req.params.shortID;
  
  const result = await URL.findOne({shortID})
  
  return res.json({totalClicks:result.visityHistory.length ,analytics:result.visityHistory})

}

module.exports ={
    handelgenretedshorturl,
    handelshortid,
    handelanalytics
};