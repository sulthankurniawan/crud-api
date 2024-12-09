import request from 'supertest';
import app from '../app.js'; // Ensure this is the correct path to your app
import assert from 'assert'; // Use Node.js's built-in assert
import Item from '../models/item.js'; // Adjust the path to your Item model

describe('Item API', () => {
    before(async () => {
        await Item.deleteMany({}); // Clear the collection before tests
    });

    describe('POST /api/items', () => {
        it('should create a new item', async () => {
            const res = await request(app)
                .post('/api/items')
                .send({ name: 'Item 1', description: 'Test Item', price: 100 });

            console.log(res.body); // Log the response for debugging

            assert.strictEqual(res.status, 201, 'Status code is not 201');
            assert.ok(res.body, 'Response body is missing');
            assert.strictEqual(res.body.name, 'Item 1', 'Item name does not match');
        });
    });

    describe('GET /api/items', () => {
        it('should retrieve all items', async () => {
            const res = await request(app).get('/api/items');

            assert.strictEqual(res.status, 200, 'Status code is not 200');
            assert.ok(Array.isArray(res.body), 'Response body is not an array');
        });
    });

    describe('GET /api/items/:id', () => {
        it('should retrieve a single item by ID', async () => {
            const item = new Item({ name: 'Item 2', price: 150 });
            await item.save();

            const res = await request(app).get(`/api/items/${item.id}`);

            assert.strictEqual(res.status, 200, 'Status code is not 200');
            assert.ok(res.body, 'Response body is missing');
            assert.strictEqual(res.body.name, 'Item 2', 'Item name does not match');
        });
    });

    describe('PUT /api/items/:id', () => {
        it('should update an item', async () => {
            const item = new Item({ name: 'Item 3', price: 200 });
            await item.save();

            const res = await request(app)
                .put(`/api/items/${item.id}`)
                .send({ name: 'Updated Item 3', price: 250 });

            assert.strictEqual(res.status, 200, 'Status code is not 200');
            assert.ok(res.body, 'Response body is missing');
            assert.strictEqual(res.body.name, 'Updated Item 3', 'Item name does not match');
        });
    });

    describe('DELETE /api/items/:id', () => {
        it('should delete an item', async () => {
            const item = new Item({ name: 'Item 4', price: 300 });
            await item.save();

            const res = await request(app).delete(`/api/items/${item.id}`);

            assert.strictEqual(res.status, 200, 'Status code is not 200');
            assert.ok(res.body, 'Response body is missing');
            assert.strictEqual(res.body.message, 'Item deleted successfully', 'Deletion message does not match');
        });
    });
});
