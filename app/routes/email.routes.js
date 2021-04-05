module.exports = app => {
    const emails = require("../controllers/email.controller.js");
  
    var router = require("express").Router();
  
    // Create a new email
    router.post("/", emails.create);
  
    // Retrieve all emails
    router.get("/", emails.findAll);
  
    // Retrieve all sent emails
    router.get("/published", emails.findAllSentEmail);
  
    // Retrieve an email with id
    router.get("/:id", emails.findOne);
  
    // Update an email with id
    router.put("/:id", emails.update);
  
    // Delete an email with id
    router.delete("/:id", emails.delete);
  
    // Delete all emails
    router.delete("/", emails.deleteInTable);
  
    app.use('/api/emails', router);
  };