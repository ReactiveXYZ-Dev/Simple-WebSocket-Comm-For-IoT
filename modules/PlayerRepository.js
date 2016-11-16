var db = require('./RedisManager')();

var sha1 = require('sha1');	

class PlayerRepository {

	create() {

		db.setStorageDomain('player');

		return this;
	}

	register(id){

		return db.set(sha1(id), true);
		

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