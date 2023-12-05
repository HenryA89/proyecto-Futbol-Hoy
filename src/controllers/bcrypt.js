import bcrypt from "bcrypt"

export const encrypt = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};
export const comparar = async (password, savedPassword) => {
  
    return await bcrypt.compare(password, savedPassword);
  
};


