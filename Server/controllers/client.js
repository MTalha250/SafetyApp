import Client from "../models/client.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { profileImage, name, username, password } = req.body;
  try {
    const client = await Client.findOne({ username });
    if (client) {
      return res.status(400).json({ message: "Client already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const newClient = await Client.create({
      profileImage,
      name,
      username,
      password: hashedPassword,
    });
    const token = jwt.sign({ id: newClient._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(201).json({
      message: "Account created successfully. Please wait for admin approval",
      client: newClient,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const client = await Client.findOne({ username });
    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, client.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }

    if (!client.isVerified) {
      return res.status(400).json({
        message:
          "You are not verified. Please contact admin to verify your account.",
      });
    }

    const token = jwt.sign({ id: client._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({ message: "Login successful", client, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getClients = async (req, res) => {
  try {
    const clients = await Client.find()
      .populate("riskAssessments team")
      .sort({ createdAt: -1 });
    res.status(200).json(clients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getClient = async (req, res) => {
  try {
    const client = await Client.findById(req.userId)
      .populate("riskAssessments team")
      .sort({ createdAt: -1 });
    res.status(200).json(client);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateClient = async (req, res) => {
  const { profileImage, name, username, password } = req.body;
  try {
    const client = await Client.findByIdAndUpdate(
      req.userId,
      { profileImage, name, username, password },
      { new: true }
    );
    res.status(200).json({ message: "Client updated successfully", client });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteClient = async (req, res) => {
  const { id } = req.params;
  try {
    await Client.findByIdAndDelete(id);
    res.status(200).json({ message: "Client deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const verifyClient = async (req, res) => {
  const { id } = req.params;
  try {
    const client = await Client.findById(id);
    if (!client) {
      return res.status(400).json({ message: "Client does not exist" });
    }
    await Client.findByIdAndUpdate(id, { isVerified: true });
    res.status(200).json({ message: "Client verified successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
