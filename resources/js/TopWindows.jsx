import React from 'react';
import {EE} from "./App";
import {LoginWin} from "./windows/LoginWin";
import {RegWin} from "./windows/RegWin";
import {NewPassWin} from "./windows/NewPassWin";
import {InfoWin} from "./windows/InfoWin";
import {RulesWin} from "./windows/RulesWin";
import {BonusWin} from "./windows/BonusWin";
import {LuckyWin} from "./windows/LuckyWin";

let PAGE_LOGIN = "PAGE_LOGIN";
let PAGE_INFO = "PAGE_INFO";
let PAGE_REG = "PAGE_REG";
let PAGE_NPASS = "PAGE_NPASS";
let PAGE_RULES = "PAGE_RULES";
let PAGE_BONUS = "PAGE_BONUS";
let SHOW_LUCKY = "SHOW_LUCKY";
class TopWindows extends React.Component {
	constructor(props) {
		super(props);
		this.onCloseAll = this.onCloseAll.bind(this);
		this.goOpenChangePass = this.goOpenChangePass.bind(this);
		this.state = {
			CURRENT_PAGE: ""
		}		
	}

	onCloseAll() {
		this.setState({CURRENT_PAGE: ""});
	}

	componentDidMount() {
		EE.addListener('CLEAR_TOP_WINDOWS', this.onCloseAll);

		EE.addListener('SHOW_LUCKY', ()=>{
			this.setState({CURRENT_PAGE: SHOW_LUCKY});
		});
		EE.addListener('SHOW_LOGIN', ()=>{
			this.setState({CURRENT_PAGE: PAGE_LOGIN});
		});
		EE.addListener('SHOW_INFO', ()=>{
			this.setState({CURRENT_PAGE: PAGE_INFO});
		});
		EE.addListener('SHOW_REG', ()=>{
			this.setState({CURRENT_PAGE: PAGE_REG});
		});
		EE.addListener('SHOW_RULES', ()=>{
			this.setState({CURRENT_PAGE: PAGE_RULES});
		});
		EE.addListener('SHOW_BONUS', ()=>{
			this.setState({CURRENT_PAGE: PAGE_BONUS});
		});
		EE.addListener('SHOW_NPASS', this.goOpenChangePass);
	}

	goOpenChangePass () {
		this.setState({CURRENT_PAGE: PAGE_NPASS});
	}

	render () {
		return (
			<div className="modal-windows-cont">
				{(this.state.CURRENT_PAGE === PAGE_RULES && <RulesWin onClose={this.onCloseAll}/> )}
				{(this.state.CURRENT_PAGE === PAGE_INFO && <InfoWin onClose={this.onCloseAll} goChangePass={this.goOpenChangePass}/> )}
				{(this.state.CURRENT_PAGE === PAGE_NPASS && <NewPassWin onClose={this.onCloseAll}/> )}
				{(this.state.CURRENT_PAGE === PAGE_BONUS && <BonusWin onClose={this.onCloseAll}/> )}
				{(this.state.CURRENT_PAGE === PAGE_REG && <RegWin/> )}
				{(this.state.CURRENT_PAGE === PAGE_LOGIN && <LoginWin onClose={this.onCloseAll}/> )}
				{(this.state.CURRENT_PAGE === SHOW_LUCKY && <LuckyWin onClose={this.onCloseAll}/> )}
			</div>
		)
	}
}

export default TopWindows;
