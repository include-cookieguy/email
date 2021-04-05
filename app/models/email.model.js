module.exports = (sequelize, Sequelize) => {
    const Email = sequelize.define("emailuser", {
      receiver: {
        type: Sequelize.STRING
      },
      subject: {
        type: Sequelize.STRING
      },
      content: {
        type: Sequelize.STRING(1234)
      },
      composeAt: {
        type: Sequelize.STRING
      },
      sentAt: {
        type: Sequelize.STRING
      },
      sent: {
        type: Sequelize.BOOLEAN
      }
    });
  
    return Email;
  };