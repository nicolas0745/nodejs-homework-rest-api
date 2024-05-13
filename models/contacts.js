const Contact = require("../schemas/contact");

const listContacts = async () => {
  try {
    const contacts = await Contact.find({});
    return contacts;
  } catch (error) {
    throw new Error("Error getting contacts:" + error);
  }
};

const getContactById = async (id) => {
  try {
    const contact = await Contact.findOne({ _id: id })
      .then((user) => {
        if (user) return user;
        else return null;
      })
      .catch((e) => null);
    return contact;
  } catch (error) {
    throw new Error("Error trying read contact by ID...");
  }
};

const removeContact = async (id) => {
  const result = await Contact.findByIdAndDelete({ _id: id })
    .then((user) => {
      if (user) return user;
      else return null;
    })
    .catch((e) => {
      console.error("Error trying remove contact: " + e);
      return null;
    });

  return result;
};

const addContact = async ({ name, email, phone }) => {
  try {
    const contact = {
      name,
      email,
      phone,
    };
    const result = Contact.create(contact).then((obj) => {
      if (obj) return obj;
      else return null;
    });
    return result;
  } catch (error) {
    throw new Error("Error triying create contact");
  }
};

const updateContact = async (id, body) => {
  const result = await Contact.findByIdAndUpdate({ _id: id }, body)
    .then(async (contact) => {
      if (contact) {
        const updatedContact = await Contact.findById({ _id: id });
        return updatedContact;
      } else return null;
    })
    .catch((e) => null);

  return result;
};
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
