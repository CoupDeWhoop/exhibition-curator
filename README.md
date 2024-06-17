# Museum Collection App

Museum Collection App is a web application built with Next.js and Tailwind CSS. It allows users to browse and curate collections from various museums.

## Getting Started

### Prerequisites

Before you begin, ensure you have met the following requirements:

- You have installed [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/).
- You have a Harvard API access key. You can obtain one by filling out [this form](https://docs.google.com/forms/d/e/1FAIpQLSfkmEBqH76HLMMiCC-GPPnhcvHC9aJS86E32dOd0Z8MpY2rvQ/viewform).

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/coupDeWhoop/exhibition-curator.git
   Navigate to the project directory:

   cd museum-collection-app

   Install the dependencies:

   npm install
   ```

### .env.local

You will need to create an environmental variables file on you machine, .env.local in the root directory.

HARVARD_ACCESS_KEY=your_harvard_access_key
DEV_EMAIL=your_email@example.com

Replace your_harvard_access_key with your actual Harvard API access key ([from here](https://docs.google.com/forms/d/e/1FAIpQLSfkmEBqH76HLMMiCC-GPPnhcvHC9aJS86E32dOd0Z8MpY2rvQ/viewform)) and your development email. The email is just a courtesy to the apis in case the site is sending a larger number of requests than expected.

### Usage

To start the development server, run:

npm run dev
Open http://localhost:3000 with your browser to see the application.

### Contributing

If you want to contribute to this project, please do!

- Fork the repository.

- Create a new branch (git checkout -b feature/your-feature).
  Make your changes.

- Commit your changes (git commit -m 'Add some feature').

- Push to the branch (git push origin feature/your-feature).

- Create a Pull Request.
