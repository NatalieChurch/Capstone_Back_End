import db from "./client.js"
import { createUser } from "./queries/users.js";


await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed(){

const newUser = await createUser({
    username: "user1",
    password: "1234"
})

}