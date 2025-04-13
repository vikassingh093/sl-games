module.exports = {
  apps : [{
    name   : "firebase_monitor",
    script : "./firebase_monitor.js",
    env    : {
	"GOOGLE_APPLICATION_CREDENTIALS":"/var/www/RiverDragon/Firebase/service-account.json"
	}
  }]
}
