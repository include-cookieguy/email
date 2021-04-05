const db = require("../models");
const Email = db.emails;
const Op = db.Sequelize.Op;

// Create and Save a new Email
exports.create = (req, res) => {
    // Validate request
    if (!req.body.receiver) {
      res.status(400).send({
        message: "Receiver can not be empty!"
      });
      return;
    }
  
    // Create a Email
    const email = {
      receiver: req.body.receiver,
      subject: req.body.subject,
      content: req.body.content,
      composeAt: req.body.composeAt,
      sentAt: req.body.sentAt,
      sent: req.body.sent ? false : true
    };
  
    // Save Email in the database
    Email.create(email)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Email."
        });
      });
  };

// Retrieve all Emails from the database.
exports.findAll = (req, res) => {
    const subject = req.query.subject;
    var condition = subject ? { subject: { [Op.like]: `%${subject}%` } } : null;
  
    Email.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving emails."
        });
      });
  };

// Find an Email with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Email.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Email with id=" + id
        });
      });
  };

// Update an Email by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
  
    Email.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Email was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Email with id=${id}. Maybe Email was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Email with id=" + id
        });
      });
  };

// Delete a Email with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Email.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Email was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Email with id=${id}. Maybe Email was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Email with id=" + id
        });
      });
  };

// Delete all Emails from the database
exports.deleteInTable = (req, res) => {
    Email.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Emails were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all emails."
        });
      });
  };

// Find all published Emails
exports.findAllSentEmail = (req, res) => {
    Email.findAll({ where: { sent: true } })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving emails."
        });
      });
  };