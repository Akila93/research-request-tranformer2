import React, { Component } from 'react';

export class Modal extends Component{
    constructor(props) {
        super(props);
        this.state={
            saveClicked:false
        };
        this.setState({
            saveClicked:false
        });

    }

    handleSave(){
        this.setState({
            saveClicked:true
        },function() {
            this.props.saveChanges();
        }.bind(this));
    }
    handleOk(){
        this.setState({
            saveClicked:false
        })
    }
    handlePreview(){
        this.props.onPreview();

    }
    renderBtnWithConfirm(){
        if(this.state.saveClicked){
            return <button style={{background: 'transparent'}} type="button" data-dismiss="modal" onClick={this.handleOk.bind(this)} className="btn btn-default">Ok</button>;
        }
        return <button style={{background: 'transparent'}} type="button" onClick={this.handleSave.bind(this)} className="btn btn-default">{this.props.submitButton}</button>;
    }
    renderBtnWithotConfirm(){
        return <button style={{background: 'transparent'}} type="button" data-dismiss="modal" onClick={this.handlePreview.bind(this)} className="btn btn-default">{this.props.submitButton}</button>;
    }

    render() {
        return (
            <div className="modal fade" id={this.props.modalId} tabindex="-1" role="dialog" aria-labelledby="myModalLabel" ref={this.props.ref}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content" style={{backgroundColor:'white'}}>
                        <div className="modal-header" style={{background: 'transparent'}}>
                            <button style={{background: 'transparent',color:'white'}} type="button" className="close" data-dismiss="modal" aria-label="Close"><span
                                aria-hidden="true">&times;</span></button>
                            <h4 className="modal-title" id="myModalLabel">{this.props.modalTitle}</h4>
                        </div>
                        <div className="modal-body"  style={{filter: 'none'}}>
                            {
                                this.state.saveClicked?"your changes added":this.props.body()
                            }
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" data-dismiss="modal" style={{background: 'transparent'}}>Close</button>
                            {this.props.submitBtnWithConfirm?this.renderBtnWithConfirm():this.renderBtnWithotConfirm()}
                            </div>
                    </div>
                </div>
            </div>
        );

    }

}