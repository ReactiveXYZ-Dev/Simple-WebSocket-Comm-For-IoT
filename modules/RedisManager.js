var client = require('redis').createClient();

class RedisManager {

	constructor(){

		this.domain = "";

	}

	setStorageDomain(domain){

		this.domain = domain;

	}

	set(key,value){

		return new Promise((resolve,reject) => {

			client.set(this.keyInDomain(key), value, (err, res) => {

				if (err) {

					reject(false);

				} else {

					resolve(true)

				}

			});

		});

	}

	delete(key){

		client.del(this.keyInDomain(key));

	}

	get(key){

		return new Promise((resolve, reject) => {
			
			client.get(this.keyInDomain(key), (error, res) => {

				if (error || res == null) {

					reject(error);

				}

				if (res) {

					resolve(res);
				}

			});

		});;

	}

	exists(key){
		return new Promise((resolve, reject) => {
			
			this.get(key).then(
								data => {
									if (data == null) {
										reject(false);
									}else{
										resolve(true);
									}
								}
							)
							.catch(error => {

									reject(false);
								});


		});

	}

	// private
	keyInDomain(key){

		return `${this.domain}.${key}`;

	}	

}

module.exports = () => {

	return new RedisManager;

}