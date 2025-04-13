import React from 'react';
import { EE } from '../App';
import '../css/rules.css';
import {PAGE_SIZE_DEFAULT} from "../common/Config";

export class RulesWin extends React.Component {
	constructor(props) {
		super(props);
		this.onClose = this.onClose.bind(this);
	}

	componentDidMount() {
		EE.addListener("RESIZE", this.onResize);
		EE.emit("FORCE_RESIZE");
	}

	onResize(data) {
		const cont = document.getElementsByClassName("modal-window-rules__scale-cont")[0];
		const sc = Math.min(data.h/PAGE_SIZE_DEFAULT.height, data.w/PAGE_SIZE_DEFAULT.width);
		if(cont) {
			cont.style.transform = `scale(${sc})`;
		}
	}

	onEdit () {

	}

	onSave () {

	}

	onClose () {
		this.props.onClose();
	}

	render () {
		return (
			<div className="modal-window-rules">
				<div className="modal-window-rules__scale-cont">
					<span className="modal-window-rules__t1 modal-window-rules__text">{"1. Player will receive 20% bonus on every deposit."}</span>
					<span className="modal-window-rules__t2 modal-window-rules__text">{"For example: Add 10 credits and when usage of the 10 credits is below 0.10 will be added to your balance."}</span>
					<span className="modal-window-rules__t3 modal-window-rules__text">{"2. Rule applies to all amount and unlimited times per day."}</span>
					<span className="modal-window-rules__t4 modal-window-rules__text">{"Note:-"}</span>
					<span className="modal-window-rules__t5 modal-window-rules__text">{"You will only receive bonus if balance will go below 0.10 credit"}</span>
					<img className="modal-window-rules__close game-button" onClick={this.onClose} src="/images_christmas/screens/elements/buttons/close.png" alt=""/>

					<img className="modal-window-rules__back" src="/images_christmas/screens/rules_back.png" alt=""/>
				</div>
			</div>
		)
	}
}