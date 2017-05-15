"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CourseSchema = new Schema({
    id: {
        type: String,
        Required: "Enter the id",
        unique : true,
        sparse: true
    },
    title: {
        type: String,
        Required: "Enter the title"
    },
    slug: {
        type: String,
        Required: "Enter the slug"
    },
    description: {
        type: String,
        Required: "Enter the description"
    },
    language: {
        type: String,
        Required: "Enter the language",
        default: "en"
    },
    skill: {
        type: String,
        Required: "Enter the skill required"
    },
    lessons_count: {
        type: Number,
        Required: "Enter the number of lessons"
    },
    imageSrc: {
        type: String,
        Required: "Enter the image src"
    },
    time: {
        type: String,
        Required: "Enter the time"
    },
    last_update: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Course", CourseSchema);