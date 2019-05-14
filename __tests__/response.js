const Response = require('../lib/response')

describe('#getResponse', () => {
    test('should throw an error if there is no url', () => {
        const response = new Response()
        expect(()=>{
            response.getResponse()
        }).toThrow()
    })

    test.todo('should return a status code')

})