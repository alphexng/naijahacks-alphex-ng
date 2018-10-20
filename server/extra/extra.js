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
	static randNumb (str) {
        const rand =  Math.floor(Math.random() * 100000) + 10000;
        return `${str}${rand}`;
	}
}

export default Extra;
