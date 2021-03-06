const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const bodyParser = require('body-parser');

const Item = require('../../models/Item');

const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

//route get the item
router.get('/', async (req, res) => {
  Item.find()
    .then((items) => res.json(items))
  
    .catch((err) => res.status(400).json('error here' + err));
});

router.get('/fetch', async (req, res) => {
  Item.find()
    .then((items) => res.json(items))
   
    .catch((err) => res.status(400).json('error here' + err));
});

//route create the item
router.post('/', (req, res) => {
  const newItem = new Item({
    labName: req.body.labName,
    location: req.body.location,
    phone: req.body.phone,
    testType: req.body.testType,
    price: req.body.price,
    image: req.body.image,
    workingHours: req.body.workingHours,
  });

  // saving the new item in the data base by .save method
  newItem
    .save()
    .then((items) => res.json('POST Added!'))
    .catch((err) => {
      console.log(err);
      res.status(400).json('Error: ' + err);
    });
});

//GET item by ID  becouse i want to delete and update this items  /we will use find by id method and how ? by get the id by (req.params.id)
router.get('/:id', auth, (req, res) => {
  Item.findById(req.params.id)
    .then((items) => res.json(items))
    .catch((err) => res.status(400).json('Error: ' + err));
});

//DELETE item by ID
router.delete('/:id', auth, (req, res) => {
  Item.findByIdAndDelete(req.params.id)
    .then(() => res.json('Item is deleted!'))
    .catch((err) => res.status(400).json('Error: ' + err));
});

// UPDATE item by ID
router.patch('/edit/:id', auth, (req, res) => {
  // console.log(req.header)
  Item.findByIdAndUpdate(req.params.id, req.body)
    .then(() => res.json('post updated'))
    .catch((err) => {
      console.log(err);
      res.status(400).json('Error: ' + err);
    });
});


module.exports = router;
