/* eslint-disable no-console */
const express = require('express');

const router = express.Router();
const MyPlant = require('../models/MyPlant');
const User = require('../models/User');
const Plant = require('../models/Plant');
const checkIfLoggedIn = require('../middlewares/auth');

/* GET myGarden view. */
router.get('/', checkIfLoggedIn, async (req, res, next) => {
  try {
    const { _id } = req.session.currentUser;
    const user = await User.findOne({ _id }).populate('userPlants');
    res.render('mygarden', { user });
  } catch (error) {
    next(error);
  }
});

/* GET myGarden add form view */
router.get('/add', (req, res) => {
  Plant.find()
    .then((plants) => {
      res.render('addmyplant', { plants });
    })
    .catch((error) => {
      throw error;
    });
});

/* POST myGarden send form information */
router.post('/add', checkIfLoggedIn, async (req, res, next) => {
  const {
    nickname, rating, shoppingPoint, typePlant,
  } = req.body;
  const { _id } = req.session.currentUser;
  console.log('user is:', _id);
  if (nickname === '' || rating === '' || shoppingPoint === '') {
    res.render('/mygarden/add', { error: 'Please fill all fields before submitting' });
  } else {
    try {
      const plant = await MyPlant.create({
        nickname, rating, shoppingPoint, typePlant,
      });
      const userUpdate = await User.findByIdAndUpdate(_id, {
        $push: { userPlants: plant._id },
      }, { new: true }).populate('userPlants');
      req.session.currentUser = userUpdate;
      res.redirect('/mygarden');
    } catch (error) {
      next(error);
    }
  }
});

/* GET PlantId view. */
router.get('/:myplantId', checkIfLoggedIn, async (req, res, next) => {
  try {
    const { myplantId } = req.params;
    const plant = await MyPlant.findOne({ _id: myplantId }).populate('typePlant');
    console.log(plant, plant.typePlant);
    res.render('myPlantDetail', { plant });
  } catch (error) {
    next(error);
  }
});

/* GET PlantId EDIT view. */
router.get('/:myplantId/edit', checkIfLoggedIn, async (req, res, next) => {
  try {
    const { myplantId } = req.params;
    const plants = await Plant.find();
    const myplant = await MyPlant.findOne({ _id: myplantId }).populate('typePlant');
    res.render('myPlantEdit', { myplant, plants });
  } catch (error) {
    next(error);
  }
});

/* POST PlantId EDIT. */
router.post('/:myplantId/edit', checkIfLoggedIn, async (req, res, next) => {
  const {
    nickname, rating, shoppingPoint, typePlant,
  } = req.body;
  const { myplantId } = req.params;
  try {
    await MyPlant.findByIdAndUpdate(myplantId, {
      nickname,
      rating,
      shoppingPoint,
      typePlant,
    }, { new: true });
    res.redirect(`/mygarden/${myplantId}`);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
