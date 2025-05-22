/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const admin = require('firebase-admin');
const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

admin.initializeApp();
const db = admin.firestore();

exports.createGoal = onRequest(async (req, res) => {
  logger.info("Creating goal...", {structuredData: true});
  try {
    const goal = req.body;
    const docRef = await db.collection('goals').add(goal);
    res.status(201).send({ id: docRef.id });
  } catch (error) {
    logger.error("Error creating goal:", error);
    res.status(500).send("Error creating goal");
  }
});

exports.getGoals = onRequest(async (req, res) => {
  logger.info("Getting goals...", {structuredData: true});
  try {
    const snapshot = await db.collection('goals').get();
    const goals = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).send(goals);
  } catch (error) {
    logger.error("Error getting goals:", error);
    res.status(500).send("Error getting goals");
  }
});

exports.updateGoal = onRequest(async (req, res) => {
  logger.info("Updating goal...", {structuredData: true});
  try {
    const { id, ...goalData } = req.body;
    await db.collection('goals').doc(id).update(goalData);
    res.status(200).send("Goal updated successfully");
  } catch (error) {
    logger.error("Error updating goal:", error);
    res.status(500).send("Error updating goal");
  }
});

exports.deleteGoal = onRequest(async (req, res) => {
  logger.info("Deleting goal...", {structuredData: true});
  try {
    const { id } = req.body;
    await db.collection('goals').doc(id).delete();
    res.status(200).send("Goal deleted successfully");
  } catch (error) {
    logger.error("Error deleting goal:", error);
    res.status(500).send("Error deleting goal");
  }
});
