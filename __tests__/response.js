const Response = require('./../lib/response')

describe('#getResponse', () => {
    let response
    test('should throw an error if there is no url', () => {
        response = new Response()
        expect(()=>{
            response.getResponse()
        }).toThrow()
    })

})