const { command, isPrivate } = require("../../lib/");
const { isAdmin, parsedJid } = require("../../lib");

command(
  {
    pattern: "add ?(.*)",
    fromMe: true,
    desc: "ඇඩ් කරන්න කෙනෙක්ව👤+",
    type: "group",
  },
  async (message, match) => {
    if (!message.isGroup)
      return await message.reply("_This command is for groups_");

    match = match || message.reply_message.jid;
    if (!match) return await message.reply("_Mention user to add");

    const isadmin = await isAdmin(message.jid, message.user, message.client);

    if (!isadmin) return await message.reply("_I'm not admin_");
    const jid = parsedJid(match);

    await message.client.groupParticipantsUpdate(message.jid, jid, "add");

    return await message.reply(`_@${jid[0].split("@")[0]} added_`, {
      mentions: [jid],
    });
  }
);

command(
  {
    pattern: "kick ?(.*)",
    fromMe: true,
    desc: "kicks a person from group",
    type: "group",
  },
  async (message, match) => {
    if (!message.isGroup)
      return await message.reply("_මෙක වැඩ කරන්නෙ group වල🎉🥶_");

    match = match || message.reply_message.jid;
    if (!match) return await message.reply("_Mention කරන්න අයින් කරන්න ඔනි කෙනා😊🎉_");

    const isadmin = await isAdmin(message.jid, message.user, message.client);

    if (!isadmin) return await message.reply("_ඔයා ඇඩ්මින් කෙනෙක් නෙමේ.🎀😽_");
    const jid = parsedJid(match);

    await message.client.groupParticipantsUpdate(message.jid, jid, "remove");

    return await message.reply(`_@${jid[0].split("@")[0]} kicked_`, {
      mentions: [jid],
    });
  }
);
command(
  {
    pattern: "promote ?(.*)",
    fromMe: true,
    desc: "ඇඩ්මින් දෙන්න කෙනෙක්ට👤+",
    type: "group",
  },
  async (message, match) => {
    if (!message.isGroup)
      return await message.reply("_මෙක වැඩ කරන්නෙ group වල🎉🥶_");

    match = match || message.reply_message.jid;
    if (!match) return await message.reply("_Mention කරන්න ඇඩ්මින් දෙන්න ඔනි කෙනා🎀😽_");

    const isadmin = await isAdmin(message.jid, message.user, message.client);

    if (!isadmin) return await message.reply("_ඔයා ඇඩ්මින් කෙනෙක් නෙමේ🎀🥲_");
    const jid = parsedJid(match);

    await message.client.groupParticipantsUpdate(message.jid, jid, "promote");

    return await message.reply(`_@${jid[0].split("@")[0]} promoted as admin_`, {
      mentions: [jid],
    });
  }
);
command(
  {
    pattern: "demote ?(.*)",
    fromMe: true,
    desc: "ඇඩ්මින් අයින් කරන්න👤¿",
    type: "group",
  },
  async (message, match) => {
    if (!message.isGroup)
      return await message.reply("_මෙක වැඩ කරන්නෙ group වල🎉🥶_");

    match = match || message.reply_message.jid;
    if (!match) return await message.reply("_Mention කරන්න ඇඩ්මින් අයින් කරන්න ඔනි කෙනාව😊_");

    const isadmin = await isAdmin(message.jid, message.user, message.client);

    if (!isadmin) return await message.reply("_ඔයා ඇඩ්මින් කෙනෙක් නෙමෙ🎀🥶_");
    const jid = parsedJid(match);

    await message.client.groupParticipantsUpdate(message.jid, jid, "demote");

    return await message.reply(
      `_@${jid[0].split("@")[0]} demoted from admin_`,
      {
        mentions: [jid],
      }
    );
  }
);

command(
  {
    pattern: "mute",
    fromMe: true,
    desc: "ගෘප් එක වහන්න😊👤",
    type: "group",
  },
  async (message, match, m, client) => {
    if (!message.isGroup)
      return await message.reply("_මෙක වැඩ කරන්නෙ group වල🎉🥶_");
    if (!isAdmin(message.jid, message.user, message.client))
      return await message.reply("_ඔයා ඇඩ්මින් කෙනෙක් නෙමෙ🥲🎉_");
    await message.reply("_Muting_");
    return await client.groupSettingUpdate(message.jid, "announcement");
  }
);

command(
  {
    pattern: "unmute",
    fromMe: true,
    desc: "ගෘප් එක අරින්න😽◎",
    type: "group",
  },
  async (message, match, m, client) => {
    if (!message.isGroup)
      return await message.reply("_මෙක වැඩ කරන්නෙ group වල🎉🥶_");
    if (!isAdmin(message.jid, message.user, message.client))
      return await message.reply("ඔයා ඇඩ්මින් කෙනෙක් නේමේ🥲");
    await message.reply("_Unmuting_");
    return await client.groupSettingUpdate(message.jid, "not_announcement");
  }
);

command(
  {
    pattern: "rash",
    fromMe: isPrivate,
    desc: "ටැග්",
    type: "group",
  },
  async (message, match, m, client) => {
    if (!message.isGroup)
      return await message.reply("_මෙක වැඩ කරන්නෙ group වල🎉🥶_");
    let { participants } = await client.groupMetadata(message.jid);
    let participant = participants.map((u) => u.id);
    let str = "╭──〔 *Group Jids* 〕\n";
    participant.forEach((result) => {
      str += `├ *${result}*\n`;
    });
    str += `╰──────────────`;
    message.reply(str);
  }
);

command(
  {
    pattern: "tagall ?(.*)",
    fromMe: true,
    desc: "ඔක්කොම මෙන්ශන් කරන්න",
    type: "group",
  },
  async (message, match) => {
    if (!message.isGroup) return;
    const { participants } = await message.client.groupMetadata(message.jid);
    let teks = "";
    for (let mem of participants) {
      teks += ` @${mem.id.split("@")[0]}\n`;
    }
    message.sendMessage(message.jid,teks.trim(), {
      mentions: participants.map((a) => a.id),
    });
  }
);

command(
  {
    pattern: "tag",
    fromMe: true,
    desc: "ඔක්කොලම මෙන්ශන් කරන්න🥲",
    type: "group",
  },
  async (message, match) => {
    match = match || message.reply_message.text;
    if (!match) return message.reply("_ඔනි මෑසෙජ් එක දෙන්න_");
    if (!message.isGroup) return;
    const { participants } = await message.client.groupMetadata(message.jid);
    message.sendMessage(message.jid,match, {
      mentions: participants.map((a) => a.id),
    });
  }
);
