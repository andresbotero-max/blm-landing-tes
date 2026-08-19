// Static BlueMercury header injection
(async function() {
  try {
    console.log('🔄 Loading static header...');
    
    // Fetch the static header HTML file
    const response = await fetch('header.html');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const headerHTML = await response.text();
    
    // Create container and parse HTML
    const container = document.createElement('div');
    container.innerHTML = headerHTML;
    
    // Insert all elements at the beginning of body
    const bodyFirst = document.body.firstChild;
    while (container.firstChild) {
      document.body.insertBefore(container.firstChild, bodyFirst);
    }
    
    console.log('✅ Static BlueMercury header injected successfully!');
    
  } catch (error) {
    console.error('❌ Failed to inject header:', error);
  }
})();
