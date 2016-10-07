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

    fetchTableData(fetchRequest) {

        SuperAgent.get('http://172.16.1.182:8080/specification')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set('Access-Control-Allow-Origin', '*')
            .end(fetchRequest);
    }
    addSpecification(body,handleRequest){
        let self=this;
        SuperAgent.post('http://172.16.1.182:8080/specification')
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
    getRequest(body){
        let self=this;
        let request={
            request:body.request
        }
        SuperAgent.post('http://172.16.1.182:8080/request')
            .send(JSON.stringify(request))
            .set('appId',body.appId)
            .set('Access-Control-Allow-Origin','*')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .end(self.onFetch);

    }

    handlePreviewRequest(body,handleRequest){
        SuperAgent.post('http://172.16.1.182:8080/request/preview')
            .set('Content-Type', 'application/json')
            .send(JSON.stringify(body))
            .set('Access-Control-Allow-Origin','*')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .end(handleRequest)
    }

}

const api=new Api;
export default api;
