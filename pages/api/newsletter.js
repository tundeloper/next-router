// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  if (req.method === "POST") {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes("@")) {
      res.status(442).json({ message: "Invalid email address" });
    }
    console.log(userEmail);
    res.status(201).json({ message: "signed up" });
  }
  // console.log(userEmail);
  // res.status(201).json({ message: "signed up" });
}
