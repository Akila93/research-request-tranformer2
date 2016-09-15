import React, { Component } from 'react';
import {Badge} from "./badge"
import {Listitem} from "./listItem"

export class Dropdown extends Component{
    constructor(props){
        super(props);

        this.state={clicked:false,
            title: this.props.title
        };

    }



    handleClick() {
        this.setState({clicked:!this.state.clicked});
    }
    getIndexOfSelected(title){

        for(let x=0;x< this.props.items.length;x++){

            if(this.props.items[x]==title){
                return x;
            }
        }

    }

    whenClicked(title){

        this.props.onItemSelect(this.getIndexOfSelected(title),title);
        this.setState({clicked:false, title: title});

    }


    render() {
        return (
            <div className="dropdown">
                <Badge  iconClassName={"caret"} handleClick={this.handleClick.bind(this)} className={"btn-default dropdown-toggle"} ref={this.props.ref} title={this.state.title}/>
                <ul ref="dropdownlist" className={"dropdown-menu"+(this.state.clicked?" show":"")}>
                    {this.props.items.map(function(item){
                        return <Listitem whenClicked={this.whenClicked.bind(this)} className="" item={item} link={"#"}/>;

                    }.bind(this))}

                </ul>
            </div>
        );
    }



}
