import Client from "../models/client.js";

const verifyClient = async (req, res, next) => {
  try {
    const id = req.userId;
    const client = await Client.findById(id);
    console.log(client);
    if (!client) {
      res.status(404).json({ message: "You are not a client" });
      return;
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
};

export default verifyClient;
