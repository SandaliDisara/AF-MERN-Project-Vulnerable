const AgriBlog = require("../Models/AgriBlog");

//add a agri blog
const addAgriBlog = async (req, res, next) => {
  const { Title, Description, Thumbnail } = req.body;

  const newAgriBlog = new AgriBlog({
    Title,
    Description,
    Thumbnail,
  });

  newAgriBlog
    .save()
    .then(() => {
      res.json("Agri Blog Added!!");
    })
    .catch((err) => {
      console.log(err);
    });
};

//read all agri blogs
const getAllAgriBlogs = async (req, res, next) => {
  AgriBlog.find()
    .then((agriblogs) => {
      res.json(agriblogs);
    })
    .catch((err) => {
      console.log(err);
    });
};

//get agri blog by id
exports.getAgriById = async (req, res) => {
  let agriId = req.params.id;

  const agri = await AgriBlog.findById(agriId)
    .then((agri) => {
      res.status(200).send({ status: "Blog fetched" , agri});
    })
    .catch(() => {
      console.log(err.message);
      res.status(500).send({ status: "error", error: err.message });
    });
};

//update agri blog
const updateAgriBlog = async (req, res, next) => {
  let agriBlogId = req.params.id;
  const { Title, Description, Thumbnail } = req.body;
  const updateAgriBlog = {
    Title,
    Description,
    Thumbnail,
  };

  //check whether the agri blog is available
  const update = await AgriBlog.findOneAndUpdate(agriBlogId, updateAgriBlog)
    .then(() => {
      res.status(200).send({ status: "Agri Blog updated" });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: "An internal server error occurred.", error: err.message });
    });
};

//delete agri blog
const deleteAgriBlog = async (req, res, next) => {
  let agriBlogId = req.params.id;

  await AgriBlog.findOneAndDelete(agriBlogId)
    .then(() => {
      res.status(200).send({ status: "Agri blog deleted" });
    })
    .catch((err) => {
      console.log(err.message);
      res
        .status(500)
        .send({ status: "An internal server error occurred.", error: err.message });
    });
};

exports.addAgriBlog = addAgriBlog;
exports.getAllAgriBlogs = getAllAgriBlogs;
exports.updateAgriBlog = updateAgriBlog;
exports.deleteAgriBlog = deleteAgriBlog;
