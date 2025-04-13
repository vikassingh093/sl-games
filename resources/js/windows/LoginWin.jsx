import React from 'react';
import { EE } from '../App';
import '../css/login.css';
import $ from 'jquery';
import { signIn, post } from '../server/server';

export class LoginWin extends React.Component {
	constructor(props) {
		super(props);

	}

	componentDidMount() {
		EE.addListener("RESIZE", this.onResize);
		EE.emit("FORCE_RESIZE");
	}

	onResize(data) {
		//const hSpace = (data.h/data.scale);
		const cont = document.getElementsByClassName("modal-window-login__scale-cont")[0];
		const targetHeight = Math.min(data.h/2, 432);
		if(cont) {
			cont.style.transform = `scale(${(targetHeight/432)})`;
		}
		//this.logo.x = (data.w/data.scale) - 1920;
		//this.back1.scale.y = this.back2.scale.y = (data.h/data.scale)/1080;
	}

	goLogin() {
		const id = $('.modal-window-login__text-id')[0];
		const pass = $('.modal-window-login__text-pass')[0];
		console.log(id.value, pass.value);

		var token = document.getElementById('root').getAttribute('token');
		post('/login', {username: id.value, password: pass.value, _token: token});
		// signIn(id.value, pass.value, ()=>{
		// 	EE.emit('GO_GAME');
		// });
	}

	onInput(e) {
		if (e.target.value.length > 30) {
			e.target.value = e.target.value.slice(0,30);
		}
	}

	checkRem(e) {
		e.target.style.transition = "0.5s";
		e.target.style.opacity = (e.target.style.opacity==="0"?"1":"0");
	}

	goRegistration() {
		EE.emit('SHOW_REG');
	}

	render () {
		return (
			<div className="modal-window-login">
				<div className="modal-window-login__logo">
					<img src="/images/screens/logo.png" alt=""/>
				</div>
				<div className="modal-window-login__down">
					<div className="modal-window-login__scale-cont">
						<input className="modal-window-login__text-id" type="text" onInput={this.onInput}/>
						<input className="modal-window-login__text-pass" type="password" onInput={this.onInput}/>
						<img className="modal-window-login__check" onClick={this.checkRem} src="/images/screens/check.png" alt=""/>
						<img className="modal-window-login__login game-button" onClick={this.goLogin} src="/images/screens/log_btn.png" alt=""/>
						<img className="modal-window-login__back" src="/images/screens/login.png" alt=""/>
					</div>
				</div>
			</div>
		)
	}

	
}