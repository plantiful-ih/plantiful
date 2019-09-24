/* eslint-disable no-console */
const express = require('express');

const router = express.Router();
const MyPlant = require('../models/MyPlant');
const User = require('../models/User');
const Plant = require('../models/Plant');
const uploadCloud = require('../config/cloudinary');
const { checkIfLoggedIn } = require('../middlewares/auth');

/* GET myGarden view. */
router.get('/', checkIfLoggedIn, async (req, res, next) => {
  try {
    const { _id } = req.session.currentUser;
    const user = await User.findOne({ _id }).populate('userPlants');
    const numberOfPlants = user.userPlants.length;
    res.render('mygarden', { user, numberOfPlants, active: { plants: true } });
  } catch (error) {
    next(error);
  }
});

/* GET myGarden add form view */
router.get('/add', uploadCloud.single('photo'), (req, res) => {
  Plant.find()
    .then((plants) => {
      res.render('addmyplant', { plants, active: { plants: true } });
    })
    .catch((error) => {
      throw error;
    });
});

/* POST myGarden send form information */
router.post('/add', uploadCloud.single('photo'), async (req, res, next) => {
  const {
    nickname, rating, shoppingPoint, typePlant,
  } = req.body;
  const imgPath = req.file.url;
  const date = new Date();
  const day = date.getDay();
  const month = date.getMonth();
  const year = date.getFullYear();
  const pictureDate = { day, month, year };

  const userPics = [{ imgPath, pictureDate }];
  const { _id } = req.session.currentUser;
  console.log('user is:', _id);
  if (nickname === '' || rating === '' || shoppingPoint === '') {
    req.flash('error', 'Please fill all fields before submitting');
    res.redirect('/mygarden/add');
  } else {
    try {
      const plant = await MyPlant.create({
        nickname, rating, shoppingPoint, typePlant, userPics,
      });
      const userUpdate = await User.findByIdAndUpdate(_id, {
        $push: { userPlants: plant._id },
      }, { new: true }).populate('userPlants');
      req.session.currentUser = userUpdate;
      req.flash('success', 'Plant added');
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
    res.render('myPlantDetail', { plant, active: { plants: true } });
  } catch (error) {
    next(error);
  }
});

/* GET PlantId EDIT view. */
router.get('/:myplantId/edit', uploadCloud.single('photo'), async (req, res, next) => {
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
router.post('/:myplantId/edit', uploadCloud.single('photo'), async (req, res, next) => {
  const {
    nickname, rating, shoppingPoint, typePlant,
  } = req.body;
  const { myplantId } = req.params;
  // Take form's data for the pic
  const imgPath = req.file.url;
  const when = new Date();
  const date = when.getTime();
  const userNewPic = { imgPath, date };
  // Update info (must substitute)
  try {
    await MyPlant.findByIdAndUpdate(myplantId, {
      nickname,
      rating,
      shoppingPoint,
      typePlant,
    }, { new: true });
    // Add pic (should not substitute)
    await MyPlant.findByIdAndUpdate(myplantId, {
      $push: { userPics: userNewPic },
    }, { new: true });
    res.redirect(`/mygarden/${myplantId}`);
  } catch (error) {
    next(error);
  }
});

/* GET delete plantId */
router.get('/:myplantId/delete', checkIfLoggedIn, async (req, res, next) => {
  try {
    const { myplantId } = req.params;
    const plant = await MyPlant.deleteOne({ _id: myplantId });
    console.log('deleted plant: ', plant);
    req.flash('success', 'Plant deleted');
    res.redirect('/mygarden');
  } catch (error) {
    next(error);
  }
});

module.exports = router;
