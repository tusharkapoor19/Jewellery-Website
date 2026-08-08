const express = require("express");

const router = express.Router();

const notificationCtrl = require("../controller/notification_ctrl");

router.post("/", notificationCtrl.createNotification);

router.get("/:userId", notificationCtrl.getNotifications);

router.get("/:userId/unread-count", notificationCtrl.getUnreadCount);

router.patch("/:id/read", notificationCtrl.markAsRead);

router.patch("/:userId/read-all", notificationCtrl.markAllAsRead);

router.delete("/:id", notificationCtrl.deleteNotification);

module.exports = router;