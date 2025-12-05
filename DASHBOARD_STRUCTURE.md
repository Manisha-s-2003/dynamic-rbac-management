# Dashboard Structure

## Overview
The application now features a unified dashboard with a sidebar navigation that integrates all modules including role management, donors, donations, and reports.

## New Structure

### Layout Component (`frontend/src/components/Layout.js`)
- Main layout wrapper with sidebar navigation
- Responsive design (mobile drawer + desktop permanent sidebar)
- User profile menu with logout
- Dynamic menu items based on user permissions

### Pages

#### 1. Dashboard Home (`/dashboard`)
- Welcome screen with statistics cards
- Quick access to all modules
- Permission-based visibility

#### 2. Donors (`/donors`)
- Donor list table
- Add/Edit/Delete donor functionality
- Permission-based actions (view, add, edit, delete)

#### 3. Donations (`/donations`)
- Donation records table
- Add/Edit/Delete donation functionality
- Permission-based actions

#### 4. Reports (`/reports`)
- Report generation interface
- Quick report downloads (PDF, Excel)
- Date range filtering
- Permission-based access

#### 5. Role Manager (`/roles`)
- Role list view
- Create/Edit roles (`/add-role`, `/edit-role/:id`)
- Module and permission management

## Navigation Menu

The sidebar includes:
- **Dashboard** - Home/overview page
- **Donors** - Donor management (requires `donor.view` permission)
- **Donations** - Donation management (requires `donation.view` permission)
- **Reports** - Report generation (requires `report.generate` permission)
- **Role Manager** - Role management (requires `user.view` permission or Admin role)

## Permissions

The system uses the existing RBAC structure:
- Module access controls which menu items are visible
- Permission access controls what actions users can perform within each module

## Routes

```
/login - Login page
/register - Registration page
/dashboard - Dashboard home (protected)
/donors - Donor management (protected)
/donations - Donation management (protected)
/reports - Reports page (protected)
/roles - Role list (protected)
/add-role - Create new role (protected)
/edit-role/:id - Edit existing role (protected)
```

## Features

- **Responsive Design**: Works on mobile, tablet, and desktop
- **Permission-Based UI**: Only shows features users have access to
- **Unified Navigation**: Single sidebar for all modules
- **User Profile Menu**: Quick access to user info and logout
- **Modern UI**: Material-UI components with consistent styling

## Running the Application

1. Start the backend:
   ```bash
   cd backend
   npm start
   ```

2. Start the frontend:
   ```bash
   cd frontend
   npm start
   ```

3. Access the application at `http://localhost:3000`

## Next Steps

To fully implement the donor and donation features:
1. Create backend API endpoints for donors and donations
2. Create service files similar to `roleService.js`
3. Connect the frontend forms to the backend APIs
4. Add data persistence and validation
