import SuperAgent from 'superagent';
class Api{

    setCallback(callback){
        this.callback=callback;
    }
    callback(err, resp) {

    }
    fetchTableData(url) {
        let self = this;
        SuperAgent.get(url)
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set('Access-Control-Allow-Origin', '*')
            .end(self.callback);
    }
    addSpecification(url,body){
        let self=this;
        SuperAgent.post(url)
             .set('Content-Type', 'application/json')
             .send(JSON.stringify(body))
             .set('Access-Control-Allow-Origin','*')
             .set('Accept', 'application/json')
             .set('Content-Type', 'application/json')
             .end(self.callback)
    }
    getRequest(url,body){
        let self=this;
        SuperAgent.post(url)
            .send(JSON.stringify(body))
            .set('Access-Control-Allow-Origin','*')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .end(self.callback);

    }
}

const api=new Api;
export default api;
