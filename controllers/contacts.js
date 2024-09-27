const { mongo } = require("mongoose");
const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags=['Contacts']
  const result = await mongodb.getDatabase().db().collection("contacts").find();
  result.toArray().then((contact) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(contact);
  });
};

const getSingle = async (req, res) => {
  //#swagger.tags=['Contacts']
  const userId = ObjectId.createFromHexString(req.params.id);
  const result = await mongodb
    .getDatabase()
    .db()
    .collection("contacts")
    .find({ _id: userId });
  result.toArray().then((contact) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(contact[0]);
  });
};

//CREATE CONTACT
const createContact = async (req, res) => {
  //#swagger.tags=['Contacts']
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthdate: req.body.birthdate,
  };

  const response = await mongodb
    .getDatabase()
    .db()
    .collection("contacts")
    .insertOne(contact);

  if (response.acknowledged) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Some Error occured while the creation");
  }
};

const updateContact = async (req, res) => {
  //#swagger.tags=['Contacts']
  const userId = ObjectId.createFromHexString(req.params.id);
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthdate: req.body.birthdate,
  };

  const response = await mongodb
    .getDatabase()
    .db()
    .collection("contacts")
    .replaceOne({ _id: userId }, contact);

  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Some Error occured while deleting the user");
  }
};

const deleteContact = async (req, res) => {
  //#swagger.tags=['Contacts']
  const userId = ObjectId.createFromHexString(req.params.id);
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("contacts")
    .deleteOne({ _id: userId });

  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Some Error occured whilte deletion.");
  }
};

module.exports = {
  getAll,
  getSingle,
  createContact,
  updateContact,
  deleteContact,
};
