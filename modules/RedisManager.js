var client = require('redis').createClient();

class RedisManager {

	constructor(){

		this.domain = "";

	}

	ready(go){

		client.on('connect', () => {

			go();

		});

	}

	setStorageDomain(domain){

		this.domain = domain;

	}

	set(key,value){

		client.set(this.keyInDomain(key),value);

	}

	delete(key){

		client.del(this.keyInDomain(key));

	}

	get(key){

		return new Promise((resolve, reject) => {
			
			client.get(this.keyInDomain(key), (error, res) => {

				if (error) {

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
								},
								error => reject(false)
							);


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