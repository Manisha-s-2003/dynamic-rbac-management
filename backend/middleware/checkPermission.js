function checkPermission(moduleName, actionName) {
  return async (req, res, next) => {
    const perm = await Permission.findOne({ role: req.user.role });

    const allowed = perm?.permissions?.[moduleName]?.[actionName];

    if (!allowed) {
      return res.status(403).json({ msg: "Access Denied" });
    }

    next();
  };
}
