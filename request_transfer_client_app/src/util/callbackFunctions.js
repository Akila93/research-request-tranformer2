
export function saveSpecificationCallback(err,resp) {
    if (resp) {
        this.setState({
            alertOfAppIdFade: "in",
            generatedAppId: resp.body.appId
        });
    }else{

    }
}

export function handlePreviewCallback(err,resp){
    if(resp){
        this.setState({
            outputTextAreaValue: JSON.stringify(resp.body.requestBody,null,2)
        });
    }
}

export function submitDataCallback(err,resp){
    try{
        if(resp){
            const responseBody =resp.body;
            let ValueFormatters=[],ValueType=[];
            for(const key in responseBody){
                if(key!="Nested") {
                    ValueType.push(key);
                    ValueFormatters.push(responseBody[key]);
                }
            }
            let self = this;
            console.log(ValueFormatters+" "+ValueType);
            var addRawByRaw=function(request,self,responseBody,ValueType,ValueFormatters,parentRaw,rawVisibility){

                //console.log("in");
                console.log(parentRaw);
                for(const key in request) {
                    let title="String";
                    let value=request[key];
                    var nummberReg = new RegExp("^[-]?[0-9]+[\.]?[0-9]+$");
                    var dateReg=new RegExp("[-+]?\\d*\\.?\\d+");
                    if(nummberReg.test(value)){
                        title="Number";
                    }else if(dateReg.test(value)){
                        title="Date"
                    }else if(typeof value !="string"){
                        title="Nested"
                    }
                    console.log(title);

                    console.log(typeof value === 'string',value);
                    if(typeof value === 'string') {
                        self.addTableData(key, responseBody.String, ValueType, ValueFormatters, self.handleRemoveTableClick.bind(self),false,parentRaw,rawVisibility,this.handlePreview.bind(this),'noicon',title);
                    }else{
                        self.addTableData(key, responseBody.String, ["Nested"], [["Nested"]], self.handleRemoveTableClick.bind(self),true,parentRaw,rawVisibility,this.handlePreview.bind(this),'icon-minus',title);

                    }
                    if(!(typeof value === 'string')){
                        addRawByRaw(value,self,responseBody,ValueType,ValueFormatters,key,'table-row');

                    }
                }
            }.bind(self);
            if(this.request){
                addRawByRaw(this.request,this,responseBody,ValueType,ValueFormatters,"none",'table-row');
            }
        }else{
            resp ? console.log(resp) : console.log(err);
        }
    }catch(err){}

}