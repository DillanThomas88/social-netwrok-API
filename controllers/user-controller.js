const { User, Thought } = require('../models');

const userController = {
  getU(req, res) {
    User.find()
      .select('-__v')
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  getOne(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .populate('friends')
      .populate('thoughts')
      .then((data) => {
        if (!data) {
          return res.status(404).json();
        }
        res.json(data);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  createU(req, res) {
    User.create(req.body)
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  updateU(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      {
        $set: req.body,
      },
      {
        runValidators: true,
        new: true,
      }
    )
      .then((data) => {
        if (!data) {
          return res.status(404).json();
        }
        res.json(data);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  deleteU(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((data) => {
        if (!data) {
          return res.status(404).json();
        }

        return Thought.deleteMany({ _id: { $in: data.thoughts } });
      })
      .then(() => {
        res.json({ message: 'User thoughts deleted!' });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  addFriend(req, res) {
    User.findOneAndUpdate({ _id: req.params.userId }, { $addToSet: { friends: req.params.friendId } }, { new: true })
      .then((data) => {
        if (!data) {
          return res.status(404).json();
        }
        res.json(data);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  removeFriend(req, res) {
    User.findOneAndUpdate({ _id: req.params.userId }, { $pull: { friends: req.params.friendId } }, { new: true })
      .then((data) => {
        if (!data) {
          return res.status(404).json();
        }
        res.json(data);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
};

module.exports = userController;
