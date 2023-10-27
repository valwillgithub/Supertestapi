import { expect } from 'chai';
const supertest = require('supertest');
const request = supertest('https://gorest.co.in/public-api/');

require('dotenv').config();
const TOKEN = process.env.TOKEN;
//TOKEN = '8f687a772b90bb4bf03e66fd87aadece224d2a2df540797adee3d760013e9305';

let userID = '';
describe.only('Users', () => {
  let num = Math.floor(Math.random() * 9999);
  const data = {
    email: `test-${num}@email.com`,
    name: `Joe Bloggs${num}`,
    gender: 'male',
    status: 'active',
  };
  it('Create a user POST', async () => {
    const res = await request
      .post('users')
      .set('Authorization', `Bearer ${TOKEN}`)
      .send(data);
    console.log('data => ', res.body.data);
    userID = res.body.data.id;
    console.log('userID => ', userID);
    expect(res.body.data).to.deep.include(data);
  });
  it('Get a user', async () => {
    //const res = await request.get(`users?access-token=${TOKEN}`);
    const res = await request
      .get(`users/${userID}`)
      .set('Authorization', `Bearer ${TOKEN}`);

    console.log('User info => ', res.body.data);
    expect(res.body.data.email).to.equal(data.email);
    expect(res.body.data.id).to.equal(userID);
  });

  it('Update a user PUT', async () => {
    let changedata = {
      status: 'inactive',
      name: `Tiny Turner${Math.floor(Math.random() * 9999)}`,
    };
    const res = await request
      .put(`users/${userID}`)
      .set('Authorization', `Bearer ${TOKEN}`)
      .send(changedata);

    console.log('PUT User info => ', res.body.data);
    expect(res.body.data.name).to.equal(changedata.name);
    expect(res.body.data.status).to.equal('inactive');
  });

  it('Delete a user', async () => {
    const res = await request
      .delete(`users/${userID}`)
      .set('Authorization', `Bearer ${TOKEN}`);

    console.log('Delete User => ', res.body.data);
    expect(res.body.data).to.be.equal(null);
  });
}); //describe
