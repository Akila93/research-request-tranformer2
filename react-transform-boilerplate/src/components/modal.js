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
    renderSaveBtn(){
        if(this.state.saveClicked){
            return <button type="button" data-dismiss="modal" onClick={this.handleOk.bind(this)} className="btn btn-default">Ok</button>;
        }
        return <button type="button" onClick={this.handleSave.bind(this)} className="btn btn-default">Save changes</button>;
    }

    render() {
        return (
            <div className="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header" style={{backgroundColor:'black',color:'white'}}>
                            <button style={{backgroundColor:'black',color:'white'}} type="button" className="close" data-dismiss="modal" aria-label="Close"><span
                                aria-hidden="true">&times;</span></button>
                            <h4 className="modal-title" id="myModalLabel">{this.props.modalTitle}</h4>
                        </div>
                        <div className="modal-body">
                            {
                                this.state.saveClicked?"your changes added":this.props.body()
                            }
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                            {this.renderSaveBtn()}
                            </div>
                    </div>
                </div>
            </div>
        );
    }

}