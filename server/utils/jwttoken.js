const sendToken = (user, statusCode, res) => {
  const token = user.getJWTToken();
  console.log("user " + user);
  console.log("token " + token);

  if (!token) {
    return res.status(500).json({ error: "Failed to generate token" });
  }

  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true, // Set to true for security reasons
  };

  try {
    res.status(statusCode).cookie("token", token, options).json({
      success: true,
      user,
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to set cookie" });
  }
};

module.exports = sendToken;
