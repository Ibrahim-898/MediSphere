const profileService = require('../services/profile.service');

async function createProfile(req, res) {
  try {
    const { role } = req.user;
    const data = req.body;
    let result;

    switch (role) {
      case 'Doctor':
        result = await profileService.createDoctorProfile(req.user.id, data);
        break;
      case 'Patient':
        result = await profileService.createPatientProfile(req.user.id, data);
        break;
      case 'Lab Specialist':
        result = await profileService.createLabSpecialistProfile(req.user.id, data);
        break;
      case 'Admin':
        result = await profileService.createAdminProfile(req.user.id, data);
        break;
      default:
        return res.status(400).json({ message: 'Invalid role' });
    }

    return res.status(201).json({ message: 'Profile created successfully', profile: result });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function getProfile(req, res) {
  try {
    const profile = await profileService.getProfileByRole(req.user.id, req.user.role);
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    return res.status(200).json(profile);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = { createProfile, getProfile };
