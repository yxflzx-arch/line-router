let count = 0;

export default function handler(req, res) {

  const lines = [
    "你的LINE_A連結",
    "你的LINE_B連結"
  ];

  const target = lines[count % 2];

  count++;

  res.redirect(302, target);

}
