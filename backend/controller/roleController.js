const Role = require("../models/Role.js");
// -------------------------------------------
// Create new Role
// -------------------------------------------
const createRole = async (req, res) => {
  try {
    const { role, moduleAccess, permissionAccess } = req.body;

    const exists = await Role.findOne({ role });
    if (exists) {
      return res.status(400).json({ message: "Role already exists" });
    }

    const newRole = new Role({
      role,
      moduleAccess,
      permissionAccess,
    });

    await newRole.save();

    res.status(201).json({
      message: "Role created successfully",
      data: newRole,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

// -------------------------------------------
// Get all roles
// -------------------------------------------
const getRoles = async (req, res) => {
  try {
    const roles = await Role.find();
    res.status(200).json(roles);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

// -------------------------------------------
// Get a single role
// -------------------------------------------
const getRoleById = async (req, res) => {
  try {
    const role = await Role.findById(req.params.id);

    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }

    res.status(200).json(role);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

// -------------------------------------------
// Update Role + Permissions
// -------------------------------------------
const updateRole = async (req, res) => {
  try {
    const { role, moduleAccess, permissionAccess } = req.body;

    const updated = await Role.findByIdAndUpdate(
      req.params.id,
      {
        role,
        moduleAccess,
        permissionAccess,
      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Role not found" });
    }

    res.status(200).json({
      message: "Role updated successfully",
      data: updated,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

// -------------------------------------------
// Delete Role (Only if not assigned to users)
// -------------------------------------------
const deleteRole = async (req, res) => {
  try {
    await Role.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Role deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};
module.exports = {
  createRole,
  getRoles,
  getRoleById,
  updateRole,
  deleteRole,
};
