export function handlePreview(func){

    let specification = this.formASpecification();
    let request=this.formARequest();
    //console.log("specification :",request);
    console.log("inside handle preview function")
    let previewBody={
        specification:specification,
        request:request,
    }
    console.log(previewBody);
    Api.handlePreviewRequest(previewBody,this.handlePreviewCallback.bind(this));
    if(func){
        this.setState(
            {
                visible: {
                    table: true,
                    inputTextArea: false,
                    outputTextArea: true
                }
            },func
        );

    }else{
        this.setState(
            {
                visible: {
                    table: true,
                    inputTextArea: false,
                    outputTextArea: true
                }
            }
        );}
}



export function handleChange(event){
    this.setState({
        inputTextAreaValue: event.target.value,
        inputTextObject:JSON.parse(event.target.value)

    })
}


export function saveSpecification(){
    let specification = this.formASpecification();
    Api.addSpecification(specification,this.saveSpecificationCallback.bind(this));
    this.setState(
        {
            visible: {
                table: true,
                inputTextArea: false,
                outputTextArea: true
            }
        }
    );
}


export function handleRemoveTableClick(){

    let table=this.refs.tableData;
    let list = this.refs.tableData.refs;
    const len = this.state.TableData.length;
    for(let x=0;x<len;x++){
        let key = this.state.TableData[x].keyValue;
        if(list[key].state.selected){
            this.deleteTableData(key,"none");
        }
    }
}

export function submitData(){
    try{
        this.request=JSON.parse(this.state.inputTextAreaValue);
        Api.fetchTableData(this.submitDataCallback.bind(this));
        this.setState({
            visible: {
                table: true,
                inputTextArea: true,
                outputTextArea: true
            }

        });
    }catch(err){
        console.log("parse errror");
    }

}