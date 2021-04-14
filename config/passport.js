const OIDCStrategy = require('passport-azure-ad').OIDCStrategy //have to require their strategy to use it
const mongoose = require('mongoose') //access to mongoose
const config = require('../config/config') //ask for config file that holds all the secret
const User = require('../models/User') //

module.exports = function (passport) { //found on passport site; to be verified before function run below
  passport.use(
    new OIDCStrategy({
        identityMetadata: config.creds.identityMetadata,
        clientID: config.creds.clientID,
        responseType: config.creds.responseType,
        responseMode: config.creds.responseMode,
        redirectUrl: config.creds.redirectUrl,
        allowHttpForRedirectUrl: config.creds.allowHttpForRedirectUrl,
        clientSecret: config.creds.clientSecret,
        validateIssuer: config.creds.validateIssuer,
        isB2C: config.creds.isB2C,
        issuer: config.creds.issuer,
        passReqToCallback: config.creds.passReqToCallback,
        scope: config.creds.scope,
        loggingLevel: config.creds.loggingLevel,
        nonceLifetime: config.creds.nonceLifetime,
        nonceMaxAmount: config.creds.nonceMaxAmount,
        useCookieInsteadOfSession: config.creds.useCookieInsteadOfSession,
        cookieEncryptionKeys: config.creds.cookieEncryptionKeys,
        clockSkew: config.creds.clockSkew,
      },
      async (accessToken, refreshToken, profile, done) => { //enable us to create new user; once youve logged in you get all this info with each request
        console.log('auth: ', profile) //ptofile is holding all the info created when logged in created 
        const newUser = {  
          microsoftId: profile.oid,
          displayName: profile.displayName,
        }

        try { //checking if theres a user in database that matches info provided above 
          let user = await User.findOne({ microsoftId: profile.oid })

          if (user) {
            done(null, user) //if a match move on
          } else {
            user = await User.create(newUser) //if no match, create new user using user model(user.js file)
            done(null, user)
          }
        } catch (err) {
          console.error(err)
        }
      }
    )
  )

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user))
  })
}
