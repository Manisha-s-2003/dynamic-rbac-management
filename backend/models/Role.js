const mongoose = require("mongoose");
const roleSchema = new mongoose.Schema({
  role: String,
  moduleAccess: [
    {
      donor: Boolean,
      donation: Boolean,
      npfuaf: Boolean,
      import: Boolean,
      report: Boolean,
      reset: Boolean,
      user: Boolean,
      manageOptions: Boolean,
    },
  ],
  permissionAccess: [
    {
      donor: {
        view: Boolean,
        add: Boolean,
        edit: Boolean,
        delete: Boolean,
        export: Boolean,
      },
      donation: {
        view: Boolean,
        add: Boolean,
        edit: Boolean,
        delete: Boolean,
        export: Boolean,
      },
      npfuaf: {
        view: Boolean,
        add: Boolean,
        edit: Boolean,
        delete: Boolean,
        export: Boolean,
      },
      import: { import: Boolean },
      report: { generate: Boolean, export: Boolean },
      reset: { reset: Boolean },
      user: { view: Boolean, add: Boolean, edit: Boolean, delete: Boolean },
      manageOptions: {
        view: Boolean,
        add: Boolean,
        edit: Boolean,
        delete: Boolean,
      },
    },
  ],
});
module.exports = mongoose.model("Role", roleSchema);
