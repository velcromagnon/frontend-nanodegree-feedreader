frontend-nanodegree-feedreader
==============================

# Feedreader Testing

## Table of Contents

* [Project Overview](#projectOverview)
* [Setup](#setup)
* [Instructions](#instructions)
* [Additional Tests](#additionalTests)

## Project Overview
This project contains a feedreader, and a suite of Jasmine tests to verify that the feedreader does
what it is supposed to. The main objective is the test suite.

## Setup
First, download or clone this repository. The Jasmine library is included in a subdirectory, so
you will not need to install it separately.

## Instructions
Load index.html into your browser.
You should see the feedrunner application running.
For a few seconds, the menus will change as the tests are running.
Then scroll down to the bottom of the page. There should be a number of tests. Each test that is
successful will appear in green, and for those that are not, it will appear in red, with additional
error info explaining why the test failed.

## Additional Tests
I added a test called 'Menu feed selection.' This tests that when the user clicks on of the feeds in the array, that two things happen:
1. The menu disappears.
2. The correct feed is then loaded.