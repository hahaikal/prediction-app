const express = require('express');
const router = express.Router();
const { submitFormData, retrieveFormData, deleteFormData } = require('../app/services/dataPrediksi');

router.post('/', (req, res) => {
    const formData = req.body;
    const response = submitFormData(formData);
    res.status(201).json(response);
});

router.get('/', (req, res) => {
    const data = retrieveFormData();
    res.status(200).json(data);
});

router.delete('/:index', (req, res) => {
    const index = parseInt(req.params.index, 10);
    deleteFormData(index);
    res.status(204).send();

});

module.exports = router;
