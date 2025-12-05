
export const can = (user, module, action) => {
  if (!user || !user.roleDetails) return false;

  let permissions = user.roleDetails.permissionAccess;

  // If permissions is an array, take first element
  if (Array.isArray(permissions)) {
    permissions = permissions[0];
  }

  if (!permissions) return false;

  const modulePerm = permissions[module];
  if (!modulePerm) return false;

  return modulePerm[action] === true;
};

