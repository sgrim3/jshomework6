var ids = {
	facebook: {
	 clientID: process.env.FacebookID || "1395741020738264",
	 clientSecret: process.env.FacebookSecret || "96570e43a67e3c94a75da9d2a6c32ec1",
	 callbackURL: 'http://localhost:3000/auth/facebook/callback'
	}
}

module.exports = ids