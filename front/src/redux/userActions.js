const userActions = {
  // register: { type: "REGISTER" },
  logIn: function (data) {
    console.log(data);
    return { type: "LOG_IN", payload: data };
  },
  logOut: function () {
    return { type: "LOG_OUT" };
  },
};

export default userActions;
