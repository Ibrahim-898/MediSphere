const bcrypt = require('bcrypt');
const { sequelize } = require('../config/db');
const User = require('../models/user.model');
const Admin = require('../models/admin.model');

async function seedAdmin() {
  try {
    await sequelize.sync();

    const hashedPassword = await bcrypt.hash('admin123', 10);
    const adminUser = await User.create({
      email: 'admin@medisphere.com',
      password: hashedPassword,
      role: 'Admin'
    });

    await Admin.create({
      userId: adminUser.id,
      fullName: 'Admin User',
      phone: '01700000000',
      department: 'Hospital Admin'
    });

    console.log('Demo Admin created: admin@medisphere.com / admin123');
  } catch (error) {
    console.error('Seeder error:', error);
  }
}

seedAdmin();
