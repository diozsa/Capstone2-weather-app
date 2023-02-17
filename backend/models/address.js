"use strict";

const db = require("../db");
const { NotFoundError } = require("../expressError");


/** Related functions for addresses table. */

class Address {

  /******** Saves an address (from data), update db, return undefined.
   *
   * data should be { address, username }
   **/

  static async save(data) {
    const result = await db.query(
      `INSERT INTO addresses (address, username)
        VALUES ($1, $2)
        RETURNING *`,
      [
        data.address,
        data.username,
      ]);
    let address = result.rows[0];

    return address;
  }


  /*********** Find all addresses per username
   *
   * Returns [{ id, address, username }, ...]
   * */

  static async findAll(username) {
    const result = await db.query(
                 `SELECT *
                  FROM addresses 
                  WHERE username = $1`,
      [username]);
    
    return result.rows;
  }


  /************* get(id) 
   * Given an address id, return address data.
   *
   * Returns { id, address, username }
   *
   * Throws NotFoundError if not found.
   **/

  static async get(id) {
    const addressRes = await db.query(
           `SELECT *
            FROM addresses
            WHERE id = $1`,
      [id]);

    const address = addressRes.rows[0];

    if (!address) throw new NotFoundError(`Invalid address: ${id}`);

    return address;
  }


  /******* Delete given address from database; returns undefined.
   *
   * Throws NotFoundError if address is not found.
   **/

  static async remove(id) {
    const result = await db.query(
          `DELETE
           FROM addresses
           WHERE id = $1
           RETURNING id`,
      [id]);
    
    const address = result.rows[0];

    if (!address) throw new NotFoundError(`Address not found: ${id}`);
  }
}

module.exports = Address;