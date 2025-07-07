import db from "../../db/client.js"

//start a new game, load the shoe - should this clear the table first?
export async function loadShoe({card_id, deck_num, drawn}){
    const sql = `
    INSERT INTO shoe (card_id, deck_num, drawn)
    VALUES ($1, $2, $3)
    RETURNING *
    `
    const {rows:shoe} = await db.query(sql, [card_id, deck_num, drawn])
    return shoe
}