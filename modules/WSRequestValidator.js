class RequestValidator {

	create() {
		//@warning: temporary access token
		this.accessToken = "EECS183ROCKS!";

		return this;
	}

	validate(pass) {
		return pass == this.accessToken;
	}

}

module.exports = () => {
	return new RequestValidator;
}