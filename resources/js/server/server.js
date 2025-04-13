// import $ from 'jquery';
import _ from "lodash";
import {EE} from "../App";
//
const Q_LOGIN = "/login";
const Q_LOGOUT = "logout";
const Q_GAMES = "/gamelist";
const Q_MONEY = "info";
const Q_PASS = "/password/change";
const Q_BONUS = "/reward";
const Q_SUNDAYFUNDAY = '/sunday_funday';
const Q_DELETE_USER = '/deleteuser';

export let User = {
	token: "",
	username: "UserName",
	info: {
		user_balance: 99999.99
	},
	getdata: ()=>{
		return {
			token: User.token,
			username: User.username
		};
	}
}

function query(q, par, callback) {
	console.log( "get query::: ", q, par);

	$.get(q, par)
		.done(function( data ) {
			if(data.error) {
				EE.emit('SHOW_ERROR', {text: data.error});
				return;
			}
			// console.log( "query result! ", data);
			if(callback != undefined)
				callback(data);
		})
		.fail(() => {
			console.log( "GET DATA ERROR! ", q );
			EE.emit('SHOW_ERROR', {text: "Query error. Try again later"});
		})
}

function queryPost(q, par, callback) {
	console.log( "post query::: ", q, par);

	$.post(q, par)
		.done(function( data ) {
			if(data.error) {
				EE.emit('SHOW_ERROR', {text: data.error});
				return;
			}
			// console.log( "query result! ", data);
			callback(data);
		})
		.fail(() => {
			console.log( "GET DATA ERROR! ", q );
			EE.emit('SHOW_ERROR', {text: "Query error. Try again later"});
		})
}

export function signIn(us, pas, callback) {
	User.username = us;
	User.ps = pas;
	
	queryPost(Q_LOGIN, {
		username: us,
		password: pas
	}, (e)=>{
		User.token = e.token;
		callback(e);
	});
}

export function post(path, params, method='post') {

	// The rest of this code assumes you are not using a library.
	// It can be made less verbose if you use one.
	const form = document.createElement('form');
	form.method = method;
	form.action = path;
  
	for (const key in params) {
	  if (params.hasOwnProperty(key)) {
		const hiddenField = document.createElement('input');
		hiddenField.type = 'hidden';
		hiddenField.name = key;
		hiddenField.value = params[key];
  
		form.appendChild(hiddenField);
	  }
	}
  
	document.body.appendChild(form);
	form.submit();
}

export function signOut(callback) {
	query(Q_LOGOUT, User.getdata(), callback);
}

export function getGames(callback) {
	query(Q_GAMES + "?t=" + new Date().getTime() , User.getdata(), callback);
}

export function getMoney(callback) {
	query(Q_MONEY, User.getdata(), (e)=>{
		User.info = JSON.parse(e);
		callback(e);
	});
}

export function newPassword(new_p, callback) {
	query(Q_PASS, _.merge(User.getdata(), {
		old_password: User.ps,
		password: new_p,
		password_confirmation: new_p

	}), callback);
}

export function getReward(pick, callback) {
	query(Q_BONUS, _.merge(User.getdata(), {
		pick: pick

	}), callback);
}

export function sendSundayFunday(allow, callback) {
	query(Q_SUNDAYFUNDAY, _.merge(User.getdata(), {
		allow: allow
	}), callback);
}

export function deleteUser(callback)
{
	query(Q_DELETE_USER, {}, callback);
}