const profileForm = document.getElementById('profile-form');
const profileNameInput = document.getElementById('profile-name');
const profileEmailInput = document.getElementById('profile-email');
const profilePhoneInput = document.getElementById('profile-phone');
const profileAddressInput = document.getElementById('profile-address');
const profileCityInput = document.getElementById('profile-city');
const profilePostalInput = document.getElementById('profile-postal');
const profilePicInput = document.getElementById('profile-pic-input');
const profilePicPreview = document.getElementById('profile-pic-preview');
const cancelBtn = document.getElementById('cancel-btn');

function loadProfileData() {
  const user = getLoggedInUser();

  if (!user) {
    window.location.href = '../auth/signin.html';
    return;
  }

  profileNameInput.value = user.name || '';
  profileEmailInput.value = user.email || '';
  profilePhoneInput.value = user.phone || '';
  profileAddressInput.value = user.address || '';
  profileCityInput.value = user.city || '';
  profilePostalInput.value = user.postal || '';

  if (user.profilePic) {
    profilePicPreview.src = user.profilePic;
  }
}

profilePicInput.addEventListener('change', (event) => {
  const file = event.target.files[0];

  if (!file) {
    return;
  }

  if (!file.type.startsWith('image/')) {
    alert('Please select an image file.');
    return;
  }

  if (file.size > 20 * 1024 * 1024) {
    alert('File size must be less than 20MB.');
    return;
  }

  const reader = new FileReader();

  reader.onload = (e) => {
    profilePicPreview.src = e.target.result;
  };

  reader.readAsDataURL(file);
});

profileForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const name = profileNameInput.value.trim();
  const phone = profilePhoneInput.value.trim();
  const address = profileAddressInput.value.trim();
  const city = profileCityInput.value.trim();
  const postal = profilePostalInput.value.trim();

  if (!name) {
    alert('Please enter your full name.');
    return;
  }

  const currentUser = getLoggedInUser();

  const updatedUser = {
    ...currentUser,
    name,
    phone,
    address,
    city,
    postal,
    profilePic: profilePicPreview.src,
    updatedAt: new Date().toISOString()
  };

  setLoggedInUser(updatedUser);

  const users = getUsers();
  const userIndex = users.findIndex(u => u.email === currentUser.email);

  if (userIndex !== -1) {
    users[userIndex] = updatedUser;
    saveUsers(users);
  }

  alert('Profile updated successfully!');
  
  setTimeout(() => {
    window.history.back();
  }, 500);
});

cancelBtn.addEventListener('click', () => {
  window.history.back();
});

window.addEventListener('load', loadProfileData);
