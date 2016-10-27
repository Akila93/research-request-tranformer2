import React, { Component } from 'react';
import {Badge} from "./badge"
import {Listitem} from "./listItem"

export class Dropdown extends Component{
    constructor(props){
        super(props);
        this.state={//enter:false,
            title: this.props.title,
            firstRender:true
            //leave:true,
            //enter:false
        };
        this.renderListItem = this.renderListItem.bind(this);

    }



    //handleMouseEnter() {
    //    //if(!this.props.checkMouseIsOnAList()) {
    //        this.setState({enter: true, leave: false});
    //    //}
    //}
    //
    //handleMouseLeave() {
    //    //if(!this.state.overList) {
    //        this.setState({enter: false, leave: true});
    //    //}else{
    //
    //   // }
    //}



    getIndexOfSelected(title){

        for(let x=0;x< this.props.items.length;x++){

            if(this.props.items[x]==title){
                return x;
            }
        }

    }



    whenClicked(title){
        let self = this;
        this.setState({title: title,firstRender:false},function(){
            if(this.state.title=="custom"){
                this.props.onCustomTypeSelect();
            }else{this.props.onItemSelect(this.getIndexOfSelected(title),title);}

        }.bind(self));

    }



    renderListItem(){

        //styleSelected['background']='#6789f7';
        //styleSelected['border']='1px solid black';
        //border: 1px solid black
        if(this.props.noInitial){
            let styleSelected={};
            return <Listitem styles={styleSelected} whenClicked={this.whenClicked.bind(this)} className="" item={[]} link={"#"}/>;
        }
        return this.props.items.map(function(item,index){
            let styleSelected={};
            //styleSelected['background']='#6789f7';
            //styleSelected['border']='1px solid black';
            return <Listitem styles={styleSelected} whenClicked={this.whenClicked.bind(this)} className="" item={item} link={"#"}/>;

        }.bind(this))
    }


    render() {

        return (
            //<ul ref="dropdownlist" className={"dropdown-menu"+(this.state.enter?" show":"")}>
            //<td onMouseEnter={this.handleMouseEnter.bind(this)} onMouseLeave={this.handleMouseLeave.bind(this)}>
            <div className="dropdown table-row-cell ddown">
                <span className="dropbtn" >{this.state.title+"  "}</span>
                <span className={"caret mysize"}  ref={this.props.ref}/>
                <ul ref="dropdownlist dropdown-content" className={"dropdown-menu"+(this.props.enter?" show":"")}>
                    {this.renderListItem()}

                </ul>
            </div>
                //</td>
        );
    }



}
