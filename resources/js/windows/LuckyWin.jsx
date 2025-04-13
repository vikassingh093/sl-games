import React from 'react';
import { EE } from '../App';
import '../css/lucky.css';
import {PAGE_SIZE_DEFAULT} from "../common/Config";
import { sendSundayFunday } from '../server/server';

export class LuckyWin extends React.Component {
	constructor(props) {
		super(props);
		this.onDecline = this.onDecline.bind(this);
		this.onAccept = this.onAccept.bind(this);
	}

	componentDidMount() {
		EE.addListener("RESIZE", this.onResize);
		EE.emit("FORCE_RESIZE");
	}

	onResize(data) {
		const cont = document.getElementsByClassName("modal-window-lucky__scale-cont")[0];
		const sc = Math.min(data.h/PAGE_SIZE_DEFAULT.height, data.w/PAGE_SIZE_DEFAULT.width);
		if(cont) {
			cont.style.transform = `scale(${sc})`;
		}
	}

	onAccept () {
		console.log('Click Accept!');
		sendSundayFunday(1);
		this.props.onClose();
	}

	onDecline () {
		console.log('Click Decline!');
		sendSundayFunday(0);
		this.props.onClose();
	}

	render () {
		return (
			<div className="modal-window-lucky">
				<div className="modal-window-lucky__scale-cont">
					<img className="modal-window-lucky__ok game-button" onClick={this.onAccept} src="/images/screens/elements/buttons/lucky_ok.png" alt=""/>
					<img className="modal-window-lucky__close game-button" onClick={this.onDecline} src="/images/screens/elements/buttons/lucky_close.png" alt=""/>

					<img className="modal-window-lucky__back" src="/images/screens/lucky_back.png" alt=""/>
				</div>
			</div>
		)
	}
}