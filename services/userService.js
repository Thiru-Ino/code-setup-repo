// const userController = require("../controllers/userController");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getUserByEmail = async (email) => {
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    return existingUser;
  } catch (error) {
    throw new Error(`Error occurred while fetching user: ${error.message}`);
  }
};

const createUser = async ({email,name,phoneNumber,country,referralCode,}) => {
  try {
    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        phoneNumber,
        country,
        referralCode,
      },
    });
    return newUser;
  } catch (error) {
    throw new Error(`Error occurred while creating user: ${error.message}`);
  }
};

module.exports = {
  getUserByEmail,
  createUser,
};
