import React from 'react';
import { EE } from '../App';
import '../css/info.css';
import {PAGE_SIZE_DEFAULT} from "../common/Config";
import { deleteUser } from '../server/server';

export class InfoWin extends React.Component {
	constructor(props) {
		super(props);
		this.onClose = this.onClose.bind(this);
		this.goDelAccount = this.goDelAccount.bind(this);
		this.goDelModal = this.goDelModal.bind(this);
		this.closeDelModal = this.closeDelModal.bind(this);
		this.state = {
			modalDialog: false,
			TEXT_ABOUT: "Помимо этого, объекты, которыми оперируют редьюсеры в редаксе, не являются какой-то полноценной сущностью - это просто кусок чистых данных. Противоположность - MobX, где в сторах могут быть экшны и компьютеды. Кстати, последние как раз являются заменой селекторов в MobX."
		};
	}

	componentDidMount() {
		EE.addListener("RESIZE", this.onResize);
		EE.emit("FORCE_RESIZE");
	}

	onResize(data) {
		const cont = document.getElementsByClassName("modal-window-info__scale-cont")[0];
		const sc = Math.min(data.h/PAGE_SIZE_DEFAULT.height, data.w/PAGE_SIZE_DEFAULT.width);
		if(cont) {
			cont.style.transform = `scale(${sc})`;
		}
	}

	goDelAccount () {
		console.log('delete account!');
		deleteUser((data) => {
			data = JSON.parse(data);
			if(data.result == 'success')
			{
				var isMobile;
				if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
					// true for mobile device                
					isMobile = true;
				}
				else {
					// false for not mobile device
					isMobile = false;
				}
				if (!isMobile)
					window.location.href = '/logout';
				else {
					var data = JSON.stringify({ event: 'Logout', value: "logout" });
					window.postMessage(data, "*");
					window.location.href = '/logout';
				}
			}
		});
	}

	goDelModal () {
		this.setState({
			modalDialog: true
		})
	}

	closeDelModal () {
		this.setState({
			modalDialog: false
		})
	}

	onEdit () {

	}

	onSave () {

	}

	onClose () {
		this.props.onClose();
	}

	render () {
		var username = document.getElementById('root').getAttribute('username');
		return (
			<div className="modal-window-info">
				<div className="modal-window-info__scale-cont">
					{this.state.modalDialog?
						<div className={"modal-window-info-modal"}>
							<img className="modal-window-info__yes modal-window-info__btn game-button" onClick={this.goDelAccount}  src="/images/screens/elements/buttons/byes.png" alt=""/>
							<img className="modal-window-info__no modal-window-info__btn game-button" onClick={this.closeDelModal}  src="/images/screens/elements/buttons/bno.png" alt=""/>
							<img className="modal-window-info-modal__back" src="/images/screens/info_modal.png" alt=""/>
						</div>
					:""}
					<span className="modal-window-info__user modal-window-info__text">{"User"}</span>
					<span className="modal-window-info__pass modal-window-info__text">{"****************"}</span>
					<img className="modal-window-info__close game-button" onClick={this.onClose} src="/images/screens/elements/buttons/close.png" alt=""/>

					<img className="modal-window-info__done modal-window-info__btn game-button" src="/images/screens/elements/buttons/bdone.png" alt=""/>
					<img className="modal-window-info__del modal-window-info__btn game-button" onClick={this.goDelModal} src="/images/screens/elements/buttons/bdel.png" alt=""/>
					<img className="modal-window-info__change modal-window-info__btn game-button" onClick={this.props.goChangePass} src="/images/screens/elements/buttons/bchange.png" alt=""/>
					<img className="modal-window-info__back" src="/images/screens/info_back.png" alt=""/>
				</div>
			</div>
		)
	}
}