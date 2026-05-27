# 🧪 Complete Testing Guide - Authentication & Account Management

## Pre-Testing Checklist
✅ Fixed script loading order in `layout.js`
✅ Fixed `signup.html` - removed non-existent auth.js reference
✅ Enhanced `account-menu.js` with better error handling
✅ Added console debugging for troubleshooting

---

## ✅ STEP 1: Test Sign-Up Form

### How to Test:
1. Navigate to: `http://localhost:8000/auth/signup.html`
2. You should see a beautiful signup form with:
   - Full Name input
   - Email input
   - Password input
   - Confirm Password input
   - Sign Up button
   - Social login options

### Test Cases:

#### Test 1.1: Empty Fields
- Leave all fields empty and click "Sign Up"
- Expected: Error message "Please fill in all fields"

#### Test 1.2: Invalid Name (Less than 2 characters)
- Name: "A"
- Email: "test@example.com"
- Password: "password123"
- Confirm: "password123"
- Click Sign Up
- Expected: Error message "Name must be at least 2 characters"

#### Test 1.3: Invalid Email Format
- Name: "John Doe"
- Email: "invalid-email"
- Password: "password123"
- Confirm: "password123"
- Click Sign Up
- Expected: Error message "Please enter a valid email address"

#### Test 1.4: Weak Password (Less than 6 characters)
- Name: "John Doe"
- Email: "john@example.com"
- Password: "123"
- Confirm: "123"
- Click Sign Up
- Expected: Error message "Password must be at least 6 characters"

#### Test 1.5: Password Mismatch
- Name: "John Doe"
- Email: "john@example.com"
- Password: "Password123"
- Confirm: "DifferentPassword"
- Click Sign Up
- Expected: Error message "Passwords do not match"

#### Test 1.6: Duplicate Email
- Name: "Jane Doe"
- Email: "john@example.com" (already registered from successful signup)
- Password: "password123"
- Confirm: "password123"
- Click Sign Up
- Expected: Error message "Email already registered. Please sign in instead."

#### Test 1.7: Successful Sign-Up ✨
- Name: "John Doe"
- Email: "john@example.com"
- Password: "Password123"
- Confirm: "Password123"
- Click Sign Up
- Expected:
  - Green success message: "Account created successfully! Redirecting to login..."
  - Redirect to `/auth/signin.html` after 1.5 seconds

---

## ✅ STEP 2: Test Sign-In Form

### How to Test:
1. Navigate to: `http://localhost:8000/auth/signin.html`
2. You should see a beautiful signin form with:
   - Email input
   - Password input
   - Forgot Password link
   - Sign In button
   - Social login options

### Test Cases:

#### Test 2.1: Email Not Found
- Email: "nonexistent@example.com"
- Password: "Password123"
- Click Sign In
- Expected: Error message "Email not registered. Please sign up first."

#### Test 2.2: Wrong Password
- Email: "john@example.com" (from previous signup)
- Password: "WrongPassword"
- Click Sign In
- Expected: Error message "Invalid password. Please try again."

#### Test 2.3: Successful Sign-In ✨
- Email: "john@example.com"
- Password: "Password123"
- Click Sign In
- Expected:
  - Green success message: "Login successful! Redirecting..."
  - Redirect to `/Home/Home.html` after 1.5 seconds

---

## ✅ STEP 3: Test Account Dropdown Menu (After Successful Sign-In)

### What to Look For:
After successful login, in the navbar you should see:

1. **Account Icon** (top-right):
   - Should be a user/profile icon
   - Should be clickable

2. **Click the Account Icon** and a dropdown should appear with:
   - **User Name Section**: Displays "John Doe" (the name you registered)
   - **User Email Section**: Displays "john@example.com"
   - **Divider Line**
   - **My Account Link** (with user icon)
   - **Logout Button** (with logout icon, displayed in RED)

### Test Cases:

#### Test 3.1: Dropdown Visibility
- After login, click the account icon
- Expected:
  - Dropdown appears with smooth fade-in animation
  - Shows user's correct name and email
  - Account icon has "aria-expanded=true" attribute

#### Test 3.2: Dropdown Toggle
- Click account icon to open dropdown
- Click account icon again to close dropdown
- Expected:
  - Dropdown closes with smooth fade-out animation
  - Account icon has "aria-expanded=false" attribute

#### Test 3.3: Close Dropdown by Clicking Outside
- Open dropdown by clicking account icon
- Click anywhere outside the dropdown (on the page)
- Expected:
  - Dropdown closes smoothly
  - Does not close account options area when clicking inside

#### Test 3.4: Close Dropdown with ESC Key
- Open dropdown by clicking account icon
- Press ESC key
- Expected:
  - Dropdown closes immediately

