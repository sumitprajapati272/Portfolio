const chatWithAI = async (req, res) => {
  try {
    const { message } = req.body;

    const response = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama3",
        prompt: `You are Prashant's AI assistant. Answer professionally.\nUser: ${message}`,
        stream: false
      }),
    });

    const data = await response.json();

    res.json({
      reply: data.response,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ reply: "Error from AI" });
  }
};

module.exports = { chatWithAI };