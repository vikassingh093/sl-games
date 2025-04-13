import React from 'react';
import { EE } from '../App';
import '../css/reg.css';
import {PAGE_SIZE_DEFAULT} from "../common/Config";

export class RegWin extends React.Component {
	constructor(props) {
		super(props);
		this.onClose = this.onClose.bind(this);

	}

	componentDidMount() {
		EE.addListener("RESIZE", this.onResize);
		EE.emit("FORCE_RESIZE");
	}

	onResize(data) {
		const cont = document.getElementsByClassName("modal-window-reg__scale-cont")[0];
		const sc = Math.min(data.h/PAGE_SIZE_DEFAULT.height, data.w/PAGE_SIZE_DEFAULT.width);
		if(cont) {
			cont.style.transform = `scale(${sc})`;
		}
	}

	onRegistration () {
		EE.emit('SHOW_LOGIN');
	}

	onFocus (e) {
		e.target.value = '';
	}

	onClose () {
		EE.emit('SHOW_LOGIN');
	}

	render () {
		return (
			<div className="modal-window-reg">
				<div className="modal-window-reg__scale-cont">
					<input className="modal-window-reg__name modal-window-reg__fields" type="text" onFocus={this.onFocus} onInput={this.onInput} placeholder={"Name"}/>
					<input className="modal-window-reg__phone modal-window-reg__fields" type="text" onFocus={this.onFocus} onInput={this.onInput} placeholder={"Phone"}/>
					<input className="modal-window-reg__email modal-window-reg__fields" type="text" onFocus={this.onFocus} onInput={this.onInput} placeholder={"Email"}/>
					<input className="modal-window-reg__comment modal-window-reg__fields" type="text" onFocus={this.onFocus} onInput={this.onInput} placeholder={"Comment"}/>
					<img className="modal-window-reg__close game-button" onClick={this.onClose} src="/images_christmas/screens/elements/buttons/close.png" alt=""/>
					<img className="modal-window-reg__get game-button" onClick={this.onRegistration} src="/images_christmas/screens/elements/buttons/bget.png" alt=""/>
					<img className="modal-window-reg__back" src="/images_christmas/screens/reg_back.png" alt=""/>
				</div>
			</div>
		)
	}
}