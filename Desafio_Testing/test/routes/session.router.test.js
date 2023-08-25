import { dropUser } from "../setup.test.js";
import { expect } from "chai";
import supertest from "supertest";


const requester = supertest('http://localhost:4000')


describe('Test Routes sessions', () => {

    it("[POST] /api/register register successfully", async () => {
        await dropUser()
        const mockUser = {
            first_name: 'John',
            last_name: 'Connor',
            email: 'john@connor',
            age: 16,
            password: "terminator123"
        }
        const response = await requester.post('/api/register').send(mockUser)
        //onsole.log(response)
        expect(response.statusCode).to.be.eql(302)

    })

})