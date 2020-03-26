exports.up =
  /** @param {import('knex')} knex */
  function(knex) {
    return knex.schema.createTable("incidents", table => {
      table.increments();
      table.string("title").notNullable();
      table.string("description").notNullable();
      table.decimal("value").notNullable();

      table.string("ong_id").notNullable();

      table
        .foreign("ong_id")
        .references("id")
        .inTable("ongs");
    });
  };

exports.down =
  /** @param {import('knex')} knex */
  function(knex) {
    return knex.schema.dropTable("incidents");
  };
