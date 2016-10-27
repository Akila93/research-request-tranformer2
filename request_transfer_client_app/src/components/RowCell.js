import React, { Component } from 'react';
import {Dropdown} from "./dropdown"

export class RowCell extends Component {
    constructor(props) {
        super(props);
        if(props.handleClick){
            this.handleClick=props.handleClick;
        }
        this.state={
            leave:true,
            enter:false,
            indexSelected:-1,
            title:"",
            mouseStates:[{enter: false,leave: true},{enter: false,leave: true}]
        };

    }
    //handleMouseEnter() {
    handleMouseEnter(index) {
        //if(!this.props.checkMouseIsOnAList()) {
        let mouseStates=this.state.mouseStates;
        mouseStates[index]={enter: true,leave: false};
        this.setState({
            //enter: true,
            //leave: false,
            mouseStates: mouseStates
            });
        //}
    }

    handleMouseLeave(index) {
        let mouseStates=this.state.mouseStates;
        mouseStates[index]={enter: false,leave: true};
        //if(!this.state.overList) {
        this.setState({
            //enter: false,
            //leave: true,
            mouseStates: mouseStates
            });
        //}else{

        // }
    }

    onItemSelect(indexSelected,title){
        this.indexSelected=indexSelected;
        this.title=title;
            this.setState({enter:false,leave:true, indexSelected:indexSelected, title:title},
            function(){
                this.props.onItemSelect(indexSelected,title);
            }.bind(this))

    }
    onCustomTypeSelect(){
        this.props.onCustomTypeSelect();
    }

    render() {
        let onOverStyles={backgroundColor:'black',color:'white'};
        let onOutStyles={backgroundColor:'white',color:'black'};

        let cellState=this.state;
        let row=this.props.self;
        let paddingStyle={
            paddingTop:'10px',
                paddingBottom:'10px'
        };



        if(!this.props.mouseEventToElement){

            let dropDowns=this.props.options.map(function(option){

                return <div style={paddingStyle} >
                        {option.lable}
                        <Dropdown onCustomTypeSelect={this.onCustomTypeSelect.bind(this)} enter={this.state.mouseStates[0].enter} leave={this.state.mouseStates[0].leave} noInitial={option.noInitial} onItemSelect={this.onItemSelect.bind(this)} ref={option.ref} items={option.items} title={option.title}/>
                    </div>

                }.bind(this));

            return (
                    <td ref={this.props.ref} onMouseOver={this.handleMouseEnter.bind(this,0)} onMouseOut={this.handleMouseLeave.bind(this,0)}>
                        {dropDowns}
                    </td>
                );

        }else{
            let dropDowns=this.props.options.map(function(option,i){
                    //let styleForDiv={{}};
                    return <div style={paddingStyle} onMouseEnter={this.handleMouseEnter.bind(this,i)} onMouseLeave={this.handleMouseLeave.bind(this,i)}>
                        {option.lable}
                        <Dropdown onCustomTypeSelect={this.onCustomTypeSelect.bind(this)} enter={this.state.mouseStates[i].enter} leave={this.state.mouseStates[i].leave} noInitial={option.noInitial} onItemSelect={this.onItemSelect.bind(this)} ref={option.ref} items={option.items} title={option.title}/>
                    </div>

                    }.bind(this));

            return (
                    <td  ref={this.props.ref}>
                         {dropDowns}
                    </td>

                );
        }
//

    }

}