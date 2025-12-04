// src/utils/checkAccess.js
export const can = (role, module, action) => {
  if (!role) return false;

  return role.permissionAccess[0]?.[module]?.[action] === true;
};
