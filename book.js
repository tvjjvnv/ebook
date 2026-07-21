document.addEventListener('DOMContentLoaded', () => {
  const selectButtons = document.querySelectorAll('.select-btn');
  const whatsappBtn = document.getElementById('whatsapp-btn');
  
  // Set your WhatsApp phone number here (with country code, no + or spaces)
  const phoneNumber = "2340000000000"; 
  
  const selectedItems = new Set();

  // Toggle selection on buttons
  selectButtons.forEach(button => {
    button.addEventListener('click', () => {
      const value = button.getAttribute('data-value');

      if (button.classList.contains('active')) {
        button.classList.remove('active');
        selectedItems.delete(value);
      } else {
        button.classList.add('active');
        selectedItems.add(value);
      }
    });
  });

  // Handle WhatsApp redirection
  whatsappBtn.addEventListener('click', () => {
    if (selectedItems.size === 0) {
      alert('Please select at least one cash or in-kind option to support!');
      return;
    }

    const selections = Array.from(selectedItems).join(', ');
    const textMessage = `Hello BookNest! I would like to support the library with the following: ${selections}.`;
    
    // Construct WhatsApp link
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(textMessage)}`;
    
    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank');
  });
});