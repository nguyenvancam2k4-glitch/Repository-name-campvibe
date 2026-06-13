import {
  createContactMessage,
  findAllContactMessages,
  updateContactMessageStatus,
} from "../models/contactModel.js"

export async function createContact(req, res, next) {
  try {
    const { userId, fullName, email, phone, subject, message } = req.body

    if (!fullName || !phone || !message) {
      return res.status(400).json({
        success: false,
        message: "Vui lòng nhập họ tên, số điện thoại và nội dung cần tư vấn",
      })
    }

    const contact = await createContactMessage({
      userId,
      fullName,
      email,
      phone,
      subject,
      message,
    })

    res.status(201).json({
      success: true,
      source: "postgresql",
      message: "Gửi liên hệ thành công",
      data: contact,
    })
  } catch (error) {
    next(error)
  }
}

export async function getContacts(req, res, next) {
  try {
    const contacts = await findAllContactMessages()

    res.json({
      success: true,
      source: "postgresql",
      count: contacts.length,
      data: contacts,
    })
  } catch (error) {
    next(error)
  }
}

export async function updateContactStatus(req, res, next) {
  try {
    const { id } = req.params
    const { status } = req.body

    const allowedStatuses = ["new", "contacted", "resolved", "cancelled"]

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Trạng thái liên hệ không hợp lệ",
      })
    }

    const contact = await updateContactMessageStatus(id, status)

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy liên hệ",
      })
    }

    res.json({
      success: true,
      source: "postgresql",
      message: "Cập nhật trạng thái liên hệ thành công",
      data: contact,
    })
  } catch (error) {
    next(error)
  }
}
