class Extra {
	static hasWhiteSpace(str) {
		return (!str || str.length === 0 || /^\s*$/.test(str))
	}
	static validateInput(str,start,stop) {
		if (str.length > stop) {
			return false;
		}else if (str.length < start) {
			return false;
		}else{
			return true;
		}
	}
}

export default Extra;
