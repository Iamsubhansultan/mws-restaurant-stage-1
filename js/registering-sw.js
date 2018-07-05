if (navigator.serviceWorker) {
    navigator.serviceWorker.register('js/sw.js')
    .then(registration => {
        console.log(`Registered!! || Scope:  ${registration.scope}`);
	}).catch(error => {
		console.log(`Failed: , error: ${error}`);
	});
}