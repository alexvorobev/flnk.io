import { Client } from 'redis-om';

const client = new Client();

async function connect() {
    if (!client.isOpen()) {
        await client.open(process.env.REDIS_URL);
    }
}

export async function get(key: string) {
    await connect();
    return await client.get(key);
}