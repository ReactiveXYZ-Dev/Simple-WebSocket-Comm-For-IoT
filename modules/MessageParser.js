class MessageParser {

	create(){

		return this;

	}

	load(message){

		this.message = message;

		return this;
	}

	id(){

		return this.message.split(" ")[0];

	}

}

module.exports = () => {

	return new MessageParser;

}