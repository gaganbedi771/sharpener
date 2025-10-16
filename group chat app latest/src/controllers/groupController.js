const { response } = require("../utils/index");
const groupService = require("../services/groupService");

exports.getGroupsByUserId = async (req, res) => {
  try {
    const groups = await groupService.getGroupsByUserId(req.user.id);
    return response.sendSuccessResponse(res, 200, groups, "All groups fetched");
  } catch (error) {
    console.log("Error at controller", error);
    response.sendErrorResponse(res, 500, error, "Cannot fetch all groups");
  }
};

exports.getGroupByName = async (req, res) => {
  try {
    const { groupName } = req.body;
    const userId = req.user.id;
    const group = await groupService.getGroupByName(groupName, userId);

    return response.sendSuccessResponse(res, 200, group, "Group fetched");
  } catch (error) {
    console.log("Error at controller", error);
    return response.sendErrorResponse(res, 500, error, "Cannot fetch group");
  }
};

exports.createGroup = async (req, res) => {
  try {
    const { name } = req.body;
    const userId = req.user.id;
    const group = await groupService.createGroup(name, userId);
    return response.sendSuccessResponse(res, 200, group, "Group created");
  } catch (error) {
    return response.sendErrorResponse(
      res,
      500,
      error,
      error?.message || "Cannot create group"
    );
  }
};

exports.joinGroupByName = async (req, res) => {
  try {
    const { name } = req.body;
    const userId = req.user.id;
    const group = await groupService.joinGroupByName(name, userId);

    return response.sendSuccessResponse(res, 200, group, "Joined group");
  } catch (error) {
    console.log("Error at controller", error);
    return response.sendErrorResponse(
      res,
      500,
      error,
      error?.message || "Cannot create group"
    );
  }
};

exports.getGroupMembers = async (req, res) => {
  try {
    const { groupId } = req.query;
    const members = await groupService.getGroupMembers(groupId);

    return response.sendSuccessResponse(res, 200, members, "Members fetched");
  } catch (error) {
    console.log("Error at controller", error);
    return response.sendErrorResponse(
      res,
      500,
      error,
      error?.message || "Cannot fetch members"
    );
  }
};

exports.getMessages = async (req, res) => {
  try {
    const { groupId } = req.query;
    const userId = req.user.id;
    const messages = await groupService.getMessages(groupId, userId);
    return response.sendSuccessResponse(res, 200, messages, "Messages fetched");
  } catch (error) {
    return response.sendErrorResponse(
      res,
      500,
      error,
      error?.message || "Cannot fetch messages"
    );
  }
};

exports.sendMessage = async (req, res) => {
  try {
    const { groupId, msg } = req.body;
    const file = req.file;
    const userId = req.user.id;
    console.log(groupId, msg, file);
    const messages = await groupService.sendMessage(groupId, userId, msg, file,req.user.name);
    return response.sendSuccessResponse(res, 200, messages, "Messages sent");
  } catch (error) {
    return response.sendErrorResponse(
      res,
      500,
      error,
      error?.message || "Cannot send messages"
    );
  }
};
