const registerValidator = {
    firstName: {
          isLength: {
              errorMessage: "First name length min 2",
              options: {
                  min: 2,
              },
          },
      },
      email: {
          isEmail: {
              bail: true,
              errorMessage: "email is require",
          },
      },
      password: {
          isLength: {
              errorMessage: "password length min 6 character",
              options: {
                  min: 6,
          max: 6,
              },
          },
      },
  };
export default registerValidator