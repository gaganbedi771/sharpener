const groupRepository = require("../repository/groupRepository");
const path = require("path");

exports.getGroupsByUserId = async (id) => {
  try {
    const groups = await groupRepository.getGroupsByUserId(id);
    return groups;
  } catch (error) {
    console.log("Error at service", error);
    throw error;
  }
};

exports.getGroupByName = async (groupName, userId) => {
  try {
    const groupExists = await groupRepository.checkGroupExist(groupName);
    if (!groupExists) {
      throw new Error("No group exists with this name.");
    }
    const isMember = await groupRepository.isUserInGroup(
      groupExists.id,
      userId
    );
    if (!isMember) {
      throw new Error("User is not a member of this group");
    }
    //modify it as per need later
    const group = await groupRepository.getGroupByName(groupName);
    return group;
  } catch (error) {
    console.log("Error at service", error);
    throw error;
  }
};

exports.createGroup = async (name, userId) => {
  try {
    const groupExists = await groupRepository.checkGroupExist(name);
    if (groupExists) {
      throw new Error(
        "Group already exists with this name, choose a unique name"
      );
    }
    const group = await groupRepository.createGroup(name, userId);
    return group;
  } catch (error) {
    console.log("Error at service", error);
    throw error;
  }
};

exports.joinGroupByName = async (name, userId) => {
  try {
    const group = await groupRepository.checkGroupExist(name);
    if (!group) {
      throw new Error("No group exists with this name");
    }

    const isMember = await groupRepository.isUserInGroup(group.id, userId);
    if (isMember) {
      throw new Error("User already a member of this group");
    }

    return await groupRepository.joinGroupByName(group.id, userId);
  } catch (error) {
    console.log("Error at service", error);
    throw error;
  }
};

exports.getGroupMembers = async (groupId) => {
  try {
    const members = await groupRepository.getGroupMembers(groupId);
    return members;
  } catch (error) {
    console.log("Error at service", error);
    throw error;
  }
};

exports.getMessages = async (groupId, userId) => {
  try {
    const isMember = await groupRepository.isUserInGroup(groupId, userId);
    if (!isMember) {
      throw new Error("User is not a member of this group");
    }

    const messages = await groupRepository.getMessages(groupId);
    return messages;
  } catch (error) {
    console.log("Error at service", error);
    throw error;
  }
};

exports.sendMessage = async (groupId, userId, msg, file, username) => {
  try {
    const isMember = await groupRepository.isUserInGroup(groupId, userId);
    if (!isMember) {
      throw new Error("User is not a member of this group");
    }

    let fileUrl = null;
    if (file) {
      fileUrl = file.path;
    }

    const messageData = {
      userId,
      groupId,
      msg: msg,
      fileUrl,
      username:username
    };

    const messages = await groupRepository.sendMessage(messageData);
    return messages;
  } catch (error) {
    console.log("Error at service", error);
    throw error;
  }
};
