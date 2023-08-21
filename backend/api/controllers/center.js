const Center = require("../models/Center");

exports.postCreateCenter = (req, res) => {
  const { name, description, imageURL, ubication, mapConnection, category } =
    req.body;
  if (!name || !category) {
    res.status(400).json("EL nombre y la categoria son obligatorias");
  }
  Center.findOne({ name: name })
    .then(center => {
      if (!center) {
        const center = new Center({
          name: name,
          description: description,
          imageURL: imageURL,
          ubication: ubication,
          mapConnection: mapConnection,
          category: category,
        });
        return center.save();
      } else {
        throw new Error("Center already exist");
      }
    })
    .then(center => {
      res.json({ message: "Center Created", center: center });
    })
    .catch(err => {
      res.status(400).json("Error creating Center " + err);
    });
};
exports.getCenter = (req, res) => {
  const name = req.params.name;
  if (!name) res.status(400).json("El nombre es obligatorio");
  Center.findOne({ name: name })
    .then(center => {
      if (center) {
        res.json({ center: center });
      } else {
        throw new Error("Center not found");
      }
    })
    .catch(err => {
      res.status(404).json("" + err);
    });
};
exports.getAllCenters = (req, res) => {
  Center.find()
    .then(centers => {
      res.json(centers);
    })
    .catch(err => {
      res.status(500).json(err);
    });
};
exports.updateCenter = (req, res) => {
  const id = req.params.id;
  const { name, description, imageURL, ubication, mapConnection, category } =
    req.body;
  // Validate Request
  if (!name || !category || !id) {
    res.status(400).send("Please enter all fields");
  }
  Center.findOne({ name: name })
    .then(center => {
      if (!center) {
        return Center.findByIdAndUpdate(
          id,
          {
            $set: {
              name: name,
              description: description,
              imageURL: imageURL,
              ubication: ubication,
              mapConnection: mapConnection,
              category: category,
            },
          },
          { new: true }
        );
      } else {
        throw new Error("Name already in use");
      }
    })
    .then(center => {
      console.log(`Updated Center ${center}`);
      res.json({ message: "Center Updated", UpdatedCenter: center });
    })
    .catch(err => {
      res.status(203).send("Error al actualizar el centro" + err);
    });
};
exports.deleteCenter = (req, res) => {
  //delete a center by id
  const id = req.params.id;

  if (!id) {
    res.status(401).send("Id no puede ser vacio");
  }
  Center.findByIdAndRemove(id)
    .then(center => {
      if (center) {
        res.json({ message: "Center Deleted", DeletedCenter: center });
      } else {
        res.status(404).json("Center not found");
      }
    })
    .catch(err => {
      res.status(400).json("Error deleting the center" + err);
    });
};
