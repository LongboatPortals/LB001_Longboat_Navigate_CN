## PD Website/App Template
<a href='' target="_blank"><img alt='PD-3.2' src='https://img.shields.io/badge/PD-3.1-100000?style=plastic&logo=PD-3.1&logoColor=white&labelColor=41ADFF&color=black'/></a>
![Static Badge](https://img.shields.io/badge/vue-3.3.11-41B883)
![Static Badge](https://img.shields.io/badge/vite-5.0.10-F9C024)
![Static Badge](https://img.shields.io/badge/tailwindcss-3.3.3-37BDF8)
![Static Badge](https://img.shields.io/badge/sass-1.69.7-cc6699)
![status](https://img.shields.io/badge/Status-%20Ready%20for%20Use-green.svg)


This template offers a customizable design for building the Consent Navigator Website, Patient Recruitment Website, and Patient Survey Website. It combines what would have been three separate templates into one to save on costs of maintenance.
Please note that this template is designed to help you get started quickly and should not limit your creativity.

<br>

> **Note on Node version:** 
This template has been tested on Node v21, but it also works on Node v16 and v18. However, it is strongly recommended to upgrade to this version of Node (ie v21) or use a higher version.

<br>

  **Pre-requisites:**
  - Visual Studio Code (or any IDE of your choice)
  - Git
  - Node Version Manager, NVM (Install Node v21 or higher)

<br>




# Quick Start

### Step 1: Clone the Repository/Template 
Start by cloning the pd-template `git clone git@github.com:LongboatPortals/pd-template.git` to your local machine. 


### Step 2: Install node modules
Open the template in VS Code and run the command `npm install` to install all necessary dependencies.


### Step 3: Launch the template
Use the command `npm run serve` to start the template.

### Step 4: Switch Between Websites/Apps
To switch between websites/apps, update the `VITE_APP_PD_APP_TYPE` variable in the `.env` file. The allowed values are: cn (for Consent Navigator Website), es (for Patient Survey Website), and prw (for Patient Recruitment Website).


## Other Useful Commands


#### Compile and Minify for production

```sh
npm run build
```

#### Lint and Fix files with [ESLint](https://eslint.org/)

```sh
npm run lint
```