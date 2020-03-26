exports.up =
  /** @param {import('knex')} knex */
  function(knex) {
    return knex.schema.createTable("ongs", table => {
      table.string("id").primary();
      table.string("name").notNullable();
      table.string("email").notNullable();
      table.string("whatsapp").notNullable();
      table.string("city").notNullable();
      table.string("uf", 2).notNullable();
    });
  };

exports.down =
  /** @param {import('knex')} knex */
  function(knex) {
    return knex.schema.dropTable("ongs");
  };
