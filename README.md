# Durandal

A cross-device, cross-platform application framework written in JavaScript, Durandal is a very small amount of code built on top of three existing and established Javascript libraries: jQuery, Knockout and Require. 

Features:

* Fully modularize your html and js. ie. Shell.js automatically locates Shell.html, binds and gets composed into the dom. Naturally you can change the conventions…
* Leverage promises everywhere as the API uses no callbacks, but has CommonJS promises plumbed throughout
* Experience the first html/js framework where Composition is embraced at the very core. The view/view-model composition features of Durandal are even more powerful than any "native" client framework I know of.
* A simple app model provides you with an app start lifecycle, modal dialogs, message boxes and an event aggregator.

Samples:
To run each sample, open main.js and change the call to app.setRoot() so that it points to shell of the sample you wish to run.

* hello - Demonstrates a basic hello world applicatoin which uses view/view-model location conventions and message box functionality.
* navigation - Demonstrates basic navigation and view/view-model composition via the compose binding.