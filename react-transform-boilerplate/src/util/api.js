import SuperAgent from 'superagent';
class Api {
    constructor() {
        this.fetchedData = {};
    }
    setOnFetch(onFetch){
        this.onFetch=onFetch;
    }

    onFetch(err, resp) {
      resp ? console.log(resp) : console.log(err)
    }

    fetchTableData(url) {

        let self = this;
        SuperAgent.get(url)
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set('Access-Control-Allow-Origin', '*')
            .end(self.onFetch);
    }
    addSpecification(url,body,handleRequest){
        let self=this;
        SuperAgent.post(url)
             .set('Content-Type', 'application/json')
             .send(JSON.stringify(body))
             .set('Access-Control-Allow-Origin','*')
             .set('Accept', 'application/json')
             .set('Content-Type', 'application/json')
             .end(handleRequest)
    }
    deleteSpecification(url,handleDelete){
        SuperAgent
            .del(url)
            .end(handleDelete)

    }
    getRequest(url,body){
        let self=this;
        let request={
            request:body.request
        }
        SuperAgent.post(url)
            .send(JSON.stringify(request))
            .set('appId',body.appId)
            .set('Access-Control-Allow-Origin','*')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .end(self.onFetch);

    }
}

const api=new Api;
export default api;
