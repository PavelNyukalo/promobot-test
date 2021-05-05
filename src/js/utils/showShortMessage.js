export const showShortMessage = (text, additionalClass) => {
  const messageElement = document.createElement("div");

  messageElement.classList.add(
    "short-message",
    `short-message--${additionalClass}`
  );
  messageElement.textContent = text;
  document.body.append(messageElement);

  setTimeout(() => {
    messageElement.remove();
  }, 3000);
};
