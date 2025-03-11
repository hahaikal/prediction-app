const express = require('express');
const router = express.Router();
const { submitFormData, retrieveFormData, deleteFormData } = require('../app/services/dataPrediksi');

router.post('/', (req, res) => {
    const formData = req.body;
    const response = submitFormData(formData);
    res.status(201).json(response);
});

router.get('/', async (req, res) => {
    const data = await retrieveFormData();
    res.status(200).json(data);
});

router.delete('/', (req, res) => {
    const index = parseInt(req.params.index, 10);
    const response = deleteFormData(index);
    res.status(204).send(response);

});

module.exports = router;
