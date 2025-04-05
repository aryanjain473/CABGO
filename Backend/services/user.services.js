const usermodel = require('../models/user.model');

module.exports.createUser = async ({
    fullname, email, password
}) => {
    if (!fullname || !fullname.firstname || !fullname.lastname || !email || !password) {
        throw new Error('All fields are required');

}
const user = await usermodel.create({
    fullname: {
        firstname: fullname.firstname,
        lastname: fullname.lastname
    },
    email,
    password,
})
return user;
}