import React from 'react';
import {EE} from "../App";
import '../css/error.css';
import {PAGE_SIZE_DEFAULT} from "../common/Config";

class ErrorWindow extends React.Component {
	showStyle = {display: "flex"};
	hideStyle = {display: "none"};

	constructor(props) {
		super(props);
		this.onClose = this.onClose.bind(this);
		this.state = {
			SHOW: false,
			TEXT: ""
		}
	}

	componentDidMount() {
		EE.addListener('SHOW_ERROR', (arg)=>{
			this.setState({
				SHOW: true,
				TEXT: arg.text
			});
			//console.log('..............', arg.text);
		});
		//EE.emit('SHOW_ERROR', {text: "123"});
		//
		EE.addListener("RESIZE", this.onResize);
		EE.emit("FORCE_RESIZE");
	}

	onResize(data) {
		const cont = document.getElementsByClassName("error-window-elem")[0];
		const sc = Math.min(data.h/PAGE_SIZE_DEFAULT.height, data.w/PAGE_SIZE_DEFAULT.width);
		if(cont) {
			cont.style.transform = `scale(${sc})`;
		}
	}

	onClose () {
		this.setState({
			SHOW: false
		});
	}

	render () {
		return (
			<div className="error-window-cont" style={this.state.SHOW?this.showStyle:this.hideStyle}>
				<div className="error-window-elem">
					<span className="error-window__text">{this.state.TEXT}</span>
					<img className="error-window__close game-button" onClick={this.onClose} src="/images/screens/elements/buttons/close.png" alt=""/>
					<img className="error-window__back" src="/images/screens/popup_bg.png" alt=""/>
				</div>
			</div>
		)
	}
}

export default ErrorWindow;
