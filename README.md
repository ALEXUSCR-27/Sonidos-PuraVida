<a id="readme-top"></a>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

<!-- PROJECT LOGO -->
<br />
<h1 align="center">
  <a href="https://github.com/ALEXUSCR-27/Sonidos-PuraVida">
    <img src="images/BannerSonidos.png" alt="Logo" width="auto" height="200">
  </a>
</h1>
<div align="center">
  
  [![Static Badge](https://img.shields.io/badge/v18.2.0-blue?label=React)](https://es.react.dev/)
  [![Static Badge](https://img.shields.io/badge/v1.5.0-blue?label=Axios)](https://axios-http.com/docs/intro)
  [![Static Badge](https://img.shields.io/badge/v1.9.4-green?label=Leaflet)](https://leafletjs.com/)
  [![Static Badge](https://img.shields.io/badge/v10.6-purple?label=MariaDB)](https://mariadb.org/)
  [![Static Badge](https://img.shields.io/badge/v8.1.2-%23D3D3D3?label=PHP)](https://www.php.net/)
  [![Static Badge](https://img.shields.io/badge/v24.04.1-orange?label=Ubuntu)](https://ubuntu.com/)
  
  <p align="center">
    <br />
    <a href="https://github.com/ALEXUSCR-27/Sonidos-PuraVida"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    
  </p>
</div>

## About The Project

“The sounds of Pura Vida” consists of a sound map of Costa Rica, with the aim of creating a memory of sounds of our country.
A sound map is an acoustic technique to know the sounds of a place, community or city by locating these sounds geographically.

## Getting started

### To get the frontend running locally:

- Clone the repository and switch to frontend branch (wip_frontend)
- `npm install` to install all req dependencies
- `npm start` to start the local server

### To get the backend running locally:
- Clone the repository and switch to the backend branch (wip_backend)
- Install `Apache2` and `MariaDB` in an Ubuntu dist (24.04 recommended)
- Prepare `MariaDB` to execute `sonidos_puravida.sql` script
- Modify `uploaded_max_fileSize` and `post_max_size` configuration of Apache to 50M
- `php -S localhost:8000` to start the local server

### To get the page running on server (SSR):
- Install all the backend dependencies `PHP - Apache - MariaDB`
- Configure the Apache server
- Configure the database and execute `sonidos_puravida.sql` script
- Clone the repository and switch to the backend branch (wip_backend)
- Clone the main branch in the server to serve static content

<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* [How to deploy an Apache web server quickly](https://www.redhat.com/sysadmin/install-apache-web-server)
* [How to set the limits of File Uploads and POST in PHP/Apache](https://eorisis.com/blog/articles/tutorials/how-to-set-the-limits-of-file-uploads-and-post-in-php-apache)
* [How To Install MariaDB on Ubuntu 22.04](https://www.digitalocean.com/community/tutorials/how-to-install-mariadb-on-ubuntu-22-04)


<p align="center"><a href="#readme-top">Back to top ☝🏼</a></p>


