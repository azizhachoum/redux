const employee = require('../models/employer');
const express = require('express');
const router = express.Router();


router.get('/', async (req, res) => {
  try {
    const employer = await employee.find();
    res.send(Array.isArray(employer) ? employer : []);
  } catch (error) {
    console.log(error.message);
    res.status(500).send(`Error: ${error.message}`);
  }
});


router.post('/', async (req, res) => {
  try {
    const { _id, firstName, lastName, email } = req.body;
    let employer = new employee({ _id, firstName, lastName, email });
    employer = await employer.save();
    res.send(employer);
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
});



router.delete('/:id', async (req, res) => {
  const employer = await employee.findById(req.params.id);
  if (!employer) return res.status(404).send('Employer not found.');

  const deletedEmployer = await employee.findByIdAndDelete(req.params.id);

  res.send(deletedEmployer);
});

router.put('/:id', async (req, res) => {
  const { firstName, lastName, email } = req.body;

  const updateEmployer = await employee.findByIdAndUpdate(
    req.params.id,
    { firstName, lastName, email },
    { new: true }
  );
  res.send(updateEmployer);
});

router.get('/:_id', async (req, res) => {
  try {
    const employer = await employee.findById(req.params._id);
    if (!employer) {
      return res.status(404).json({ message: 'Employer not found' });
    }
    res.json(employer);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


module.exports = router;