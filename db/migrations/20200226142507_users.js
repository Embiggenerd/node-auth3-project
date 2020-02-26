exports.up = function (knex) {
    return knex.schema.createTable('users', users => {
        users.increments();

        users
            .string('department', 128)
            .notNullable()

        users
            .string('name', 128)
            .notNullable()
            .unique();

        users.string('password', 128)
            .notNullable();
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('users');
};