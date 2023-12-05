import passport from "passport";


export const login = passport.authenticate("local", {
    successRedirect: "/principal",
    failureRedirect: "/",
    passReqToCallback: true,
    failureFlash: true,
  });