class global
{
	constructor () {
		this.data = {}
	}

	set (key , val) {
		this.data[key] = val;
	}

	get (key) {
		return this.data[key];
	}
}

if (!window.$global) {
	window.$global = new global();
}

export default window.$global;