#### Test 3.5: My Account Link
- Click "My Account" option in dropdown
- Expected:
  - Link navigates (currently set to #account - can be extended to profile page)

---

## ✅ STEP 4: Test Logout Functionality

### Test Case 4.1: Logout Button
1. Ensure you're logged in and dropdown is open
2. Click the red "Logout" button
3. Expected:
   - Dropdown closes
   - Toast notification appears: "👋 Logged out successfully!"
   - Toast auto-dismisses after 3 seconds
   - Page redirects to `/Home/Home.html` after 1.5 seconds
   - Account menu shows "Guest User" and "Not logged in"

### Test Case 4.2: Verify Logout Worked
1. After logout and redirect, click account icon again
2. Expected:
   - User name shows "Guest User"
   - User email shows "Not logged in"
   - Logout button is hidden (only visible when logged in)

---

## ✅ STEP 5: Test Show More Button

### How to Test:
1. Navigate to: `http://localhost:8000/Home/Home.html`
2. Scroll down to "Our Products" section
3. You should see 8 product cards
4. Below the products, there's a "Show More" button

### Test Case 5.1: Click Show More
- Click the "Show More" button
- Expected:
  - Page redirects to `/Shop/index.html`
  - Products page loads with full product list

---

## 🐛 Troubleshooting Guide

### Issue: Account dropdown doesn't appear or is empty

**Solution Steps:**
1. Open browser DevTools (F12)
2. Check Console for errors
3. Look for messages like "Account menu elements not found in DOM"
4. Check if the navbar is loading properly by inspecting the HTML
5. Verify scripts are loading in order: auth-utils.js → account-menu.js

### Issue: Sign-up form doesn't show validation errors

**Solution Steps:**
1. Open DevTools Console (F12)
2. Fill form and click Sign Up
3. Check if any JavaScript errors appear
4. Try creating an account with all fields filled correctly
5. Check localStorage in DevTools (Application > LocalStorage) for 'users' data

### Issue: Cannot login after signup

**Solution Steps:**
1. Go to signup page again, use different email
2. Sign up with test data: "Test User" / "test@test.com" / "Test123"
3. Go to signin page
4. Try signing in with same email and password
5. Check LocalStorage to verify user was saved

### Issue: Account menu shows "Guest User" instead of logged-in user

**Solution Steps:**
1. Clear browser cache and localStorage (DevTools > Application > Storage > Clear site data)
2. Sign up again with new credentials
3. Sign in
4. Check if you're redirected to Home page
5. Click account icon in navbar

---

## 📊 LocalStorage Verification

To verify data is being saved correctly:

1. Open DevTools (F12)
2. Go to Application tab
3. In left sidebar, find "LocalStorage"
4. Click on `http://localhost:8000`
5. You should see:
   - **Key**: `users` → **Value**: Array of user objects
   - **Key**: `loggedInUser` → **Value**: Current logged-in user object

### Example Data Structure:
```json
// users array:
[
  {
    "id": 1234567890,
    "name": "John Doe",
    "email": "john@example.com",
    "password": "UGFzc3dvcmQxMjM=" (Base64 encoded),
    "createdAt": "2026-05-27T10:30:00.000Z"
  }
]

// loggedInUser:
{
  "id": 1234567890,
  "name": "John Doe",
  "email": "john@example.com",
  "createdAt": "2026-05-27T10:30:00.000Z"
}
```

---

## ✅ Complete Testing Workflow

### Fresh Start Test (Following this workflow):

1. **Clear Everything**:
   - Open DevTools
   - Go to Application → Storage → Clear site data
   - Close and reopen browser

2. **Sign Up**:
   - Go to `/auth/signup.html`
   - Fill form: Name="Test User", Email="test@test.com", Password="Test123"
   - Click Sign Up
   - Verify redirect to signin page and success message

3. **Sign In**:
   - Fill form: Email="test@test.com", Password="Test123"
   - Click Sign In
   - Verify redirect to home page

4. **Check Account Menu**:
   - Look for account icon in navbar (top-right)
   - Click it
   - Verify dropdown shows "Test User" and "test@test.com"
   - Click elsewhere to close

5. **Test Logout**:
   - Click account icon again
   - Click red "Logout" button
   - Verify toast message and redirect
   - Click account icon again
   - Verify it shows "Guest User"

6. **Test Show More**:
   - Scroll to products section
   - Click "Show More" button
   - Verify redirect to Shop page

---

## 🎉 Success Indicators

All tests have passed when you see:
- ✅ Form validations working
- ✅ Error messages appearing and dismissing
- ✅ Account dropdown showing/hiding smoothly
- ✅ User info displayed correctly after login
- ✅ Logout working and redirecting
- ✅ Show More button redirecting to shop
- ✅ LocalStorage updating with user data
- ✅ No console errors

---

## 📝 Notes

- All user data is stored in browser LocalStorage (for demo purposes)
- Passwords are Base64 encoded (basic security - for production use bcrypt)
- No backend integration yet - all validation is client-side
- Ready to integrate with backend authentication later
