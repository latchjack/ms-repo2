import React, { Component } from 'react';

const asyncComponent = (importComponent) => {
  return class extends Component {
    state = {
      component: null
    }

    componentDidMount() {
      importComponent()
        .then(cmp => {
          this.setState({ component: cmp.default });
       });
    }

    render() {

    }
  };
};

/*
|================================================
| Lazy-loading/Code-splitting allows us to only
| download and load - in the background - the 
| components we need at the time instead of doing
| it upfront.
|
| This component is going to be used to lazy-load
| components.
| In this project the New Post section could be a
| section the user never visits (especially if  
| they aren't authenticated). So we can save them 
| having to download these pages when they visit 
| our site until it is needed.
|
| To lazy-load whilst using Create-React-App we 
| need to create and use a HOC.
| This component will allow us to load components
| asynchronously (only when it is needed).
|
| 
|================================================
*/

export default asyncComponent;