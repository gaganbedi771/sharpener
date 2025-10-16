const cron = require("node-cron");
const { Message } = require("../models/index");
const groupRepository = require("../repository/groupRepository");

const { Op } = require("sequelize");

cron.schedule("0,0,*,*,*", async () => {
  try {
    const messagesToArchive = await groupRepository.findOlderMessages();

    const refinedMessageData = messagesToArchive.map((msg) => ({
      message: msg.message,
      groupId: msg.groupId,
      userId: msg.userId,
      fileUrl: msg.fileUrl,
      createdAt: msg.createdAt,
    }));

    await groupRepository.bulkCreateArchive(refinedMessageData);

    await groupRepository.bulkDestroyArchivedData(refinedMessageData);
  } catch (error) {
    console.log(error);
  }
});
