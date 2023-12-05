import passport from "passport";


export const login = passport.authenticate("local", {
    successRedirect: "/principal",
    failureRedirect: "/",
    passReqToCallback: true,
    failureFlash: true,
  });

  export const register = passport.authenticate("register", {
    successRedirect: "/principal",
    failureRedirect: "/",
    passReqToCallback: true,
    failureFlash: true,
  });