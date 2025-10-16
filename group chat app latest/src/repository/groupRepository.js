const { Group, Member, User, Message, sequelize } = require("../models/index");

exports.getGroupsByUserId = async (id) => {
  try {
    const groups = await Group.findAll({
      include: [
        {
          model: User,
          attributes: [],
          where: { id: id },
          through: { attributes: [] },
        },
      ],
    });
    return groups;
  } catch (error) {
    console.log("Error at repository", error);
    throw error;
  }
};

exports.getGroupByName = async (groupName) => {
  try {
    const group = await Group.findOne({ where: { groupName } });
    return group;
  } catch (error) {
    console.log("Error at repository", error);
    throw error;
  }
};

exports.createGroup = async (groupName, userId) => {
  const t = await sequelize.transaction();
  try {
    const group = await Group.create({ name: groupName }, { transaction: t });
    const addMember = await Member.create(
      { groupId: group.id, userId: userId },
      { transaction: t }
    );
    await t.commit();
    return group;
  } catch (error) {
    await t.rollback();
    console.log("Error at repository", error);
    throw error;
  }
};

exports.joinGroupByName = async (groupId, userId) => {
  try {
    await Member.create({ groupId, userId });
    return true;
  } catch (error) {
    console.log("Error at repository", error);
    throw error;
  }
};

exports.checkGroupExist = async (groupName, groupId) => {
  try {
    if (!groupId) {
      return await Group.findOne({ where: { name: groupName } });
    } else if (!groupName) {
      return await Group.findOne({ where: { id: groupId } });
    } else {
      return await Group.findOne({ where: { name: groupName, id: groupId } });
    }
  } catch (error) {
    console.log("Error at repository", error);
    throw error;
  }
};

exports.isUserInGroup = async (groupId, userId) => {
  try {
    return Member.findOne({ where: { groupId, userId } });
  } catch (error) {
    console.log("Error at repository", error);
    throw error;
  }
};

exports.getGroupMembers = async (groupId) => {
  try {
    const groupWithMembers = await Group.findOne({
      where: { id: groupId },
      include: [
        {
          model: User,
          through: { model: Member, attributes: [] }, // join through Member table
          attributes: ["id", "name", "email"], // only select needed fields
        },
      ],
    });

    if (!groupWithMembers) {
      throw new Error("Group not found");
    }
    return groupWithMembers.Users;
  } catch (error) {
    console.log("Error at repository", error);
    throw error;
  }
};

exports.getMessages = async (groupId) => {
  try {
    const messages = await Message.findAll({
      where: { groupId },
      attributes: ["message", "userId", "createdAt", "fileUrl"],
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
      order: [["createdAt", "ASC"]],
      // raw: true,
      nest: true,
    });

    const refinedMessages = messages.map((msg) => ({
      message: msg.message,
      senderId: msg.userId,
      senderName: msg.User.name,
      createdAt: msg.createdAt,
      fileUrl: msg.fileUrl,
    }));
    return refinedMessages;
  } catch (error) {
    console.log("Error at repository", error);
    throw error;
  }
};

exports.sendMessage = async (messageData) => {
  try {
    const sentMessage = await Message.create({
      message: messageData.msg,
      groupId: messageData.groupId,
      userId: messageData.userId,
      fileUrl: messageData.fileUrl,
    });

// const clickableFileUrl = sentMessage.fileUrl.startsWith("/uploads/") ? sentMessage.fileUrl : `/uploads/${sentMessage.fileUrl}`;

    const refinedMessages = {
      message: sentMessage.message,
      senderId: sentMessage.userId,
      createdAt: sentMessage.createdAt,
      fileUrl: sentMessage.fileUrl,
      senderName:messageData.username
      // fileUrl: clickableFileUrl,
    };
    return refinedMessages;
  } catch (error) {
    console.log("Error at repository", error);
    throw error;
  }
};
