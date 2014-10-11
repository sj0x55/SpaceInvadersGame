requirejs.config({
	baseUrl: 'src/scripts',
	paths: {
		app: './app',
		lib: './lib'
	}
});

require(['lib/JsFix', 'app/Main']);