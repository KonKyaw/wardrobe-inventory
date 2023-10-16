# WardrobeInventory

TLDR: I have created an angular website as part of my learning process! Play around with it and tell me what you think!<br> 
**Demo**: [Demo Wardrobe Inventory](https://fir-wardrobe-inventory.firebaseapp.com/)

##### Table of Contents  
- [Description](#description)  
  - [Technical Features](#technical-features)
  - [UI](#ui)
  - [Final Remarks](#final-remarks)
- [Development](#development)  

# Description

**What is this?**: A webapp where you can record and review your wardrobe inventory: the kind and quantity of clothings and accessories you own. It will be useful to get an overall view when you are thinking about buying new ones, or disposing unused ones to save space.<br>
_Version: 1.0_

##  Technical Features:
- **Angular Typescript frontend**
  - Responsive: try viewing from different devices (mobile, pc) to see the differences!
- **Firebase backend and Hosting**
  - Realtime Database: set up different projects and environments with the same code, for testing, public and personal uses
  - Authentication: Google Authentication
- **Google Analytics**: I have only connected the website to analytics, since the current webapp is very simple and does not have any conversion events.
- **GitHub**: I haven’t added any more files to .gitignore, since I mostly intend this for my personal use. For firebase credentials, you can apply security rules.
  
## UI
- **Catalog Page (Home page)**: A catalog view with filter on each category.
    - Bootstrap Navbar
    - Custom favicon
    - Product card view which also leads to Details/ Edit page
- **Dashboard Page (Admin only)**: A dashboard view that shows all the items and information. Intended for admin user only but I have lowered privilege restrictions to logged in users for this demo site.
    - Keyword search filter
    - Angular Material Table with pagination, sorting
    - Future plans: dashboard visualizations to understand inventory stats at a glance
- **Product Details/ Edit Page**:
    - Reactive Form that applies a flexible mixture of select and input elements for data input
    - Validations and Errors to guide users and format input data
    - Image upload from image URL or direct image upload (dataurl is applied now but intend to use firebase database in the future)
    - Product Card preview which is also used in Catalog page
      
## Final Remarks
- **Version Compatibility**: this project started from the [Angular online course by Mosh](https://codewithmosh.com/p/angular-master-class). His course structure and project idea, which was originally a online shopping platform, are fine but the course was already 5 years old. So, a lot of codes and packages that are in the course are already deprecated, but I wanted to use more up-to-date ones. This meant big obstacles every step of the way, but also more rewarding at the same time.
- **Firebase vs Angularfire**: there is a whole separate set of packages for angular called angularfire. It is based on vanilla firebase but things got complicated pretty quick when you try to find your way through things, and mix up the similar commands between the two.
- Almost every detailed behaviour is intended: they are working like this probably because I have tried hard to code them in that way.
- Let me know what you think! Please leave your comments on [my LinkedIn](www.linkedin.com/in/kaung-kyaw-414116147). It would be very helpful for me and much appreciated!

# Development 

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.1.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. Add `--configuration production` for production build. The build artifacts will be stored in the `dist/` directory.

## Deploy

Run `firebase deploy -P prod` to deploy the build to a firebase project with an alias named `prod`.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
