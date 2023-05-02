# FAE-Backend
This repo serves to be the backend of FAE. It will manage and allow access to FAE's databases on MongoDB.

## Getting Started
```sh
git clone https://github.com/davidngo123/FAE-Backend.git && cd FAE-Backend
npm i
npm start
```

## Profile

The profile endpoint is /api/profile

### GET

A GET request returns back all the profiles in the database

Query Option: /api/profile?'username'

Example of profile returned back:
```sh
{
  "username": "Johns",
  "pronouns": "they/them",
  "email": "johnscalderon@slambda.com",
  "bio": "Culpa consectetur duis non do est. Ullamco consequat minim id magna et officia exercitation laboris consequat esse ea.",
  "salary": "$20",
  "profilePic": "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png",
  "discord": "discord.com",
  "twitter": "twitter.com",
  "youtube": "youtube.com",
  "twitch": "twitch.tv",
  "region": "JP",
  "roles": [
    "social media",
    "tournament host",
    "engineer"
  ],
  "tags": [
    "proident",
    "aliquip",
    "laborum",
    "nostrud"
  ],
  "events": [
    "voluptate cupidatat Lorem",
    "voluptate reprehenderit anim",
    "commodo minim nisi"
  ]
}

```
### POST

Takes in a request body containing: 
```sh
        username: String,
        bio: String,
        pronouns: String,
        email: String,
        salary: String,
        twitch: String,
        youtube: String,
        discord: String,
        twitter: String,
        profilePic: String,
        events: [String],
        roles: [String],
        tags: [String]
```
in order to create a new object inside the profiles database

### DELETE
WIP 


### PATCH
WIP 


## Directories


