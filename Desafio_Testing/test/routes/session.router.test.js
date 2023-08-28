
import { expect } from "chai";
import supertest from "supertest";


const requester = supertest('http://localhost:4000')


describe('Test Routes sessions', () => {
    let cookie

    it("[POST] /api/register register successfully", async () => {
        const mockUser = {
            first_name: 'John',
            last_name: 'Connor',
            email: 'john@connor',
            age: 16,
            password: "terminator123"
        }
        const response = await requester.post('/api/register').send(mockUser)
        expect(response.statusCode).to.be.eql(200)
    })

    it("[POST] /api/session/login login successfully", async () => {
        const mockUserLogin = {
            email: 'john@connor',
            password: "terminator123"
        }
        const response = await requester.post('/api/session/login').send(mockUserLogin)
        const cookieHeader = response.headers['set-cookie'][0]
        cookie = {
            name: cookieHeader.split('=')[0],
            value: cookieHeader.split('=')[1]
        }
        expect(cookieHeader).to.be.ok
        expect(cookie.name).to.equal('coderCookie')
        expect(cookie.value).to.ok
    })

    it('[GET] /api/session/current  current session ', async () => {

        const response = await requester.get('/api/session/current').set('Cookie', [`${cookie.name}=${cookie.value}`])

        //console.log(response.body.payload.user)

        expect(response.body.payload.user.email).to.be.eql('john@connor');
    })


})