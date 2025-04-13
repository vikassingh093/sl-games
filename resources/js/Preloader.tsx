import './App.css';

function Preloader() {
  return (
		<div className="preloader-game">
			<img className="preloader-game-logo" src="/images/screens/logo.png" alt=""/>
			<div className="preloader-game-bar-cont">
				<img className="preloader-game-bar" src="/images/preloader/ic_dragon.png" alt=""/>
				<img className="preloader-game-bar-back" src="/images/preloader/bg.png" alt=""/>
			</div>
			<span className="preloader-game-text">LOADING...</span>
		</div>
  );
}

export default Preloader;
