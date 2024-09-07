// Function to create a token and save it in a cookie
const sendToken = (user, statusCode, res) => {
    // Generate JWT token using the user's method
    const token = user.getJWTToken();
  
    // Cookie options
    const cookieOptions = {
      expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000), // Cookie expiration set based on environment variable
      httpOnly: true, // Makes the cookie accessible only by the web server
      secure: process.env.NODE_ENV === 'production', // Sends cookie only over HTTPS in production
      sameSite: 'Strict', // Helps prevent CSRF attacks
    };
  
    // Send response with status, cookie, and JSON payload
    res.status(statusCode).cookie('token', token, cookieOptions).json({
      success: true,
      user,
      token,
    });
  };
  
  export default sendToken;
  