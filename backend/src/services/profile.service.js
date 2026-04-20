const doctorProfileModel = require('../models/doctorsProfile.model');
const patientProfileModel = require('../models/patientProfile.model');
const labSpecialistProfileModel = require('../models/labSpecialistProfile.model');
const adminModel = require('../models/admin.model');

async function createDoctorProfile(userId, data) {
  const profile = await doctorProfileModel.create({
    userId,
    ...data
  });
  return profile;
}

async function createPatientProfile(userId, data) {
  const profile = await patientProfileModel.create({
    userId,
    ...data
  });
  return profile;
}

async function createLabSpecialistProfile(userId, data) {
  const profile = await labSpecialistProfileModel.create({
    userId,
    ...data
  });
  return profile;
}

async function createAdminProfile(userId, data) {
  const profile = await adminModel.create({
    userId,
    ...data
  });
  return profile;
}

async function getProfileByRole(userId, role) {
  let profile;
  switch (role) {
    case 'Doctor':
      profile = await doctorProfileModel.findOne({ where: { userId } });
      break;
    case 'Patient':
      profile = await patientProfileModel.findOne({ where: { userId } });
      break;
    case 'Lab Specialist':
      profile = await labSpecialistProfileModel.findOne({ where: { userId } });
      break;
    case 'Admin':
      profile = await adminModel.findOne({ where: { userId } });
      break;
    default:
      throw new Error('Invalid role');
  }
  return profile;
}

module.exports = {
  createDoctorProfile,
  createPatientProfile,
  createLabSpecialistProfile,
  createAdminProfile,
  getProfileByRole
};
