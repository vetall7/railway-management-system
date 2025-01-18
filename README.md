<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a id="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <h3 align="center">Railway management system</h3>

  <p align="center">
    Web application for managing railway trips, booking tickets, searching, creating different routes...
    <br />
    <a href="https://github.com/rolling-scopes-school/tasks/tree/master/tasks/train-a"><strong>Complete list of requrements for the project »</strong></a>
    <br />
    <br />
    <a href="#demo">View Demo</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#demo">Demo</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

The project was created as part of a group project during the intensive 11-week Angular course at [Rolling Scopes School](https://rs.school/).

A serverless application, supporting three distinct user roles and providing wide range of functionality:

* Anonymous Users: Search for routes and view trip details (authorization required for booking).
* Authorized Users: Book trips, access booking history, and manage user profiles.
* Resource Managers: Perform administrative tasks, including managing routes, schedules, stations, carriages, and rides, deleting users' accounts.

The application consists of the following pages:
## User pages

* Registration page
* Login page
* User Profile page
* Search page includes trip details
* Order page

## Manager pages
* Admin overview
* Stations management
* Carriages/Cars management
* Route management including Ride management

### Manager credentials

> The manager and the root administrator can enter the system with  
> _email:_ <admin@admin.com>  
> _password:_ my-password

Complete description of the project's requirements could be found [here](https://github.com/rolling-scopes-school/tasks/tree/master/tasks/train-a)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

This section should list any major frameworks/libraries used to bootstrap your project. Leave any add-ons/plugins for the acknowledgements section. Here are a few examples.

<p> <a href="https://angular.io"><img src="https://skillicons.dev/icons?i=angular" /></a> The application is built using the Angular framework, leveraging its features such as Routing, Reactive Forms, Directives, Pipes, Signals and so on. It employs both modules and standalone components to create a robust and maintainable architecture. </p> 
<p><a href="https://ngrx.io/">NgRx</a> library is used for managing the application's state, utilizing actions, reducers, selectors, and effects to handle state changes efficiently.</p>
<p><a href="https://rxjs.dev/">RxJS</a> library is used for reactive programming using Observables, to make it easier to compose asynchronous or callback-based code.</p> 
<p><a href="https://primeng.org/">PrimeNG</a> UI Component library is used for enhancing the user interface with a wide range of customizable components.</p>

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

* npm
  ```sh
  npm install npm@latest -g
  ```

* Install [Node.js] which includes [Node Package Manager][npm]

### Setting Up Angular

Install the Angular CLI globally:

```
npm install -g @angular/cli
```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/vetall7/railway-management-system.git
   ```
2. Install NPM packages (inside the repo's folder)
   ```sh
   npm install
   ```
3. Run the application
   ```sh
    ng serve
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Demo

[Screencast from 2025-01-18 15-04-42.webm](https://github.com/user-attachments/assets/fec22fc6-2fd0-4243-900e-7204b5dbe03a)

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
   
<p align="right">(<a href="#readme-top">back to top</a>)</p>




<!-- CONTACT -->
## Contact

Vitalii Shapovalov - [@LinkedIn](https://www.linkedin.com/in/vitalii-shapovalov-6670ba26a/) - shapovalovvit0@gmail.com

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* [Angular NgRx](https://medium.com/@igorm573/state-management-with-ngrx-in-angular-66ddc61cdf14)
* [RxJs](https://rxjs.dev/)
* [PrimeNg](https://primeng.org/)
* [Angular reactive forms](https://angular.dev/guide/forms/reactive-forms)
* [Signals](https://angular.dev/guide/signals)
* [Change detection strategy](https://angular.dev/api/core/ChangeDetectionStrategy)

<p align="right">(<a href="#readme-top">back to top</a>)</p>
