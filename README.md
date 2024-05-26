
# DNS Manager

DNS Manager is web application for the management of domains and DNS records in Amazon Route 53.

## Tech Stack

**Client:** React, TailwindCSS

**Server:** Node, Express

**Database:** MongoDB

**API:** Amazon Route 53

## Features

- Standardizing on MERN stack for frontend, backend and infrastructure layers
- Simple dashboard to upload/view domains and DNS records in a table format
- Supports various types of DNS records types including A, AAAA, CNAME, MX, NS, PTR, SOA, SRV, TXT, and DNSSEC.
- Forms/modals for adding, editing, and deleting domains and DNS record entries for domains
- Filters and search options for easy bulk data navigation
-  Integration of CSV or JSON bulk uploads for domain/records data
-  Secure user authentication and authorization
## Installation

Clone the Repository

```bash
git clone https://github.com/RonakSurana-2001/DNS_MANAGER.git
```
For Frontend
```bash
npm install
```

Environment Files in Backend
```bash
AWS_REGION=<AWS_REGION>
AWS_ACCESS_KEY=<AWS_ACCESS_KEY>
AWS_SECRET_ACCESS_KEY=<AWS_SECRET_ACCESS_KEY>
MONGO_URL=<MONGO_URL>
JWT_SECRET_KEY=<JWT_SECRET_KEY>
```

Start the Developement Server
```bash
npm run dev
```

## Authors

 [@Ronak Surana](https://www.linkedin.com/in/ronak-surana-944550205/)
