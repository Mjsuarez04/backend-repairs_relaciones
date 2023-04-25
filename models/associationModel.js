const Repair = require("./repair.model");
const User = require("./user.model");

const associationModel = () => {
  User.hasMany(Repair, { foreignKey: "userId" });
  Repair.belongsTo(User, { foreignKey: "userId" });
};

module.exports = { associationModel };
