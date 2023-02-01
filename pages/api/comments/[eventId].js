function handler(req, res) {
  const { eventId } = req.query;
  const { email, name, text } = req.body;
  if (req.method === "POST") {
    if (
      !email ||
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !text ||
      text.trim() === ""
    ) {
      res.status(422).json({ mesage: "invalid Input" });
      return;
    }

    const newComment = {
      id: new Date().toDateString(),
      name,
      email,
      text,
    };

    console.log(email, name, text);
    res.status(201).json({ mesage: "added comment", comment: newComment });
  }

  if (req.method === "GET") {
    const dummyList = [
      {
        id: "c1",
        name: "tuns",
        email: "tuns@gmail.com",
        text: "first comment",
      },
      {
        id: "c2",
        name: "loper",
        email: "loper@gmail.com",
        text: "second comment",
      },
    ];

    res.status(201).json({ comments: dummyList });
  }
}

export default handler;
