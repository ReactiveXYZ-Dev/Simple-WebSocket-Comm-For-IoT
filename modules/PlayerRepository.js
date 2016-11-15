var db = require('./RedisManager')();

var sha1 = require('sha1');	

class PlayerRepository {

	create() {

		return new Promise((resolve, reject) => {
			
			db.ready(() => {

				db.setStorageDomain('player');

				resolve(this);
			});

		});

	}

	registerPlayer(id){

		db.set(sha1(id), true);

	}

	removePlayer(id){

		db.delete(sha1(id));

	}

	exists(id){

		return db.exists(sha1(id));

	}	

}

module.exports = () => {

	return new PlayerRepository;

}