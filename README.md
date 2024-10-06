<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
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
<div align="center">
  <a href="https://github.com/github_username/repo_name">
    <img src="images\Screenshot 2024-10-06 102729.png" alt="Logo" width="120" height="60">
  </a>

<h1 align="center">Draw a Lot!</h1>

  <p align="center">
    This project involves developing a lottery smart contract on the Ethereum blockchain
    <!-- <br />
    <a href="https://github.com/github_username/repo_name"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/github_username/repo_name">View Demo</a>
    ·
    <a href="https://github.com/github_username/repo_name/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    ·
    <a href="https://github.com/github_username/repo_name/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a> -->
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
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contributing">Contributing</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

<!-- [![Product Name Screen Shot][product-screenshot]](https://example.com) -->

This project is a decentralized lottery system built on the Ethereum blockchain using smart contracts. The aim is to provide a transparent, trustless lottery system where users can buy tickets, and winners are selected randomly and fairly.

<h3 align="left">Features</h1>
<ul>
    <li>
    <h4 align="left">Manager Role:</h4>
    <p>A designated manager controls the lottery, overseeing ticket sales and the drawing process.</p>
    </li>
    <li>
    <h4 align="left">User Role:</h4>
    <p>Users can participate by purchasing tickets, entering them into the lottery for a chance to win.</p>
    </li>
    <li>
    <h4 align="left">Ticket System:</h4>
    <p>Users can buy lottery tickets, each one representing a chance to win in the draw.</p>
    </li>
    <li>
    <h4 align="left">Draw Mechanism:</h4>
    <p>A random draw system selects a winner from the pool of ticket holders. The draw process is transparent and fully automated via smart contracts.</p>
    </li>
    <li>
    <h4 align="left">Prize Distribution:</h4>
    <p>The smart contract ensures fair distribution of the prize pool to the randomly chosen winner.</p>
    </li>
  </ul>


<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

* [![Node.js][Node.js]][Node.js-url]
* [![React][React.js]][React-url]
* [![Solidity][Solidity]][Solidity-url]
* [![Python][Python]][Python-url]
* [![Ganache][Ganache]][Ganache-url]
* [![Truffle][Truffle]][Truffle-url]
* [![MetaMask][MetaMask]][MetaMask-url]
* [![Sepolia][Sepolia]][Sepolia-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

Latest version of Node.js, Solidity and Python are required. Truffle needs to be installed for local testing. 

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/crazyotakuu/Draw-a-Lot
   ```
2. Install NPM packages
   ```sh
   cd lottery-manager
   npm install

   cd lottery-user
   npm install
   ```
3. Run React servers
   ```sh
   cd lottery-manager
   yarn start

   cd lottery-user
   yarn start
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

This smart contract lottery system is designed to provide a decentralized, automated, and anonymous way of conducting lotteries. Below are some of the key features and differences from traditional lottery systems:
<ul>
  <li>
  <b>Decentralized</b>: There is no central authority controlling the lottery. The entire process runs on the Ethereum blockchain.
  </li>
  <li>
  <b>Immutable</b>: Once deployed, the contract cannot be modified, ensuring the rules of the lottery are always enforced without tampering.
  </li>
  <li>
  <b>Transparent</b>: The contract's code and actions are visible on the blockchain, allowing anyone to verify the fairness of the lottery.
  </li>
  <li>
  <b>Automated</b>: The contract automatically executes the lottery draw and transfers funds to the winner, removing the need for manual intervention.
  </li>
  <li>
  <b>Anonymous Winners</b>: The winner of the lottery can remain anonymous, as only their wallet address is displayed on the blockchain.
  </li>
  <li>
  <b>Instant Payouts</b>: Once a winner is drawn, the prize funds are immediately transferred to their wallet.
  </li>
</ul>

This makes the system highly secure, efficient, and resistant to manipulation. It ensures that all participants have an equal and fair chance of winning, with no delays or middlemen involved.

<!-- _For more examples, please refer to the [Documentation](https://example.com)_ -->

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ROADMAP
## Roadmap

- [ ] Feature 1
- [ ] Feature 2
- [ ] Feature 3
    - [ ] Nested Feature

See the [open issues](https://github.com/github_username/repo_name/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p> -->



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

<!-- ### Top contributors:

<a href="https://github.com/github_username/repo_name/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=github_username/repo_name" alt="contrib.rocks image" />
</a> -->



<!-- LICENSE
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p> -->



<!-- CONTACT
## Contact

Your Name - [@twitter_handle](https://twitter.com/twitter_handle) - email@email_client.com

Project Link: [https://github.com/github_username/repo_name](https://github.com/github_username/repo_name)

<p align="right">(<a href="#readme-top">back to top</a>)</p> -->



<!-- ACKNOWLEDGMENTS
## Acknowledgments

* []()
* []()
* []()

<p align="right">(<a href="#readme-top">back to top</a>)</p> -->



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/github_username/repo_name.svg?style=for-the-badge
[contributors-url]: https://github.com/github_username/repo_name/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/github_username/repo_name.svg?style=for-the-badge
[forks-url]: https://github.com/github_username/repo_name/network/members
[stars-shield]: https://img.shields.io/github/stars/github_username/repo_name.svg?style=for-the-badge
[stars-url]: https://github.com/github_username/repo_name/stargazers
[issues-shield]: https://img.shields.io/github/issues/github_username/repo_name.svg?style=for-the-badge
[issues-url]: https://github.com/github_username/repo_name/issues
[license-shield]: https://img.shields.io/github/license/github_username/repo_name.svg?style=for-the-badge
[license-url]: https://github.com/github_username/repo_name/blob/master/LICENSE.txt
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/

[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com

[Node.js]: https://img.shields.io/badge/Node.js-blue
[Node.js-url]: https://nodejs.org/en

[Solidity]: https://img.shields.io/badge/Solidity-black
[Solidity-url]: https://soliditylang.org/

[Python]: https://img.shields.io/badge/Python-yellow
[Python-url]: https://www.python.org/

[Ganache]: https://img.shields.io/badge/Ganache-brown
[Ganache-url]: https://trufflesuite.com/ganache/

[Truffle]: https://img.shields.io/badge/Truffle-darkgreen
[Truffle-url]: https://trufflesuite.com/

[MetaMask]: https://img.shields.io/badge/MetaMask-orange
[MetaMask-url]: https://metamask.io/

[Sepolia]: https://img.shields.io/badge/Sepolia-lightblue
[Sepolia-url]: https://sepolia.dev/