const handleProfileGet = (req, res, knex) => {
    const { id } = req.params;
    knex.select('*').from('users').where({ id })
        .then(user => {
            if (user.length) {
                res.json(user[0]);
            } else {
                res.status(400).json('error getting user')
            }
    })
    .catch(err => res.status(400).json('not found'))
}

const handleProfileUpdate = (req, res, knex) => {
    const { id } = req.params;
    const { name, age, email } = req.body.formInput;
    knex('users')
        .where({ id })
        .update({ name, email })
        .then(resp => {
            if(resp) {
                res.json("Success!")
            } else {
                res.status(400).json("Unable To Update")
            }
        })
        .catch(err => res.status(400).json("Error updating user"))
}

module.exports = {
    handleProfileGet: handleProfileGet,
    handleProfileUpdate: handleProfileUpdate
};