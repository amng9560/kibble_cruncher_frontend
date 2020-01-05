# Kibble Cruncher
> A personal pet food tracker. 

## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Status](#status)

## General info
Kibble Cruncher is a simple web appplication that allows the users to monitor their pet food stock. They can do this by logging in and creating a pet which takes name, bred, date of birth and type of animal. Then when finishing creating a pet, you can create a food and it will go in the parallel column to the pets. 

When the user has fed their pet, they can put the cup amount of food that was given to the pet in the food card. Due to it pessimistically render, the user will need to refresh and then see the food amount, which is in pounds,
change. 

![background](/kibble_cruncher.png)

**Demo:** [YouTube](https://www.youtube.com/watch?v=o-4TNAh9vyc&feature=youtu.be)

## Technologies
* React
* HTML5
* CSS
* Javascript
* Ruby 
* Ruby on Rails

## Features
* View pets and foods cards.
* Create pets and foods cards.
* Update pet cards
* Take certain amount of food (in cups), updates food (in pounds)
* Delete pet and food

## To-do list:
* Fix bugs when creating a new pet and new food at the same time
* Switching JWT token over to localStorage
* refactor code

## Status
The project is not finished and not deployed due to fetch bugs as well as switching JWT token over to local storage. 
