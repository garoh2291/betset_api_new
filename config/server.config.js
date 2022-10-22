let port = process.env.PORT;
if (port == null || port == "") {
  port = 3040;
}

module.exports = {
  api_port: +port,
};
