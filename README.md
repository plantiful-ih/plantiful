# Project's name

Plantiful

## Description

Plantiful is a catalog of plants that allows users to track the evolution of their plants

## USER STORIES

**404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault

**500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault

**Homepage** - As a user I want to be able to access the homepage so that I see what the app is about and login and signup

**Sign up** - As a user I want to sign up on the webpage so that I can see all the events that I could attend

**Login** - As a user I want to be able to log in on the webpage so that I can get back to my account

**Logout** - As a user I want to be able to log out from the webpage so that I can make sure no one will access my account

**Profile** - As a user I want to be able to see my profile and edit it

**Garden** - As a user I want to be able to see my list of plants

**Add plant** - As a user I want to be able to add my plants to my garden based on a plant type catalog

**See plant** - As a user I want to be able to see my garden of plants

**Delete plant** - As a user I want to be able to delete plants from my garden

**Update plant** - As a user I want to be able to update the information of my plants

## BACKLOG

**Catalog filter** - As a user I want to be able to filter the plant catalog by popularity, care difficulty, place

**See plant progress** - As a user I want to be able to see the evolution of my plant

**Add plant shopping point** - As a user I want to be able to define where I bought the plant

**See other users buying points** - As a user I want to be able to see a map with the places where other users bought their plants

**Speak with a plant expert** - As a user I want to be able to speak with a plant expert in a chat

**Native app feel** - As a user I want to have a nice smartphone feeling eventhough it is not a native app

**See related plants** - As a user I want to be able to see plants that are related to mine

## Routes

| Name            | Method | Endpoint                      | Description                                      | Body                                  | Redirects       |
| --------------- | ------ | ----------------------------- | ------------------------------------------------ | ------------------------------------- | --------------- |
| Home            | GET    | /                             | See the main page                                |                                       |                 |
| Log in form     | GET    | /login                        | See the form to log in                           |                                       |                 |
| Log in          | POST   | /login                        | Log in the user                                  | {mail, password}                      | /               |
| Sign Up form    | GET    | /signup                       | See the form to sign up                          |                                       |                 |
| Sign Up         | POST   | /signup                       | Sign up a user                                   | {mail, password}                      | /profile        |
| Log out         | GET   | /logout                       | Log out a user                                   |                                       | /               |
| Profile         | GET    | /profile                      | See the profile page with editable form          |                                       |                 |
| Profile edited  | POST   | /profile                      | Send user's data changed                         | {user_email, password                 | /profile}       |
| Garden          | GET    | /garden                       | See user's garden collection                     |                                       |                 |
| Plant           | GET    | /garden/plantid               | Read plant's information                         |                                       |                 |
| Pland add form  | GET    | /garden/new                   | See form to upload a new plant                   |                                       |                 |
| Plant add       | POST   | /garden/new                   | Upload a plant to user's garden                  | {nickname, user_pics, shopping_point} | /garden/plantid |
| Plant edit form | GET    | /garden/plantid/edit          | See edit form with plant's preloaded information |                                       |                 |
| Plant edit      | POST   | /userid/garden/plantid/edit   | Add plant's new information                      | {nickname, user_pics, shopping_point} | /garden/plantid |
| Plant delete    | POST   | /userid/garden/plantid/delete | Delete plant from user's garden                  |                                       | /garden         |

## Models

Plant model

```js
{
    commonName: String,
    family: String,
    careDifficulty: Number,
    watering: String,
    lifeLength: String,
    img: String,
    careTips: Array,
    place: Array
}
```

MyPlant submodel

```js
{
    nickname: String,
    rating: Number,
    typePlant: {type: Schema.Types.ObjectId, ref: 'Plant'},
    userPics: Array,
    shoppingPoint: Array
}
```

User model

```js
{
    userEmail: String,
    hashedPassword: String,
    location: Array,
    age: Number,
    userPlants: [{ type: Schema.Types.ObjectId, ref: 'MyPlant' }]
}
```



## Links

### Github project

[Github project](https://github.com/plantiful)

### Git

URls for the project repo and deploy
[Link Repo](https://github.com/plantiful/plantiful)
[Link Deploy](https://plantifulapp.herokuapp.com/plants)

### Wireframes

[InVision with Wireframes](https://invis.io/XBTTIDH2JP7#/382854673_Layout_Hbs)

### Slides

URls for the project presentation (slides)
[Link Slides.com](https://slides.com/tashbcn/plantiful#/)
