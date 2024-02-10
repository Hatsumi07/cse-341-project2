const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;
const createError = require("http-errors");

const getAll = async (req, res) => {
    // #swagger.tags=["Actors"]
    const result = await mongodb.getDatabase().db().collection("actors").find();
    result.toArray().then((actors) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(actors);
    });
}

const getSingle = async (req, res) => {
    // #swagger.tags=["Actors"]
    console.log(res.body);
    try {
        if (!ObjectId.isValid(req.params.id)) {
            res.status(400).json('Must use a valid contact id to find an actor.');
            throw createError(404, "Invalid ID format");
        }
        const actorId = new ObjectId(req.params.id);
        const response = await mongodb
            .getDatabase()
            .db()
            .collection('actors')
            .find({ _id: actorId })
            .toArray((result) => {
            return result;
            });
            if (!response.length > 0) {
                res.status(500).json(response.error || "Actor doesn't exist");
                throw createError(404, "Actor does not exist"); 
            }
            // res.setHeader("Content-Type", "application/json");
            res.status(200).json(response);
    } catch (error) {
        console.log(error);
    }

};

const createActor = async(req, res) => {
    // #swagger.tags=["Actors"]
    const actor = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age,
        birthday: req.body.birthday
    };
    const response = await mongodb.getDatabase().db().collection("actors").insertOne(actor);
    console.log(response);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || "Some error ocurres while updating the user.");
    }
};

const updateActor = async(req, res) => {
    // #swagger.tags=["Actors"]
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid actor id to find an actor.');
        throw createError(404, "Invalid ID format");
    }
    const actorId = new ObjectId(req.params.id);
    const actor = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age,
        birthday: req.body.birthday
    };
    const response = await mongodb
    .getDatabase()
    .db()
    .collection("actors")
    .replaceOne({ _id: actorId }, actor);
    console.log(response);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || "Some error ocurres while updating actor.");
    }
};

const deleteUser = async(req, res) => {
    // #swagger.tags=["Actors"]
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid actor id to find an actor.');
        throw createError(404, "Invalid ID format");
    }
    const actorId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection("actors").deleteOne({ _id: actorId});
    console.log(response);
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || "Some error ocurred while deleting actor.");
    }
}

module.exports = {
    getAll,
    getSingle,
    createActor,
    updateActor,
    deleteUser
}